import script$3 from "./Baw2AddS.js";
import script$5 from "./Dz12RMYV.js";
import script$8 from "./CUcU1_b1.js";
import script$2 from "./BvlYCdsq.js";
import { _ as _export_sfc, r as ref, i as computed, v as openBlock, D as createBlock, B as withCtx, y as createBaseVNode, z as toDisplayString, A as createVNode, E as unref, x as createElementBlock, H as Fragment, I as renderList, F as useToast, J as watch, P as createSlots, K as normalizeClass, G as createCommentVNode, C as createTextVNode, g as resolveComponent, Q as resolveDirective, R as withDirectives, L as withModifiers, o as onMounted, M as showError, N as FilterMatchMode, O as FilterOperator } from "./DyjNdRHt.js";
import script$1 from "./ycwTQksa.js";
import script$4 from "./IKZz7hW5.js";
import script from "./u3Yk3fxT.js";
import script$6 from "./CwTxLw6w.js";
import { _ as __vitePreload } from "./BhN5mE98.js";
import script$7 from "./B-EtTEmN.js";
import { _ as _sfc_main$8, E as ExcelJS, a as addNewListItem } from "./Dov-pDCf.js";
import "./BBVQdFXZ.js";
import "./BWH3yJqN.js";
import "./4wxJ5Old.js";
import "./Dofyt3Eo.js";
import "./jKhOJpVL.js";
import "./CEYdRomh.js";
import "./DliO46ZC.js";
import "./xfCdUIm5.js";
import "./COQKb9jd.js";
import "./3FbTNfyL.js";
import "./drfrg8Wy.js";
import "./Dj7N_jV2.js";
import "./CHirn0gA.js";
import "./QtDYuRef.js";
import "./DGZu76FE.js";
import "./NPriEXSe.js";
import "./Dij0Qyvg.js";
import "./DY6itHiE.js";
import "./C3bhgFCd.js";
import "./_UDGq7dy.js";
import "./BMEOiPYu.js";
import "./bkWGANWE.js";
import "./BK81WfCA.js";
import "./g8Q7qc9G.js";
import "./BfTXC8yA.js";
import "./MXJcw6Bp.js";
import "./D3bA4_PM.js";
import "./D4Z_u5SJ.js";
const _hoisted_1$7 = { class: "custom-header flex justify-start bg-white flex-wrap items-center" };
const _hoisted_2$7 = { class: "font-poppins whitespace-nowrap text-xl font-semibold" };
const _hoisted_3$7 = { class: "font-poppins font-normal flex justify-center whitespace-nowrap py-2" };
const _sfc_main$7 = {
  __name: "DataSourceModal",
  props: {
    tableData: Object
  },
  setup(__props) {
    const props = __props;
    const visible = ref(false);
    console.log("tableData from table", props.tableData);
    const showPaginator = computed(() => {
      return props.tableData.sublists?.length > 5;
    });
    const columns = computed(() => {
      if (props.tableData?.sublists?.length > 0) {
        return Object.keys(props.tableData.sublists[0]).filter(
          (key) => key !== "sublists"
        );
      }
      return [];
    });
    return (_ctx, _cache) => {
      const _component_Dialog = script$2;
      return openBlock(), createBlock(_component_Dialog, {
        visible: visible.value,
        "onUpdate:visible": _cache[0] || (_cache[0] = ($event) => visible.value = $event),
        modal: "",
        draggable: false,
        style: { width: "80vw" },
        dismissableMask: ""
      }, {
        header: withCtx(() => [
          createBaseVNode("div", _hoisted_1$7, [
            createBaseVNode("p", _hoisted_2$7, toDisplayString(__props.tableData.name), 1)
          ])
        ]),
        default: withCtx(() => [
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
              (openBlock(true), createElementBlock(Fragment, null, renderList(columns.value, (column, index) => {
                return openBlock(), createBlock(unref(script$1), {
                  key: index,
                  field: column,
                  header: column,
                  sortable: true
                }, {
                  body: withCtx(({ data, field }) => [
                    createBaseVNode("p", _hoisted_3$7, toDisplayString(data[field]), 1)
                  ]),
                  _: 2
                }, 1032, ["field", "header"]);
              }), 128))
            ]),
            _: 1
          }, 8, ["paginator", "value"])
        ]),
        _: 1
      }, 8, ["visible"]);
    };
  }
};
const DataSourceModal = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-f705380f"]]);
const _hoisted_1$6 = { class: "flex flex-wrap justify-between items-center mt-3 py-3 rounded-lg mx-[16px]" };
const _hoisted_2$6 = { class: "font-poppins font-normal text-lg" };
const _hoisted_3$6 = { class: "flex flex-col md:flex-row justify-end gap-2" };
const _hoisted_4$6 = ["onClick"];
const _hoisted_5$6 = {
  key: 1,
  class: "w-[10px] text-sm"
};
const _hoisted_6$6 = { class: "flex" };
const _hoisted_7$3 = ["onClick"];
const _hoisted_8$3 = {
  key: 1,
  class: "font-poppins fles justify-start font-normal cur"
};
const _hoisted_9$2 = { class: "flex justify-center py-3 px-4 min-w-8 min-h-8" };
const _hoisted_10$2 = { class: "w-8 h-8" };
const _hoisted_11$1 = { class: "font-poppins font-normal flex justify-center mt-3 whitespace-nowrap py-2" };
const _sfc_main$6 = {
  __name: "Table",
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
      return props.tableData.sublists?.length > 5;
    });
    const expandAll = () => {
      if (props.tableData?.sublists) {
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
      return data?.sublists?.length > 0;
    };
    const isChildSublistSimple = (data) => {
      const sublists = data?.sublists;
      if (!data.isSublistSimple && sublists?.length > 0) return false;
      return true;
    };
    const getMenuModel = (data) => {
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
      if (props.tableData?.level < 3) {
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
      return !props.tableData?.isSublistSimple;
    });
    computed(() => {
      return !props.tableData?.label;
    });
    const columns = computed(() => {
      if (!props.tableData.isSublistSimple && props.tableData.sublists?.length > 0) {
        return Object.keys(props.tableData.sublists[0]).filter(
          (key) => key !== "sublists"
        );
      } else if (props.tableData.sublists?.length > 0) {
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
    return (_ctx, _cache) => {
      const _component_Button = script$3;
      const _component_Column = script$1;
      const _component_Menu = script$4;
      const _component_DataTable = script;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([isSublistData.value ? `max-w-[calc(70vw-${__props.c_level * 65}px)]` : "", ""])
      }, [
        createVNode(_component_DataTable, {
          expandedRows: expandedRows.value,
          "onUpdate:expandedRows": _cache[6] || (_cache[6] = ($event) => expandedRows.value = $event),
          value: __props.tableData?.sublists,
          dataKey: "id",
          "striped-rows": "",
          paginator: showPaginator.value,
          rows: 10,
          rowsPerPageOptions: [10, 25, 50],
          paginatorTemplate: "RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink",
          currentPageReportTemplate: "{first} to {last} of {totalRecords}",
          class: "border border-blue-500"
        }, createSlots({
          default: withCtx(() => [
            !isSublistData.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createVNode(_component_Column, { class: "w-[48px] text-center" }, {
                body: withCtx(({ data }) => [
                  hasSublists(data) ? (openBlock(), createElementBlock("span", {
                    key: 0,
                    onClick: ($event) => toggleRow(data),
                    class: "w-[10px] text-sm cursor-pointer"
                  }, [
                    createBaseVNode("i", {
                      class: normalizeClass([
                        expandedRows.value[data.id] && !isChildSublistSimple(data) ? "pi pi-chevron-down" : "pi pi-chevron-right",
                        ""
                      ])
                    }, null, 2)
                  ], 8, _hoisted_4$6)) : (openBlock(), createElementBlock("span", _hoisted_5$6, _cache[9] || (_cache[9] = [
                    createBaseVNode("i", { class: "pi pi-minus" }, null, -1)
                  ])))
                ]),
                _: 1
              }),
              (openBlock(true), createElementBlock(Fragment, null, renderList(columns.value, (column, index) => {
                return openBlock(), createBlock(_component_Column, {
                  key: index,
                  field: column,
                  header: null,
                  sortable: false,
                  class: normalizeClass(["w-[calc(100% - 113px)] custom-padding", headerClass.value])
                }, {
                  body: withCtx(({ data, field }) => [
                    createBaseVNode("div", _hoisted_6$6, [
                      !isChildSublistSimple(data) ? (openBlock(), createElementBlock("p", {
                        key: 0,
                        class: "font-poppins fles justify-start font-normal cursor-pointer",
                        onClick: ($event) => showModal(data)
                      }, [
                        createTextVNode(toDisplayString(data[field]) + " ", 1),
                        _cache[10] || (_cache[10] = createBaseVNode("span", { class: "w-[14px] ml-1" }, [
                          createBaseVNode("i", { class: "pi pi-file-excel text-success" })
                        ], -1))
                      ], 8, _hoisted_7$3)) : (openBlock(), createElementBlock("p", _hoisted_8$3, toDisplayString(data[field]), 1))
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
                  createBaseVNode("div", _hoisted_9$2, [
                    createBaseVNode("div", _hoisted_10$2, [
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
            __props.calledFrom === "root" && isSublistData.value ? (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(columns.value, (column, index) => {
              return openBlock(), createBlock(_component_Column, {
                key: index,
                field: column,
                header: column,
                sortable: true,
                class: normalizeClass(["w-[calc(100% - 80px)] pl-[33px] header-white", headerClass.value])
              }, {
                body: withCtx(({ data, field }) => [
                  createBaseVNode("p", _hoisted_11$1, toDisplayString(data[field]), 1)
                ]),
                _: 2
              }, 1032, ["field", "header", "class"]);
            }), 128)) : createCommentVNode("", true)
          ]),
          _: 2
        }, [
          __props.calledFrom === "root" ? {
            name: "header",
            fn: withCtx(() => [
              createBaseVNode("div", _hoisted_1$6, [
                createBaseVNode("p", _hoisted_2$6, toDisplayString(__props.tableData.title), 1),
                createBaseVNode("div", _hoisted_3$6, [
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
                    onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("open-add-items", __props.tableData.title)),
                    class: "text-success border-success hover:bg-green-50 w-40"
                  })
                ])
              ])
            ]),
            key: "0"
          } : void 0,
          __props.tableData?.sublists?.length ? {
            name: "expansion",
            fn: withCtx(({ data }) => [
              hasSublists(data) ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass([isChildSublistSimple(data) ? "" : "max-w-[calc(70vw-34px)]", "pl-[47px] border-none mb-[-1px] overflow-x-auto"])
              }, [
                createVNode(DataTableComponent, {
                  tableData: data,
                  onOpenAddItems: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("open-add-items", $event)),
                  onOpenListOptions: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("open-list-options")),
                  onEditItem: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("edit-item", $event)),
                  onOpenDelete: _cache[4] || (_cache[4] = ($event) => _ctx.$emit("open-delete", $event)),
                  onOpenCreateSublistModal: _cache[5] || (_cache[5] = ($event) => _ctx.$emit("open-create-sublist-modal", $event)),
                  calledFrom: "nested",
                  class: "w-full",
                  c_level: Number(__props.c_level) + 1
                }, null, 8, ["tableData", "c_level"])
              ], 2)) : createCommentVNode("", true)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["expandedRows", "value", "paginator"]),
        isModalVisible.value ? (openBlock(), createBlock(DataSourceModal, {
          key: 0,
          visible: isModalVisible.value,
          "onUpdate:visible": _cache[7] || (_cache[7] = ($event) => isModalVisible.value = $event),
          tableData: modalTableData.value,
          onCancel: _cache[8] || (_cache[8] = ($event) => isModalVisible.value = false)
        }, null, 8, ["visible", "tableData"])) : createCommentVNode("", true)
      ], 2);
    };
  }
};
const DataTableComponent = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-594aa2bc"]]);
const _hoisted_1$5 = { class: "px-5" };
const _hoisted_2$5 = { class: "flex flex-col align-items-center gap-3 mb-5" };
const _hoisted_3$5 = {
  key: 0,
  class: "text-sm text-error"
};
const _hoisted_4$5 = { class: "flex flex-col align-items-center gap-2 mb-3" };
const _hoisted_5$5 = {
  key: 0,
  class: "text-sm text-error"
};
const _hoisted_6$5 = { class: "ml-2" };
const _hoisted_7$2 = { class: "flex justify-center" };
const _hoisted_8$2 = { class: "flex justify-center mt-5" };
const _sfc_main$5 = {
  __name: "CreateListModal",
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
    return (_ctx, _cache) => {
      const _component_InputText = script$5;
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      const _component_Textarea = script$6;
      const _component_Button = script$3;
      const _component_Column = script$1;
      const _component_DataTable = script;
      const _component_Dialog = script$2;
      return openBlock(), createBlock(_component_Dialog, {
        visible: visible.value,
        "onUpdate:visible": _cache[2] || (_cache[2] = ($event) => visible.value = $event),
        modal: "",
        draggable: false,
        style: { width: "40rem" }
      }, {
        header: withCtx(() => _cache[3] || (_cache[3] = [
          createBaseVNode("div", { class: "flex justify-center items-center ml-5" }, [
            createBaseVNode("p", { class: "font-semibold text-xl flex justify-center text-center" }, " Create list ")
          ], -1)
        ])),
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$5, [
            createBaseVNode("div", _hoisted_2$5, [
              _cache[5] || (_cache[5] = createBaseVNode("label", {
                for: "listname",
                class: "font-semibold w-6rem text-lg"
              }, [
                createTextVNode("List name "),
                createBaseVNode("span", { class: "text-red-400" }, "*")
              ], -1)),
              addClicked.value && listName.value === "" ? (openBlock(), createElementBlock("span", _hoisted_3$5, _cache[4] || (_cache[4] = [
                createBaseVNode("i", { class: "pi pi-exclamation-triangle text-error mr-2" }, null, -1),
                createTextVNode("List name should not be empty!")
              ]))) : createCommentVNode("", true),
              createVNode(_component_InputText, {
                id: "listname",
                class: "flex-auto",
                modelValue: listName.value,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => listName.value = $event),
                placeholder: "List name",
                autocomplete: "off",
                invalid: addClicked.value && listName.value === ""
              }, null, 8, ["modelValue", "invalid"])
            ]),
            createBaseVNode("div", _hoisted_4$5, [
              _cache[7] || (_cache[7] = createBaseVNode("label", {
                for: "listitems",
                class: "font-semibold w-6rem text-lg"
              }, [
                createTextVNode("List items"),
                createBaseVNode("span", { class: "text-red-400" }, "*")
              ], -1)),
              _cache[8] || (_cache[8] = createBaseVNode("span", { class: "text-sm text-surface-500" }, [
                createTextVNode("Multiple entries are allowed "),
                createBaseVNode("br"),
                createTextVNode(" (Comma separated entries)")
              ], -1)),
              addClicked.value && listItems.value.length === 0 ? (openBlock(), createElementBlock("span", _hoisted_5$5, [
                createVNode(_component_font_awesome_icon, {
                  icon: ["fas", "exclamation-triangle"],
                  class: "text-error mr-2"
                }),
                _cache[6] || (_cache[6] = createTextVNode(" You should Add Items!"))
              ])) : createCommentVNode("", true),
              createVNode(_component_Textarea, {
                id: "listItems",
                modelValue: listItem.value,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => listItem.value = $event),
                rows: "10",
                cols: "30",
                placeholder: "List item",
                invalid: addClicked.value && listItem.value === ""
              }, null, 8, ["modelValue", "invalid"])
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
                    createBaseVNode("p", _hoisted_6$5, toDisplayString(data["name"]), 1)
                  ]),
                  _: 1
                }),
                createVNode(_component_Column, {
                  field: "action",
                  header: "Actions",
                  style: { "width": "3%" }
                }, {
                  body: withCtx(({ data }) => [
                    createBaseVNode("div", _hoisted_7$2, [
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
          createBaseVNode("div", _hoisted_8$2, [
            createVNode(_component_Button, {
              label: "Create list",
              icon: "pi pi-check",
              class: "bg-success text-white hover:bg-success hover:border-success flex justify-center text-center",
              onClick: handleCreateList
            })
          ])
        ]),
        _: 1
      }, 8, ["visible"]);
    };
  }
};
const _hoisted_1$4 = { class: "flex justify-center items-center ml-5" };
const _hoisted_2$4 = { class: "font-semibold text-xl flex justify-center text-center" };
const _hoisted_3$4 = { class: "text-primaryBlue px-2" };
const _hoisted_4$4 = { class: "px-5 mb-5" };
const _hoisted_5$4 = { class: "flex flex-col align-items-center gap-2 mb-3" };
const _hoisted_6$4 = { class: "flex justify-center mt-5 mr-5" };
const _sfc_main$4 = {
  __name: "AddItemsModal",
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
    return (_ctx, _cache) => {
      const _component_Textarea = script$6;
      const _component_Button = script$3;
      const _component_Dialog = script$2;
      return openBlock(), createBlock(_component_Dialog, {
        visible: visible.value,
        "onUpdate:visible": _cache[1] || (_cache[1] = ($event) => visible.value = $event),
        modal: "",
        draggable: false,
        style: { width: "40rem" }
      }, {
        header: withCtx(() => [
          createBaseVNode("div", _hoisted_1$4, [
            createBaseVNode("p", _hoisted_2$4, [
              _cache[2] || (_cache[2] = createTextVNode(" Add Item(s) to ")),
              createBaseVNode("span", _hoisted_3$4, toDisplayString(__props.listTitle), 1)
            ])
          ])
        ]),
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_4$4, [
            createBaseVNode("div", _hoisted_5$4, [
              _cache[3] || (_cache[3] = createBaseVNode("label", {
                for: "listitems",
                class: "font-semibold w-6rem text-lg"
              }, [
                createTextVNode("List items"),
                createBaseVNode("span", { class: "text-red-400" }, "*")
              ], -1)),
              _cache[4] || (_cache[4] = createBaseVNode("span", { class: "text-sm text-surface-500" }, "Multiple entries are allowed ", -1)),
              createVNode(_component_Textarea, {
                id: "listItems",
                modelValue: listItem.value,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => listItem.value = $event),
                rows: "10",
                cols: "20",
                placeholder: "List item"
              }, null, 8, ["modelValue"])
            ])
          ]),
          createBaseVNode("div", _hoisted_6$4, [
            createVNode(_component_Button, {
              label: "Save",
              icon: "pi pi-check",
              class: "bg-success text-white hover:bg-success hover:border-success w-28",
              onClick: handleAddItems
            })
          ])
        ]),
        _: 1
      }, 8, ["visible"]);
    };
  }
};
const _hoisted_1$3 = { class: "px-7 mb-5" };
const _hoisted_2$3 = { class: "flex flex-col align-items-center gap-3 mb-5" };
const _hoisted_3$3 = { class: "px-7 mb-5" };
const _hoisted_4$3 = { class: "ml-2 py-2" };
const _hoisted_5$3 = { class: "text-lg" };
const _hoisted_6$3 = { class: "flex justify-center mt-10 mr-5" };
const _sfc_main$3 = {
  __name: "EditItemOptionModal",
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
    return (_ctx, _cache) => {
      const _component_InputText = script$5;
      const _component_Button = script$3;
      const _component_Dialog = script$2;
      return openBlock(), createBlock(_component_Dialog, {
        visible: visible.value,
        "onUpdate:visible": _cache[1] || (_cache[1] = ($event) => visible.value = $event),
        modal: "",
        draggable: false,
        style: { width: "40rem" }
      }, {
        header: withCtx(() => _cache[2] || (_cache[2] = [
          createBaseVNode("div", { class: "flex justify-center items-center ml-7" }, [
            createBaseVNode("p", { class: "font-semibold text-xl flex justify-center text-center" }, " Item options ")
          ], -1)
        ])),
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$3, [
            createBaseVNode("div", _hoisted_2$3, [
              _cache[3] || (_cache[3] = createBaseVNode("label", {
                for: "listname",
                class: "font-semibold w-6rem text-lg"
              }, [
                createTextVNode("Item name "),
                createBaseVNode("span", { class: "text-red-400" }, "*")
              ], -1)),
              createVNode(_component_InputText, {
                id: "listname",
                class: "flex-auto",
                modelValue: listItemName.value,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => listItemName.value = $event),
                placeholder: "Item name",
                autocomplete: "off"
              }, null, 8, ["modelValue"])
            ])
          ]),
          createBaseVNode("div", _hoisted_3$3, [
            _cache[5] || (_cache[5] = createBaseVNode("p", { class: "text-lg font-medium" }, "Used in", -1)),
            createBaseVNode("div", _hoisted_4$3, [
              (openBlock(), createElementBlock(Fragment, null, renderList(listOptions, (list) => {
                return createBaseVNode("p", _hoisted_5$3, [
                  _cache[4] || (_cache[4] = createBaseVNode("i", { class: "mr-2 pi pi-minus" }, null, -1)),
                  createTextVNode(" " + toDisplayString(list.option), 1)
                ]);
              }), 64))
            ]),
            _cache[6] || (_cache[6] = createBaseVNode("div", null, null, -1))
          ]),
          createBaseVNode("div", _hoisted_6$3, [
            createVNode(_component_Button, {
              label: "Save",
              icon: "pi pi-check",
              class: "bg-success text-white hover:bg-success hover:border-success w-28 ml-2",
              onClick: handleEditItem
            })
          ])
        ]),
        _: 1
      }, 8, ["visible"]);
    };
  }
};
const _hoisted_1$2 = { class: "px-7 mb-5" };
const _hoisted_2$2 = { class: "flex flex-col align-items-center gap-3 mb-5" };
const _hoisted_3$2 = { class: "px-7 mb-5" };
const _hoisted_4$2 = { class: "ml-2 py-2" };
const _hoisted_5$2 = { class: "text-lg" };
const _hoisted_6$2 = { class: "flex justify-center mt-10 mr-5" };
const _sfc_main$2 = {
  __name: "ListOptionModal",
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
    return (_ctx, _cache) => {
      const _component_InputText = script$5;
      const _component_Button = script$3;
      const _component_Dialog = script$2;
      const _directive_tooltip = resolveDirective("tooltip");
      return openBlock(), createBlock(_component_Dialog, {
        visible: visible.value,
        "onUpdate:visible": _cache[2] || (_cache[2] = ($event) => visible.value = $event),
        modal: "",
        draggable: false,
        style: { width: "40rem" }
      }, {
        header: withCtx(() => _cache[3] || (_cache[3] = [
          createBaseVNode("div", { class: "flex justify-center items-center ml-7" }, [
            createBaseVNode("p", { class: "font-semibold text-xl flex justify-center text-center" }, "List options")
          ], -1)
        ])),
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$2, [
            createBaseVNode("div", _hoisted_2$2, [
              _cache[4] || (_cache[4] = createBaseVNode("label", {
                for: "listname",
                class: "font-semibold w-6rem text-lg"
              }, [
                createTextVNode("List name "),
                createBaseVNode("span", { class: "text-red-400" }, "*")
              ], -1)),
              createVNode(_component_InputText, {
                id: "listname",
                class: "flex-auto",
                modelValue: listName.value,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => listName.value = $event),
                placeholder: "List name",
                autocomplete: "off"
              }, null, 8, ["modelValue"])
            ])
          ]),
          createBaseVNode("div", _hoisted_3$2, [
            _cache[6] || (_cache[6] = createBaseVNode("p", { class: "text-lg font-medium" }, "Used in", -1)),
            createBaseVNode("div", _hoisted_4$2, [
              (openBlock(), createElementBlock(Fragment, null, renderList(listOptions, (list) => {
                return createBaseVNode("p", _hoisted_5$2, [
                  _cache[5] || (_cache[5] = createBaseVNode("i", { class: "mr-2 pi pi-minus" }, null, -1)),
                  createTextVNode(" " + toDisplayString(list.option), 1)
                ]);
              }), 64))
            ]),
            _cache[7] || (_cache[7] = createBaseVNode("div", null, null, -1))
          ]),
          createBaseVNode("div", _hoisted_6$2, [
            withDirectives(createVNode(_component_Button, {
              label: "Syncing options",
              disabled: "",
              severity: "secondary",
              class: "whitespace-nowrap hover:border-gray-300 text-white w-40 cursor-default",
              onClick: _cache[1] || (_cache[1] = () => {
              })
            }, null, 512), [
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
        ]),
        _: 1
      }, 8, ["visible"]);
    };
  }
};
const _hoisted_1$1 = {
  class: "px-5 overflow-y-auto h-[70vh]",
  style: { "max-height": "calc(100% - 4rem)" }
};
const _hoisted_2$1 = { class: "flex flex-col align-items-center gap-3 mb-5" };
const _hoisted_3$1 = { class: "flex gap-2" };
const _hoisted_4$1 = { key: 0 };
const _hoisted_5$1 = { class: "flex flex-col align-items-center gap-2 mb-3" };
const _hoisted_6$1 = {
  key: 0,
  class: "text-sm text-error"
};
const _hoisted_7$1 = { class: "ml-2" };
const _hoisted_8$1 = { class: "flex justify-center" };
const _hoisted_9$1 = {
  key: 1,
  class: "py-2"
};
const _hoisted_10$1 = { class: "flex flex-col gap-2 mb-3" };
const _hoisted_11 = {
  key: 0,
  class: "text-sm text-error"
};
const _hoisted_12 = {
  key: 0,
  class: "text-sm text-error"
};
const _hoisted_13 = { class: "drop-zone py-6" };
const _hoisted_14 = {
  key: 0,
  class: "font-poppins p-4"
};
const _hoisted_15 = {
  key: 1,
  class: "bg-red-50 p-4 text-red-400 font-poppins"
};
const _hoisted_16 = {
  key: 2,
  class: "file-list custom-file-upload flex flex-col gap-6 items-center justify-center"
};
const _hoisted_17 = { class: "flex justify-center mt-5" };
const _sfc_main$1 = {
  __name: "CreateSublistModal",
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
        if (obj[key] !== "") return false;
      }
      return true;
    }
    async function processFiles(data, fileType, file) {
      fileName.value = file?.name ? file?.name : file?.fileName ? file?.fileName : " ";
      if (data && fileType) {
        if (fileType === "csv") {
          const Papa = await __vitePreload(() => import("./CQCEijxQ.js").then((n) => n.p), true ? [] : void 0, import.meta.url);
          const csvText = new TextDecoder().decode(data);
          Papa.parse(csvText, {
            complete: (results) => {
              const parsedData = results.data;
              const filteredData = parsedData.filter(
                (entry) => !isObjectEmpty(entry)
              );
              dataSourceFileCompleteJSON.value = filteredData?.map((f, i) => {
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
            dataSourceFileCompleteJSON.value = jsonData?.map((f, i) => {
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
      if (selectedFiles?.value?.length > 0) {
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
      if (dataSourceFileCompleteJSON?.value?.length > 0) {
        const JSON2 = dataSourceFileCompleteJSON?.value;
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
    return (_ctx, _cache) => {
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      const _component_InputText = script$5;
      const _component_Dialog = script$2;
      return openBlock(), createBlock(_component_Dialog, {
        visible: visible.value,
        "onUpdate:visible": _cache[5] || (_cache[5] = ($event) => visible.value = $event),
        modal: "",
        draggable: false,
        style: { width: "40rem", height: "60rem" }
      }, {
        header: withCtx(() => _cache[6] || (_cache[6] = [
          createBaseVNode("div", { class: "flex justify-center items-center ml-5" }, [
            createBaseVNode("p", { class: "font-semibold text-xl flex justify-center text-center" }, " Create sublist ")
          ], -1)
        ])),
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$1, [
            createBaseVNode("div", _hoisted_2$1, [
              _cache[7] || (_cache[7] = createBaseVNode("label", { class: "font-semibold w-6rem text-lg" }, "List Type", -1)),
              createBaseVNode("div", _hoisted_3$1, [
                createBaseVNode("button", {
                  class: normalizeClass([
                    listType.value === "simple" ? "bg-success text-white hover:bg-success hover:border-success" : "  hover:bg-success hover:scale-105 transition-all transform duration-300 ease-in-out hover:text-white",
                    "px-4 py-2 rounded-lg border "
                  ]),
                  onClick: _cache[0] || (_cache[0] = ($event) => listType.value = "simple")
                }, " Simple List ", 2),
                createBaseVNode("button", {
                  class: normalizeClass([
                    listType.value === "dataSource" ? "bg-success text-white hover:bg-success hover:border-success" : "  hover:bg-success hover:scale-105 transition-all transform duration-300 ease-in-out hover:text-white",
                    "px-4 py-2 rounded-lg border "
                  ]),
                  onClick: _cache[1] || (_cache[1] = ($event) => listType.value = "dataSource")
                }, " Data Source ", 2)
              ])
            ]),
            listType.value === "simple" ? (openBlock(), createElementBlock("div", _hoisted_4$1, [
              createBaseVNode("div", _hoisted_5$1, [
                _cache[9] || (_cache[9] = createBaseVNode("label", {
                  for: "sublistitems",
                  class: "font-semibold w-6rem text-lg"
                }, [
                  createTextVNode("Sublist items "),
                  createBaseVNode("span", { class: "text-red-400" }, "*")
                ], -1)),
                _cache[10] || (_cache[10] = createBaseVNode("span", { class: "text-sm text-surface-500" }, [
                  createTextVNode("Multiple entries are allowed "),
                  createBaseVNode("br"),
                  createTextVNode("(Comma separated entries)")
                ], -1)),
                addClicked.value && sublistItems.value.length === 0 ? (openBlock(), createElementBlock("span", _hoisted_6$1, [
                  createVNode(_component_font_awesome_icon, {
                    icon: ["fas", "exclamation-triangle"],
                    class: "text-error mr-2"
                  }),
                  _cache[8] || (_cache[8] = createTextVNode(" You should Add Items! "))
                ])) : createCommentVNode("", true),
                createVNode(unref(script$6), {
                  id: "sublistItems",
                  modelValue: sublistItem.value,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => sublistItem.value = $event),
                  rows: "10",
                  cols: "30",
                  placeholder: "List item",
                  invalid: addClicked.value && sublistItem.value === ""
                }, null, 8, ["modelValue", "invalid"])
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
                      createBaseVNode("p", _hoisted_7$1, toDisplayString(data["name"]), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(unref(script$1), {
                    field: "action",
                    header: "Actions",
                    style: { "width": "3%" }
                  }, {
                    body: withCtx(({ data }) => [
                      createBaseVNode("div", _hoisted_8$1, [
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
            ])) : (openBlock(), createElementBlock("div", _hoisted_9$1, [
              createBaseVNode("div", _hoisted_10$1, [
                _cache[12] || (_cache[12] = createBaseVNode("label", {
                  for: "tableName",
                  class: "font-semibold w-6rem text-lg"
                }, [
                  createTextVNode(" Table Name "),
                  createBaseVNode("span", { class: "text-red-400" }, "*")
                ], -1)),
                addClicked.value && tableName.value === "" ? (openBlock(), createElementBlock("span", _hoisted_11, _cache[11] || (_cache[11] = [
                  createBaseVNode("i", { class: "pi pi-exclamation-triangle text-error mr-2" }, null, -1),
                  createTextVNode(" Table name should not be empty! ")
                ]))) : createCommentVNode("", true),
                createVNode(_component_InputText, {
                  id: "tableName",
                  modelValue: tableName.value,
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => tableName.value = $event),
                  placeholder: "Enter table name",
                  invalid: addClicked.value && tableName.value === ""
                }, null, 8, ["modelValue", "invalid"])
              ]),
              addClicked.value && selectedFiles.value.length === 0 ? (openBlock(), createElementBlock("span", _hoisted_12, _cache[13] || (_cache[13] = [
                createBaseVNode("i", { class: "pi pi-exclamation-triangle text-error mr-2" }, null, -1),
                createTextVNode(" You should select a file! ")
              ]))) : createCommentVNode("", true),
              selectedFiles.value.length === 0 ? (openBlock(), createElementBlock("div", {
                key: 1,
                class: normalizeClass(["custom-file-upload", { "error-border": hasError.value }]),
                onDragover: _cache[4] || (_cache[4] = withModifiers(() => {
                }, ["prevent"])),
                onDragenter: withModifiers(handleDragEnter, ["prevent"]),
                onDragleave: withModifiers(handleDragLeave, ["prevent"]),
                onDrop: withModifiers(handleDrop, ["prevent"])
              }, [
                createVNode(unref(script$7), {
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
                createBaseVNode("div", _hoisted_13, [
                  !hasError.value ? (openBlock(), createElementBlock("span", _hoisted_14, "Drag and drop csv or xlsx files here to upload or")) : (openBlock(), createElementBlock("span", _hoisted_15, toDisplayString(fileErrorText.value), 1)),
                  createVNode(unref(script$3), {
                    label: "Browse",
                    icon: "pi pi-plus",
                    class: "font-poppins mt-4",
                    onClick: triggerFileInput
                  })
                ])
              ], 34)) : (openBlock(), createElementBlock("div", _hoisted_16, [
                createBaseVNode("ul", null, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(selectedFiles.value, (file) => {
                    return openBlock(), createElementBlock("li", {
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
              dataSourceFileCompleteJSON.value?.length > 0 ? (openBlock(), createBlock(_sfc_main$8, {
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
          createBaseVNode("div", _hoisted_17, [
            listType.value !== "dataSource" || tableName.value ? (openBlock(), createBlock(unref(script$3), {
              key: 0,
              label: "Create sublist",
              icon: "pi pi-check",
              class: "bg-success text-white hover:bg-success hover:border-success flex justify-center text-center",
              onClick: handleCreateList
            })) : createCommentVNode("", true)
          ])
        ]),
        _: 1
      }, 8, ["visible"]);
    };
  }
};
const _hoisted_1 = { class: "w-full flex bg-white overflow-scroll no-scrollbar" };
const _hoisted_2 = { class: "px-4 py-2 rounded-md bg-white w-full" };
const _hoisted_3 = { class: "flex flex-col md:flex-row md:justify-between w-full" };
const _hoisted_4 = { class: "flex md:max-w-[30vw] flex-col justify-between h-full overflow-y-scroll pt-5 no-scrollbar" };
const _hoisted_5 = { class: "flex max-md:justify-center ml-1" };
const _hoisted_6 = { class: "mt-4 flex max-md:justify-center" };
const _hoisted_7 = { class: "relative flex h-10 ml-1 max-md:w-3/4" };
const _hoisted_8 = { class: "w-full md:max-w-[70vw] py-5 ml-2" };
const _hoisted_9 = { class: "mb-12 max-w-[70vw] relative" };
const _hoisted_10 = { class: "flex justify-end gap-2" };
const _sfc_main = {
  __name: "list",
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
      if (!searchQuery.value) return copiedList.value;
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
    onMounted(() => {
      tableData.value = addNewListItem.value[0];
    });
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
    return (_ctx, _cache) => {
      const _component_Button = script$3;
      const _component_InputText = script$5;
      const _component_ejs_treeview = resolveComponent("ejs-treeview");
      const _component_Toast = script$8;
      const _component_Dialog = script$2;
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          _cache[18] || (_cache[18] = createBaseVNode("p", { class: "font-semibold text-surface-700 text-xl my-5 ml-1" }, "List", -1)),
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("div", _hoisted_5, [
                createVNode(_component_Button, {
                  icon: "pi pi-plus",
                  label: "Create new list",
                  outlined: "",
                  class: "text-success border-success hover:bg-green-50 hover:border-success max-md:w-3/4 w-48",
                  onClick: _cache[0] || (_cache[0] = ($event) => visible.value = true)
                })
              ]),
              createBaseVNode("div", _hoisted_6, [
                createBaseVNode("span", _hoisted_7, [
                  _cache[17] || (_cache[17] = createBaseVNode("i", {
                    class: "pi pi-search absolute top-2/4 -mt-2 left-2 text-surface-400 dark:text-surface-600 text-sm",
                    style: { "color": "rgb(117, 119, 120)" }
                  }, null, -1)),
                  createVNode(_component_InputText, {
                    modelValue: searchQuery.value,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => searchQuery.value = $event),
                    placeholder: "Search",
                    class: "pl-7 font-normal rounded-md border-gray-300 font-poppins max-md:w-full w-48"
                  }, null, 8, ["modelValue"])
                ])
              ]),
              createVNode(_component_ejs_treeview, {
                fields: treeFields.value,
                onNodeClicked,
                onNodeDragStop,
                allowDragAndDrop: true
              }, null, 8, ["fields"])
            ]),
            createBaseVNode("div", _hoisted_8, [
              createBaseVNode("div", _hoisted_9, [
                createVNode(DataTableComponent, {
                  tableData: tableData.value,
                  filters: filters.value,
                  onRowReorder,
                  onEditItem: handleEditItem,
                  onOpenDelete: handleOpenDelete,
                  onOpenAddItems: handleOpenAddItems,
                  onOpenListOptions: _cache[2] || (_cache[2] = ($event) => openListOptions.value = true),
                  onOpenCreateSublistModal: createSubList,
                  calledFrom: "root",
                  c_level: 0
                }, null, 8, ["tableData", "filters"]),
                createVNode(_component_Toast)
              ])
            ])
          ])
        ]),
        createVNode(_component_Toast),
        visible.value ? (openBlock(), createBlock(_sfc_main$5, {
          key: 0,
          visible: visible.value,
          "onUpdate:visible": _cache[3] || (_cache[3] = ($event) => visible.value = $event),
          onCreateList: handleCreateList,
          onCancel: _cache[4] || (_cache[4] = ($event) => visible.value = false),
          onError: "showError" in _ctx ? _ctx.showError : unref(showError),
          onSuccess: showSuccess
        }, null, 8, ["visible", "onError"])) : createCommentVNode("", true),
        openCreateSubList.value ? (openBlock(), createBlock(_sfc_main$1, {
          key: 1,
          visible: openCreateSubList.value,
          "onUpdate:visible": _cache[5] || (_cache[5] = ($event) => openCreateSubList.value = $event),
          level: currentListLevel.value,
          title: currentListTitle.value,
          onCreateSubSubList: handleCreateSubSublist,
          onCancel: _cache[6] || (_cache[6] = ($event) => openCreateSubList.value = false)
        }, null, 8, ["visible", "level", "title"])) : createCommentVNode("", true),
        createVNode(_sfc_main$4, {
          visible: openAddItems.value,
          "onUpdate:visible": _cache[7] || (_cache[7] = ($event) => openAddItems.value = $event),
          listTitle: addItemsTitle.value,
          onAddItems: handleAddItems,
          onCancel: _cache[8] || (_cache[8] = ($event) => openAddItems.value = false)
        }, null, 8, ["visible", "listTitle"]),
        openListOptions.value ? (openBlock(), createBlock(_sfc_main$2, {
          key: 2,
          visible: openListOptions.value,
          "onUpdate:visible": _cache[9] || (_cache[9] = ($event) => openListOptions.value = $event),
          onCancel: _cache[10] || (_cache[10] = ($event) => openListOptions.value = false),
          tableData: tableData.value,
          "onUpdate:tableData": _cache[11] || (_cache[11] = ($event) => tableData.value = $event)
        }, null, 8, ["visible", "tableData"])) : createCommentVNode("", true),
        editableItem.value ? (openBlock(), createBlock(_sfc_main$3, {
          key: 3,
          visible: openItemOptions.value,
          "onUpdate:visible": _cache[12] || (_cache[12] = ($event) => openItemOptions.value = $event),
          onEditItem: handleEditItem,
          editableItem: editableItem.value,
          "onUpdate:editableItem": _cache[13] || (_cache[13] = ($event) => editableItem.value = $event),
          onCancel: _cache[14] || (_cache[14] = ($event) => openItemOptions.value = false),
          onOpenCreateListModal: createSubList
        }, null, 8, ["visible", "editableItem"])) : createCommentVNode("", true),
        createVNode(_component_Dialog, {
          visible: openDeleteModal.value,
          "onUpdate:visible": _cache[16] || (_cache[16] = ($event) => openDeleteModal.value = $event),
          header: "Delete",
          modal: "",
          style: { width: "25rem" }
        }, {
          default: withCtx(() => [
            _cache[19] || (_cache[19] = createBaseVNode("span", { class: "p-text-secondary block mb-5" }, [
              createBaseVNode("i", { class: "pi pi-exclamation-triangle text-error mr-2" }),
              createTextVNode("Are you sure you want to delete this Item?")
            ], -1)),
            createBaseVNode("div", _hoisted_10, [
              createVNode(_component_Button, {
                type: "button",
                label: "Cancel",
                outlined: "",
                onClick: _cache[15] || (_cache[15] = ($event) => openDeleteModal.value = false)
              }),
              createVNode(_component_Button, {
                type: "button",
                label: "Delete",
                severity: "error",
                onClick: handleDelete,
                class: "bg-error hover:bg-red-500 hover:border-error text-white"
              })
            ])
          ]),
          _: 1
        }, 8, ["visible"])
      ]);
    };
  }
};
const List = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-879c81d7"]]);
export {
  List as default
};
