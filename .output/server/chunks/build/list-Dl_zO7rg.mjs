import script from './button.esm-BlFBN1ui.mjs';
import script$1 from './inputtext.esm-WVvhv2iX.mjs';
import script$2 from './toast.esm-CIoHYv1e.mjs';
import script$3 from './dialog.esm-B4HW-uBS.mjs';
import { _ as _export_sfc, f as useToast, F as FilterMatchMode, g as FilterOperator, s as showError } from './entry-DBH90M8C.mjs';
import { useSSRContext, ref, computed, watch, mergeProps, unref, withCtx, createVNode, createTextVNode, resolveComponent, toDisplayString, openBlock, createBlock, createCommentVNode, resolveDirective, Fragment, renderList, withDirectives } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrGetDirectiveProps } from 'vue/server-renderer';
import script$4 from './datatable.esm-DnGa6XyQ.mjs';
import script$5 from './column.esm-IdVfKx_m.mjs';
import script$6 from './textarea.esm-6g4qiBVq.mjs';
import script$7 from './checkbox.esm-C6yPu7v1.mjs';
import { a as addNewListItem } from './newListData-BgpZSL0D.mjs';
import './badge.esm-Bnez2rIR.mjs';
import './basecomponent.esm-DJ-SXevi.mjs';
import './index.esm-D7yS_zGd.mjs';
import './baseicon.esm-LCQp0m0v.mjs';
import './portal.esm-CwYTLDh2.mjs';
import './index.esm-BukADsu2.mjs';
import './index.esm-C8_e7SKq.mjs';
import './index.esm-BlHpSerz.mjs';
import './index.esm-BFJ_AWga.mjs';
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
import './index.esm-IcxfhKML.mjs';
import './index.esm-B0iceWDE.mjs';
import './index.esm-CjJI1mst.mjs';
import './radiobutton.esm-BeBAOoEC.mjs';
import './index.esm-CxGdmqml.mjs';
import './index.esm-BpnZtF_F.mjs';

