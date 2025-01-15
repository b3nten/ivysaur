export { h, Fragment, render }

const SSR_NODE = 1,
  TEXT_NODE = 3,
  EMPTY_OBJ = {},
  EMPTY_ARR = [],
  SVG_NS = "http://www.w3.org/2000/svg";

let event_delegate = function (event) {
  this._vevents[event.type](event);
};

let get_key = (vdom) => (vdom == null ? vdom : vdom.key);

let patch_property = (node, key, oldValue, newValue, isSvg) => {
  if (key === "key") {
  } else if (key[0] === "o" && key[1] === "n") {
    (key = key.toLowerCase().slice(2)), (node._vevents ??= {});
    if (!newValue && oldValue) node.removeEventListener(key, event_delegate);
    if (!oldValue && newValue) node.addEventListener(key, event_delegate);
    if (oldValue !== newValue) {
      node._vevents[key] = newValue
        ? (e) => newValue.call(render_ctx.host ?? node, e)
        : null;
    }
  } else if (key === "ref") {
    if(typeof newValue === "function") {
      if(!oldValue) node._vcleanup = newValue(node);
    } else {
      newValue.current = newValue.value = node;
    }
  } else if (key.startsWith("attr:")) {
    node.setAttribute(key.slice(5), newValue);
  } else if (key.startsWith("prop:")) {
    node[key.slice(5)] = newValue;
  } else if (!isSvg && key !== "list" && key !== "form" && key in node) {
    node[key] = newValue == null ? "" : newValue;
  } else if (newValue == null || newValue === false) {
    node.removeAttribute(key);
  } else {
    node.setAttribute(key, newValue);
  }
};

let create_node = (vdom, isSvg) => {
  var props = vdom.props,
    node =
      vdom.type === TEXT_NODE
        ? document.createTextNode(vdom.tag)
        : (isSvg = isSvg || vdom.tag === "svg")
          ? document.createElementNS(SVG_NS, vdom.tag, { is: props.is })
          : document.createElement(vdom.tag, { is: props.is });

  for (var k in props) {
    patch_property(node, k, null, props[k], isSvg);
  }

  if (props.dangerouslySetInnerHTML) {
    node.innerHTML = props.dangerouslySetInnerHTML.__html;
    return (vdom.node = node);
  }

  for (var i = 0; i < vdom.children.length; i++) {
    node.appendChild(
      create_node((vdom.children[i] = vdomify(vdom.children[i])), isSvg),
    );
  }

  return (vdom.node = node);
};

