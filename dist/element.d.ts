/**
 * @description A custom element base class with reactive state and attributes.
 * @extends { HTMLElement }
 */
export class Ivysaur extends HTMLElement {
    /**
     * @description The css for the element.
     * @type { string | string[] }
     */
    static styles: string | string[];
    /**
     * @description Whether to use global document styles.
     */
    static use_global_styles: boolean;
    static useGlobalStyles: boolean;
    /**
     * @description Whether to use light dom. This will disable component
     * styles and the render function should no longer return vnodes.
     */
    static light_dom: boolean;
    static set lightDom(val: boolean);
    /**
     * @description Whether to use light dom. This will disable component
     * styles and the render function should no longer return vnodes.
     */
    static get lightDom(): boolean;
    /**
     * @description Define this element in the custom elements registry. Must contain a '-'.
     * @param { string } name
     */
    static define_self(name: string): void;
    /**
     * @description Define this element in the custom elements registry. Must contain a '-'.
     * @param { string } name
     */
    static get defineSelf(): typeof Ivysaur.define_self;
    static get observedAttributes(): string[];
    /**
     * @description A reactive map of observed attributes.
     * @readonly
     * @type { Record<string, string> }
     */
    readonly observed_attributes: Record<string, string>;
    /**
     * @description A reactive map of observed attributes.
     * @type { Record<string, string> }
     */
    get observedAttributes(): Record<string, string>;
    /**
     * @internal
     * @param { string } name
     * @param { string } oldValue
     * @param { string } newValue
     * @returns { void }
     */
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    /**
     * @description Get an attribute from the element.
     * @type { (name: string) => string | null }
     */
    get_attribute: (name: string) => string | null;
    /**
     * @description Set an attribute on the element.
     * @type { (name: string, value: string) => void }
     */
    set_attribute: (name: string, value: string) => void;
    /**
     * @description Remove an attribute on the element.
     * @type { (name: string) => void }
     */
    remove_attribute: (name: string) => void;
    /**
      * @description Add an event listener to the element.
      * @type { (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => void }
    */
    add_event_listener: (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => void;
    /**
      * @description Remove an event listener from the element.
      * @type { (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => void }
    */
    remove_event_listener: (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => void;
    /**
     * @description Called when the element is added to the dom, before rendering.
     */
    on_mount(): void;
    /**
     * @description Called when the element is added to the dom, before rendering.
     */
    onMount(): void;
    /**
     * @description Called when the element is added to the dom, after rendering.
     */
    on_mounted(): void;
    /**
     * @description Called when the element is added to the dom, after rendering.
     */
    onMounted(): void;
    /**
     * @description Called when the element is removed from the dom.
     */
    on_unmount(): void;
    /**
     * @description Called when the element is removed from the dom.
     */
    onUnmount(): void;
    /**
     * @description The render method for the element. Must return a VNode from h() or compiled JSX.
     * @returns { import("./types").VNode }
     */
    render(): import("./types").VNode;
    /**
     * @internal
     */
    connectedCallback(): void;
    /**
     * @protected
     * @type { ReturnType<import("./reactive").effectScope> }
     */
    protected _rootEffectScope: ReturnType<typeof effectScope>;
    /**
     * @internal
     */
    disconnectedCallback(): void;
    /**
     * @protected
     * @param { Error } e - The error to log & throw in dev.
     * @param { string } method - The method that the error occurred in.
     */
    protected _log_error: (e: Error, method: string) => void;
    /**
     * @protected
     */
    protected _construct_shadow_dom(): void;
    raw_styles: string[];
    root_node: HTMLElement;
    /**
     * @protected
     * @type { Record<string, any> }
     */
    protected _reactive_states: Record<string, any>;
}
/**
 * @type { import("./types").CSSFunction }
 */
export let css: import("./types").CSSFunction;
export function state(): <This, T>(value: ClassAccessorDecoratorTarget<This, T>, context: ClassAccessorDecoratorContext<This, T>) => void;
export function attribute<T>(name: string, options?: {
    converter?: (val: string | null | undefined) => T;
}): <This, T_1>(value: ClassAccessorDecoratorTarget<This, T_1> | Function, context: ClassAccessorDecoratorContext<This, T_1> | ClassGetterDecoratorContext<This, T_1>) => void;
/**
 * @function set_dev
 * @description Set the runtime mode of ivysaur
 * @param { boolean } val
 */
export function set_dev(val: boolean): boolean;
/**
 * @description The runtime mode of ivysaur
 * @type { boolean }
 */
export let IS_DEV: boolean;
import { h } from "./renderer.js";
import { Fragment } from "./renderer.js";
import { render } from "./renderer.js";
import { effectScope } from "./reactive.js";
export { Ivysaur as ivysaur, set_dev as setDev, h, Fragment, render };
