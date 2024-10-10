import { s as script$2 } from "./S6LrW6Rs.js";
import { S as BaseStyle, v as openBlock, x as createElementBlock, $ as renderSlot, Y as mergeProps } from "./DtVGkkp5.js";
import "./7DNHIx4r.js";
var classes = {
  root: "p-float-label"
};
var FloatLabelStyle = BaseStyle.extend({
  name: "floatlabel",
  classes
});
var script$1 = {
  name: "BaseFloatLabel",
  "extends": script$2,
  props: {},
  style: FloatLabelStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};
var script = {
  name: "FloatLabel",
  "extends": script$1,
  inheritAttrs: false
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", mergeProps({
    "class": _ctx.cx("root")
  }, _ctx.ptmi("root")), [renderSlot(_ctx.$slots, "default")], 16);
}
script.render = render;
export {
  script as default
};
