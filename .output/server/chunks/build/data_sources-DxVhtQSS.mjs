import script$1 from './button.esm-DZ8732aK.mjs';
import script$2 from './toast.esm-CMx4Jsjl.mjs';
import script$3 from './dialog.esm-C1lgYfkT.mjs';
import { _ as _export_sfc, f as useToast, F as FilterMatchMode, g as FilterOperator, s as showError } from './entry-DIZlnTgU.mjs';
import { ref, useSSRContext, computed, watch, mergeProps, unref, withCtx, createVNode, createTextVNode, resolveComponent, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, withModifiers } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import script$4 from './datatable.esm--i0bte5q.mjs';
import script$5 from './inputtext.esm-DkseRpMQ.mjs';
import script$6 from './column.esm-smoz5X4x.mjs';
import script$7 from './dropdown.esm-DfDe0_Pe.mjs';
import script$8 from './inputnumber.esm-BpAJDnaF.mjs';
import script$9 from './selectbutton.esm-BiP62fH4.mjs';
import script from './fileupload.esm-CdT_XAWh.mjs';
import ExcelJS from 'exceljs';
import { a as addNewListItem, _ as _sfc_main$3 } from './newListData-SAE07HcH.mjs';
import './badge.esm-B18HZmxV.mjs';
import './basecomponent.esm-BXIz_qGt.mjs';
import './index.esm-DrnzwOyC.mjs';
import './baseicon.esm-M1QbWMtZ.mjs';
import './portal.esm-BpMte8Bx.mjs';
import './index.esm-BdSn60vu.mjs';
import './index.esm-B17azDXp.mjs';
import './index.esm-BmUQPSGN.mjs';
import './index.esm-DcWdcyvj.mjs';
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
import './paginator.esm-BmndK6Pa.mjs';
import './index.esm-JN7AXSqt.mjs';
import './index.esm-CWHnMl5b.mjs';
import './virtualscroller.esm-DusQcf9C.mjs';
import './index.esm-CSFmGINd.mjs';
import './index.esm-zcxvsZZ_.mjs';
import './index.esm-BfnNz58z.mjs';
import './overlayeventbus.esm-DLM9jV-U.mjs';
import './checkbox.esm-DILa8nEJ.mjs';
import './radiobutton.esm-Dv7vv5Y0.mjs';
import './index.esm-BoK_MMXp.mjs';
import './index.esm-Bzg_ZW-m.mjs';
import './index.esm-tXVwHB5O.mjs';
import './index.esm-wYJr4edh.mjs';
import './index.esm-3jIRkePu.mjs';
import './message.esm-eENdjaWi.mjs';
import './progressbar.esm-zGZu3Eyu.mjs';

