import { s as script$2 } from './basecomponent.esm-DJ-SXevi.mjs';
import { B as BaseStyle } from './entry-DBH90M8C.mjs';
import { openBlock, createElementBlock, mergeProps, renderSlot } from 'vue';
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
  root: "p-inputgroup-addon"
};
var InputGroupAddonStyle = BaseStyle.extend({
  name: "inputgroupaddon",
  classes
});
var script$1 = {
  name: "BaseInputGroupAddon",
  "extends": script$2,
  style: InputGroupAddonStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};
var script = {
  name: "InputGroupAddon",
  "extends": script$1,
  inheritAttrs: false
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx("root")
  }, _ctx.ptmi("root")), [renderSlot(_ctx.$slots, "default")], 16);
}
script.render = render;

export { script as default };
//# sourceMappingURL=inputgroupaddon.esm-DZW2IopQ.mjs.map
