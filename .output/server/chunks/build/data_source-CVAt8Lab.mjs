import { mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import DataSources from './data_sources-5vzFEDbU.mjs';
import List from './list-Dl_zO7rg.mjs';
import { _ as _export_sfc } from './entry-DBH90M8C.mjs';
import './button.esm-BlFBN1ui.mjs';
import './badge.esm-Bnez2rIR.mjs';
import './basecomponent.esm-DJ-SXevi.mjs';
import './index.esm-D7yS_zGd.mjs';
import './baseicon.esm-LCQp0m0v.mjs';
import './toast.esm-CIoHYv1e.mjs';
import './portal.esm-CwYTLDh2.mjs';
import './index.esm-BukADsu2.mjs';
import './index.esm-C8_e7SKq.mjs';
import './index.esm-BlHpSerz.mjs';
import './index.esm-BFJ_AWga.mjs';
import './dialog.esm-B4HW-uBS.mjs';
import './datatable.esm-DnGa6XyQ.mjs';
import './paginator.esm-CI19EOG3.mjs';
import './index.esm-BNUnK1DV.mjs';
import './dropdown.esm-CV7WA6-d.mjs';
import './index.esm-D02uV6Ns.mjs';
import './index.esm-CLpr6gqq.mjs';
import './overlayeventbus.esm-CLzuT4eL.mjs';
import './virtualscroller.esm-nKgjdA3j.mjs';
import './inputnumber.esm-DK8IcHMc.mjs';
import './index.esm-DvIoF1TM.mjs';
import './index.esm-CNDVtCk9.mjs';
import './inputtext.esm-WVvhv2iX.mjs';
import './index.esm-IcxfhKML.mjs';
import './index.esm-B0iceWDE.mjs';
import './index.esm-CjJI1mst.mjs';
import './checkbox.esm-C6yPu7v1.mjs';
import './radiobutton.esm-BeBAOoEC.mjs';
import './index.esm-CxGdmqml.mjs';
import './index.esm-BpnZtF_F.mjs';
import './column.esm-IdVfKx_m.mjs';
import './selectbutton.esm-zIP72uf2.mjs';
import './fileupload.esm-CAV9DtQK.mjs';
import './message.esm-Q8FElxM1.mjs';
import './progressbar.esm-DYYdgqN9.mjs';
import 'exceljs';
import './newListData-BgpZSL0D.mjs';
import './textarea.esm-6g4qiBVq.mjs';
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full h-full ml-4 bg-white overflow-scroll no-scrollbar" }, _attrs))} data-v-f4ed56fa><div class="px-8 py-8 rounded-lg" data-v-f4ed56fa><div id="lists" data-v-f4ed56fa>`);
      _push(ssrRenderComponent(List, null, null, _parent));
      _push(`</div><div id="databases" data-v-f4ed56fa>`);
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
const DataSource = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f4ed56fa"]]);

export { DataSource as default };
//# sourceMappingURL=data_source-CVAt8Lab.mjs.map
