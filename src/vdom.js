
class VNode {

}

let render = (parent, vnodes, context) => {

}

let listener_delegate = function (e) { this._vev[e.type](e); }
let patch_props = (el, old_props, new_props) => {
  for (let key in old_props) {
    if (!new_props[key]) {
      el[key] = null;
      el.removeAttribute(key);
    }
  }
  for (let key in new_props) {
    if (old_props[key] !== new_props[key]) {
      if (key.startsWith("on")) {
        let host = render_context.host ?? el;
        if (
          !((el._vev ?? (el._vev = {}))[key.slice(2)]
            = (new_props[key]
              ? (e) => new_props[key].call(host, e)
              : undefined))) {
          el.removeEventListener(key.slice(2), listener_delegate);
        } else if (!old_props[key]) {
          el.addEventListener(key.slice(2), listener_delegate);
        }
      } else if (key in el) {
        el[key] = new_props[key];
      } else {
        el.setAttribute(key, new_props[key]);
      }
    }
  }
}
