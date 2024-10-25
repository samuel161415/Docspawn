import script$3 from './button.esm-DZ8732aK.mjs';
import script$5 from './inputtext.esm-DkseRpMQ.mjs';
import script$6 from './toast.esm-CMx4Jsjl.mjs';
import script$7 from './dialog.esm-C1lgYfkT.mjs';
import { _ as _export_sfc, f as useToast, F as FilterMatchMode, g as FilterOperator, s as showError } from './entry-DIZlnTgU.mjs';
import { useSSRContext, ref, computed, watch, resolveComponent, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createSlots, createCommentVNode, resolveDirective, withDirectives, withModifiers } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrGetDirectiveProps } from 'vue/server-renderer';
import script from './datatable.esm--i0bte5q.mjs';
import script$1 from './column.esm-smoz5X4x.mjs';
import script$8 from './menu.esm-CzDtUfGx.mjs';
import script$2 from './textarea.esm-D_y3xPJx.mjs';
import script$4 from './fileupload.esm-CdT_XAWh.mjs';
import ExcelJS from 'exceljs';
import { a as addNewListItem, _ as _sfc_main$8 } from './newListData-SAE07HcH.mjs';
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
import './dropdown.esm-DfDe0_Pe.mjs';
import './index.esm-CSFmGINd.mjs';
import './index.esm-tXVwHB5O.mjs';
import './overlayeventbus.esm-DLM9jV-U.mjs';
import './virtualscroller.esm-DusQcf9C.mjs';
import './inputnumber.esm-BpAJDnaF.mjs';
import './index.esm-wYJr4edh.mjs';
import './index.esm-3jIRkePu.mjs';
import './index.esm-CWHnMl5b.mjs';
import './index.esm-zcxvsZZ_.mjs';
import './index.esm-BfnNz58z.mjs';
import './checkbox.esm-DILa8nEJ.mjs';
import './radiobutton.esm-Dv7vv5Y0.mjs';
import './index.esm-BoK_MMXp.mjs';
import './index.esm-Bzg_ZW-m.mjs';
import './message.esm-eENdjaWi.mjs';
import './progressbar.esm-zGZu3Eyu.mjs';

