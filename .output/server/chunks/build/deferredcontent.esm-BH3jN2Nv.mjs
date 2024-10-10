import { s as script$1 } from './basecomponent.esm-DJ-SXevi.mjs';
import { openBlock, createElementBlock, mergeProps, renderSlot, createCommentVNode } from 'vue';
import './entry-DBH90M8C.mjs';
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

var DeferredContentStyle = {};
var script = {
  name: "DeferredContent",
  "extends": script$1,
  inheritAttrs: false,
  emits: ["load"],
  style: DeferredContentStyle,
  data: function data() {
    return {
      loaded: false
    };
  },
  mounted: function mounted() {
    if (!this.loaded) {
      if (this.shouldLoad())
        this.load();
      else
        this.bindScrollListener();
    }
  },
  beforeUnmount: function beforeUnmount() {
    this.unbindScrollListener();
  },
  methods: {
    bindScrollListener: function bindScrollListener() {
      var _this = this;
      this.documentScrollListener = function() {
        if (_this.shouldLoad()) {
          _this.load();
          _this.unbindScrollListener();
        }
      };
      (void 0).addEventListener("scroll", this.documentScrollListener);
    },
    unbindScrollListener: function unbindScrollListener() {
      if (this.documentScrollListener) {
        (void 0).removeEventListener("scroll", this.documentScrollListener);
        this.documentScrollListener = null;
      }
    },
    shouldLoad: function shouldLoad() {
      if (this.loaded) {
        return false;
      } else {
        var rect = this.$refs.container.getBoundingClientRect();
        var docElement = (void 0).documentElement;
        var winHeight = docElement.clientHeight;
        return winHeight >= rect.top;
      }
    },
    load: function load(event) {
      this.loaded = true;
      this.$emit("load", event);
    }
  }
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    ref: "container"
  }, _ctx.ptmi("root")), [$data.loaded ? renderSlot(_ctx.$slots, "default", {
    key: 0
  }) : createCommentVNode("", true)], 16);
}
script.render = render;

export { script as default };
//# sourceMappingURL=deferredcontent.esm-BH3jN2Nv.mjs.map
