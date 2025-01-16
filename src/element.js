import { effect, reactive, effectScope, onEffectCleanup } from "./reactive.js";
import { h, render, Fragment } from "./renderer.js";

export {
  Ivysaur,
  Ivysaur as ivysaur,
  css,
  state,
  attribute,
  set_dev,
  set_dev as setDev,
  IS_DEV,
  h,
  Fragment,
  render,
};

Symbol.metadata ??= Symbol("metadata");

/** @type { Map<Object, string> } */
let observed_attrs = new Map();

/** @type { null | CSSStyleSheet[] } */
let global_sheets = null;

let get_global_stylesheets = () => {
  if (global_sheets === null) {
    global_sheets = Array.from(document.styleSheets).map((x) => {
      const sheet = new CSSStyleSheet();
      const css = Array.from(x.cssRules)
        .map((rule) => rule.cssText)
        .join(" ");
      sheet.replaceSync(css);
      return sheet;
    });
  }
  return global_sheets;
};

/**
 * @description The runtime mode of ivysaur
 * @type { boolean }
 */
let IS_DEV = true;

/**
 * @function set_dev
 * @description Set the runtime mode of ivysaur
 * @param { boolean } val
 */
let set_dev = (val) => (IS_DEV = val);

// if ivysaur has warned about being in development mode
let has_warned_dev = false;

/**
 * @description A custom element base class with reactive state and attributes.
 * @extends { HTMLElement }
 */
class Ivysaur extends HTMLElement {
  /**
   * @description The css for the element.
   * @type { string | string[] }
   */
  static styles = "";

  /**
   * @description Whether to use global document styles.
   */
  static use_global_styles = false;

  /**
   * @description Whether to use global document styles.
   */
  static get useGlobalStyles() {
    return this.use_global_styles;
  }
  static set useGlobalStyles(val) {
    this.use_global_styles = val;
  }

  /**
   * @description Whether to use light dom. This will disable component
   * styles and the render function should no longer return vnodes.
   */
  static light_dom = false;
  /**
   * @description Whether to use light dom. This will disable component
   * styles and the render function should no longer return vnodes.
   */
  static get lightDom() {
    return this.light_dom;
  }
  static set lightDom(val) {
    this.light_dom = val;
  }

  /**
   * @description Define this element in the custom elements registry. Must contain a '-'.
   * @param { string } name
   */
  static define_self(name) {
    if (!customElements.get(name)) {
      customElements.define(name, this);
    }
  }

  /**
   * @description Define this element in the custom elements registry. Must contain a '-'.
   * @param { string } name
   */
  static get defineSelf() {
    return this.define_self;
  }

  static get observedAttributes() {
    return Array.from(observed_attrs.get(this[Symbol.metadata]) ?? []);
  }

  /**
   * @description A reactive map of observed attributes.
   * @readonly
   * @type { Record<string, string> }
   */
  observed_attributes = reactive({});

  /**
   * @description A reactive map of observed attributes.
   * @type { Record<string, string> }
   */
  get observedAttributes() {
    return this.observed_attributes;
  }

  /**
   * @internal
   * @param { string } name
   * @param { string } oldValue
   * @param { string } newValue
   * @returns { void }
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    this.observedAttributes[name] = newValue;
  }

  /**
   * @description Get an attribute from the element.
   * @type { (name: string) => string | null }
   */
  get_attribute = this.getAttribute.bind(this);

  /**
   * @description Set an attribute on the element.
   * @type { (name: string, value: string) => void }
   */
  set_attribute = this.setAttribute.bind(this);

  /**
   * @description Remove an attribute on the element.
   * @type { (name: string) => void }
   */
  remove_attribute = this.removeAttribute.bind(this);

  /**
    * @description Add an event listener to the element.
    * @type { (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => void }
  */
  add_event_listener = this.addEventListener.bind(this);

  /**
    * @description Remove an event listener from the element.
    * @type { (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => void }
  */
  remove_event_listener = this.removeEventListener.bind(this);

  /**
   * @description Called when the element is added to the dom, before rendering.
   */
  on_mount() {}

  /**
   * @description Called when the element is added to the dom, before rendering.
   */
  onMount() {}

  /**
   * @description Called when the element is added to the dom, after rendering.
   */
  on_mounted() {}

  /**
   * @description Called when the element is added to the dom, after rendering.
   */
  onMounted() {}

  /**
   * @description Called when the element is removed from the dom.
   */
  on_unmount() {}

  /**
   * @description Called when the element is removed from the dom.
   */
  onUnmount() {}

  constructor() {
    super();

    if (typeof document !== "undefined" && !this.constructor.light_dom) {
      this._construct_shadow_dom();
    }

    if (IS_DEV && !has_warned_dev) {
      console.warn(
        "Ivysaur is running in development mode. Call set_dev(false) to disable this warning.",
      );
      has_warned_dev = true;
    }
  }