const _sfc_main$7 = {
  __name: "DataSourceModal",
  __ssrInlineRender: true,
  props: {
    tableData: Object
  },
  setup(__props) {
    const props = __props;
    const visible = ref(false);
    console.log("tableData from table", props.tableData);
    const showPaginator = computed(() => {
      var _a;
      return ((_a = props.tableData.sublists) == null ? void 0 : _a.length) > 5;
    });
    const columns = computed(() => {
      var _a, _b;
      if (((_b = (_a = props.tableData) == null ? void 0 : _a.sublists) == null ? void 0 : _b.length) > 0) {
        return Object.keys(props.tableData.sublists[0]).filter(
          (key) => key !== "sublists"
        );
      }
      return [];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script$7;
      _push(ssrRenderComponent(_component_Dialog, mergeProps({
        visible: visible.value,
        "onUpdate:visible": ($event) => visible.value = $event,
        modal: "",
        draggable: false,
        style: { width: "80vw" },
        dismissableMask: ""
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="custom-header flex justify-start bg-white flex-wrap items-center" data-v-f705380f${_scopeId}><p class="font-poppins whitespace-nowrap text-xl font-semibold" data-v-f705380f${_scopeId}>${ssrInterpolate(__props.tableData.name)}</p></div>`);
          } else {
            return [
              createVNode("div", { class: "custom-header flex justify-start bg-white flex-wrap items-center" }, [
                createVNode("p", { class: "font-poppins whitespace-nowrap text-xl font-semibold" }, toDisplayString(__props.tableData.name), 1)
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(script), {
              paginator: showPaginator.value,
              rows: 5,
              rowsPerPageOptions: [5, 10, 20, 50],
              value: __props.tableData.sublists,
              "striped-rows": "",
              "show-gridlines": "",
              class: "border rounded-lg overflow-hidden"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(columns.value, (column, index) => {
                    _push3(ssrRenderComponent(unref(script$1), {
                      key: index,
                      field: column,
                      header: column,
                      sortable: true
                    }, {
                      body: withCtx(({ data, field }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<p class="font-poppins font-normal flex justify-center whitespace-nowrap py-2" data-v-f705380f${_scopeId3}>${ssrInterpolate(data[field])}</p>`);
                        } else {
                          return [
                            createVNode("p", { class: "font-poppins font-normal flex justify-center whitespace-nowrap py-2" }, toDisplayString(data[field]), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(columns.value, (column, index) => {
                      return openBlock(), createBlock(unref(script$1), {
                        key: index,
                        field: column,
                        header: column,
                        sortable: true
                      }, {
                        body: withCtx(({ data, field }) => [
                          createVNode("p", { class: "font-poppins font-normal flex justify-center whitespace-nowrap py-2" }, toDisplayString(data[field]), 1)
                        ]),
                        _: 2
                      }, 1032, ["field", "header"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(script), {
                paginator: showPaginator.value,
                rows: 5,
                rowsPerPageOptions: [5, 10, 20, 50],
                value: __props.tableData.sublists,
                "striped-rows": "",
                "show-gridlines": "",
                class: "border rounded-lg overflow-hidden"
              }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(columns.value, (column, index) => {
                    return openBlock(), createBlock(unref(script$1), {
                      key: index,
                      field: column,
                      header: column,
                      sortable: true
                    }, {
                      body: withCtx(({ data, field }) => [
                        createVNode("p", { class: "font-poppins font-normal flex justify-center whitespace-nowrap py-2" }, toDisplayString(data[field]), 1)
                      ]),
                      _: 2
                    }, 1032, ["field", "header"]);
                  }), 128))
                ]),
                _: 1
              }, 8, ["paginator", "value"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/settings/list/DataSourceModal.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const DataSourceModal = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-f705380f"]]);
const _sfc_main$6 = {
  __name: "Table",
  __ssrInlineRender: true,
  props: {
    tableData: Object,
    filters: Object,
    calledFrom: String,
    c_level: Number
  },
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    ref(props.filters);
    const expandedRows = ref({});
    useToast();
    const isAllExpanded = ref(false);
    const isModalVisible = ref(false);
    const modalTableData = ref({});
    const headerClass = computed(() => {
      return isSublistData.value ? "sublist-padding" : "no-padding";
    });
    const showPaginator = computed(() => {
      var _a;
      return ((_a = props.tableData.sublists) == null ? void 0 : _a.length) > 5;
    });
    const expandAll = () => {
      var _a;
      if ((_a = props.tableData) == null ? void 0 : _a.sublists) {
        expandedRows.value = props.tableData.sublists.reduce(
          (acc, item) => (acc[item.id] = true) && acc,
          {}
        );
      }
    };
    const toggleExpandCollapse = () => {
      if (isAllExpanded.value) {
        collapseAll();
      } else {
        expandAll();
      }
      isAllExpanded.value = !isAllExpanded.value;
    };
    const collapseAll = () => {
      expandedRows.value = {};
    };
    const hasSublists = (data) => {
      var _a;
      return ((_a = data == null ? void 0 : data.sublists) == null ? void 0 : _a.length) > 0;
    };
    const isChildSublistSimple = (data) => {
      const sublists = data == null ? void 0 : data.sublists;
      if (!data.isSublistSimple && (sublists == null ? void 0 : sublists.length) > 0)
        return false;
      return true;
    };
    const getMenuModel = (data) => {
      var _a;
      const model = [
        {
          label: "Edit",
          icon: "pi pi-pencil",
          command: () => emit("edit-item", { ...data, path: data.path })
        },
        {
          label: "Delete",
          icon: "pi pi-trash",
          command: () => emit("open-delete", data)
        }
      ];
      if (((_a = props.tableData) == null ? void 0 : _a.level) < 3) {
        model.unshift({
          label: "Add Sublist",
          icon: "pi pi-plus",
          command: () => emit("open-create-sublist-modal", {
            ...data,
            path: data.path
          })
        });
      }
      return model;
    };
    watch(
      () => props.tableData.sublists,
      (newSublists) => {
        newSublists.forEach((data) => {
          if (!isChildSublistSimple(data) && expandedRows.value[data.id]) {
            delete expandedRows.value[data.id];
          }
        });
      },
      { deep: true }
    );
    const isSublistData = computed(() => {
      var _a;
      return !((_a = props.tableData) == null ? void 0 : _a.isSublistSimple);
    });
    computed(() => {
      var _a;
      return !((_a = props.tableData) == null ? void 0 : _a.label);
    });
    const columns = computed(() => {
      var _a, _b;
      if (!props.tableData.isSublistSimple && ((_a = props.tableData.sublists) == null ? void 0 : _a.length) > 0) {
        return Object.keys(props.tableData.sublists[0]).filter(
          (key) => key !== "sublists"
        );
      } else if (((_b = props.tableData.sublists) == null ? void 0 : _b.length) > 0) {
        return ["title"];
      }
      return [];
    });
    const toggleRow = (data) => {
      console.log(
        "lis evel greater than 3",
        props.tableData.level,
        props.tableData.title
      );
      if (props.tableData.level > 2) {
        return;
      }
      if (!isChildSublistSimple(data)) {
        if (expandedRows.value[data.id]) {
          delete expandedRows.value[data.id];
        }
        showModal(data);
      } else {
        if (expandedRows.value[data.id]) {
          delete expandedRows.value[data.id];
        } else {
          expandedRows.value[data.id] = true;
        }
      }
    };
    const showModal = (data) => {
      console.log("show modal is clicked and the passed props is", data);
      modalTableData.value = data;
      isModalVisible.value = true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      const _component_DataTable = script;
      const _component_Button = script$3;
      const _component_Column = script$1;
      const _component_Menu = script$8;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [isSublistData.value ? `max-w-[calc(70vw-${__props.c_level * 65}px)]` : "", ""]
      }, _attrs))} data-v-594aa2bc>`);
      _push(ssrRenderComponent(_component_DataTable, {
        expandedRows: expandedRows.value,
        "onUpdate:expandedRows": ($event) => expandedRows.value = $event,
        value: (_a = __props.tableData) == null ? void 0 : _a.sublists,
        dataKey: "id",
        "striped-rows": "",
        paginator: showPaginator.value,
        rows: 10,
        rowsPerPageOptions: [10, 25, 50],
        paginatorTemplate: "RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink",
        currentPageReportTemplate: "{first} to {last} of {totalRecords}",
        class: "border border-blue-500"
      }, createSlots({
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!isSublistData.value) {
              _push2(`<!--[-->`);
              _push2(ssrRenderComponent(_component_Column, { class: "w-[48px] text-center" }, {
                body: withCtx(({ data }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (hasSublists(data)) {
                      _push3(`<span class="w-[10px] text-sm cursor-pointer" data-v-594aa2bc${_scopeId2}><i class="${ssrRenderClass([
                        expandedRows.value[data.id] && !isChildSublistSimple(data) ? "pi pi-chevron-down" : "pi pi-chevron-right",
                        ""
                      ])}" class="" data-v-594aa2bc${_scopeId2}></i></span>`);
                    } else {
                      _push3(`<span class="w-[10px] text-sm" data-v-594aa2bc${_scopeId2}><i class="pi pi-minus" data-v-594aa2bc${_scopeId2}></i></span>`);
                    }
                  } else {
                    return [
                      hasSublists(data) ? (openBlock(), createBlock("span", {
                        key: 0,
                        onClick: ($event) => toggleRow(data),
                        class: "w-[10px] text-sm cursor-pointer"
                      }, [
                        createVNode("i", {
                          class: [
                            expandedRows.value[data.id] && !isChildSublistSimple(data) ? "pi pi-chevron-down" : "pi pi-chevron-right",
                            ""
                          ]
                        }, null, 2)
                      ], 8, ["onClick"])) : (openBlock(), createBlock("span", {
                        key: 1,
                        class: "w-[10px] text-sm"
                      }, [
                        createVNode("i", { class: "pi pi-minus" })
                      ]))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<!--[-->`);
              ssrRenderList(columns.value, (column, index) => {
                _push2(ssrRenderComponent(_component_Column, {
                  key: index,
                  field: column,
                  header: null,
                  sortable: false,
                  class: ["w-[calc(100% - 113px)] custom-padding", headerClass.value]
                }, {
                  body: withCtx(({ data, field }, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="flex" data-v-594aa2bc${_scopeId2}>`);
                      if (!isChildSublistSimple(data)) {
                        _push3(`<p class="font-poppins fles justify-start font-normal cursor-pointer" data-v-594aa2bc${_scopeId2}>${ssrInterpolate(data[field])} <span class="w-[14px] ml-1" data-v-594aa2bc${_scopeId2}><i class="pi pi-file-excel text-success" data-v-594aa2bc${_scopeId2}></i></span></p>`);
                      } else {
                        _push3(`<p class="font-poppins fles justify-start font-normal cur" data-v-594aa2bc${_scopeId2}>${ssrInterpolate(data[field])}</p>`);
                      }
                      _push3(`</div>`);
                    } else {
                      return [
                        createVNode("div", { class: "flex" }, [
                          !isChildSublistSimple(data) ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "font-poppins fles justify-start font-normal cursor-pointer",
                            onClick: ($event) => showModal(data)
                          }, [
                            createTextVNode(toDisplayString(data[field]) + " ", 1),
                            createVNode("span", { class: "w-[14px] ml-1" }, [
                              createVNode("i", { class: "pi pi-file-excel text-success" })
                            ])
                          ], 8, ["onClick"])) : (openBlock(), createBlock("p", {
                            key: 1,
                            class: "font-poppins fles justify-start font-normal cur"
                          }, toDisplayString(data[field]), 1))
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
              _push2(ssrRenderComponent(_component_Column, {
                header: null,
                class: "text-center w-[46px]"
              }, {
                body: withCtx(({ data }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex justify-center py-3 px-4 min-w-8 min-h-8" data-v-594aa2bc${_scopeId2}><div class="w-8 h-8" data-v-594aa2bc${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_Button, {
                      icon: "pi pi-cog",
                      outlined: "",
                      class: "p-button-rounded p-button-success w-full h-full flex justify-center items-center",
                      onClick: ($event) => _ctx.$refs[`menu-${data.id}`].toggle($event)
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                    _push3(ssrRenderComponent(_component_Menu, {
                      ref: `menu-${data.id}`,
                      model: getMenuModel(data),
                      popup: ""
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex justify-center py-3 px-4 min-w-8 min-h-8" }, [
                        createVNode("div", { class: "w-8 h-8" }, [
                          createVNode(_component_Button, {
                            icon: "pi pi-cog",
                            outlined: "",
                            class: "p-button-rounded p-button-success w-full h-full flex justify-center items-center",
                            onClick: ($event) => _ctx.$refs[`menu-${data.id}`].toggle($event)
                          }, null, 8, ["onClick"])
                        ]),
                        createVNode(_component_Menu, {
                          ref: `menu-${data.id}`,
                          model: getMenuModel(data),
                          popup: ""
                        }, null, 8, ["model"])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.calledFrom === "root" && isSublistData.value) {
              _push2(`<!--[-->`);
              ssrRenderList(columns.value, (column, index) => {
                _push2(ssrRenderComponent(_component_Column, {
                  key: index,
                  field: column,
                  header: column,
                  sortable: true,
                  class: ["w-[calc(100% - 80px)] pl-[33px] header-white", headerClass.value]
                }, {
                  body: withCtx(({ data, field }, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<p class="font-poppins font-normal flex justify-center mt-3 whitespace-nowrap py-2" data-v-594aa2bc${_scopeId2}>${ssrInterpolate(data[field])}</p>`);
                    } else {
                      return [
                        createVNode("p", { class: "font-poppins font-normal flex justify-center mt-3 whitespace-nowrap py-2" }, toDisplayString(data[field]), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              !isSublistData.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                createVNode(_component_Column, { class: "w-[48px] text-center" }, {
                  body: withCtx(({ data }) => [
                    hasSublists(data) ? (openBlock(), createBlock("span", {
                      key: 0,
                      onClick: ($event) => toggleRow(data),
                      class: "w-[10px] text-sm cursor-pointer"
                    }, [
                      createVNode("i", {
                        class: [
                          expandedRows.value[data.id] && !isChildSublistSimple(data) ? "pi pi-chevron-down" : "pi pi-chevron-right",
                          ""
                        ]
                      }, null, 2)
                    ], 8, ["onClick"])) : (openBlock(), createBlock("span", {
                      key: 1,
                      class: "w-[10px] text-sm"
                    }, [
                      createVNode("i", { class: "pi pi-minus" })
                    ]))
                  ]),
                  _: 1
                }),
                (openBlock(true), createBlock(Fragment, null, renderList(columns.value, (column, index) => {
                  return openBlock(), createBlock(_component_Column, {
                    key: index,
                    field: column,
                    header: null,
                    sortable: false,
                    class: ["w-[calc(100% - 113px)] custom-padding", headerClass.value]
                  }, {
                    body: withCtx(({ data, field }) => [
                      createVNode("div", { class: "flex" }, [
                        !isChildSublistSimple(data) ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "font-poppins fles justify-start font-normal cursor-pointer",
                          onClick: ($event) => showModal(data)
                        }, [
                          createTextVNode(toDisplayString(data[field]) + " ", 1),
                          createVNode("span", { class: "w-[14px] ml-1" }, [
                            createVNode("i", { class: "pi pi-file-excel text-success" })
                          ])
                        ], 8, ["onClick"])) : (openBlock(), createBlock("p", {
                          key: 1,
                          class: "font-poppins fles justify-start font-normal cur"
                        }, toDisplayString(data[field]), 1))
                      ])
                    ]),
                    _: 2
                  }, 1032, ["field", "class"]);
                }), 128)),
                createVNode(_component_Column, {
                  header: null,
                  class: "text-center w-[46px]"
                }, {
                  body: withCtx(({ data }) => [
                    createVNode("div", { class: "flex justify-center py-3 px-4 min-w-8 min-h-8" }, [
                      createVNode("div", { class: "w-8 h-8" }, [
                        createVNode(_component_Button, {
                          icon: "pi pi-cog",
                          outlined: "",
                          class: "p-button-rounded p-button-success w-full h-full flex justify-center items-center",
                          onClick: ($event) => _ctx.$refs[`menu-${data.id}`].toggle($event)
                        }, null, 8, ["onClick"])
                      ]),
                      createVNode(_component_Menu, {
                        ref: `menu-${data.id}`,
                        model: getMenuModel(data),
                        popup: ""
                      }, null, 8, ["model"])
                    ])
                  ]),
                  _: 1
                })
              ], 64)) : createCommentVNode("", true),
              __props.calledFrom === "root" && isSublistData.value ? (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(columns.value, (column, index) => {
                return openBlock(), createBlock(_component_Column, {
                  key: index,
                  field: column,
                  header: column,
                  sortable: true,
                  class: ["w-[calc(100% - 80px)] pl-[33px] header-white", headerClass.value]
                }, {
                  body: withCtx(({ data, field }) => [
                    createVNode("p", { class: "font-poppins font-normal flex justify-center mt-3 whitespace-nowrap py-2" }, toDisplayString(data[field]), 1)
                  ]),
                  _: 2
                }, 1032, ["field", "header", "class"]);
              }), 128)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 2
      }, [
        __props.calledFrom === "root" ? {
          name: "header",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex flex-wrap justify-between items-center mt-3 py-3 rounded-lg mx-[16px]" data-v-594aa2bc${_scopeId}><p class="font-poppins font-normal text-lg" data-v-594aa2bc${_scopeId}>${ssrInterpolate(__props.tableData.title)}</p><div class="flex flex-col md:flex-row justify-end gap-2" data-v-594aa2bc${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Button, {
                icon: isAllExpanded.value ? "pi pi-minus" : "pi pi-plus",
                label: isAllExpanded.value ? "Collapse" : "Expand",
                class: "p-button-success w-36",
                outlined: "",
                onClick: toggleExpandCollapse
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_Button, {
                icon: "pi pi-plus",
                label: "Add item(s)",
                outlined: "",
                onClick: ($event) => _ctx.$emit("open-add-items", __props.tableData.title),
                class: "text-success border-success hover:bg-green-50 w-40"
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              return [
                createVNode("div", { class: "flex flex-wrap justify-between items-center mt-3 py-3 rounded-lg mx-[16px]" }, [
                  createVNode("p", { class: "font-poppins font-normal text-lg" }, toDisplayString(__props.tableData.title), 1),
                  createVNode("div", { class: "flex flex-col md:flex-row justify-end gap-2" }, [
                    createVNode(_component_Button, {
                      icon: isAllExpanded.value ? "pi pi-minus" : "pi pi-plus",
                      label: isAllExpanded.value ? "Collapse" : "Expand",
                      class: "p-button-success w-36",
                      outlined: "",
                      onClick: toggleExpandCollapse
                    }, null, 8, ["icon", "label"]),
                    createVNode(_component_Button, {
                      icon: "pi pi-plus",
                      label: "Add item(s)",
                      outlined: "",
                      onClick: ($event) => _ctx.$emit("open-add-items", __props.tableData.title),
                      class: "text-success border-success hover:bg-green-50 w-40"
                    }, null, 8, ["onClick"])
                  ])
                ])
              ];
            }
          }),
          key: "0"
        } : void 0,
        ((_c = (_b = __props.tableData) == null ? void 0 : _b.sublists) == null ? void 0 : _c.length) ? {
          name: "expansion",
          fn: withCtx(({ data }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (hasSublists(data)) {
                _push2(`<div class="${ssrRenderClass([isChildSublistSimple(data) ? "" : "max-w-[calc(70vw-34px)]", "pl-[47px] border-none mb-[-1px] overflow-x-auto"])}" data-v-594aa2bc${_scopeId}>`);
                _push2(ssrRenderComponent(DataTableComponent, {
                  tableData: data,
                  onOpenAddItems: ($event) => _ctx.$emit("open-add-items", $event),
                  onOpenListOptions: ($event) => _ctx.$emit("open-list-options"),
                  onEditItem: ($event) => _ctx.$emit("edit-item", $event),
                  onOpenDelete: ($event) => _ctx.$emit("open-delete", $event),
                  onOpenCreateSublistModal: ($event) => _ctx.$emit("open-create-sublist-modal", $event),
                  calledFrom: "nested",
                  class: "w-full",
                  c_level: Number(__props.c_level) + 1
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                hasSublists(data) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: [isChildSublistSimple(data) ? "" : "max-w-[calc(70vw-34px)]", "pl-[47px] border-none mb-[-1px] overflow-x-auto"]
                }, [
                  createVNode(DataTableComponent, {
                    tableData: data,
                    onOpenAddItems: ($event) => _ctx.$emit("open-add-items", $event),
                    onOpenListOptions: ($event) => _ctx.$emit("open-list-options"),
                    onEditItem: ($event) => _ctx.$emit("edit-item", $event),
                    onOpenDelete: ($event) => _ctx.$emit("open-delete", $event),
                    onOpenCreateSublistModal: ($event) => _ctx.$emit("open-create-sublist-modal", $event),
                    calledFrom: "nested",
                    class: "w-full",
                    c_level: Number(__props.c_level) + 1
                  }, null, 8, ["tableData", "onOpenAddItems", "onOpenListOptions", "onEditItem", "onOpenDelete", "onOpenCreateSublistModal", "c_level"])
                ], 2)) : createCommentVNode("", true)
              ];
            }
          }),
          key: "1"
        } : void 0
      ]), _parent));
      if (isModalVisible.value) {
        _push(ssrRenderComponent(DataSourceModal, {
          visible: isModalVisible.value,
          "onUpdate:visible": ($event) => isModalVisible.value = $event,
          tableData: modalTableData.value,
          onCancel: ($event) => isModalVisible.value = false
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/settings/list/Table.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const DataTableComponent = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-594aa2bc"]]);
const _sfc_main$5 = {
  __name: "CreateListModal",
  __ssrInlineRender: true,
  emits: ["createList", "cancel", "error", "success"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const visible = ref(false);
    const listName = ref("");
    const listItem = ref("");
    const listItems = ref([]);
    const addClicked = ref(false);
    const handleAdd = () => {
      const items = listItem.value.split(/[\n,]+/).map((item) => item.trim()).filter((item) => item !== "").map((item) => ({ name: item }));
      listItems.value = listItems.value.concat(items);
    };
    const handleCreateList = () => {
      addClicked.value = true;
      if (listName.value === "" || listItems.value.length === 0) {
        emit("error");
      } else if (listName.value !== "" && listItems.value.length > 0) {
        listItems.value = listItems.value.map((item) => {
          return item;
        });
        emit("createList", {
          listName: listName.value,
          listItems: listItems.value
        });
        listName.value = "";
        listItem.value = "";
        listItems.value = [];
        emit("success");
        emit("cancel");
      }
    };
    const deleteItem = (data) => {
      listItems.value = listItems.value.filter((item) => item.name !== data.name);
    };
    ref([
      { field: "name", header: "Name" },
      { field: "action", header: "Action" }
    ]);
    const onRowReorder = (event) => {
      listItems.value = event.value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script$7;
      const _component_InputText = script$5;
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      const _component_Textarea = script$2;
      const _component_Button = script$3;
      const _component_DataTable = script;
      const _component_Column = script$1;
      _push(ssrRenderComponent(_component_Dialog, mergeProps({
        visible: visible.value,
        "onUpdate:visible": ($event) => visible.value = $event,
        modal: "",
        draggable: false,
        style: { width: "40rem" }
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-center items-center ml-5"${_scopeId}><p class="font-semibold text-xl flex justify-center text-center"${_scopeId}> Create list </p></div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-center items-center ml-5" }, [
                createVNode("p", { class: "font-semibold text-xl flex justify-center text-center" }, " Create list ")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="px-5"${_scopeId}><div class="flex flex-col align-items-center gap-3 mb-5"${_scopeId}><label for="listname" class="font-semibold w-6rem text-lg"${_scopeId}>List name <span class="text-red-400"${_scopeId}>*</span></label>`);
            if (addClicked.value && listName.value === "") {
              _push2(`<span class="text-sm text-error"${_scopeId}><i class="pi pi-exclamation-triangle text-error mr-2"${_scopeId}></i>List name should not be empty!</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_InputText, {
              id: "listname",
              class: "flex-auto",
              modelValue: listName.value,
              "onUpdate:modelValue": ($event) => listName.value = $event,
              placeholder: "List name",
              autocomplete: "off",
              invalid: addClicked.value && listName.value === ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-col align-items-center gap-2 mb-3"${_scopeId}><label for="listitems" class="font-semibold w-6rem text-lg"${_scopeId}>List items<span class="text-red-400"${_scopeId}>*</span></label><span class="text-sm text-surface-500"${_scopeId}>Multiple entries are allowed <br${_scopeId}> (Comma separated entries)</span>`);
            if (addClicked.value && listItems.value.length === 0) {
              _push2(`<span class="text-sm text-error"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_font_awesome_icon, {
                icon: ["fas", "exclamation-triangle"],
                class: "text-error mr-2"
              }, null, _parent2, _scopeId));
              _push2(` You should Add Items!</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_Textarea, {
              id: "listItems",
              modelValue: listItem.value,
              "onUpdate:modelValue": ($event) => listItem.value = $event,
              rows: "10",
              cols: "30",
              placeholder: "List item",
              invalid: addClicked.value && listItem.value === ""
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_Button, {
              label: "Add",
              icon: "pi pi-plus",
              onClick: handleAdd,
              class: "bg-success text-white hover:bg-success hover:border-success my-2"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_DataTable, {
              value: listItems.value,
              "striped-rows": "",
              "show-gridlines": "",
              reorderableColumns: true,
              onRowReorder,
              tableStyle: "min-width: 30rem"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Column, {
                    field: "index",
                    "body-style": { margin: "0rem", padding: "0rem" },
                    rowReorder: "",
                    style: { "width": "3%" }
                  }, {
                    rowreordericon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_font_awesome_icon, {
                          icon: ["fas", "bars"],
                          class: "cursor-move p-6",
                          "data-pc-section": "rowreordericon"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_font_awesome_icon, {
                            icon: ["fas", "bars"],
                            class: "cursor-move p-6",
                            "data-pc-section": "rowreordericon"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Column, {
                    field: "name",
                    header: "Name",
                    "body-style": { margin: "0rem", padding: "0rem" }
                  }, {
                    body: withCtx(({ data }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p class="ml-2"${_scopeId3}>${ssrInterpolate(data["name"])}</p>`);
                      } else {
                        return [
                          createVNode("p", { class: "ml-2" }, toDisplayString(data["name"]), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Column, {
                    field: "action",
                    header: "Actions",
                    style: { "width": "3%" }
                  }, {
                    body: withCtx(({ data }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex justify-center"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_font_awesome_icon, {
                          icon: ["fas", "trash-alt"],
                          class: "text-error cursor-pointer",
                          onClick: ($event) => deleteItem(data)
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex justify-center" }, [
                            createVNode(_component_font_awesome_icon, {
                              icon: ["fas", "trash-alt"],
                              class: "text-error cursor-pointer",
                              onClick: ($event) => deleteItem(data)
                            }, null, 8, ["onClick"])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Column, {
                      field: "index",
                      "body-style": { margin: "0rem", padding: "0rem" },
                      rowReorder: "",
                      style: { "width": "3%" }
                    }, {
                      rowreordericon: withCtx(() => [
                        createVNode(_component_font_awesome_icon, {
                          icon: ["fas", "bars"],
                          class: "cursor-move p-6",
                          "data-pc-section": "rowreordericon"
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Column, {
                      field: "name",
                      header: "Name",
                      "body-style": { margin: "0rem", padding: "0rem" }
                    }, {
                      body: withCtx(({ data }) => [
                        createVNode("p", { class: "ml-2" }, toDisplayString(data["name"]), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Column, {
                      field: "action",
                      header: "Actions",
                      style: { "width": "3%" }
                    }, {
                      body: withCtx(({ data }) => [
                        createVNode("div", { class: "flex justify-center" }, [
                          createVNode(_component_font_awesome_icon, {
                            icon: ["fas", "trash-alt"],
                            class: "text-error cursor-pointer",
                            onClick: ($event) => deleteItem(data)
                          }, null, 8, ["onClick"])
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="flex justify-center mt-5"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Button, {
              label: "Create list",
              icon: "pi pi-check",
              class: "bg-success text-white hover:bg-success hover:border-success flex justify-center text-center",
              onClick: handleCreateList
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "px-5" }, [
                createVNode("div", { class: "flex flex-col align-items-center gap-3 mb-5" }, [
                  createVNode("label", {
                    for: "listname",
                    class: "font-semibold w-6rem text-lg"
                  }, [
                    createTextVNode("List name "),
                    createVNode("span", { class: "text-red-400" }, "*")
                  ]),
                  addClicked.value && listName.value === "" ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "text-sm text-error"
                  }, [
                    createVNode("i", { class: "pi pi-exclamation-triangle text-error mr-2" }),
                    createTextVNode("List name should not be empty!")
                  ])) : createCommentVNode("", true),
                  createVNode(_component_InputText, {
                    id: "listname",
                    class: "flex-auto",
                    modelValue: listName.value,
                    "onUpdate:modelValue": ($event) => listName.value = $event,
                    placeholder: "List name",
                    autocomplete: "off",
                    invalid: addClicked.value && listName.value === ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "invalid"])
                ]),
                createVNode("div", { class: "flex flex-col align-items-center gap-2 mb-3" }, [
                  createVNode("label", {
                    for: "listitems",
                    class: "font-semibold w-6rem text-lg"
                  }, [
                    createTextVNode("List items"),
                    createVNode("span", { class: "text-red-400" }, "*")
                  ]),
                  createVNode("span", { class: "text-sm text-surface-500" }, [
                    createTextVNode("Multiple entries are allowed "),
                    createVNode("br"),
                    createTextVNode(" (Comma separated entries)")
                  ]),
                  addClicked.value && listItems.value.length === 0 ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "text-sm text-error"
                  }, [
                    createVNode(_component_font_awesome_icon, {
                      icon: ["fas", "exclamation-triangle"],
                      class: "text-error mr-2"
                    }),
                    createTextVNode(" You should Add Items!")
                  ])) : createCommentVNode("", true),
                  createVNode(_component_Textarea, {
                    id: "listItems",
                    modelValue: listItem.value,
                    "onUpdate:modelValue": ($event) => listItem.value = $event,
                    rows: "10",
                    cols: "30",
                    placeholder: "List item",
                    invalid: addClicked.value && listItem.value === ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "invalid"])
                ]),
                createVNode(_component_Button, {
                  label: "Add",
                  icon: "pi pi-plus",
                  onClick: handleAdd,
                  class: "bg-success text-white hover:bg-success hover:border-success my-2"
                }),
                createVNode(_component_DataTable, {
                  value: listItems.value,
                  "striped-rows": "",
                  "show-gridlines": "",
                  reorderableColumns: true,
                  onRowReorder,
                  tableStyle: "min-width: 30rem"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_Column, {
                      field: "index",
                      "body-style": { margin: "0rem", padding: "0rem" },
                      rowReorder: "",
                      style: { "width": "3%" }
                    }, {
                      rowreordericon: withCtx(() => [
                        createVNode(_component_font_awesome_icon, {
                          icon: ["fas", "bars"],
                          class: "cursor-move p-6",
                          "data-pc-section": "rowreordericon"
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Column, {
                      field: "name",
                      header: "Name",
                      "body-style": { margin: "0rem", padding: "0rem" }
                    }, {
                      body: withCtx(({ data }) => [
                        createVNode("p", { class: "ml-2" }, toDisplayString(data["name"]), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Column, {
                      field: "action",
                      header: "Actions",
                      style: { "width": "3%" }
                    }, {
                      body: withCtx(({ data }) => [
                        createVNode("div", { class: "flex justify-center" }, [
                          createVNode(_component_font_awesome_icon, {
                            icon: ["fas", "trash-alt"],
                            class: "text-error cursor-pointer",
                            onClick: ($event) => deleteItem(data)
                          }, null, 8, ["onClick"])
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["value"])
              ]),
              createVNode("div", { class: "flex justify-center mt-5" }, [
                createVNode(_component_Button, {
                  label: "Create list",
                  icon: "pi pi-check",
                  class: "bg-success text-white hover:bg-success hover:border-success flex justify-center text-center",
                  onClick: handleCreateList
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/settings/list/CreateListModal.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = {
  __name: "AddItemsModal",
  __ssrInlineRender: true,
  props: {
    listTitle: String
  },
  setup(__props, { emit: __emit }) {
    useToast();
    const visible = ref(false);
    const listItem = ref("");
    const listItems = ref([]);
    const emit = __emit;
    const handleAddItems = () => {
      const items = listItem.value.split(/[\n,]+/).map((item) => item.trim()).filter((item) => item !== "").map((item) => ({ name: item }));
      listItems.value = listItems.value.concat(items);
      emit("addItems", listItems.value);
      listItem.value = "";
      listItems.value = [];
      emit("cancel");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script$7;
      const _component_Textarea = script$2;
      const _component_Button = script$3;
      _push(ssrRenderComponent(_component_Dialog, mergeProps({
        visible: visible.value,
        "onUpdate:visible": ($event) => visible.value = $event,
        modal: "",
        draggable: false,
        style: { width: "40rem" }
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-center items-center ml-5"${_scopeId}><p class="font-semibold text-xl flex justify-center text-center"${_scopeId}> Add Item(s) to <span class="text-primaryBlue px-2"${_scopeId}>${ssrInterpolate(__props.listTitle)}</span></p></div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-center items-center ml-5" }, [
                createVNode("p", { class: "font-semibold text-xl flex justify-center text-center" }, [
                  createTextVNode(" Add Item(s) to "),
                  createVNode("span", { class: "text-primaryBlue px-2" }, toDisplayString(__props.listTitle), 1)
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="px-5 mb-5"${_scopeId}><div class="flex flex-col align-items-center gap-2 mb-3"${_scopeId}><label for="listitems" class="font-semibold w-6rem text-lg"${_scopeId}>List items<span class="text-red-400"${_scopeId}>*</span></label><span class="text-sm text-surface-500"${_scopeId}>Multiple entries are allowed </span>`);
            _push2(ssrRenderComponent(_component_Textarea, {
              id: "listItems",
              modelValue: listItem.value,
              "onUpdate:modelValue": ($event) => listItem.value = $event,
              rows: "10",
              cols: "20",
              placeholder: "List item"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex justify-center mt-5 mr-5"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Button, {
              label: "Save",
              icon: "pi pi-check",
              class: "bg-success text-white hover:bg-success hover:border-success w-28",
              onClick: handleAddItems
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "px-5 mb-5" }, [
                createVNode("div", { class: "flex flex-col align-items-center gap-2 mb-3" }, [
                  createVNode("label", {
                    for: "listitems",
                    class: "font-semibold w-6rem text-lg"
                  }, [
                    createTextVNode("List items"),
                    createVNode("span", { class: "text-red-400" }, "*")
                  ]),
                  createVNode("span", { class: "text-sm text-surface-500" }, "Multiple entries are allowed "),
                  createVNode(_component_Textarea, {
                    id: "listItems",
                    modelValue: listItem.value,
                    "onUpdate:modelValue": ($event) => listItem.value = $event,
                    rows: "10",
                    cols: "20",
                    placeholder: "List item"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ])
              ]),
              createVNode("div", { class: "flex justify-center mt-5 mr-5" }, [
                createVNode(_component_Button, {
                  label: "Save",
                  icon: "pi pi-check",
                  class: "bg-success text-white hover:bg-success hover:border-success w-28",
                  onClick: handleAddItems
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/settings/list/AddItemsModal.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "EditItemOptionModal",
  __ssrInlineRender: true,
  props: {
    editableItem: {
      type: Object,
      required: true
    }
  },
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const listOptions = [
      { option: "Form to doc" },
      { option: "Table to doc" }
    ];
    const visible = ref(false);
    const listItemName = ref(props.editableItem.title);
    watch(
      () => props.editableItem,
      (newVal) => {
        listItemName.value = newVal.title;
      }
    );
    const handleEditItem = () => {
      const editedData = {
        id: props.editableItem.id,
        title: listItemName.value
      };
      emit("editItem", editedData);
      listItemName.value = "";
      emit("cancel");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script$7;
      const _component_InputText = script$5;
      const _component_Button = script$3;
      _push(ssrRenderComponent(_component_Dialog, mergeProps({
        visible: visible.value,
        "onUpdate:visible": ($event) => visible.value = $event,
        modal: "",
        draggable: false,
        style: { width: "40rem" }
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-center items-center ml-7"${_scopeId}><p class="font-semibold text-xl flex justify-center text-center"${_scopeId}> Item options </p></div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-center items-center ml-7" }, [
                createVNode("p", { class: "font-semibold text-xl flex justify-center text-center" }, " Item options ")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="px-7 mb-5"${_scopeId}><div class="flex flex-col align-items-center gap-3 mb-5"${_scopeId}><label for="listname" class="font-semibold w-6rem text-lg"${_scopeId}>Item name <span class="text-red-400"${_scopeId}>*</span></label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "listname",
              class: "flex-auto",
              modelValue: listItemName.value,
              "onUpdate:modelValue": ($event) => listItemName.value = $event,
              placeholder: "Item name",
              autocomplete: "off"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="px-7 mb-5"${_scopeId}><p class="text-lg font-medium"${_scopeId}>Used in</p><div class="ml-2 py-2"${_scopeId}><!--[-->`);
            ssrRenderList(listOptions, (list) => {
              _push2(`<p class="text-lg"${_scopeId}><i class="mr-2 pi pi-minus"${_scopeId}></i> ${ssrInterpolate(list.option)}</p>`);
            });
            _push2(`<!--]--></div><div${_scopeId}></div></div><div class="flex justify-center mt-10 mr-5"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Button, {
              label: "Save",
              icon: "pi pi-check",
              class: "bg-success text-white hover:bg-success hover:border-success w-28 ml-2",
              onClick: handleEditItem
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "px-7 mb-5" }, [
                createVNode("div", { class: "flex flex-col align-items-center gap-3 mb-5" }, [
                  createVNode("label", {
                    for: "listname",
                    class: "font-semibold w-6rem text-lg"
                  }, [
                    createTextVNode("Item name "),
                    createVNode("span", { class: "text-red-400" }, "*")
                  ]),
                  createVNode(_component_InputText, {
                    id: "listname",
                    class: "flex-auto",
                    modelValue: listItemName.value,
                    "onUpdate:modelValue": ($event) => listItemName.value = $event,
                    placeholder: "Item name",
                    autocomplete: "off"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ])
              ]),
              createVNode("div", { class: "px-7 mb-5" }, [
                createVNode("p", { class: "text-lg font-medium" }, "Used in"),
                createVNode("div", { class: "ml-2 py-2" }, [
                  (openBlock(), createBlock(Fragment, null, renderList(listOptions, (list) => {
                    return createVNode("p", { class: "text-lg" }, [
                      createVNode("i", { class: "mr-2 pi pi-minus" }),
                      createTextVNode(" " + toDisplayString(list.option), 1)
                    ]);
                  }), 64))
                ]),
                createVNode("div")
              ]),
              createVNode("div", { class: "flex justify-center mt-10 mr-5" }, [
                createVNode(_component_Button, {
                  label: "Save",
                  icon: "pi pi-check",
                  class: "bg-success text-white hover:bg-success hover:border-success w-28 ml-2",
                  onClick: handleEditItem
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/settings/list/EditItemOptionModal.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "ListOptionModal",
  __ssrInlineRender: true,
  props: {
    tableData: {
      type: Object,
      required: true
    }
  },
  setup(__props, { emit: __emit }) {
    useToast();
    const emit = __emit;
    const props = __props;
    const visible = ref(false);
    const listName = ref(props.tableData.title);
    const handleAdd = () => {
      emit("cancel");
    };
    const listOptions = [
      { option: "Form to doc" },
      { option: "Table to doc" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script$7;
      const _component_InputText = script$5;
      const _component_Button = script$3;
      const _directive_tooltip = resolveDirective("tooltip");
      _push(ssrRenderComponent(_component_Dialog, mergeProps({
        visible: visible.value,
        "onUpdate:visible": ($event) => visible.value = $event,
        modal: "",
        draggable: false,
        style: { width: "40rem" }
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-center items-center ml-7"${_scopeId}><p class="font-semibold text-xl flex justify-center text-center"${_scopeId}>List options</p></div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-center items-center ml-7" }, [
                createVNode("p", { class: "font-semibold text-xl flex justify-center text-center" }, "List options")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="px-7 mb-5"${_scopeId}><div class="flex flex-col align-items-center gap-3 mb-5"${_scopeId}><label for="listname" class="font-semibold w-6rem text-lg"${_scopeId}>List name <span class="text-red-400"${_scopeId}>*</span></label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "listname",
              class: "flex-auto",
              modelValue: listName.value,
              "onUpdate:modelValue": ($event) => listName.value = $event,
              placeholder: "List name",
              autocomplete: "off"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="px-7 mb-5"${_scopeId}><p class="text-lg font-medium"${_scopeId}>Used in</p><div class="ml-2 py-2"${_scopeId}><!--[-->`);
            ssrRenderList(listOptions, (list) => {
              _push2(`<p class="text-lg"${_scopeId}><i class="mr-2 pi pi-minus"${_scopeId}></i> ${ssrInterpolate(list.option)}</p>`);
            });
            _push2(`<!--]--></div><div${_scopeId}></div></div><div class="flex justify-center mt-10 mr-5"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Button, mergeProps({
              label: "Syncing options",
              disabled: "",
              severity: "secondary",
              class: "whitespace-nowrap hover:border-gray-300 text-white w-40 cursor-default",
              onClick: () => {
              }
            }, ssrGetDirectiveProps(_ctx, _directive_tooltip, {
              value: "Upcoming functionality"
            }, void 0, { top: true })), null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, {
              label: "Save",
              icon: "pi pi-check",
              class: "bg-success text-white hover:bg-success hover:border-success w-28 ml-2",
              onClick: handleAdd
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "px-7 mb-5" }, [
                createVNode("div", { class: "flex flex-col align-items-center gap-3 mb-5" }, [
                  createVNode("label", {
                    for: "listname",
                    class: "font-semibold w-6rem text-lg"
                  }, [
                    createTextVNode("List name "),
                    createVNode("span", { class: "text-red-400" }, "*")
                  ]),
                  createVNode(_component_InputText, {
                    id: "listname",
                    class: "flex-auto",
                    modelValue: listName.value,
                    "onUpdate:modelValue": ($event) => listName.value = $event,
                    placeholder: "List name",
                    autocomplete: "off"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ])
              ]),
              createVNode("div", { class: "px-7 mb-5" }, [
                createVNode("p", { class: "text-lg font-medium" }, "Used in"),
                createVNode("div", { class: "ml-2 py-2" }, [
                  (openBlock(), createBlock(Fragment, null, renderList(listOptions, (list) => {
                    return createVNode("p", { class: "text-lg" }, [
                      createVNode("i", { class: "mr-2 pi pi-minus" }),
                      createTextVNode(" " + toDisplayString(list.option), 1)
                    ]);
                  }), 64))
                ]),
                createVNode("div")
              ]),
              createVNode("div", { class: "flex justify-center mt-10 mr-5" }, [
                withDirectives(createVNode(_component_Button, {
                  label: "Syncing options",
                  disabled: "",
                  severity: "secondary",
                  class: "whitespace-nowrap hover:border-gray-300 text-white w-40 cursor-default",
                  onClick: () => {
                  }
                }, null, 8, ["onClick"]), [
                  [
                    _directive_tooltip,
                    {
                      value: "Upcoming functionality"
                    },
                    void 0,
                    { top: true }
                  ]
                ]),
                createVNode(_component_Button, {
                  label: "Save",
                  icon: "pi pi-check",
                  class: "bg-success text-white hover:bg-success hover:border-success w-28 ml-2",
                  onClick: handleAdd
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/settings/list/ListOptionModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "CreateSublistModal",
  __ssrInlineRender: true,
  props: {
    level: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  emits: ["createSubSubList", "cancel", "error", "success"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const visible = ref(false);
    const listType = ref("simple");
    const sublistItem = ref("");
    const sublistItems = ref([]);
    const addClicked = ref(false);
    const selectedFiles = ref([]);
    const hasError = ref(false);
    const fileErrorText = ref("");
    const toast = useToast();
    const dataSourceFileCompleteJSON = ref([]);
    const dataSourceColumnNames = ref([]);
    const dataSourceSelectedColumns = ref([]);
    const dataSourceSelectedRows = ref([]);
    const fileName = ref();
    const fileupload = ref(null);
    const isSublistSimple = ref(true);
    const tableName = ref();
    const handleAdd = () => {
      const items = sublistItem.value.split(/[\n,]+/).map((item) => item.trim()).filter((item) => item !== "").map((item) => ({ name: item }));
      sublistItems.value = sublistItems.value.concat(items);
    };
    const onFileSelect = (event) => {
      const files = event.files;
      if (files.length > 1) {
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "Only one file allowed",
          life: 3e3
        });
        fileErrorText.value = "Only one file is allowed";
        hasError.value = true;
        setTimeout(() => {
          hasError.value = false;
        }, 3e3);
        return;
      }
      const invalidFiles = files.filter((file) => !isValidFileType(file));
      if (invalidFiles.length > 0) {
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "Only CSV or XLSX files are allowed",
          life: 3e3
        });
        fileErrorText.value = "Only CSV or XLSX files are allowed";
        hasError.value = true;
        setTimeout(() => {
          hasError.value = false;
        }, 3e3);
        return;
      }
      selectedFiles.value = files;
    };
    const handleDrop = (event) => {
      const files = Array.from(event.dataTransfer.files);
      if (files.length > 1) {
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "Only one file allowed",
          life: 3e3
        });
        fileErrorText.value = "Only one file is allowed";
        hasError.value = true;
        setTimeout(() => {
          hasError.value = false;
        }, 3e3);
        return;
      }
      const invalidFiles = files.filter((file) => !isValidFileType(file));
      if (invalidFiles.length > 0) {
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "Only CSV or XLSX files are allowed",
          life: 3e3
        });
        hasError.value = true;
        setTimeout(() => {
          hasError.value = false;
        }, 3e3);
        return;
      }
      selectedFiles.value = files;
    };
    const triggerFileInput = () => {
      fileupload.value.choose();
    };
    const removeFiles = () => {
      selectedFiles.value = [];
    };
    const handleDragEnter = () => {
      hasError.value = false;
    };
    const handleDragLeave = () => {
      hasError.value = false;
    };
    const validFileTypes = [".csv", ".xlsx"];
    function isValidFileType(file) {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      return validFileTypes.includes(`.${fileExtension}`);
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
                return { ...f };
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
              return { ...f };
            });
          } catch (error) {
            console.error("Error processing file:", error);
            throw error;
          }
        }
      }
    }
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
        dataSourceSelectedColumns.value = Object.keys(JSON2[0]);
      }
    });
    const handleCreateList = () => {
      addClicked.value = true;
      if (listType.value === "simple" && sublistItems.value.length > 0) {
        isSublistSimple.value = true;
        sublistItems.value = sublistItems.value.map((item, index) => {
          return {
            id: index,
            title: item.name,
            isHovered: false,
            level: props.level + 1,
            isSublistSimple: false,
            sublists: []
          };
        });
        emit("createSubSubList", {
          sublistItems: sublistItems.value,
          isSublistSimple: isSublistSimple.value
        });
        emit("success");
      } else if (listType.value === "dataSource" && selectedFiles.value.length > 0 && tableName.value !== "") {
        isSublistSimple.value = false;
        emit("createSubSubList", {
          sublistItems: dataSourceFileCompleteJSON.value,
          isSublistSimple: isSublistSimple.value,
          name: tableName.value
        });
        emit("success");
      } else if (listType.value === "dataSource" && !tableName.value) {
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "Table name is required",
          life: 3e3
        });
      }
    };
    const deleteItem = (data) => {
      sublistItems.value = sublistItems.value.filter(
        (item) => item.name !== data.name
      );
    };
    ref([
      { field: "name", header: "Name" },
      { field: "action", header: "Action" }
    ]);
    const onRowReorder = (event) => {
      sublistItems.value = event.value;
    };
    const handleChangeSelectedColumns = (data) => {
      dataSourceSelectedColumns.value = data;
    };
    const handleChangeSelectedRows = (data) => {
      dataSourceSelectedRows.value = data;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script$7;
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      const _component_InputText = script$5;
      _push(ssrRenderComponent(_component_Dialog, mergeProps({
        visible: visible.value,
        "onUpdate:visible": ($event) => visible.value = $event,
        modal: "",
        draggable: false,
        style: { width: "40rem", height: "60rem" }
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-center items-center ml-5"${_scopeId}><p class="font-semibold text-xl flex justify-center text-center"${_scopeId}> Create sublist </p></div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-center items-center ml-5" }, [
                createVNode("p", { class: "font-semibold text-xl flex justify-center text-center" }, " Create sublist ")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="px-5 overflow-y-auto h-[70vh]" style="${ssrRenderStyle({ "max-height": "calc(100% - 4rem)" })}"${_scopeId}><div class="flex flex-col align-items-center gap-3 mb-5"${_scopeId}><label class="font-semibold w-6rem text-lg"${_scopeId}>List Type</label><div class="flex gap-2"${_scopeId}><button class="${ssrRenderClass([
              listType.value === "simple" ? "bg-success text-white hover:bg-success hover:border-success" : "  hover:bg-success hover:scale-105 transition-all transform duration-300 ease-in-out hover:text-white",
              "px-4 py-2 rounded-lg border "
            ])}"${_scopeId}> Simple List </button><button class="${ssrRenderClass([
              listType.value === "dataSource" ? "bg-success text-white hover:bg-success hover:border-success" : "  hover:bg-success hover:scale-105 transition-all transform duration-300 ease-in-out hover:text-white",
              "px-4 py-2 rounded-lg border "
            ])}"${_scopeId}> Data Source </button></div></div>`);
            if (listType.value === "simple") {
              _push2(`<div${_scopeId}><div class="flex flex-col align-items-center gap-2 mb-3"${_scopeId}><label for="sublistitems" class="font-semibold w-6rem text-lg"${_scopeId}>Sublist items <span class="text-red-400"${_scopeId}>*</span></label><span class="text-sm text-surface-500"${_scopeId}>Multiple entries are allowed <br${_scopeId}>(Comma separated entries)</span>`);
              if (addClicked.value && sublistItems.value.length === 0) {
                _push2(`<span class="text-sm text-error"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_font_awesome_icon, {
                  icon: ["fas", "exclamation-triangle"],
                  class: "text-error mr-2"
                }, null, _parent2, _scopeId));
                _push2(` You should Add Items! </span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(unref(script$2), {
                id: "sublistItems",
                modelValue: sublistItem.value,
                "onUpdate:modelValue": ($event) => sublistItem.value = $event,
                rows: "10",
                cols: "30",
                placeholder: "List item",
                invalid: addClicked.value && sublistItem.value === ""
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
              _push2(ssrRenderComponent(unref(script$3), {
                label: "Add",
                icon: "pi pi-plus",
                onClick: handleAdd,
                class: "bg-success text-white hover:bg-success hover:border-success my-2"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(script), {
                value: sublistItems.value,
                "striped-rows": "",
                "show-gridlines": "",
                reorderableColumns: true,
                onRowReorder,
                tableStyle: "min-width: 30rem"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(script$1), {
                      field: "index",
                      "body-style": { margin: "0rem", padding: "0rem" },
                      rowReorder: "",
                      style: { "width": "3%" }
                    }, {
                      rowreordericon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_font_awesome_icon, {
                            icon: ["fas", "bars"],
                            class: "cursor-move p-6",
                            "data-pc-section": "rowreordericon"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_font_awesome_icon, {
                              icon: ["fas", "bars"],
                              class: "cursor-move p-6",
                              "data-pc-section": "rowreordericon"
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(script$1), {
                      field: "name",
                      header: "Name",
                      "body-style": { margin: "0rem", padding: "0rem" }
                    }, {
                      body: withCtx(({ data }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<p class="ml-2"${_scopeId3}>${ssrInterpolate(data["name"])}</p>`);
                        } else {
                          return [
                            createVNode("p", { class: "ml-2" }, toDisplayString(data["name"]), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(script$1), {
                      field: "action",
                      header: "Actions",
                      style: { "width": "3%" }
                    }, {
                      body: withCtx(({ data }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="flex justify-center"${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_font_awesome_icon, {
                            icon: ["fas", "trash-alt"],
                            class: "text-error cursor-pointer",
                            onClick: ($event) => deleteItem(data)
                          }, null, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("div", { class: "flex justify-center" }, [
                              createVNode(_component_font_awesome_icon, {
                                icon: ["fas", "trash-alt"],
                                class: "text-error cursor-pointer",
                                onClick: ($event) => deleteItem(data)
                              }, null, 8, ["onClick"])
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(script$1), {
                        field: "index",
                        "body-style": { margin: "0rem", padding: "0rem" },
                        rowReorder: "",
                        style: { "width": "3%" }
                      }, {
                        rowreordericon: withCtx(() => [
                          createVNode(_component_font_awesome_icon, {
                            icon: ["fas", "bars"],
                            class: "cursor-move p-6",
                            "data-pc-section": "rowreordericon"
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(script$1), {
                        field: "name",
                        header: "Name",
                        "body-style": { margin: "0rem", padding: "0rem" }
                      }, {
                        body: withCtx(({ data }) => [
                          createVNode("p", { class: "ml-2" }, toDisplayString(data["name"]), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(script$1), {
                        field: "action",
                        header: "Actions",
                        style: { "width": "3%" }
                      }, {
                        body: withCtx(({ data }) => [
                          createVNode("div", { class: "flex justify-center" }, [
                            createVNode(_component_font_awesome_icon, {
                              icon: ["fas", "trash-alt"],
                              class: "text-error cursor-pointer",
                              onClick: ($event) => deleteItem(data)
                            }, null, 8, ["onClick"])
                          ])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<div class="py-2"${_scopeId}><div class="flex flex-col gap-2 mb-3"${_scopeId}><label for="tableName" class="font-semibold w-6rem text-lg"${_scopeId}> Table Name <span class="text-red-400"${_scopeId}>*</span></label>`);
              if (addClicked.value && tableName.value === "") {
                _push2(`<span class="text-sm text-error"${_scopeId}><i class="pi pi-exclamation-triangle text-error mr-2"${_scopeId}></i> Table name should not be empty! </span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(_component_InputText, {
                id: "tableName",
                modelValue: tableName.value,
                "onUpdate:modelValue": ($event) => tableName.value = $event,
                placeholder: "Enter table name",
                invalid: addClicked.value && tableName.value === ""
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
              if (addClicked.value && selectedFiles.value.length === 0) {
                _push2(`<span class="text-sm text-error"${_scopeId}><i class="pi pi-exclamation-triangle text-error mr-2"${_scopeId}></i> You should select a file! </span>`);
              } else {
                _push2(`<!---->`);
              }
              if (selectedFiles.value.length === 0) {
                _push2(`<div class="${ssrRenderClass([{ "error-border": hasError.value }, "custom-file-upload"])}"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(script$4), {
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
                _push2(ssrRenderComponent(unref(script$3), {
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
                _push2(ssrRenderComponent(unref(script$3), {
                  severity: "danger",
                  outlined: "",
                  label: "Remove",
                  icon: "pi pi-times",
                  class: "mt-4 font-poppins",
                  onClick: removeFiles
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              }
              if (((_a = dataSourceFileCompleteJSON.value) == null ? void 0 : _a.length) > 0) {
                _push2(ssrRenderComponent(_sfc_main$8, {
                  "data-source-file-complete-j-s-o-n": dataSourceFileCompleteJSON.value,
                  "data-source-column-names": dataSourceColumnNames.value,
                  "data-source-selected-columns": dataSourceSelectedColumns.value,
                  "data-source-selected-rows": dataSourceSelectedRows.value,
                  onChangeSelectedColumns: handleChangeSelectedColumns,
                  onChangeSelectedRows: handleChangeSelectedRows
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            }
            _push2(`</div><div class="flex justify-center mt-5"${_scopeId}>`);
            if (listType.value !== "dataSource" || tableName.value) {
              _push2(ssrRenderComponent(unref(script$3), {
                label: "Create sublist",
                icon: "pi pi-check",
                class: "bg-success text-white hover:bg-success hover:border-success flex justify-center text-center",
                onClick: handleCreateList
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", {
                class: "px-5 overflow-y-auto h-[70vh]",
                style: { "max-height": "calc(100% - 4rem)" }
              }, [
                createVNode("div", { class: "flex flex-col align-items-center gap-3 mb-5" }, [
                  createVNode("label", { class: "font-semibold w-6rem text-lg" }, "List Type"),
                  createVNode("div", { class: "flex gap-2" }, [
                    createVNode("button", {
                      class: [
                        listType.value === "simple" ? "bg-success text-white hover:bg-success hover:border-success" : "  hover:bg-success hover:scale-105 transition-all transform duration-300 ease-in-out hover:text-white",
                        "px-4 py-2 rounded-lg border "
                      ],
                      onClick: ($event) => listType.value = "simple"
                    }, " Simple List ", 10, ["onClick"]),
                    createVNode("button", {
                      class: [
                        listType.value === "dataSource" ? "bg-success text-white hover:bg-success hover:border-success" : "  hover:bg-success hover:scale-105 transition-all transform duration-300 ease-in-out hover:text-white",
                        "px-4 py-2 rounded-lg border "
                      ],
                      onClick: ($event) => listType.value = "dataSource"
                    }, " Data Source ", 10, ["onClick"])
                  ])
                ]),
                listType.value === "simple" ? (openBlock(), createBlock("div", { key: 0 }, [
                  createVNode("div", { class: "flex flex-col align-items-center gap-2 mb-3" }, [
                    createVNode("label", {
                      for: "sublistitems",
                      class: "font-semibold w-6rem text-lg"
                    }, [
                      createTextVNode("Sublist items "),
                      createVNode("span", { class: "text-red-400" }, "*")
                    ]),
                    createVNode("span", { class: "text-sm text-surface-500" }, [
                      createTextVNode("Multiple entries are allowed "),
                      createVNode("br"),
                      createTextVNode("(Comma separated entries)")
                    ]),
                    addClicked.value && sublistItems.value.length === 0 ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "text-sm text-error"
                    }, [
                      createVNode(_component_font_awesome_icon, {
                        icon: ["fas", "exclamation-triangle"],
                        class: "text-error mr-2"
                      }),
                      createTextVNode(" You should Add Items! ")
                    ])) : createCommentVNode("", true),
                    createVNode(unref(script$2), {
                      id: "sublistItems",
                      modelValue: sublistItem.value,
                      "onUpdate:modelValue": ($event) => sublistItem.value = $event,
                      rows: "10",
                      cols: "30",
                      placeholder: "List item",
                      invalid: addClicked.value && sublistItem.value === ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "invalid"])
                  ]),
                  createVNode(unref(script$3), {
                    label: "Add",
                    icon: "pi pi-plus",
                    onClick: handleAdd,
                    class: "bg-success text-white hover:bg-success hover:border-success my-2"
                  }),
                  createVNode(unref(script), {
                    value: sublistItems.value,
                    "striped-rows": "",
                    "show-gridlines": "",
                    reorderableColumns: true,
                    onRowReorder,
                    tableStyle: "min-width: 30rem"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(script$1), {
                        field: "index",
                        "body-style": { margin: "0rem", padding: "0rem" },
                        rowReorder: "",
                        style: { "width": "3%" }
                      }, {
                        rowreordericon: withCtx(() => [
                          createVNode(_component_font_awesome_icon, {
                            icon: ["fas", "bars"],
                            class: "cursor-move p-6",
                            "data-pc-section": "rowreordericon"
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(script$1), {
                        field: "name",
                        header: "Name",
                        "body-style": { margin: "0rem", padding: "0rem" }
                      }, {
                        body: withCtx(({ data }) => [
                          createVNode("p", { class: "ml-2" }, toDisplayString(data["name"]), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(script$1), {
                        field: "action",
                        header: "Actions",
                        style: { "width": "3%" }
                      }, {
                        body: withCtx(({ data }) => [
                          createVNode("div", { class: "flex justify-center" }, [
                            createVNode(_component_font_awesome_icon, {
                              icon: ["fas", "trash-alt"],
                              class: "text-error cursor-pointer",
                              onClick: ($event) => deleteItem(data)
                            }, null, 8, ["onClick"])
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["value"])
                ])) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "py-2"
                }, [
                  createVNode("div", { class: "flex flex-col gap-2 mb-3" }, [
                    createVNode("label", {
                      for: "tableName",
                      class: "font-semibold w-6rem text-lg"
                    }, [
                      createTextVNode(" Table Name "),
                      createVNode("span", { class: "text-red-400" }, "*")
                    ]),
                    addClicked.value && tableName.value === "" ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "text-sm text-error"
                    }, [
                      createVNode("i", { class: "pi pi-exclamation-triangle text-error mr-2" }),
                      createTextVNode(" Table name should not be empty! ")
                    ])) : createCommentVNode("", true),
                    createVNode(_component_InputText, {
                      id: "tableName",
                      modelValue: tableName.value,
                      "onUpdate:modelValue": ($event) => tableName.value = $event,
                      placeholder: "Enter table name",
                      invalid: addClicked.value && tableName.value === ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "invalid"])
                  ]),
                  addClicked.value && selectedFiles.value.length === 0 ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "text-sm text-error"
                  }, [
                    createVNode("i", { class: "pi pi-exclamation-triangle text-error mr-2" }),
                    createTextVNode(" You should select a file! ")
                  ])) : createCommentVNode("", true),
                  selectedFiles.value.length === 0 ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: ["custom-file-upload", { "error-border": hasError.value }],
                    onDragover: withModifiers(() => {
                    }, ["prevent"]),
                    onDragenter: withModifiers(handleDragEnter, ["prevent"]),
                    onDragleave: withModifiers(handleDragLeave, ["prevent"]),
                    onDrop: withModifiers(handleDrop, ["prevent"])
                  }, [
                    createVNode(unref(script$4), {
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
                      createVNode(unref(script$3), {
                        label: "Browse",
                        icon: "pi pi-plus",
                        class: "font-poppins mt-4",
                        onClick: triggerFileInput
                      })
                    ])
                  ], 42, ["onDragover"])) : (openBlock(), createBlock("div", {
                    key: 2,
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
                    createVNode(unref(script$3), {
                      severity: "danger",
                      outlined: "",
                      label: "Remove",
                      icon: "pi pi-times",
                      class: "mt-4 font-poppins",
                      onClick: removeFiles
                    })
                  ])),
                  ((_b = dataSourceFileCompleteJSON.value) == null ? void 0 : _b.length) > 0 ? (openBlock(), createBlock(_sfc_main$8, {
                    key: 3,
                    "data-source-file-complete-j-s-o-n": dataSourceFileCompleteJSON.value,
                    "data-source-column-names": dataSourceColumnNames.value,
                    "data-source-selected-columns": dataSourceSelectedColumns.value,
                    "data-source-selected-rows": dataSourceSelectedRows.value,
                    onChangeSelectedColumns: handleChangeSelectedColumns,
                    onChangeSelectedRows: handleChangeSelectedRows
                  }, null, 8, ["data-source-file-complete-j-s-o-n", "data-source-column-names", "data-source-selected-columns", "data-source-selected-rows"])) : createCommentVNode("", true)
                ]))
              ]),
              createVNode("div", { class: "flex justify-center mt-5" }, [
                listType.value !== "dataSource" || tableName.value ? (openBlock(), createBlock(unref(script$3), {
                  key: 0,
                  label: "Create sublist",
                  icon: "pi pi-check",
                  class: "bg-success text-white hover:bg-success hover:border-success flex justify-center text-center",
                  onClick: handleCreateList
                })) : createCommentVNode("", true)
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/settings/list/CreateSublistModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "list",
  __ssrInlineRender: true,
  setup(__props) {
    const copiedList = ref(JSON.parse(JSON.stringify(addNewListItem.value)));
    const toast = useToast();
    const visible = ref(false);
    const openAddItems = ref(false);
    const addItemsTitle = ref("");
    const openListOptions = ref(false);
    const openItemOptions = ref(false);
    const openDeleteModal = ref(false);
    const editableItem = ref();
    const tableData = ref({});
    const deleteItem = ref();
    const openCreateSubList = ref(false);
    const currentListLevel = ref();
    const currentListTitle = ref();
    const isSublistSimple = ref(true);
    const sublistId = ref();
    const sublistPath = ref();
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
      console.log("fileteredList is ", filteredList.value);
      if (!searchQuery.value)
        return copiedList.value;
      return filterItems(addNewListItem.value, (item) => {
        return item.title.toLowerCase().includes(searchQuery.value.toLowerCase());
      });
    });
    watch(searchQuery, (newValue, oldValue) => {
      if (newValue === "") {
        filteredLists.value = addNewListItem.value;
      } else {
        filteredLists.value = filteredList.value;
      }
    });
    const treeData = computed(() => {
      const transformData = (items) => {
        return items.map((item) => ({
          nodeId: item.path,
          nodeText: item.title,
          nodeChild: item.sublists ? transformData(item.sublists) : [],
          cssClass: item.sublists && item.sublists.length > 0 ? "clickable" : "non-clickable"
        }));
      };
      console.log("filteredLists inside the treeData", filteredLists.value);
      return transformData(filteredLists.value);
    });
    console.log("treeData outside the treeData", filteredLists.value);
    const treeFields = ref({
      dataSource: treeData,
      id: "nodeId",
      text: "nodeText",
      child: "nodeChild"
    });
    const onNodeClicked = (args) => {
      const clickedNode = args.node;
      console.log("clickedNode", clickedNode);
      const nodeId = clickedNode.getAttribute("data-uid");
      const clickedItem = findItemByPath(addNewListItem.value, nodeId, "treeView");
      if (!clickedItem || !clickedItem.sublists || clickedItem.sublists.length === 0) {
        args.event.preventDefault();
        return;
      }
      if (clickedItem) {
        handleopensubmenu(clickedItem);
      }
    };
    const onNodeDragStop = (args) => {
      const draggedNodeId = args.draggedNodeData.id;
      const droppedNodeId = args.droppedNodeData.id;
      const dropPosition = args.dropPosition;
      const draggedItem = findItemByPath(addNewListItem.value, draggedNodeId, "treeView");
      removeItemByPath(addNewListItem.value, draggedNodeId);
      const droppedItem = findItemByPath(addNewListItem.value, droppedNodeId, "treeView");
      if (dropPosition === "before") {
        insertBefore(addNewListItem.value, droppedItem, draggedItem);
      } else if (dropPosition === "after") {
        insertAfter(addNewListItem.value, droppedItem, draggedItem);
      } else if (dropPosition === "inside") {
        insertInside(droppedItem, draggedItem);
      }
      tableData.value = { ...tableData.value };
    };
    const removeItemByPath = (list, path) => {
      for (let i = 0; i < list.length; i++) {
        if (list[i].path === path) {
          list.splice(i, 1);
          return true;
        }
        if (Array.isArray(list[i].sublists) && list[i].sublists.length > 0) {
          const found = removeItemByPath(list[i].sublists, path);
          if (found) {
            return true;
          }
        }
      }
      return false;
    };
    const insertBefore = (list, referenceItem, newItem) => {
      for (let i = 0; i < list.length; i++) {
        if (list[i].path === referenceItem.path) {
          list.splice(i, 0, newItem);
          return true;
        }
        if (Array.isArray(list[i].sublists) && list[i].sublists.length > 0) {
          const found = insertBefore(list[i].sublists, referenceItem, newItem);
          if (found) {
            return true;
          }
        }
      }
      return false;
    };
    const insertAfter = (list, referenceItem, newItem) => {
      for (let i = 0; i < list.length; i++) {
        if (list[i].path === referenceItem.path) {
          list.splice(i + 1, 0, newItem);
          return true;
        }
        if (Array.isArray(list[i].sublists) && list[i].sublists.length > 0) {
          const found = insertAfter(list[i].sublists, referenceItem, newItem);
          if (found) {
            return true;
          }
        }
      }
      return false;
    };
    const insertInside = (parentItem, newItem) => {
      if (!Array.isArray(parentItem.sublists)) {
        parentItem.sublists = [];
      }
      parentItem.sublists.push(newItem);
    };
    const handleopensubmenu = (clickedItem) => {
      tableData.value = clickedItem;
    };
    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      list_elements: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
      }
    });
    const createSubList = (data) => {
      openItemOptions.value = false;
      openCreateSubList.value = true;
      sublistId.value = data.id;
      currentListLevel.value = data.level;
      sublistPath.value = data.path;
      currentListTitle.value = data.title;
    };
    const handleCreateSubSublist = (data) => {
      isSublistSimple.value = data.isSublistSimple;
      console.log("data.name", data.name);
      const tableDataList = findItemByPath(
        tableData.value,
        sublistPath.value,
        "tableEdit"
      );
      if (tableDataList) {
        const newSublistItems = data.sublistItems.map((item, index) => {
          if (isSublistSimple.value) {
            const newPath = tableDataList.sublists.length === 0 ? `${tableDataList.path}-1` : `${tableDataList.path}-${tableDataList.sublists.length + index + 1}`;
            return { ...item, path: newPath };
          } else {
            return { ...item };
          }
        });
        if (!isSublistSimple.value) {
          tableDataList.sublists = newSublistItems;
          tableDataList.name = data.name;
        } else {
          if (tableDataList.isSublistSimple) {
            tableDataList.sublists = Array.isArray(tableDataList.sublists) ? tableDataList.sublists.concat(newSublistItems) : newSublistItems;
          } else {
            tableDataList.sublists = newSublistItems;
          }
        }
        tableDataList.isSublistSimple = data.isSublistSimple;
        openCreateSubList.value = false;
        console.log("tableDataList", tableDataList);
      }
    };
    const findItemByPath = (list, path, from) => {
      if (from === "tableEdit") {
        console.log("list is ", list, " path is ", path);
        if (list.path === path) {
          return list;
        }
        if (Array.isArray(list.sublists)) {
          for (const sublist of list.sublists) {
            const found = findItemByPath(sublist, path, from);
            if (found) {
              return found;
            }
          }
        }
        return null;
      } else if (from === "treeView") {
        for (const item of list) {
          if (item.path === path) {
            return item;
          }
          if (Array.isArray(item.sublists) && item.sublists.length > 0) {
            const found = findItemByPath(item.sublists, path, from);
            if (found) {
              return found;
            }
          }
        }
        return null;
      }
    };
    const handleEditItem = (data) => {
      editableItem.value = data;
      openItemOptions.value = true;
      const itemToEditInAddNewListItem = findItemByPath(
        tableData.value,
        data.path,
        "tableEdit"
      );
      if (itemToEditInAddNewListItem) {
        itemToEditInAddNewListItem.title = data.title;
      }
      const itemToEditInTableData = findItemByPath(
        tableData.value,
        data.path,
        "tableEdit"
      );
      if (itemToEditInTableData) {
        itemToEditInTableData.title = data.title;
      }
      tableData.value = { ...tableData.value };
    };
    const handleOpenAddItems = (title) => {
      addItemsTitle.value = title;
      openAddItems.value = true;
    };
    const handleCreateList = (data) => {
      const { listName, listItems } = data;
      const newSubitems = [];
      listItems.map((listitem, index) => {
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
    };
    const handleAddItems = (data) => {
      const lastid = addNewListItem.value.length;
      data.map((item, index) => {
        const newItem = {
          id: lastid + index + 1,
          title: item.name,
          isHovered: false,
          level: tableData.value.level + 1,
          sublists: []
        };
        tableData.value.sublists.push(newItem);
      });
    };
    const handleOpenDelete = (data) => {
      deleteItem.value = data;
      openDeleteModal.value = true;
    };
    const handleDelete = () => {
      tableData.value.sublists = tableData.value.sublists.filter(
        (item) => item.id !== deleteItem.value.id
      );
      openDeleteModal.value = false;
    };
    const onRowReorder = (event) => {
      tableData.value.sublists = event.value;
    };
    const showSuccess = () => {
      toast.add({
        severity: "success",
        summary: "Success Message",
        detail: "List successfully created.",
        life: 3e3
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = script$3;
      const _component_InputText = script$5;
      const _component_ejs_treeview = resolveComponent("ejs-treeview");
      const _component_Toast = script$6;
      const _component_Dialog = script$7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full flex bg-white overflow-scroll no-scrollbar" }, _attrs))} data-v-879c81d7><div class="px-4 py-2 rounded-md bg-white w-full" data-v-879c81d7><p class="font-semibold text-surface-700 text-xl my-5 ml-1" data-v-879c81d7>List</p><div class="flex flex-col md:flex-row md:justify-between w-full" data-v-879c81d7><div class="flex md:max-w-[30vw] flex-col justify-between h-full overflow-y-scroll pt-5 no-scrollbar" data-v-879c81d7><div class="flex max-md:justify-center ml-1" data-v-879c81d7>`);
      _push(ssrRenderComponent(_component_Button, {
        icon: "pi pi-plus",
        label: "Create new list",
        outlined: "",
        class: "text-success border-success hover:bg-green-50 hover:border-success max-md:w-3/4 w-48",
        onClick: ($event) => visible.value = true
      }, null, _parent));
      _push(`</div><div class="mt-4 flex max-md:justify-center" data-v-879c81d7><span class="relative flex h-10 ml-1 max-md:w-3/4" data-v-879c81d7><i class="pi pi-search absolute top-2/4 -mt-2 left-2 text-surface-400 dark:text-surface-600 text-sm" style="${ssrRenderStyle({ "color": "rgb(117, 119, 120)" })}" data-v-879c81d7></i>`);
      _push(ssrRenderComponent(_component_InputText, {
        modelValue: searchQuery.value,
        "onUpdate:modelValue": ($event) => searchQuery.value = $event,
        placeholder: "Search",
        class: "pl-7 font-normal rounded-md border-gray-300 font-poppins max-md:w-full w-48"
      }, null, _parent));
      _push(`</span></div>`);
      _push(ssrRenderComponent(_component_ejs_treeview, {
        fields: treeFields.value,
        onNodeClicked,
        onNodeDragStop,
        allowDragAndDrop: true
      }, null, _parent));
      _push(`</div><div class="w-full md:max-w-[70vw] py-5 ml-2" data-v-879c81d7><div class="mb-12 max-w-[70vw] relative" data-v-879c81d7>`);
      _push(ssrRenderComponent(DataTableComponent, {
        tableData: tableData.value,
        filters: filters.value,
        onRowReorder,
        onEditItem: handleEditItem,
        onOpenDelete: handleOpenDelete,
        onOpenAddItems: handleOpenAddItems,
        onOpenListOptions: ($event) => openListOptions.value = true,
        onOpenCreateSublistModal: createSubList,
        calledFrom: "root",
        c_level: 0
      }, null, _parent));
      _push(ssrRenderComponent(_component_Toast, null, null, _parent));
      _push(`</div></div></div></div>`);
      _push(ssrRenderComponent(_component_Toast, null, null, _parent));
      if (visible.value) {
        _push(ssrRenderComponent(_sfc_main$5, {
          visible: visible.value,
          "onUpdate:visible": ($event) => visible.value = $event,
          onCreateList: handleCreateList,
          onCancel: ($event) => visible.value = false,
          onError: "showError" in _ctx ? _ctx.showError : unref(showError),
          onSuccess: showSuccess
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (openCreateSubList.value) {
        _push(ssrRenderComponent(_sfc_main$1, {
          visible: openCreateSubList.value,
          "onUpdate:visible": ($event) => openCreateSubList.value = $event,
          level: currentListLevel.value,
          title: currentListTitle.value,
          onCreateSubSubList: handleCreateSubSublist,
          onCancel: ($event) => openCreateSubList.value = false
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$4, {
        visible: openAddItems.value,
        "onUpdate:visible": ($event) => openAddItems.value = $event,
        listTitle: addItemsTitle.value,
        onAddItems: handleAddItems,
        onCancel: ($event) => openAddItems.value = false
      }, null, _parent));
      if (openListOptions.value) {
        _push(ssrRenderComponent(_sfc_main$2, {
          visible: openListOptions.value,
          "onUpdate:visible": ($event) => openListOptions.value = $event,
          onCancel: ($event) => openListOptions.value = false,
          tableData: tableData.value,
          "onUpdate:tableData": ($event) => tableData.value = $event
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (editableItem.value) {
        _push(ssrRenderComponent(_sfc_main$3, {
          visible: openItemOptions.value,
          "onUpdate:visible": ($event) => openItemOptions.value = $event,
          onEditItem: handleEditItem,
          editableItem: editableItem.value,
          "onUpdate:editableItem": ($event) => editableItem.value = $event,
          onCancel: ($event) => openItemOptions.value = false,
          onOpenCreateListModal: createSubList
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
            _push2(`<span class="p-text-secondary block mb-5" data-v-879c81d7${_scopeId}><i class="pi pi-exclamation-triangle text-error mr-2" data-v-879c81d7${_scopeId}></i>Are you sure you want to delete this Item?</span><div class="flex justify-end gap-2" data-v-879c81d7${_scopeId}>`);
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
              onClick: handleDelete,
              class: "bg-error hover:bg-red-500 hover:border-error text-white"
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
                  onClick: handleDelete,
                  class: "bg-error hover:bg-red-500 hover:border-error text-white"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/settings/list.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const List = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-879c81d7"]]);

export { List as default };
//# sourceMappingURL=list-B62i-aLg.mjs.map
