import { s as script$2 } from './basecomponent.esm-DJ-SXevi.mjs';
import { B as BaseStyle } from './entry-DBH90M8C.mjs';
import { openBlock, createElementBlock, mergeProps } from 'vue';
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

var inlineStyles = {
  root: {
    position: "relative"
  }
};
var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ["p-skeleton p-component", {
      "p-skeleton-circle": props.shape === "circle",
      "p-skeleton-none": props.animation === "none"
    }];
  }
};
var SkeletonStyle = BaseStyle.extend({
  name: "skeleton",
  classes,
  inlineStyles
});
var script$1 = {
  name: "BaseSkeleton",
  "extends": script$2,
  props: {
    shape: {
      type: String,
      "default": "rectangle"
    },
    size: {
      type: String,
      "default": null
    },
    width: {
      type: String,
      "default": "100%"
    },
    height: {
      type: String,
      "default": "1rem"
    },
    borderRadius: {
      type: String,
      "default": null
    },
    animation: {
      type: String,
      "default": "wave"
    }
  },
  style: SkeletonStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};
var script = {
  name: "Skeleton",
  "extends": script$1,
  inheritAttrs: false,
  computed: {
    containerStyle: function containerStyle() {
      if (this.size)
        return {
          width: this.size,
          height: this.size,
          borderRadius: this.borderRadius
        };
      else
        return {
          width: this.width,
          height: this.height,
          borderRadius: this.borderRadius
        };
    }
  }
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx("root"),
    style: [_ctx.sx("root"), $options.containerStyle],
    "aria-hidden": "true"
  }, _ctx.ptmi("root")), null, 16);
}
script.render = render;

export { script as default };
//# sourceMappingURL=skeleton.esm-CeK9za9s.mjs.map
