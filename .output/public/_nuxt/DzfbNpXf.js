import { s as script$2 } from "./S6LrW6Rs.js";
import { S as BaseStyle, v as openBlock, x as createElementBlock, $ as renderSlot, Y as mergeProps } from "./DtVGkkp5.js";
import "./7DNHIx4r.js";
var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ["p-icon-field", {
      "p-icon-field-right": props.iconPosition === "right",
      "p-icon-field-left": props.iconPosition === "left"
    }];
  }
};
var IconFieldStyle = BaseStyle.extend({
  name: "iconfield",
  classes
});
var script$1 = {
  name: "BaseIconField",
  "extends": script$2,
  props: {
    iconPosition: {
      type: String,
      "default": "right"
    }
  },
  style: IconFieldStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};
var script = {
  name: "IconField",
  "extends": script$1,
  inheritAttrs: false
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx("root")
  }, _ctx.ptmi("root")), [renderSlot(_ctx.$slots, "default")], 16);
}
script.render = render;
export {
  script as default
};
