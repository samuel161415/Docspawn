import { s as script$2 } from "./BWH3yJqN.js";
import { $ as renderSlot } from "./DyjNdRHt.js";
import "./BhN5mE98.js";
var StepperPanelStyle = {};
var script$1 = {
  name: "BaseStepperPanel",
  "extends": script$2,
  props: {
    header: null
  },
  style: StepperPanelStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};
var script = {
  name: "StepperPanel",
  "extends": script$1
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return renderSlot(_ctx.$slots, "default");
}
script.render = render;
export {
  script as default
};
