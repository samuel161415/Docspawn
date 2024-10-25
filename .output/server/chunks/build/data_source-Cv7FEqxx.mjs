import { mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import DataSources from './data_sources-DxVhtQSS.mjs';
import List from './list-B62i-aLg.mjs';
import { _ as _export_sfc } from './entry-DIZlnTgU.mjs';
import './button.esm-DZ8732aK.mjs';
import './badge.esm-B18HZmxV.mjs';
import './basecomponent.esm-BXIz_qGt.mjs';
import './index.esm-DrnzwOyC.mjs';
import './baseicon.esm-M1QbWMtZ.mjs';
import './toast.esm-CMx4Jsjl.mjs';
import './portal.esm-BpMte8Bx.mjs';
import './index.esm-BdSn60vu.mjs';
import './index.esm-B17azDXp.mjs';
import './index.esm-BmUQPSGN.mjs';
import './index.esm-DcWdcyvj.mjs';
import './dialog.esm-C1lgYfkT.mjs';
import './datatable.esm--i0bte5q.mjs';
import './paginator.esm-BmndK6Pa.mjs';
import './index.esm-JN7AXSqt.mjs';
import './dropdown.esm-DfDe0_Pe.mjs';
import './index.esm-CSFmGINd.mjs';
import './index.esm-tXVwHB5O.mjs';
import './overlayeventbus.esm-DLM9jV-U.mjs';
import './virtualscroller.esm-DusQcf9C.mjs';
import './inputnumber.esm-BpAJDnaF.mjs';
import './index.esm-wYJr4edh.mjs';
import './index.esm-3jIRkePu.mjs';
import './inputtext.esm-DkseRpMQ.mjs';
import './index.esm-CWHnMl5b.mjs';
import './index.esm-zcxvsZZ_.mjs';
import './index.esm-BfnNz58z.mjs';
import './checkbox.esm-DILa8nEJ.mjs';
import './radiobutton.esm-Dv7vv5Y0.mjs';
import './index.esm-BoK_MMXp.mjs';
import './index.esm-Bzg_ZW-m.mjs';
import './column.esm-smoz5X4x.mjs';
import './selectbutton.esm-BiP62fH4.mjs';
import './fileupload.esm-CdT_XAWh.mjs';
import './message.esm-eENdjaWi.mjs';
import './progressbar.esm-zGZu3Eyu.mjs';
import 'exceljs';
import './newListData-SAE07HcH.mjs';
import './menu.esm-CzDtUfGx.mjs';
import './textarea.esm-D_y3xPJx.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
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

const _sfc_main = {
  __name: "data_source",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full h-full ml-4 bg-white overflow-scroll no-scrollbar" }, _attrs))} data-v-deb1796a><div class="md:px-8 md:py-8 rounded-lg" data-v-deb1796a><div id="lists" data-v-deb1796a>`);
      _push(ssrRenderComponent(List, null, null, _parent));
      _push(`</div><div id="databases" data-v-deb1796a>`);
      _push(ssrRenderComponent(unref(DataSources), null, null, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/settings/data_source.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const DataSource = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-deb1796a"]]);

export { DataSource as default };
//# sourceMappingURL=data_source-Cv7FEqxx.mjs.map
