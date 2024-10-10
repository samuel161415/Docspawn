import { s as script$2 } from './basecomponent.esm-DJ-SXevi.mjs';
import { B as BaseStyle } from './entry-DBH90M8C.mjs';
import { openBlock, createElementBlock, mergeProps, createElementVNode, renderSlot } from 'vue';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import 'vue/server-renderer';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@fortawesome/fontawesome-svg-core';
import '@fortawesome/vue-fontawesome';
import '@fortawesome/free-solid-svg-icons';
import '@fortawesome/free-regular-svg-icons';
import '@fortawesome/free-brands-svg-icons';
import '@fortawesome/pro-duotone-svg-icons';
import '@fortawesome/pro-thin-svg-icons';
import '@fortawesome/pro-light-svg-icons';

var classes = {
  root: "p-toolbar p-component",
  start: "p-toolbar-group-start p-toolbar-group-left",
  center: "p-toolbar-group-center",
  end: "p-toolbar-group-end p-toolbar-group-right"
};
var ToolbarStyle = BaseStyle.extend({
  name: "toolbar",
  classes
});
var script$1 = {
  name: "BaseToolbar",
  "extends": script$2,
  props: {
    ariaLabelledby: {
      type: String,
      "default": null
    }
  },
  style: ToolbarStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};
var script = {
  name: "Toolbar",
  "extends": script$1,
  inheritAttrs: false
};
var _hoisted_1 = ["aria-labelledby"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx("root"),
    role: "toolbar",
    "aria-labelledby": _ctx.ariaLabelledby
  }, _ctx.ptmi("root")), [createElementVNode("div", mergeProps({
    "class": _ctx.cx("start")
  }, _ctx.ptm("start")), [renderSlot(_ctx.$slots, "start")], 16), createElementVNode("div", mergeProps({
    "class": _ctx.cx("center")
  }, _ctx.ptm("center")), [renderSlot(_ctx.$slots, "center")], 16), createElementVNode("div", mergeProps({
    "class": _ctx.cx("end")
  }, _ctx.ptm("end")), [renderSlot(_ctx.$slots, "end")], 16)], 16, _hoisted_1);
}
script.render = render;

export { script as default };
//# sourceMappingURL=toolbar.esm-XAnvRrzI.mjs.map