  /**
   * @description The render method for the element. Must return a VNode from h() or compiled JSX.
   * @returns { import("./types").VNode }
   */
  render() {
    IS_DEV &&
      !this.constructor.light_dom &&
      console.warn("No render method defined for", this.constructor.name);
  }

  /**
   * @internal
   */
  connectedCallback() {
    if (this._rootEffectScope?.active) {
      this._rootEffectScope.stop();
    }
    this._rootEffectScope = effectScope();
    this._rootEffectScope.run(() => {
      try {
        this.onMount?.();
        this.on_mount?.();
      } catch (e) {
        this._log_error(e, "on mount");
      }
      effect(() => {
        let result;
        try {
          result = this.render.call(this);
        } catch (e) {
          this._log_error(e, "render");
        }
        if (!this.constructor.light_dom && result) {
          try {
            render(h("shadow-root", {}, result), this.root_node, {
              host: this,
            });
          } catch (e) {
            this._log_error(e, "dom update");
          }
        }
      });
      try {
        this.onMounted?.();
        this.on_mounted?.();
      } catch (e) {
        this._log_error(e, "on mounted");
      }
    });
  }

  /**
   * @internal
   */
  disconnectedCallback() {
    this._rootEffectScope.run(() => {
      try {
        this.onUnmount?.();
        this.on_unmount?.();
      } catch (e) {
        this._log_error(e, "on unmount");
      }
    });
    this._rootEffectScope.stop();
  }

  /**
   * @protected
   * @param { Error } e - The error to log & throw in dev.
   * @param { string } method - The method that the error occurred in.
   */
  _log_error = (e, method) => {
    console.error("Error in", method, "of", this.constructor.name, e);
    if (IS_DEV) throw e;
  };

  /**
   * @protected
   */
  _construct_shadow_dom() {
    this.attachShadow({ mode: "open" });

    let raw_styles = this.constructor.styles;
    if (typeof raw_styles !== "string" && !Array.isArray(raw_styles)) {
      this._log_error(
        new Error("Static styles property must be a string or string array."),
        "constructor",
      );
      this.raw_styles = [""];
    }

    if (!Array.isArray(raw_styles)) {
      raw_styles = [raw_styles];
    }

    let sheets = raw_styles.map((x) => {
      let sheet = new CSSStyleSheet();
      sheet.replaceSync(x);
      return sheet;
    });

    this.shadowRoot.adoptedStyleSheets = sheets;

    if (
      this.constructor.useGlobalStyles ||
      this.constructor.use_global_styles
    ) {
      try {
        this.adoptedStyleSheets.push(...get_global_stylesheets());
      } catch (e) {
        this._log_error(e, "adding global stylesheets");
      }
    }

    this.root_node = document.createElement("shadow-root");
    this.shadowRoot.appendChild(this.root_node);
  }

  /**
   * @protected
   * @type { ReturnType<import("./reactive").effectScope> }
   */
  _rootEffectScope;

  /**
   * @protected
   * @type { Record<string, any> }
   */
  _reactive_states = reactive({});
}

/**
 * @type { import("./types").CSSFunction }
 */
let css = String.raw;

/**
 * @description Decorator to make a class accessor reactive.
 * @type { import("./types").StateDecorator }
 */
function state() {
  return function (_, { kind, name }) {
    if (kind === "accessor") {
      return {
        get() {
          return this._reactive_states[name];
        },
        set(val) {
          this._reactive_states[name] = val;
        },
        init(initialValue) {
          this._reactive_states ??= reactive({});
          this._reactive_states[name] = initialValue;
        },
      };
    } else {
      throw new Error(
        "Invalid decorator usage: @state only works on class accessors.",
      );
    }
  };
}

let default_attr_converter = (val) => val;

/**
 * @description Decorator to make a class accessor reactive.
 * @type { import("./types").AttributeDecorator }
 */
function attribute(overriddenName, options = {}) {
  return function (value, { kind, name, metadata }) {
    let attrName = overriddenName ?? name;
    let converter = options.converter ?? default_attr_converter;

    if (!observed_attrs.has(metadata)) observed_attrs.set(metadata, new Set());
    observed_attrs.get(metadata).add(attrName);

    if (kind === "accessor") {
      return {
        get() {
          return converter(this.observed_attributes[attrName]);
        },
        set(val) {
          this.observed_attributes[attrName] = val;
          this.setAttribute(attrName, String(val));
        },
        init(initialValue) {
          this.observed_attributes[attrName] = initialValue;
        },
      };
    } else if (kind === "getter") {
      return function () {
        let val = this.observed_attributes[attrName];
        return typeof val !== "undefined" ? converter(val) : value();
      };
    } else {
      throw new Error(
        "Invalid decorator usage: @attribute only works on class accessors and getters.",
      );
    }
  };
}