const _sfc_main$2 = {
  __name: "Table",
  __ssrInlineRender: true,
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    filters: Object
  },
  emits: ["rowReorder", "editItem", "openDelete"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const filters = ref(props.filters);
    const expandedRows = ref({});
    const loadingRows = ref({});
    const toast = useToast();
    function onRowReorder(event) {
      emit("rowReorder", event.value);
    }
    function handleEditItem(data) {
      emit("editItem", data);
    }
    function handleOpenDelete(data) {
      emit("openDelete", data);
    }
    const onRowExpand = (event) => {
      loadingRows.value[event.data.index] = true;
      setTimeout(() => {
        loadingRows.value[event.data.index] = false;
        toast.add({
          severity: "info",
          summary: "Row Expanded",
          detail: event.data.name,
          life: 3e3
        });
      }, 1e3);
    };
    const onRowCollapse = (event) => {
      toast.add({
        severity: "success",
        summary: "Row Collapsed",
        detail: event.data.name,
        life: 3e3
      });
    };
    const expandAll = () => {
      expandedRows.value = props.tableData.reduce((acc, item) => {
        acc[item.index] = true;
        return acc;
      }, {});
    };
    const collapseAll = () => {
      expandedRows.value = {};
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_DataTable = script$4;
      const _component_InputText = script$5;
      const _component_Button = script$1;
      const _component_Column = script$6;
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      if (__props.tableData && __props.tableData.length) {
        _push(`<div${ssrRenderAttrs(_attrs)} data-v-48a1105b>`);
        _push(ssrRenderComponent(_component_DataTable, {
          filters: filters.value,
          "onUpdate:filters": ($event) => filters.value = $event,
          expandedRows: expandedRows.value,
          "onUpdate:expandedRows": ($event) => expandedRows.value = $event,
          "striped-rows": "",
          "show-gridlines": "",
          value: __props.tableData,
          paginator: ((_a = __props.tableData) == null ? void 0 : _a.length) > 0 ? true : false,
          rows: 6,
          "row-reorder": true,
          "global-filter-fields": ["name"],
          "table-style": "min-width: 50rem; border-radius:20%;border:none;",
          class: "max-w-[100vw] rounded-md p-datatable-header p-datatable-wrapper border-none",
          onRowReorder,
          onRowExpand,
          onRowCollapse,
          dataKey: "index"
        }, {
          empty: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<p class="flex text-center" data-v-48a1105b${_scopeId}>No data</p>`);
            } else {
              return [
                createVNode("p", { class: "flex text-center" }, "No data")
              ];
            }
          }),
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex flex-row" data-v-48a1105b${_scopeId}><div class="mr-auto" data-v-48a1105b${_scopeId}><span class="relative flex" data-v-48a1105b${_scopeId}><i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600 text-gray-400" style="${ssrRenderStyle({ "color": "rgb(117, 119, 120)" })}" data-v-48a1105b${_scopeId}></i>`);
              _push2(ssrRenderComponent(_component_InputText, {
                modelValue: filters.value.global.value,
                "onUpdate:modelValue": ($event) => filters.value.global.value = $event,
                placeholder: "Keyword search",
                class: "pl-10 font-normal rounded-xl"
              }, null, _parent2, _scopeId));
              _push2(`</span></div><div class="flex flex-wrap justify-end gap-2" data-v-48a1105b${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Button, {
                text: "",
                icon: "pi pi-plus",
                label: "Expand All",
                onClick: expandAll
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_Button, {
                text: "",
                icon: "pi pi-minus",
                label: "Collapse All",
                onClick: collapseAll
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              return [
                createVNode("div", { class: "flex flex-row" }, [
                  createVNode("div", { class: "mr-auto" }, [
                    createVNode("span", { class: "relative flex" }, [
                      createVNode("i", {
                        class: "pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600 text-gray-400",
                        style: { "color": "rgb(117, 119, 120)" }
                      }),
                      createVNode(_component_InputText, {
                        modelValue: filters.value.global.value,
                        "onUpdate:modelValue": ($event) => filters.value.global.value = $event,
                        placeholder: "Keyword search",
                        class: "pl-10 font-normal rounded-xl"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ]),
                  createVNode("div", { class: "flex flex-wrap justify-end gap-2" }, [
                    createVNode(_component_Button, {
                      text: "",
                      icon: "pi pi-plus",
                      label: "Expand All",
                      onClick: expandAll
                    }),
                    createVNode(_component_Button, {
                      text: "",
                      icon: "pi pi-minus",
                      label: "Collapse All",
                      onClick: collapseAll
                    })
                  ])
                ])
              ];
            }
          }),
          expansion: withCtx(({ data }, _push2, _parent2, _scopeId) => {
            var _a2, _b;
            if (_push2) {
              _push2(`<div class="p-4 max-w-[90vw]" data-v-48a1105b${_scopeId}><h5 class="font-semibold" data-v-48a1105b${_scopeId}> Data for ${ssrInterpolate(data.name.replace(/\.[^/.]+$/, ""))} `);
              if ((_a2 = data.subtitles) == null ? void 0 : _a2.length) {
                _push2(`<span class="text-sm font-normal" data-v-48a1105b${_scopeId}> (${ssrInterpolate(data.subtitles.length)} subtitle${ssrInterpolate(data.subtitles.length > 1 ? "s" : "")}) </span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</h5><div class="expanded-table-container" data-v-48a1105b${_scopeId}>`);
              if (loadingRows.value[data.index]) {
                _push2(`<div class="p-2 w-full flex justify-center" data-v-48a1105b${_scopeId}><i class="pi pi-spin pi-spinner" style="${ssrRenderStyle({ "font-size": "2rem" })}" data-v-48a1105b${_scopeId}></i></div>`);
              } else {
                _push2(`<div data-v-48a1105b${_scopeId}>`);
                _push2(ssrRenderComponent(_component_DataTable, {
                  value: data.completeData,
                  scrollable: "",
                  scrollHeight: "500px"
                }, {
                  default: withCtx((_, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_Column, {
                        field: "auto_index_by_docspawn",
                        header: "Index",
                        sortable: ""
                      }, null, _parent3, _scopeId2));
                      _push3(`<!--[-->`);
                      ssrRenderList(data.columnNames, (col) => {
                        _push3(ssrRenderComponent(_component_Column, {
                          key: col,
                          field: col,
                          header: col,
                          sortable: ""
                        }, null, _parent3, _scopeId2));
                      });
                      _push3(`<!--]-->`);
                    } else {
                      return [
                        createVNode(_component_Column, {
                          field: "auto_index_by_docspawn",
                          header: "Index",
                          sortable: ""
                        }),
                        (openBlock(true), createBlock(Fragment, null, renderList(data.columnNames, (col) => {
                          return openBlock(), createBlock(_component_Column, {
                            key: col,
                            field: col,
                            header: col,
                            sortable: ""
                          }, null, 8, ["field", "header"]);
                        }), 128))
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div>`);
              }
              _push2(`</div></div>`);
            } else {
              return [
                createVNode("div", { class: "p-4 max-w-[90vw]" }, [
                  createVNode("h5", { class: "font-semibold" }, [
                    createTextVNode(" Data for " + toDisplayString(data.name.replace(/\.[^/.]+$/, "")) + " ", 1),
                    ((_b = data.subtitles) == null ? void 0 : _b.length) ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "text-sm font-normal"
                    }, " (" + toDisplayString(data.subtitles.length) + " subtitle" + toDisplayString(data.subtitles.length > 1 ? "s" : "") + ") ", 1)) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "expanded-table-container" }, [
                    loadingRows.value[data.index] ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "p-2 w-full flex justify-center"
                    }, [
                      createVNode("i", {
                        class: "pi pi-spin pi-spinner",
                        style: { "font-size": "2rem" }
                      })
                    ])) : (openBlock(), createBlock("div", { key: 1 }, [
                      createVNode(_component_DataTable, {
                        value: data.completeData,
                        scrollable: "",
                        scrollHeight: "500px"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_Column, {
                            field: "auto_index_by_docspawn",
                            header: "Index",
                            sortable: ""
                          }),
                          (openBlock(true), createBlock(Fragment, null, renderList(data.columnNames, (col) => {
                            return openBlock(), createBlock(_component_Column, {
                              key: col,
                              field: col,
                              header: col,
                              sortable: ""
                            }, null, 8, ["field", "header"]);
                          }), 128))
                        ]),
                        _: 2
                      }, 1032, ["value"])
                    ]))
                  ])
                ])
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Column, {
                expander: "",
                style: { "width": "5rem" }
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_Column, {
                field: "index",
                "body-style": { margin: "0rem", padding: "0rem" },
                "row-reorder": "",
                style: { "width": "3%" }
              }, {
                rowreordericon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<i class="pi pi-ellipsis-v cursor-move p-8" data-pc-section="rowreordericon" data-v-48a1105b${_scopeId2}></i>`);
                  } else {
                    return [
                      createVNode("i", {
                        class: "pi pi-ellipsis-v cursor-move p-8",
                        "data-pc-section": "rowreordericon"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_Column, {
                field: "type",
                header: "Type",
                "header-style": { height: "4.5rem" }
              }, {
                body: withCtx(({ data, field }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex items-center space-x-4" data-v-48a1105b${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_font_awesome_icon, {
                      icon: ["fat", "list-tree"],
                      style: { "color": "#00000000" }
                    }, null, _parent3, _scopeId2));
                    _push3(`<p class="font-poppins" data-v-48a1105b${_scopeId2}>${ssrInterpolate(data[field])}</p></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex items-center space-x-4" }, [
                        createVNode(_component_font_awesome_icon, {
                          icon: ["fat", "list-tree"],
                          style: { "color": "#00000000" }
                        }),
                        createVNode("p", { class: "font-poppins" }, toDisplayString(data[field]), 1)
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_Column, {
                field: "name",
                header: "Name",
                "header-style": { height: "4.5rem" }
              }, {
                body: withCtx(({ data, field }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex items-center space-x-4" data-v-48a1105b${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_font_awesome_icon, {
                      icon: ["fat", "list-tree"],
                      style: { "color": "#00000000" }
                    }, null, _parent3, _scopeId2));
                    _push3(`<p class="font-poppins" data-v-48a1105b${_scopeId2}>${ssrInterpolate(data[field])}</p></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex items-center space-x-4" }, [
                        createVNode(_component_font_awesome_icon, {
                          icon: ["fat", "list-tree"],
                          style: { "color": "#00000000" }
                        }),
                        createVNode("p", { class: "font-poppins" }, toDisplayString(data[field]), 1)
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_Column, {
                header: "Actions",
                icon: "pi pi-trash",
                "header-style": "text-center",
                style: { "width": "10%" }
              }, {
                body: withCtx(({ data }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex gap-4" data-v-48a1105b${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_Button, {
                      class: "w-max px-4",
                      severity: "success",
                      onClick: ($event) => handleEditItem(data)
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Edit `);
                        } else {
                          return [
                            createTextVNode(" Edit ")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Button, {
                      outlined: "",
                      class: "w-max px-4",
                      severity: "danger",
                      onClick: ($event) => handleOpenDelete(data)
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Delete `);
                        } else {
                          return [
                            createTextVNode(" Delete ")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex gap-4" }, [
                        createVNode(_component_Button, {
                          class: "w-max px-4",
                          severity: "success",
                          onClick: ($event) => handleEditItem(data)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Edit ")
                          ]),
                          _: 2
                        }, 1032, ["onClick"]),
                        createVNode(_component_Button, {
                          outlined: "",
                          class: "w-max px-4",
                          severity: "danger",
                          onClick: ($event) => handleOpenDelete(data)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Delete ")
                          ]),
                          _: 2
                        }, 1032, ["onClick"])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Column, {
                  expander: "",
                  style: { "width": "5rem" }
                }),
                createVNode(_component_Column, {
                  field: "index",
                  "body-style": { margin: "0rem", padding: "0rem" },
                  "row-reorder": "",
                  style: { "width": "3%" }
                }, {
                  rowreordericon: withCtx(() => [
                    createVNode("i", {
                      class: "pi pi-ellipsis-v cursor-move p-8",
                      "data-pc-section": "rowreordericon"
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_Column, {
                  field: "type",
                  header: "Type",
                  "header-style": { height: "4.5rem" }
                }, {
                  body: withCtx(({ data, field }) => [
                    createVNode("div", { class: "flex items-center space-x-4" }, [
                      createVNode(_component_font_awesome_icon, {
                        icon: ["fat", "list-tree"],
                        style: { "color": "#00000000" }
                      }),
                      createVNode("p", { class: "font-poppins" }, toDisplayString(data[field]), 1)
                    ])
                  ]),
                  _: 1
                }),
                createVNode(_component_Column, {
                  field: "name",
                  header: "Name",
                  "header-style": { height: "4.5rem" }
                }, {
                  body: withCtx(({ data, field }) => [
                    createVNode("div", { class: "flex items-center space-x-4" }, [
                      createVNode(_component_font_awesome_icon, {
                        icon: ["fat", "list-tree"],
                        style: { "color": "#00000000" }
                      }),
                      createVNode("p", { class: "font-poppins" }, toDisplayString(data[field]), 1)
                    ])
                  ]),
                  _: 1
                }),
                createVNode(_component_Column, {
                  header: "Actions",
                  icon: "pi pi-trash",
                  "header-style": "text-center",
                  style: { "width": "10%" }
                }, {
                  body: withCtx(({ data }) => [
                    createVNode("div", { class: "flex gap-4" }, [
                      createVNode(_component_Button, {
                        class: "w-max px-4",
                        severity: "success",
                        onClick: ($event) => handleEditItem(data)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Edit ")
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      createVNode(_component_Button, {
                        outlined: "",
                        class: "w-max px-4",
                        severity: "danger",
                        onClick: ($event) => handleOpenDelete(data)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Delete ")
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div${ssrRenderAttrs(_attrs)} data-v-48a1105b><p class="flex text-center" data-v-48a1105b>No data available</p></div>`);
      }
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/settings/data_source/Table.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const DataTableComponent = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-48a1105b"]]);
const _sfc_main$1 = {
  __name: "CreateListModal",
  __ssrInlineRender: true,
  props: ["editableItem"],
  emits: ["cancel", "createDataSource", "updateDataSource", "removeEditable"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const toast = useToast();
    const lookupColumn = ref(null);
    const dataStartLine = ref(1);
    const fileName = ref();
    const tableViewType = ref("Editable View");
    const tableViewOptions = ref(["Editable View", "Final View"]);
    const fileupload = ref();
    const selectedFiles = ref([]);
    const hasError = ref(false);
    const fileErrorText = ref("");
    const dataSourceFileCompleteJSON = ref([]);
    const dataSourceColumnNames = ref([]);
    const dataSourceSelectedColumns = ref([]);
    const dataSourceSelectedRows = ref([]);
    const isEditable = ref(false);
    const editIndex = ref();
    const validFileTypes = [".csv", ".xlsx"];
    function isValidFileType(file) {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      return validFileTypes.includes(`.${fileExtension}`);
    }
    function onFileSelect(event) {
      const files = event.files;
      if (files.length > 1) {
        toast.add({ severity: "error", summary: "Error", detail: "Only one file allowed", life: 3e3 });
        fileErrorText.value = "Only one file is allowed";
        hasError.value = true;
        setTimeout(() => {
          hasError.value = false;
        }, 3e3);
        return;
      }
      const invalidFiles = files.filter((file) => !isValidFileType(file));
      if (invalidFiles.length > 0) {
        toast.add({ severity: "error", summary: "Error", detail: "Only CSV or XLSX files are allowed", life: 3e3 });
        fileErrorText.value = "Only CSV or XLSX files are allowed";
        hasError.value = true;
        setTimeout(() => {
          hasError.value = false;
        }, 3e3);
        return;
      }
      selectedFiles.value = files;
    }
    function handleDrop(event) {
      const files = Array.from(event.dataTransfer.files);
      if (files.length > 1) {
        toast.add({ severity: "error", summary: "Error", detail: "Only one file allowed", life: 3e3 });
        fileErrorText.value = "Only one file is allowed";
        hasError.value = true;
        setTimeout(() => {
          hasError.value = false;
        }, 3e3);
        return;
      }
      const invalidFiles = files.filter((file) => !isValidFileType(file));
      if (invalidFiles.length > 0) {
        toast.add({ severity: "error", summary: "Error", detail: "Only CSV or XLSX files are allowed", life: 3e3 });
        hasError.value = true;
        setTimeout(() => {
          hasError.value = false;
        }, 3e3);
        return;
      }
      selectedFiles.value = files;
    }
    function triggerFileInput() {
      fileupload.value.choose();
    }
    function removeFiles() {
      selectedFiles.value = [];
    }
    function handleDragEnter() {
      hasError.value = false;
    }
    function handleDragLeave() {
      hasError.value = false;
    }
    function isObjectEmpty(obj) {
      for (const key in obj) {
        if (obj[key] !== "")
          return false;
      }
      return true;
    }
    async function processFiles(data, fileType, file) {
      fileName.value = (file == null ? void 0 : file.name) ? file == null ? void 0 : file.name : (file == null ? void 0 : file.fileName) ? file == null ? void 0 : file.fileName : " ";
      if (data && fileType) {
        if (fileType === "csv") {
          const Papa = await import('papaparse');
          const csvText = new TextDecoder().decode(data);
          Papa.parse(csvText, {
            complete: (results) => {
              const parsedData = results.data;
              const filteredData = parsedData.filter(
                (entry) => !isObjectEmpty(entry)
              );
              dataSourceFileCompleteJSON.value = filteredData == null ? void 0 : filteredData.map((f, i) => {
                return { ...f, auto_index_by_docspawn: i + 1 };
              });
            },
            header: true
          });
        } else if (["xls", "xlsx"].includes(fileType)) {
          try {
            const arrayBuffer = await file.arrayBuffer();
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.load(arrayBuffer);
            const worksheet = workbook.worksheets[0];
            const jsonData = [];
            const headers = [];
            worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
              if (rowNumber === 1) {
                row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                  headers.push(cell.text);
                });
              } else {
                const rowData = {};
                row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                  rowData[headers[colNumber - 1]] = cell.text;
                });
                jsonData.push(rowData);
              }
            });
            dataSourceFileCompleteJSON.value = jsonData == null ? void 0 : jsonData.map((f, i) => {
              return { ...f, auto_index_by_docspawn: i + 1 };
            });
          } catch (error) {
            console.error("Error processing file:", error);
            throw error;
          }
        }
      }
    }
    function handleChangeSelectedColumns(data) {
      dataSourceSelectedColumns.value = data;
    }
    function handleChangeSelectedRows(data) {
      dataSourceSelectedRows.value = data;
    }
    function createDataSource() {
      if (isEditable.value)
        emit("updateDataSource", { name: fileName.value, completeData: dataSourceFileCompleteJSON.value, columnNames: dataSourceColumnNames.value, selectedColumns: dataSourceSelectedColumns.value, selectedRows: dataSourceSelectedRows.value, isEditable: isEditable.value, editIndex: editIndex.value, lookupColumn: lookupColumn.value });
      else
        emit("createDataSource", { name: fileName.value, completeData: dataSourceFileCompleteJSON.value, columnNames: dataSourceColumnNames.value, selectedColumns: dataSourceSelectedColumns.value, selectedRows: dataSourceSelectedRows.value, lookupColumn: lookupColumn.value });
    }
    watch(dataStartLine, (newVal) => {
      var _a, _b;
      if (newVal > ((_a = dataSourceFileCompleteJSON.value) == null ? void 0 : _a.length))
        newVal = (_b = dataSourceFileCompleteJSON.value) == null ? void 0 : _b.length;
    });
    watch(selectedFiles, () => {
      var _a;
      if (((_a = selectedFiles == null ? void 0 : selectedFiles.value) == null ? void 0 : _a.length) > 0) {
        const file = selectedFiles.value[0];
        try {
          const reader = new FileReader();
          reader.onload = (e) => {
            const data = e.target.result;
            const fileType = file.name.split(".").pop().toLowerCase();
            processFiles(data, fileType, file);
          };
          reader.readAsArrayBuffer(file);
        } catch (err) {
        }
      } else {
        dataSourceColumnNames.value = [];
        dataSourceFileCompleteJSON.value = [];
        dataSourceSelectedColumns.value = [];
      }
    });
    watch(dataSourceFileCompleteJSON, () => {
      var _a;
      if (((_a = dataSourceFileCompleteJSON == null ? void 0 : dataSourceFileCompleteJSON.value) == null ? void 0 : _a.length) > 0) {
        const JSON2 = dataSourceFileCompleteJSON == null ? void 0 : dataSourceFileCompleteJSON.value;
        dataSourceColumnNames.value = Object.keys(JSON2[0]);
        dataSourceSelectedColumns.value = isEditable.value ? dataSourceSelectedColumns.value : Object.keys(JSON2[0]);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script$3;
      const _component_Toast = script$2;
      const _component_Dropdown = script$7;
      const _component_InputNumber = script$8;
      const _component_SelectButton = script$9;
      _push(ssrRenderComponent(_component_Dialog, mergeProps({
        visible: _ctx.visible,
        "onUpdate:visible": ($event) => _ctx.visible = $event,
        modal: "",
        draggable: false,
        style: { width: "80vw" }
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-center items-center ml-5"${_scopeId}><p class="font-semibold text-xl flex justify-center text-center font-poppins"${_scopeId}> Create data source </p></div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-center items-center ml-5" }, [
                createVNode("p", { class: "font-semibold text-xl flex justify-center text-center font-poppins" }, " Create data source ")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
          if (_push2) {
            if (!isEditable.value) {
              _push2(`<div class="w-full flex justify-center"${_scopeId}><div class="w-max flex flex-col gap-6 items-center justify-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Toast, null, null, _parent2, _scopeId));
              if (selectedFiles.value.length === 0) {
                _push2(`<div class="${ssrRenderClass([{ "error-border": hasError.value }, "custom-file-upload"])}"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(script), {
                  ref_key: "fileupload",
                  ref: fileupload,
                  mode: "basic",
                  name: "demo[]",
                  multiple: false,
                  accept: ".csv, .xlsx",
                  "max-file-size": 1e8,
                  "choose-label": "Browse",
                  class: "hidden-input",
                  onSelect: onFileSelect
                }, null, _parent2, _scopeId));
                _push2(`<div class="drop-zone py-6"${_scopeId}>`);
                if (!hasError.value) {
                  _push2(`<span class="font-poppins p-4"${_scopeId}>Drag and drop csv or xlsx files here to upload or</span>`);
                } else {
                  _push2(`<span class="bg-red-50 p-4 text-red-400 font-poppins"${_scopeId}>${ssrInterpolate(fileErrorText.value)}</span>`);
                }
                _push2(ssrRenderComponent(unref(script$1), {
                  label: "Browse",
                  icon: "pi pi-plus",
                  class: "font-poppins mt-4",
                  onClick: triggerFileInput
                }, null, _parent2, _scopeId));
                _push2(`</div></div>`);
              } else {
                _push2(`<div class="file-list custom-file-upload flex flex-col gap-6 items-center justify-center"${_scopeId}><ul${_scopeId}><!--[-->`);
                ssrRenderList(selectedFiles.value, (file) => {
                  _push2(`<li class="font-poppins p-4"${_scopeId}>${ssrInterpolate(file.name)}</li>`);
                });
                _push2(`<!--]--></ul>`);
                _push2(ssrRenderComponent(unref(script$1), {
                  severity: "danger",
                  outlined: "",
                  label: "Remove",
                  icon: "pi pi-times",
                  class: "mt-4 font-poppins",
                  onClick: removeFiles
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (((_a = dataSourceFileCompleteJSON.value) == null ? void 0 : _a.length) > 0) {
              _push2(`<div class="my-6 p-4 py-8 w-full flex flex-col gap-8 bg-primary-50 rounded"${_scopeId}><div class="gap-4"${_scopeId}><p class="font-poppins text-lg text-surface-600 mb-1"${_scopeId}> Lookup column </p>`);
              _push2(ssrRenderComponent(_component_Dropdown, {
                modelValue: lookupColumn.value,
                "onUpdate:modelValue": ($event) => lookupColumn.value = $event,
                options: dataSourceColumnNames.value,
                filter: "",
                placeholder: "Select country",
                class: "w-full md:w-80"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="gap-4"${_scopeId}><p class="font-poppins text-lg text-surface-600"${_scopeId}> Data starts on line </p><p class="font-poppins text-sm text-surface-600 mb-2"${_scopeId}> write between 1 to ${ssrInterpolate((_b = dataSourceFileCompleteJSON.value) == null ? void 0 : _b.length)}</p>`);
              _push2(ssrRenderComponent(_component_InputNumber, {
                modelValue: dataStartLine.value,
                "onUpdate:modelValue": ($event) => dataStartLine.value = $event,
                disabled: "",
                class: "w-full md:w-80",
                "input-id": "minmax-buttons",
                mode: "decimal",
                "show-buttons": "",
                min: 1,
                max: ((_c = dataSourceFileCompleteJSON.value) == null ? void 0 : _c.length) ? (_d = dataSourceFileCompleteJSON.value) == null ? void 0 : _d.length : 100
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (((_e = dataSourceFileCompleteJSON.value) == null ? void 0 : _e.length) > 0) {
              _push2(`<div class="w-full flex justify-center mt-12"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_SelectButton, {
                modelValue: tableViewType.value,
                "onUpdate:modelValue": ($event) => tableViewType.value = $event,
                options: tableViewOptions.value,
                "aria-labelledby": "basic",
                class: "font-poppins"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (((_f = dataSourceFileCompleteJSON.value) == null ? void 0 : _f.length) > 0) {
              _push2(ssrRenderComponent(_sfc_main$3, {
                "data-source-file-complete-j-s-o-n": dataSourceFileCompleteJSON.value,
                "data-source-column-names": dataSourceColumnNames.value,
                "data-source-selected-columns": dataSourceSelectedColumns.value,
                "data-source-selected-rows": dataSourceSelectedRows.value,
                "table-view-type": tableViewType.value,
                onChangeSelectedColumns: handleChangeSelectedColumns,
                onChangeSelectedRows: handleChangeSelectedRows
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (((_g = dataSourceFileCompleteJSON.value) == null ? void 0 : _g.length) > 0) {
              _push2(`<div class="mb-4 mt-2 flex justify-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(script$1), {
                outlined: "",
                label: "Cancel",
                onClick: ($event) => emit("cancel")
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(script$1), {
                label: isEditable.value ? "Update data source" : "Create data source",
                onClick: createDataSource
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              !isEditable.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "w-full flex justify-center"
              }, [
                createVNode("div", { class: "w-max flex flex-col gap-6 items-center justify-center" }, [
                  createVNode(_component_Toast),
                  selectedFiles.value.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: ["custom-file-upload", { "error-border": hasError.value }],
                    onDragover: withModifiers(() => {
                    }, ["prevent"]),
                    onDragenter: withModifiers(handleDragEnter, ["prevent"]),
                    onDragleave: withModifiers(handleDragLeave, ["prevent"]),
                    onDrop: withModifiers(handleDrop, ["prevent"])
                  }, [
                    createVNode(unref(script), {
                      ref_key: "fileupload",
                      ref: fileupload,
                      mode: "basic",
                      name: "demo[]",
                      multiple: false,
                      accept: ".csv, .xlsx",
                      "max-file-size": 1e8,
                      "choose-label": "Browse",
                      class: "hidden-input",
                      onSelect: onFileSelect
                    }, null, 512),
                    createVNode("div", { class: "drop-zone py-6" }, [
                      !hasError.value ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "font-poppins p-4"
                      }, "Drag and drop csv or xlsx files here to upload or")) : (openBlock(), createBlock("span", {
                        key: 1,
                        class: "bg-red-50 p-4 text-red-400 font-poppins"
                      }, toDisplayString(fileErrorText.value), 1)),
                      createVNode(unref(script$1), {
                        label: "Browse",
                        icon: "pi pi-plus",
                        class: "font-poppins mt-4",
                        onClick: triggerFileInput
                      })
                    ])
                  ], 42, ["onDragover"])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "file-list custom-file-upload flex flex-col gap-6 items-center justify-center"
                  }, [
                    createVNode("ul", null, [
                      (openBlock(true), createBlock(Fragment, null, renderList(selectedFiles.value, (file) => {
                        return openBlock(), createBlock("li", {
                          key: file.name,
                          class: "font-poppins p-4"
                        }, toDisplayString(file.name), 1);
                      }), 128))
                    ]),
                    createVNode(unref(script$1), {
                      severity: "danger",
                      outlined: "",
                      label: "Remove",
                      icon: "pi pi-times",
                      class: "mt-4 font-poppins",
                      onClick: removeFiles
                    })
                  ]))
                ])
              ])) : createCommentVNode("", true),
              ((_h = dataSourceFileCompleteJSON.value) == null ? void 0 : _h.length) > 0 ? (openBlock(), createBlock("div", {
                key: 1,
                class: "my-6 p-4 py-8 w-full flex flex-col gap-8 bg-primary-50 rounded"
              }, [
                createVNode("div", { class: "gap-4" }, [
                  createVNode("p", { class: "font-poppins text-lg text-surface-600 mb-1" }, " Lookup column "),
                  createVNode(_component_Dropdown, {
                    modelValue: lookupColumn.value,
                    "onUpdate:modelValue": ($event) => lookupColumn.value = $event,
                    options: dataSourceColumnNames.value,
                    filter: "",
                    placeholder: "Select country",
                    class: "w-full md:w-80"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                ]),
                createVNode("div", { class: "gap-4" }, [
                  createVNode("p", { class: "font-poppins text-lg text-surface-600" }, " Data starts on line "),
                  createVNode("p", { class: "font-poppins text-sm text-surface-600 mb-2" }, " write between 1 to " + toDisplayString((_i = dataSourceFileCompleteJSON.value) == null ? void 0 : _i.length), 1),
                  createVNode(_component_InputNumber, {
                    modelValue: dataStartLine.value,
                    "onUpdate:modelValue": ($event) => dataStartLine.value = $event,
                    disabled: "",
                    class: "w-full md:w-80",
                    "input-id": "minmax-buttons",
                    mode: "decimal",
                    "show-buttons": "",
                    min: 1,
                    max: ((_j = dataSourceFileCompleteJSON.value) == null ? void 0 : _j.length) ? (_k = dataSourceFileCompleteJSON.value) == null ? void 0 : _k.length : 100
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])
                ])
              ])) : createCommentVNode("", true),
              ((_l = dataSourceFileCompleteJSON.value) == null ? void 0 : _l.length) > 0 ? (openBlock(), createBlock("div", {
                key: 2,
                class: "w-full flex justify-center mt-12"
              }, [
                createVNode(_component_SelectButton, {
                  modelValue: tableViewType.value,
                  "onUpdate:modelValue": ($event) => tableViewType.value = $event,
                  options: tableViewOptions.value,
                  "aria-labelledby": "basic",
                  class: "font-poppins"
                }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
              ])) : createCommentVNode("", true),
              ((_m = dataSourceFileCompleteJSON.value) == null ? void 0 : _m.length) > 0 ? (openBlock(), createBlock(_sfc_main$3, {
                key: 3,
                "data-source-file-complete-j-s-o-n": dataSourceFileCompleteJSON.value,
                "data-source-column-names": dataSourceColumnNames.value,
                "data-source-selected-columns": dataSourceSelectedColumns.value,
                "data-source-selected-rows": dataSourceSelectedRows.value,
                "table-view-type": tableViewType.value,
                onChangeSelectedColumns: handleChangeSelectedColumns,
                onChangeSelectedRows: handleChangeSelectedRows
              }, null, 8, ["data-source-file-complete-j-s-o-n", "data-source-column-names", "data-source-selected-columns", "data-source-selected-rows", "table-view-type"])) : createCommentVNode("", true),
              ((_n = dataSourceFileCompleteJSON.value) == null ? void 0 : _n.length) > 0 ? (openBlock(), createBlock("div", {
                key: 4,
                class: "mb-4 mt-2 flex justify-center gap-2"
              }, [
                createVNode(unref(script$1), {
                  outlined: "",
                  label: "Cancel",
                  onClick: ($event) => emit("cancel")
                }, null, 8, ["onClick"]),
                createVNode(unref(script$1), {
                  label: isEditable.value ? "Update data source" : "Create data source",
                  onClick: createDataSource
                }, null, 8, ["label"])
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/settings/data_source/CreateListModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
ref([
  {
    id: 1,
    type: "Data table",
    name: "Hanan Database"
  },
  {
    id: 2,
    type: "Data table",
    name: "Adam Database"
  },
  {
    id: 3,
    type: "Data table",
    name: "Amsale Database"
  }
]);
const _sfc_main = {
  __name: "data_sources",
  __ssrInlineRender: true,
  setup(__props) {
    const allDataSources = ref([]);
    const copiedList = ref(JSON.parse(JSON.stringify(addNewListItem.value)));
    const toast = useToast();
    const visible = ref(false);
    const openDeleteModal = ref(false);
    const editableItem = ref();
    const tableData = ref([]);
    const deleteItem = ref();
    const searchQuery = ref("");
    const filteredLists = ref(addNewListItem.value);
    const filteredList = computed(() => {
      const filterItems = (items, fn) => {
        return items.reduce((r, o) => {
          const sublists = filterItems(o.sublists || [], fn);
          if (fn(o) || sublists.length)
            r.push(Object.assign({}, o, sublists.length && { sublists }));
          return r;
        }, []);
      };
      if (!searchQuery.value)
        return copiedList.value;
      return filterItems(addNewListItem.value, (item) => {
        return item.title.toLowerCase().includes(searchQuery.value.toLowerCase());
      });
    });
    watch(searchQuery, (newValue) => {
      if (newValue === "")
        filteredLists.value = addNewListItem.value;
      else
        filteredLists.value = filteredList.value;
    });
    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      list_elements: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
      }
    });
    function handleCreateDataSource(data) {
      var _a;
      allDataSources.value = [
        ...allDataSources.value,
        { ...data, type: "Data table", index: ((_a = allDataSources.value) == null ? void 0 : _a.length) + 1 }
      ];
      visible.value = false;
    }
    function handleUpdateDataSource(data) {
      var _a;
      if (data == null ? void 0 : data.isEditable) {
        allDataSources.value = (_a = allDataSources.value) == null ? void 0 : _a.map((d) => {
          if ((d == null ? void 0 : d.index) === (data == null ? void 0 : data.index))
            return { ...data, type: "Data table" };
          else
            return d;
        });
        visible.value = false;
      }
    }
    watch(allDataSources, (newVal) => {
      tableData.value = newVal;
    });
    function handleCreateList(data) {
      const { listName, listItems } = data;
      const newSubitems = [];
      listItems.forEach((listitem, index) => {
        const newsubitem = {
          id: index + 1,
          title: listitem.name,
          isHovered: false,
          opensubmenu: false,
          sublists: []
        };
        newSubitems.push(newsubitem);
      });
      const newList = {
        id: addNewListItem.value.length + 1,
        title: listName,
        isHovered: false,
        opensubmenu: true,
        level: 0,
        sublists: newSubitems
      };
      addNewListItem.value.push(newList);
    }
    function handleEditItem(data) {
      editableItem.value = data;
      visible.value = true;
    }
    function handleOpenDelete(data) {
      deleteItem.value = data;
      openDeleteModal.value = true;
    }
    function handleDelete() {
      allDataSources.value = allDataSources.value.filter(
        (item) => item.index !== deleteItem.value.index
      );
      openDeleteModal.value = false;
    }
    function onRowReorder(event) {
      allDataSources.value = event;
    }
    function showSuccess() {
      toast.add({
        severity: "success",
        summary: "Success Message",
        detail: "List successfully created.",
        life: 3e3
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = script$1;
      const _component_Toast = script$2;
      const _component_Dialog = script$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full h-full bg-white overflow-scroll no-scrollbar" }, _attrs))} data-v-8cda8ce2><div class="py-8 rounded-lg" data-v-8cda8ce2><p class="font-semibold text-surface-600 text-xl py-2" data-v-8cda8ce2>Data source</p><div data-v-8cda8ce2><div class="flex flex-col" data-v-8cda8ce2><div class="w-full flex" data-v-8cda8ce2>`);
      _push(ssrRenderComponent(_component_Button, {
        icon: "pi pi-plus",
        label: "Create new data source",
        outlined: "",
        class: "text-success border-success hover:bg-green-50 hover:border-success w-max ml-auto",
        severity: "success",
        onClick: ($event) => visible.value = true
      }, null, _parent));
      _push(`</div><div class="w-full py-5" data-v-8cda8ce2><div class="mt-4 mb-12 ml-2" data-v-8cda8ce2>`);
      _push(ssrRenderComponent(DataTableComponent, {
        "table-data": tableData.value,
        filters: filters.value,
        onRowReorder,
        onEditItem: handleEditItem,
        onOpenDelete: handleOpenDelete
      }, null, _parent));
      _push(ssrRenderComponent(_component_Toast, null, null, _parent));
      _push(`</div></div></div></div></div>`);
      _push(ssrRenderComponent(_component_Toast, null, null, _parent));
      if (visible.value) {
        _push(ssrRenderComponent(_sfc_main$1, {
          visible: visible.value,
          "onUpdate:visible": ($event) => visible.value = $event,
          "editable-item": editableItem.value,
          onCreateList: handleCreateList,
          onCreateDataSource: handleCreateDataSource,
          onUpdateDataSource: handleUpdateDataSource,
          onCancel: ($event) => {
            visible.value = false;
            editableItem.value = {};
          },
          onRemoveEditable: ($event) => editableItem.value = {},
          onError: "showError" in _ctx ? _ctx.showError : unref(showError),
          onSuccess: showSuccess
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_Dialog, {
        visible: openDeleteModal.value,
        "onUpdate:visible": ($event) => openDeleteModal.value = $event,
        header: "Delete",
        modal: "",
        style: { width: "25rem" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="p-text-secondary block mb-5" data-v-8cda8ce2${_scopeId}><i class="pi pi-exclamation-triangle text-error mr-2" data-v-8cda8ce2${_scopeId}></i>Are you sure you want to delete this Item?</span><div class="flex justify-end gap-2" data-v-8cda8ce2${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Button, {
              type: "button",
              label: "Cancel",
              outlined: "",
              onClick: ($event) => openDeleteModal.value = false
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, {
              type: "button",
              label: "Delete",
              severity: "error",
              class: "bg-error hover:bg-red-500 hover:border-error text-white",
              onClick: handleDelete
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("span", { class: "p-text-secondary block mb-5" }, [
                createVNode("i", { class: "pi pi-exclamation-triangle text-error mr-2" }),
                createTextVNode("Are you sure you want to delete this Item?")
              ]),
              createVNode("div", { class: "flex justify-end gap-2" }, [
                createVNode(_component_Button, {
                  type: "button",
                  label: "Cancel",
                  outlined: "",
                  onClick: ($event) => openDeleteModal.value = false
                }, null, 8, ["onClick"]),
                createVNode(_component_Button, {
                  type: "button",
                  label: "Delete",
                  severity: "error",
                  class: "bg-error hover:bg-red-500 hover:border-error text-white",
                  onClick: handleDelete
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/settings/data_sources.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const DataSources = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8cda8ce2"]]);

export { DataSources as default };
//# sourceMappingURL=data_sources-DxVhtQSS.mjs.map