const _sfc_main$6 = {
  __name: "Table",
  __ssrInlineRender: true,
  props: {
    tableData: Object,
    filters: Object
  },
  setup(__props, { emit: __emit }) {
    const props = __props;
    console.log("tableData", props.tableData);
    const emit = __emit;
    ref(props.filters);
    const expandedRows = ref({});
    const toast = useToast();
    const onRowExpand = (event) => {
      toast.add({ severity: "info", summary: "Row Expanded", detail: event.data.title, life: 3e3 });
    };
    const onRowCollapse = (event) => {
      toast.add({ severity: "success", summary: "Row Collapsed", detail: event.data.title, life: 3e3 });
    };
    const expandAll = () => {
      expandedRows.value = props.tableData.sublists.reduce((acc, item) => (acc[item.id] = true) && acc, {});
    };
    const collapseAll = () => {
      expandedRows.value = null;
    };
    const handleEditItem = (data) => {
      emit("edit-item", data);
    };
    const handleOpenDelete = (data) => {
      emit("open-delete", data);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DataTable = script$4;
      const _component_Button = script;
      const _component_Column = script$5;
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      const _component_Toast = script$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card" }, _attrs))} data-v-9176216d>`);
      _push(ssrRenderComponent(_component_DataTable, {
        expandedRows: expandedRows.value,
        "onUpdate:expandedRows": ($event) => expandedRows.value = $event,
        value: __props.tableData.sublists,
        dataKey: "id",
        onRowExpand,
        onRowCollapse,
        tableStyle: "min-width: 60rem"
      }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-wrap justify-between" data-v-9176216d${_scopeId}><p class="font-poppins" data-v-9176216d${_scopeId}>${ssrInterpolate(__props.tableData.title)}</p><div class="flex flex-wrap justify-end gap-2" data-v-9176216d${_scopeId}>`);
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
              createVNode("div", { class: "flex flex-wrap justify-between" }, [
                createVNode("p", { class: "font-poppins" }, toDisplayString(__props.tableData.title), 1),
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
          if (_push2) {
            _push2(`<div class="p-4" data-v-9176216d${_scopeId}><h5 data-v-9176216d${_scopeId}>Sublists for ${ssrInterpolate(data.title)}</h5>`);
            _push2(ssrRenderComponent(_component_DataTable, {
              value: data.sublists
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Column, {
                    field: "id",
                    header: "Id",
                    sortable: ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Column, {
                    field: "title",
                    header: "Title",
                    sortable: ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Column, {
                    field: "level",
                    header: "Level",
                    sortable: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Column, {
                      field: "id",
                      header: "Id",
                      sortable: ""
                    }),
                    createVNode(_component_Column, {
                      field: "title",
                      header: "Title",
                      sortable: ""
                    }),
                    createVNode(_component_Column, {
                      field: "level",
                      header: "Level",
                      sortable: ""
                    })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "p-4" }, [
                createVNode("h5", null, "Sublists for " + toDisplayString(data.title), 1),
                createVNode(_component_DataTable, {
                  value: data.sublists
                }, {
                  default: withCtx(() => [
                    createVNode(_component_Column, {
                      field: "id",
                      header: "Id",
                      sortable: ""
                    }),
                    createVNode(_component_Column, {
                      field: "title",
                      header: "Title",
                      sortable: ""
                    }),
                    createVNode(_component_Column, {
                      field: "level",
                      header: "Level",
                      sortable: ""
                    })
                  ]),
                  _: 2
                }, 1032, ["value"])
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
              field: "title",
              header: "List elements",
              headerStyle: { height: "4.5rem" }
            }, {
              body: withCtx(({ data, field }, _push3, _parent3, _scopeId2) => {
                var _a, _b;
                if (_push3) {
                  _push3(`<div class="flex items-center space-x-4" data-v-9176216d${_scopeId2}>`);
                  if (((_a = data == null ? void 0 : data.sublists) == null ? void 0 : _a.length) > 0) {
                    _push3(ssrRenderComponent(_component_font_awesome_icon, {
                      icon: ["fat", "list-tree"],
                      style: { "color": "#3d3d3d" }
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(_component_font_awesome_icon, {
                      icon: ["fat", "list-tree"],
                      style: { "color": "#00000000" }
                    }, null, _parent3, _scopeId2));
                  }
                  _push3(`<p class="font-poppins" data-v-9176216d${_scopeId2}>${ssrInterpolate(data[field])}</p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center space-x-4" }, [
                      ((_b = data == null ? void 0 : data.sublists) == null ? void 0 : _b.length) > 0 ? (openBlock(), createBlock(_component_font_awesome_icon, {
                        key: 0,
                        icon: ["fat", "list-tree"],
                        style: { "color": "#3d3d3d" }
                      })) : (openBlock(), createBlock(_component_font_awesome_icon, {
                        key: 1,
                        icon: ["fat", "list-tree"],
                        style: { "color": "#00000000" }
                      })),
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
              style: { "width": "5%" }
            }, {
              body: withCtx(({ data }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex space-x-8" data-v-9176216d${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_font_awesome_icon, {
                    icon: ["fas", "pencil-alt"],
                    class: "text-success text-lg cursor-pointer",
                    onClick: ($event) => handleEditItem(data)
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_font_awesome_icon, {
                    icon: ["fas", "trash-alt"],
                    class: "text-error text-lg cursor-pointer",
                    onClick: ($event) => handleOpenDelete(data)
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex space-x-8" }, [
                      createVNode(_component_font_awesome_icon, {
                        icon: ["fas", "pencil-alt"],
                        class: "text-success text-lg cursor-pointer",
                        onClick: ($event) => handleEditItem(data)
                      }, null, 8, ["onClick"]),
                      createVNode(_component_font_awesome_icon, {
                        icon: ["fas", "trash-alt"],
                        class: "text-error text-lg cursor-pointer",
                        onClick: ($event) => handleOpenDelete(data)
                      }, null, 8, ["onClick"])
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
                field: "title",
                header: "List elements",
                headerStyle: { height: "4.5rem" }
              }, {
                body: withCtx(({ data, field }) => {
                  var _a;
                  return [
                    createVNode("div", { class: "flex items-center space-x-4" }, [
                      ((_a = data == null ? void 0 : data.sublists) == null ? void 0 : _a.length) > 0 ? (openBlock(), createBlock(_component_font_awesome_icon, {
                        key: 0,
                        icon: ["fat", "list-tree"],
                        style: { "color": "#3d3d3d" }
                      })) : (openBlock(), createBlock(_component_font_awesome_icon, {
                        key: 1,
                        icon: ["fat", "list-tree"],
                        style: { "color": "#00000000" }
                      })),
                      createVNode("p", { class: "font-poppins" }, toDisplayString(data[field]), 1)
                    ])
                  ];
                }),
                _: 1
              }),
              createVNode(_component_Column, {
                header: "Actions",
                icon: "pi pi-trash",
                "header-style": "text-center",
                style: { "width": "5%" }
              }, {
                body: withCtx(({ data }) => [
                  createVNode("div", { class: "flex space-x-8" }, [
                    createVNode(_component_font_awesome_icon, {
                      icon: ["fas", "pencil-alt"],
                      class: "text-success text-lg cursor-pointer",
                      onClick: ($event) => handleEditItem(data)
                    }, null, 8, ["onClick"]),
                    createVNode(_component_font_awesome_icon, {
                      icon: ["fas", "trash-alt"],
                      class: "text-error text-lg cursor-pointer",
                      onClick: ($event) => handleOpenDelete(data)
                    }, null, 8, ["onClick"])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Toast, null, null, _parent));
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
const DataTableComponent = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-9176216d"]]);
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
      const _component_Dialog = script$3;
      const _component_InputText = script$1;
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      const _component_Textarea = script$6;
      const _component_Button = script;
      const _component_DataTable = script$4;
      const _component_Column = script$5;
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
      const _component_Dialog = script$3;
      const _component_Textarea = script$6;
      const _component_Button = script;
      _push(ssrRenderComponent(_component_Dialog, mergeProps({
        visible: visible.value,
        "onUpdate:visible": ($event) => visible.value = $event,
        modal: "",
        draggable: false,
        style: { width: "40rem" }
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-center items-center ml-5"${_scopeId}><p class="font-semibold text-xl flex justify-center text-center"${_scopeId}> Add items </p></div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-center items-center ml-5" }, [
                createVNode("p", { class: "font-semibold text-xl flex justify-center text-center" }, " Add items ")
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
    const containsublist = ref(false);
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
    const emitOpenCreateListModal = () => {
      containsublist.value = false;
      emit("openCreateListModal", props.editableItem);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script$3;
      const _component_InputText = script$1;
      const _component_Checkbox = script$7;
      const _component_Button = script;
      _push(ssrRenderComponent(_component_Dialog, mergeProps({
        visible: visible.value,
        "onUpdate:visible": ($event) => visible.value = $event,
        modal: "",
        draggable: false,
        style: { width: "40rem" }
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-center items-center ml-5"${_scopeId}><p class="font-semibold text-xl flex justify-center text-center"${_scopeId}> Item options </p></div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-center items-center ml-5" }, [
                createVNode("p", { class: "font-semibold text-xl flex justify-center text-center" }, " Item options ")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="px-5 my-5"${_scopeId}><div class="flex flex-col align-items-center gap-3 mb-5"${_scopeId}><label for="listname" class="font-semibold w-6rem text-lg"${_scopeId}>Item name <span class="text-red-400"${_scopeId}>*</span></label>`);
            _push2(ssrRenderComponent(_component_InputText, {
              id: "listname",
              class: "flex-auto",
              modelValue: listItemName.value,
              "onUpdate:modelValue": ($event) => listItemName.value = $event,
              placeholder: "list Item Name",
              autocomplete: "off"
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
            if (((_a = props.editableItem) == null ? void 0 : _a.level) != 3) {
              _push2(`<div class="flex align-items-center px-5 mt-5"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Checkbox, {
                modelValue: containsublist.value,
                "onUpdate:modelValue": ($event) => containsublist.value = $event,
                inputId: "containsublist",
                name: "sublist",
                value: "sublist",
                binary: true
              }, null, _parent2, _scopeId));
              _push2(`<label for="containsublist" class="ml-2"${_scopeId}>Contains sublist</label></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex justify-center mt-5 mr-5"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Button, {
              label: "Save",
              icon: "pi pi-check",
              class: "bg-success text-white hover:bg-success hover:border-success w-28",
              onClick: handleEditItem
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_Dialog, {
              visible: containsublist.value,
              "onUpdate:visible": ($event) => containsublist.value = $event,
              header: "Sublist",
              modal: "",
              style: { width: "25rem" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="p-text-secondary block mb-5"${_scopeId2}>Do you want to create a new Sublist?</span><div class="flex justify-end gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Button, {
                    type: "button",
                    label: "No",
                    outlined: "",
                    onClick: ($event) => containsublist.value = false
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, {
                    type: "button",
                    label: "Yes",
                    onClick: emitOpenCreateListModal
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("span", { class: "p-text-secondary block mb-5" }, "Do you want to create a new Sublist?"),
                    createVNode("div", { class: "flex justify-end gap-2" }, [
                      createVNode(_component_Button, {
                        type: "button",
                        label: "No",
                        outlined: "",
                        onClick: ($event) => containsublist.value = false
                      }, null, 8, ["onClick"]),
                      createVNode(_component_Button, {
                        type: "button",
                        label: "Yes",
                        onClick: emitOpenCreateListModal
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "px-5 my-5" }, [
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
                    placeholder: "list Item Name",
                    autocomplete: "off"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ])
              ]),
              ((_b = props.editableItem) == null ? void 0 : _b.level) != 3 ? (openBlock(), createBlock("div", {
                key: 0,
                class: "flex align-items-center px-5 mt-5"
              }, [
                createVNode(_component_Checkbox, {
                  modelValue: containsublist.value,
                  "onUpdate:modelValue": ($event) => containsublist.value = $event,
                  inputId: "containsublist",
                  name: "sublist",
                  value: "sublist",
                  binary: true
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode("label", {
                  for: "containsublist",
                  class: "ml-2"
                }, "Contains sublist")
              ])) : createCommentVNode("", true),
              createVNode("div", { class: "flex justify-center mt-5 mr-5" }, [
                createVNode(_component_Button, {
                  label: "Save",
                  icon: "pi pi-check",
                  class: "bg-success text-white hover:bg-success hover:border-success w-28",
                  onClick: handleEditItem
                })
              ]),
              createVNode(_component_Dialog, {
                visible: containsublist.value,
                "onUpdate:visible": ($event) => containsublist.value = $event,
                header: "Sublist",
                modal: "",
                style: { width: "25rem" }
              }, {
                default: withCtx(() => [
                  createVNode("span", { class: "p-text-secondary block mb-5" }, "Do you want to create a new Sublist?"),
                  createVNode("div", { class: "flex justify-end gap-2" }, [
                    createVNode(_component_Button, {
                      type: "button",
                      label: "No",
                      outlined: "",
                      onClick: ($event) => containsublist.value = false
                    }, null, 8, ["onClick"]),
                    createVNode(_component_Button, {
                      type: "button",
                      label: "Yes",
                      onClick: emitOpenCreateListModal
                    })
                  ])
                ]),
                _: 1
              }, 8, ["visible", "onUpdate:visible"])
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
      const _component_Dialog = script$3;
      const _component_InputText = script$1;
      const _component_Button = script;
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
              class: "bg-gray-400 hover:bg-gray-400 hover:border-gray-300 text-white w-40 cursor-default",
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
                  class: "bg-gray-400 hover:bg-gray-400 hover:border-gray-300 text-white w-40 cursor-default",
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
    }
  },
  emits: ["createList", "cancel", "error", "success"],
  setup(__props, { emit: __emit }) {
    console.log("am I called in createSublistmodal");
    const emit = __emit;
    const props = __props;
    const visible = ref(false);
    ref("");
    const sublistItem = ref("");
    const sublistItems = ref([]);
    const addClicked = ref(false);
    const handleAdd = () => {
      const items = sublistItem.value.split(/[\n,]+/).map((item) => item.trim()).filter((item) => item !== "").map((item) => ({ name: item }));
      sublistItems.value = sublistItems.value.concat(items);
    };
    const handleCreateList = () => {
      addClicked.value = true;
      if (sublistItems.value.length > 0) {
        sublistItems.value = sublistItems.value.map((item, index) => {
          return {
            id: index,
            title: item.name,
            isHovered: false,
            level: props.level + 1
          };
        });
        emit("createSubSubList", { sublistItems: sublistItems.value });
        sublistItem.value = "";
        sublistItems.value = [];
        emit("success");
        emit("cancel");
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
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dialog = script$3;
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      const _component_Textarea = script$6;
      const _component_Button = script;
      const _component_DataTable = script$4;
      const _component_Column = script$5;
      _push(ssrRenderComponent(_component_Dialog, mergeProps({
        visible: visible.value,
        "onUpdate:visible": ($event) => visible.value = $event,
        modal: "",
        draggable: false,
        style: { width: "40rem" }
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
          if (_push2) {
            _push2(`<div class="px-5"${_scopeId}><div class="flex flex-col align-items-center gap-2 mb-3"${_scopeId}><label for="sublistitems" class="font-semibold w-6rem text-lg"${_scopeId}>Sublist items <span class="text-red-400"${_scopeId}>*</span></label><span class="text-sm text-surface-500"${_scopeId}>Multiple entries are allowed <br${_scopeId}> (Comma separated entries)</span>`);
            if (addClicked.value && sublistItems.value.length === 0) {
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
              id: "sublistItems",
              modelValue: sublistItem.value,
              "onUpdate:modelValue": ($event) => sublistItem.value = $event,
              rows: "10",
              cols: "30",
              placeholder: "List item",
              invalid: addClicked.value && sublistItem.value === ""
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_Button, {
              label: "Add",
              icon: "pi pi-plus",
              onClick: handleAdd,
              class: "bg-success text-white hover:bg-success hover:border-success my-2"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_DataTable, {
              value: sublistItems.value,
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
              label: "Create sublist",
              icon: "pi pi-check",
              class: "bg-success text-white hover:bg-success hover:border-success flex justify-center text-center",
              onClick: handleCreateList
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "px-5" }, [
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
                    createTextVNode(" (Comma separated entries)")
                  ]),
                  addClicked.value && sublistItems.value.length === 0 ? (openBlock(), createBlock("span", {
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
                    id: "sublistItems",
                    modelValue: sublistItem.value,
                    "onUpdate:modelValue": ($event) => sublistItem.value = $event,
                    rows: "10",
                    cols: "30",
                    placeholder: "List item",
                    invalid: addClicked.value && sublistItem.value === ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "invalid"])
                ]),
                createVNode(_component_Button, {
                  label: "Add",
                  icon: "pi pi-plus",
                  onClick: handleAdd,
                  class: "bg-success text-white hover:bg-success hover:border-success my-2"
                }),
                createVNode(_component_DataTable, {
                  value: sublistItems.value,
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
                  label: "Create sublist",
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
    const openListOptions = ref(false);
    const openItemOptions = ref(false);
    const openDeleteModal = ref(false);
    const editableItem = ref();
    const tableData = ref({});
    const deleteItem = ref();
    const openCreateSubList = ref(false);
    const currentListLevel = ref();
    const sublistId = ref();
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
    watch(searchQuery, (newValue, oldValue) => {
      if (newValue === "") {
        filteredLists.value = addNewListItem.value;
      } else {
        filteredLists.value = filteredList.value;
      }
    });
    const highlight = (data) => {
      if (searchQuery.value) {
        const pattern = new RegExp(searchQuery.value, "i");
        const highlightedData = data.replace(
          pattern,
          `<span class="bg-primary-100 capitalize">${searchQuery.value}</span>`
        );
        return highlightedData;
      }
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
    };
    const handleCreateSubSublist = (data) => {
      tableData.value.sublists.map((list) => {
        if (list.id === sublistId.value) {
          list.sublists = data.sublistItems;
        }
      });
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
    const handleEditItem = (data) => {
      editableItem.value = data;
      openItemOptions.value = true;
      tableData.value.sublists.map((sublist) => {
        if (sublist.id === data.id) {
          sublist.title = data.title;
        }
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
      const _component_Button = script;
      const _component_InputText = script$1;
      const _component_Toast = script$2;
      const _component_Dialog = script$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full flex bg-white overflow-scroll no-scrollbar" }, _attrs))} data-v-8f23d34f><div class="px-4 py-2 rounded-md bg-white w-full" data-v-8f23d34f><p class="font-semibold text-surface-700 text-xl my-5 ml-1" data-v-8f23d34f>List</p><div class="flex w-full" data-v-8f23d34f><div class="flex flex-col justify-between h-full overflow-y-scroll w-64 pt-5 no-scrollbar" data-v-8f23d34f><div class="flex ml-1" data-v-8f23d34f>`);
      _push(ssrRenderComponent(_component_Button, {
        icon: "pi pi-plus",
        label: "Create new list",
        outlined: "",
        class: "text-success border-success hover:bg-green-50 hover:border-success w-48",
        onClick: ($event) => visible.value = true
      }, null, _parent));
      _push(`</div><div class="mt-4" data-v-8f23d34f><span class="relative flex h-10 ml-1" data-v-8f23d34f><i class="pi pi-search absolute top-2/4 -mt-2 left-2 text-surface-400 dark:text-surface-600 text-sm" style="${ssrRenderStyle({ "color": "rgb(117, 119, 120)" })}" data-v-8f23d34f></i>`);
      _push(ssrRenderComponent(_component_InputText, {
        modelValue: searchQuery.value,
        "onUpdate:modelValue": ($event) => searchQuery.value = $event,
        placeholder: "Search",
        class: "pl-7 font-normal rounded-md border-gray-300 font-poppins w-48"
      }, null, _parent));
      _push(`</span></div><ul data-v-8f23d34f><!--[-->`);
      ssrRenderList(filteredLists.value, (items) => {
        var _a;
        _push(`<li class="cursor-pointer flex flex-col mt-4 w-full mr-4" data-v-8f23d34f><div class="flex px-2 py-2 ml-1 hover:bg-surface-100 rounded font-poppins" data-v-8f23d34f><i class="${ssrRenderClass([{
          "pi pi-chevron-down": items.opensubmenu,
          "text-primaryBlue": items.title === tableData.value.title,
          "pi pi-chevron-right": !items.opensubmenu
        }, "pt-1 text-gray-500"])}" data-v-8f23d34f></i><span class="${ssrRenderClass([{
          "text-surface-600": items.isHovered,
          "text-primaryBlue": items.title === tableData.value.title,
          "text-gray-500": !items.isHovered
        }, "text-lg font-normal ml-3"])}" data-v-8f23d34f>${(_a = highlight(items.title) || items.title) != null ? _a : ""}</span></div>`);
        if (items.opensubmenu) {
          _push(`<ul class="ml-3" data-v-8f23d34f><!--[-->`);
          ssrRenderList(items.sublists, (subItem) => {
            var _a2;
            _push(`<li data-v-8f23d34f>`);
            if ((subItem == null ? void 0 : subItem.sublists) && subItem.sublists.length > 0) {
              _push(`<div class="flex py-2 pl-1 hover:bg-surface-100 items-center ml-4 font-poppins" data-v-8f23d34f><i class="${ssrRenderClass([{
                "pi pi-chevron-down": subItem.opensubmenu,
                "text-primaryBlue": subItem.title === tableData.value.title,
                "pi pi-chevron-right": !subItem.opensubmenu
              }, "text-gray-500"])}" data-v-8f23d34f></i><p class="${ssrRenderClass([{
                "text-primaryBlue": subItem.title === tableData.value.title
              }, "text-base font-normal ml-3 text-gray-500"])}" data-v-8f23d34f>${(_a2 = highlight(subItem.title) || subItem.title) != null ? _a2 : ""}</p></div>`);
            } else {
              _push(`<!---->`);
            }
            if (subItem.opensubmenu) {
              _push(`<ul class="ml-3" data-v-8f23d34f><!--[-->`);
              ssrRenderList(subItem.sublists, (subsubItem) => {
                var _a3;
                _push(`<li data-v-8f23d34f>`);
                if ((subsubItem == null ? void 0 : subsubItem.sublists) && subsubItem.sublists.length > 0) {
                  _push(`<div class="ml-5 font-poppins flex py-2 pl-1 hover:bg-surface-100 items-center" data-v-8f23d34f><i class="${ssrRenderClass([{
                    "pi pi-chevron-down": subsubItem.opensubmenu,
                    "text-primaryBlue": subsubItem.title === tableData.value.title,
                    "pi pi-chevron-right": !subsubItem.opensubmenu
                  }, "text-gray-500"])}" data-v-8f23d34f></i><p class="${ssrRenderClass([{
                    "text-primaryBlue": subsubItem.title === tableData.value.title
                  }, "text-base font-normal ml-4 text-gray-500"])}" data-v-8f23d34f>${(_a3 = highlight(subsubItem.title) || subsubItem.title) != null ? _a3 : ""}</p></div>`);
                } else {
                  _push(`<!---->`);
                }
                _push(`</li>`);
              });
              _push(`<!--]--></ul>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</li>`);
          });
          _push(`<!--]--></ul>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div><div class="w-full py-5 ml-2" data-v-8f23d34f><div class="flex flex-col md:flex-row justify-end gap-2" data-v-8f23d34f>`);
      _push(ssrRenderComponent(_component_Button, {
        icon: "pi pi-plus",
        label: "Add item(s)",
        outlined: "",
        onClick: ($event) => openAddItems.value = true,
        class: "text-success border-success hover:bg-green-50"
      }, null, _parent));
      _push(ssrRenderComponent(_component_Button, {
        icon: "pi pi-cog",
        label: "List options",
        class: "p-button-success",
        outlined: "",
        onClick: ($event) => openListOptions.value = true
      }, null, _parent));
      _push(`</div><div class="mt-4 mb-12 ml-2" data-v-8f23d34f>`);
      _push(ssrRenderComponent(DataTableComponent, {
        tableData: tableData.value,
        filters: filters.value,
        onRowReorder,
        onEditItem: handleEditItem,
        onOpenDelete: handleOpenDelete
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
          onCreateSubSubList: handleCreateSubSublist,
          onCancel: ($event) => openCreateSubList.value = false
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$4, {
        visible: openAddItems.value,
        "onUpdate:visible": ($event) => openAddItems.value = $event,
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
            _push2(`<span class="p-text-secondary block mb-5" data-v-8f23d34f${_scopeId}><i class="pi pi-exclamation-triangle text-error mr-2" data-v-8f23d34f${_scopeId}></i>Are you sure you want to delete this Item?</span><div class="flex justify-end gap-2" data-v-8f23d34f${_scopeId}>`);
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
const List = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8f23d34f"]]);

export { List as default };
//# sourceMappingURL=list-Dl_zO7rg.mjs.map