let patch_node = (parent, node, oldVNode, newVNode, isSvg) => {
  if (oldVNode === newVNode) {
  } else if (
    oldVNode != null &&
    oldVNode.type === TEXT_NODE &&
    newVNode.type === TEXT_NODE
  ) {
    if (oldVNode.tag !== newVNode.tag) node.nodeValue = newVNode.tag;
  } else if (oldVNode == null || oldVNode.tag !== newVNode.tag) {
    node = parent.insertBefore(
      create_node((newVNode = vdomify(newVNode)), isSvg),
      node,
    );
    if (oldVNode != null) {
      parent.removeChild(oldVNode.node);
    }
  } else {
    var tmpVKid,
      oldVKid,
      oldKey,
      newKey,
      oldProps = oldVNode.props,
      newProps = newVNode.props,
      oldVKids = oldVNode.children,
      newVKids = newVNode.children,
      oldHead = 0,
      newHead = 0,
      oldTail = oldVKids.length - 1,
      newTail = newVKids.length - 1;

    isSvg = isSvg || newVNode.tag === "svg";

    for (var i in { ...oldProps, ...newProps }) {
      if (
        (i === "value" || i === "selected" || i === "checked"
          ? node[i]
          : oldProps[i]) !== newProps[i]
      ) {
        patch_property(node, i, oldProps[i], newProps[i], isSvg);
      }
    }

    if (newVNode.props?.dangerouslySetInnerHTML) {
      node.innerHTML = newVNode.props.dangerouslySetInnerHTML.__html;
      return (newVNode.node = node);
    }

    while (newHead <= newTail && oldHead <= oldTail) {
      if (
        (oldKey = get_key(oldVKids[oldHead])) == null ||
        oldKey !== get_key(newVKids[newHead])
      ) {
        break;
      }

      patch_node(
        node,
        oldVKids[oldHead].node,
        oldVKids[oldHead++],
        (newVKids[newHead] = vdomify(newVKids[newHead++])),
        isSvg,
      );
    }

    while (newHead <= newTail && oldHead <= oldTail) {
      if (
        (oldKey = get_key(oldVKids[oldTail])) == null ||
        oldKey !== get_key(newVKids[newTail])
      ) {
        break;
      }

      patch_node(
        node,
        oldVKids[oldTail].node,
        oldVKids[oldTail--],
        (newVKids[newTail] = vdomify(newVKids[newTail--])),
        isSvg,
      );
    }

    if (oldHead > oldTail) {
      while (newHead <= newTail) {
        node.insertBefore(
          create_node((newVKids[newHead] = vdomify(newVKids[newHead++])), isSvg),
          (oldVKid = oldVKids[oldHead]) && oldVKid.node,
        );
      }
    } else if (newHead > newTail) {
      while (oldHead <= oldTail) {
        node.removeChild(oldVKids[oldHead++].node);
      }
    } else {
      for (var keyed = {}, newKeyed = {}, i = oldHead; i <= oldTail; i++) {
        if ((oldKey = oldVKids[i].key) != null) {
          keyed[oldKey] = oldVKids[i];
        }
      }

      while (newHead <= newTail) {
        oldKey = get_key((oldVKid = oldVKids[oldHead]));
        newKey = get_key((newVKids[newHead] = vdomify(newVKids[newHead])));

        if (
          newKeyed[oldKey] ||
          (newKey != null && newKey === get_key(oldVKids[oldHead + 1]))
        ) {
          if (oldKey == null) {
            node.removeChild(oldVKid.node);
          }
          oldHead++;
          continue;
        }

        if (newKey == null || oldVNode.type === SSR_NODE) {
          if (oldKey == null) {
            patch_node(
              node,
              oldVKid && oldVKid.node,
              oldVKid,
              newVKids[newHead],
              isSvg,
            );
            newHead++;
          }
          oldHead++;
        } else {
          if (oldKey === newKey) {
            patch_node(node, oldVKid.node, oldVKid, newVKids[newHead], isSvg);
            newKeyed[newKey] = true;
            oldHead++;
          } else {
            if ((tmpVKid = keyed[newKey]) != null) {
              patch_node(
                node,
                node.insertBefore(tmpVKid.node, oldVKid && oldVKid.node),
                tmpVKid,
                newVKids[newHead],
                isSvg,
              );
              newKeyed[newKey] = true;
            } else {
              patch_node(
                node,
                oldVKid && oldVKid.node,
                null,
                newVKids[newHead],
                isSvg,
              );
            }
          }
          newHead++;
        }
      }

      while (oldHead <= oldTail) {
        if (get_key((oldVKid = oldVKids[oldHead++])) == null) {
          node.removeChild(oldVKid.node);
        }
      }

      for (var i in keyed) {
        if (newKeyed[i] == null) {
          node.removeChild(keyed[i].node);
        }
      }
    }
  }

  return (newVNode.node = node);
};

let vdomify = (newVNode) =>
  newVNode !== true && newVNode !== false && newVNode ? newVNode : text("");

let recycle_node = (node) =>
  node.nodeType === TEXT_NODE
    ? text(node.nodeValue, node)
    : create_vnode(
        node.nodeName.toLowerCase(),
        EMPTY_OBJ,
        EMPTY_ARR.map.call(node.childNodes, recycle_node),
        SSR_NODE,
        node,
      );

let create_vnode = (tag, props, children, type, node) => ({
  tag,
  props,
  key: props.key,
  children,
  type,
  node,
});

let create_element = (tag, props, children = EMPTY_ARR) =>
  create_vnode(tag, props, Array.isArray(children) ? children : [children]);

/**
* @type { import("./types.js").TextFunction }
*/
let text = (value, node) =>
  create_vnode(value, EMPTY_OBJ, EMPTY_ARR, TEXT_NODE, node);

/**
* @type { import("./types.js").Fragment }
*/
let Fragment = (_, children) => children.flat();

/**
* @type { import("./types.js").HFunction }
*/
let h = (type, props, ...children) =>
  typeof type === "function"
    ? type(props, children)
    : create_element(
        type,
        props || {},
        children.flatMap((any) =>
          typeof any === "string" || typeof any === "number" ? text(any) : any,
        ),
      );

let render_ctx = EMPTY_OBJ;

/**
* @type { import("./types.js").RenderFunction }
*/
let render = (vdom, node, ctx = {}) => (
  (render.ctx = ctx),
  ((node = patch_node(
    node.parentNode,
    node,
    node.vdom || recycle_node(node),
    vdom,
  )).vdom = vdom),
  (render.ctx = EMPTY_OBJ),
  node
);
