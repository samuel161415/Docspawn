import { s as script$2 } from "./BWH3yJqN.js";
import { S as BaseStyle, v as openBlock, x as createElementBlock, $ as renderSlot, Y as mergeProps } from "./DyjNdRHt.js";
import "./BhN5mE98.js";
var classes = {
  root: "p-input-icon"
};
var InputIconStyle = BaseStyle.extend({
  name: "inputicon",
  classes
});
var script$1 = {
  name: "BaseInputIcon",
  "extends": script$2,
  style: InputIconStyle,
  props: {
    "class": null
  },
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};
var script = {
  name: "InputIcon",
  "extends": script$1,
  inheritAttrs: false,
  computed: {
    containerClass: function containerClass() {
      return [this.cx("root"), this["class"]];
    }
  }
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", mergeProps({
    "class": $options.containerClass
  }, _ctx.ptmi("root")), [renderSlot(_ctx.$slots, "default")], 16);
}
script.render = render;
export {
  script as default
};
