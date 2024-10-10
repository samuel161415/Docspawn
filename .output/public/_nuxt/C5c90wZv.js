import script from "./CqRjFxFh.js";
import script$4 from "./BvyHoU-I.js";
import script$3 from "./Chlca_au.js";
import script$6 from "./Ba0NQEl6.js";
import { _ as _export_sfc, r as ref, J as useToast, g as resolveComponent, v as openBlock, x as createElementBlock, A as createVNode, B as withCtx, y as createBaseVNode, z as toDisplayString, D as createBlock, C as createTextVNode, M as createCommentVNode, G as watch, Q as resolveDirective, I as renderList, H as Fragment, R as withDirectives, i as computed, o as onMounted, E as unref, K as normalizeClass, N as showError, O as FilterMatchMode, P as FilterOperator } from "./DtVGkkp5.js";
import script$1 from "./BygrJK7_.js";
import script$2 from "./DiR-L0IU.js";
import script$5 from "./CXM88pk1.js";
import script$7 from "./Cf25VL8R.js";
import { a as addNewListItem } from "./BT_MecYs.js";
import "./ComoeHze.js";
import "./S6LrW6Rs.js";
import "./DIao3JJN.js";
import "./D2v9R_Zb.js";
import "./CefHBMwH.js";
import "./DGgwDFrY.js";
import "./D2TItMUJ.js";
import "./BgnjSXUr.js";
import "./Dc28EfXz.js";
import "./7DNHIx4r.js";
import "./DH7lhIgL.js";
import "./CliTV4iE.js";
import "./COy2helV.js";
import "./CwvQGzgy.js";
import "./BLP322XQ.js";
import "./nF0nhjA8.js";
import "./CgUEfqKD.js";
import "./Z8oXvxvy.js";
import "./Bn3ouk1M.js";
import "./D4OoIuyu.js";
import "./DFnrgzEP.js";
import "./D6_XtY3I.js";
import "./BsCTXYwU.js";
import "./5WY6PqmM.js";
import "./_UARUTx0.js";
import "./CmW9sJUW.js";
const _hoisted_1$6 = { class: "card" };
const _hoisted_2$6 = { class: "flex flex-wrap justify-between" };
const _hoisted_3$6 = { class: "font-poppins" };
const _hoisted_4$5 = { class: "flex flex-wrap justify-end gap-2" };
const _hoisted_5$5 = { class: "flex items-center space-x-4" };
const _hoisted_6$4 = { class: "font-poppins" };
const _hoisted_7$2 = { class: "flex space-x-8" };
const _hoisted_8$2 = { class: "p-4" };
const _sfc_main$6 = {
  __name: "Table",
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
    return (_ctx, _cache) => {
      const _component_Button = script;
      const _component_Column = script$1;
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      const _component_DataTable = script$2;
      const _component_Toast = script$3;
      return openBlock(), createElementBlock("div", _hoisted_1$6, [
        createVNode(_component_DataTable, {
          expandedRows: expandedRows.value,
          "onUpdate:expandedRows": _cache[0] || (_cache[0] = ($event) => expandedRows.value = $event),
          value: __props.tableData.sublists,
          dataKey: "id",
          onRowExpand,
          onRowCollapse,
          tableStyle: "min-width: 60rem"
        }, {
          header: withCtx(() => [
            createBaseVNode("div", _hoisted_2$6, [
              createBaseVNode("p", _hoisted_3$6, toDisplayString(__props.tableData.title), 1),
              createBaseVNode("div", _hoisted_4$5, [
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
          ]),
          expansion: withCtx(({ data }) => [
            createBaseVNode("div", _hoisted_8$2, [
              createBaseVNode("h5", null, "Sublists for " + toDisplayString(data.title), 1),
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
          ]),
          default: withCtx(() => [
            createVNode(_component_Column, {
              expander: "",
              style: { "width": "5rem" }
            }),
            createVNode(_component_Column, {
              field: "title",
              header: "List elements",
              headerStyle: { height: "4.5rem" }
            }, {
              body: withCtx(({ data, field }) => [
                createBaseVNode("div", _hoisted_5$5, [
                  data?.sublists?.length > 0 ? (openBlock(), createBlock(_component_font_awesome_icon, {
                    key: 0,
                    icon: ["fat", "list-tree"],
                    style: { "color": "#3d3d3d" }
                  })) : (openBlock(), createBlock(_component_font_awesome_icon, {
                    key: 1,
                    icon: ["fat", "list-tree"],
                    style: { "color": "#00000000" }
                  })),
                  createBaseVNode("p", _hoisted_6$4, toDisplayString(data[field]), 1)
                ])
              ]),
              _: 1
            }),
            createVNode(_component_Column, {
              header: "Actions",
              icon: "pi pi-trash",
              "header-style": "text-center",
              style: { "width": "5%" }
            }, {
              body: withCtx(({ data }) => [
                createBaseVNode("div", _hoisted_7$2, [
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
          ]),
          _: 1
        }, 8, ["expandedRows", "value"]),
        createVNode(_component_Toast)
      ]);
    };
  }
};
const DataTableComponent = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-9176216d"]]);
const _hoisted_1$5 = { class: "px-5" };
const _hoisted_2$5 = { class: "flex flex-col align-items-center gap-3 mb-5" };
const _hoisted_3$5 = {
  key: 0,
  class: "text-sm text-error"
};
const _hoisted_4$4 = { class: "flex flex-col align-items-center gap-2 mb-3" };
const _hoisted_5$4 = {
  key: 0,
  class: "text-sm text-error"
};
const _hoisted_6$3 = { class: "ml-2" };
const _hoisted_7$1 = { class: "flex justify-center" };
const _hoisted_8$1 = { class: "flex justify-center mt-5" };
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
      const _component_InputText = script$4;
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      const _component_Textarea = script$5;
      const _component_Button = script;
      const _component_Column = script$1;
      const _component_DataTable = script$2;
      const _component_Dialog = script$6;
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
            createBaseVNode("div", _hoisted_4$4, [
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
              addClicked.value && listItems.value.length === 0 ? (openBlock(), createElementBlock("span", _hoisted_5$4, [
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
                    createBaseVNode("p", _hoisted_6$3, toDisplayString(data["name"]), 1)
                  ]),
                  _: 1
                }),
                createVNode(_component_Column, {
                  field: "action",
                  header: "Actions",
                  style: { "width": "3%" }
                }, {
                  body: withCtx(({ data }) => [
                    createBaseVNode("div", _hoisted_7$1, [
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
          createBaseVNode("div", _hoisted_8$1, [
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
const _hoisted_1$4 = { class: "px-5 mb-5" };
const _hoisted_2$4 = { class: "flex flex-col align-items-center gap-2 mb-3" };
const _hoisted_3$4 = { class: "flex justify-center mt-5 mr-5" };
const _sfc_main$4 = {
  __name: "AddItemsModal",
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
      const _component_Textarea = script$5;
      const _component_Button = script;
      const _component_Dialog = script$6;
      return openBlock(), createBlock(_component_Dialog, {
        visible: visible.value,
        "onUpdate:visible": _cache[1] || (_cache[1] = ($event) => visible.value = $event),
        modal: "",
        draggable: false,
        style: { width: "40rem" }
      }, {
        header: withCtx(() => _cache[2] || (_cache[2] = [
          createBaseVNode("div", { class: "flex justify-center items-center ml-5" }, [
            createBaseVNode("p", { class: "font-semibold text-xl flex justify-center text-center" }, " Add items ")
          ], -1)
        ])),
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$4, [
            createBaseVNode("div", _hoisted_2$4, [
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
          createBaseVNode("div", _hoisted_3$4, [
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
const _hoisted_1$3 = { class: "px-5 my-5" };
const _hoisted_2$3 = { class: "flex flex-col align-items-center gap-3 mb-5" };
const _hoisted_3$3 = {
  key: 0,
  class: "flex align-items-center px-5 mt-5"
};
const _hoisted_4$3 = { class: "flex justify-center mt-5 mr-5" };
const _hoisted_5$3 = { class: "flex justify-end gap-2" };
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
    return (_ctx, _cache) => {
      const _component_InputText = script$4;
      const _component_Checkbox = script$7;
      const _component_Button = script;
      const _component_Dialog = script$6;
      return openBlock(), createBlock(_component_Dialog, {
        visible: visible.value,
        "onUpdate:visible": _cache[4] || (_cache[4] = ($event) => visible.value = $event),
        modal: "",
        draggable: false,
        style: { width: "40rem" }
      }, {
        header: withCtx(() => _cache[5] || (_cache[5] = [
          createBaseVNode("div", { class: "flex justify-center items-center ml-5" }, [
            createBaseVNode("p", { class: "font-semibold text-xl flex justify-center text-center" }, " Item options ")
          ], -1)
        ])),
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$3, [
            createBaseVNode("div", _hoisted_2$3, [
              _cache[6] || (_cache[6] = createBaseVNode("label", {
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
                placeholder: "list Item Name",
                autocomplete: "off"
              }, null, 8, ["modelValue"])
            ])
          ]),
          props.editableItem?.level != 3 ? (openBlock(), createElementBlock("div", _hoisted_3$3, [
            createVNode(_component_Checkbox, {
              modelValue: containsublist.value,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => containsublist.value = $event),
              inputId: "containsublist",
              name: "sublist",
              value: "sublist",
              binary: true
            }, null, 8, ["modelValue"]),
            _cache[7] || (_cache[7] = createBaseVNode("label", {
              for: "containsublist",
              class: "ml-2"
            }, "Contains sublist", -1))
          ])) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_4$3, [
            createVNode(_component_Button, {
              label: "Save",
              icon: "pi pi-check",
              class: "bg-success text-white hover:bg-success hover:border-success w-28",
              onClick: handleEditItem
            })
          ]),
          createVNode(_component_Dialog, {
            visible: containsublist.value,
            "onUpdate:visible": _cache[3] || (_cache[3] = ($event) => containsublist.value = $event),
            header: "Sublist",
            modal: "",
            style: { width: "25rem" }
          }, {
            default: withCtx(() => [
              _cache[8] || (_cache[8] = createBaseVNode("span", { class: "p-text-secondary block mb-5" }, "Do you want to create a new Sublist?", -1)),
              createBaseVNode("div", _hoisted_5$3, [
                createVNode(_component_Button, {
                  type: "button",
                  label: "No",
                  outlined: "",
                  onClick: _cache[2] || (_cache[2] = ($event) => containsublist.value = false)
                }),
                createVNode(_component_Button, {
                  type: "button",
                  label: "Yes",
                  onClick: emitOpenCreateListModal
                })
              ])
            ]),
            _: 1
          }, 8, ["visible"])
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
      const _component_InputText = script$4;
      const _component_Button = script;
      const _component_Dialog = script$6;
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
              class: "bg-gray-400 hover:bg-gray-400 hover:border-gray-300 text-white w-40 cursor-default",
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
const _hoisted_1$1 = { class: "px-5" };
const _hoisted_2$1 = { class: "flex flex-col align-items-center gap-2 mb-3" };
const _hoisted_3$1 = {
  key: 0,
  class: "text-sm text-error"
};
const _hoisted_4$1 = { class: "ml-2" };
const _hoisted_5$1 = { class: "flex justify-center" };
const _hoisted_6$1 = { class: "flex justify-center mt-5" };
const _sfc_main$1 = {
  __name: "CreateSublistModal",
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
    return (_ctx, _cache) => {
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      const _component_Textarea = script$5;
      const _component_Button = script;
      const _component_Column = script$1;
      const _component_DataTable = script$2;
      const _component_Dialog = script$6;
      return openBlock(), createBlock(_component_Dialog, {
        visible: visible.value,
        "onUpdate:visible": _cache[1] || (_cache[1] = ($event) => visible.value = $event),
        modal: "",
        draggable: false,
        style: { width: "40rem" }
      }, {
        header: withCtx(() => _cache[2] || (_cache[2] = [
          createBaseVNode("div", { class: "flex justify-center items-center ml-5" }, [
            createBaseVNode("p", { class: "font-semibold text-xl flex justify-center text-center" }, " Create sublist ")
          ], -1)
        ])),
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$1, [
            createBaseVNode("div", _hoisted_2$1, [
              _cache[4] || (_cache[4] = createBaseVNode("label", {
                for: "sublistitems",
                class: "font-semibold w-6rem text-lg"
              }, [
                createTextVNode("Sublist items "),
                createBaseVNode("span", { class: "text-red-400" }, "*")
              ], -1)),
              _cache[5] || (_cache[5] = createBaseVNode("span", { class: "text-sm text-surface-500" }, [
                createTextVNode("Multiple entries are allowed "),
                createBaseVNode("br"),
                createTextVNode(" (Comma separated entries)")
              ], -1)),
              addClicked.value && sublistItems.value.length === 0 ? (openBlock(), createElementBlock("span", _hoisted_3$1, [
                createVNode(_component_font_awesome_icon, {
                  icon: ["fas", "exclamation-triangle"],
                  class: "text-error mr-2"
                }),
                _cache[3] || (_cache[3] = createTextVNode(" You should Add Items!"))
              ])) : createCommentVNode("", true),
              createVNode(_component_Textarea, {
                id: "sublistItems",
                modelValue: sublistItem.value,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => sublistItem.value = $event),
                rows: "10",
                cols: "30",
                placeholder: "List item",
                invalid: addClicked.value && sublistItem.value === ""
              }, null, 8, ["modelValue", "invalid"])
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
                    createBaseVNode("p", _hoisted_4$1, toDisplayString(data["name"]), 1)
                  ]),
                  _: 1
                }),
                createVNode(_component_Column, {
                  field: "action",
                  header: "Actions",
                  style: { "width": "3%" }
                }, {
                  body: withCtx(({ data }) => [
                    createBaseVNode("div", _hoisted_5$1, [
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
          createBaseVNode("div", _hoisted_6$1, [
            createVNode(_component_Button, {
              label: "Create sublist",
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
const _hoisted_1 = { class: "w-full flex bg-white overflow-scroll no-scrollbar" };
const _hoisted_2 = { class: "px-4 py-2 rounded-md bg-white w-full" };
const _hoisted_3 = { class: "flex w-full" };
const _hoisted_4 = { class: "flex flex-col justify-between h-full overflow-y-scroll w-64 pt-5 no-scrollbar" };
const _hoisted_5 = { class: "flex ml-1" };
const _hoisted_6 = { class: "mt-4" };
const _hoisted_7 = { class: "relative flex h-10 ml-1" };
const _hoisted_8 = ["onClick"];
const _hoisted_9 = ["onClick"];
const _hoisted_10 = ["innerHTML"];
const _hoisted_11 = {
  key: 0,
  class: "ml-3"
};
const _hoisted_12 = ["onClick"];
const _hoisted_13 = ["onClick"];
const _hoisted_14 = ["innerHTML"];
const _hoisted_15 = {
  key: 1,
  class: "ml-3"
};
const _hoisted_16 = ["onClick"];
const _hoisted_17 = ["onClick"];
const _hoisted_18 = ["innerHTML"];
const _hoisted_19 = { class: "w-full py-5 ml-2" };
const _hoisted_20 = { class: "flex flex-col md:flex-row justify-end gap-2" };
const _hoisted_21 = { class: "mt-4 mb-12 ml-2" };
const _hoisted_22 = { class: "flex justify-end gap-2" };
const _sfc_main = {
  __name: "list",
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
    return (_ctx, _cache) => {
      const _component_Button = script;
      const _component_InputText = script$4;
      const _component_Toast = script$3;
      const _component_Dialog = script$6;
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          _cache[19] || (_cache[19] = createBaseVNode("p", { class: "font-semibold text-surface-700 text-xl my-5 ml-1" }, "List", -1)),
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("div", _hoisted_5, [
                createVNode(_component_Button, {
                  icon: "pi pi-plus",
                  label: "Create new list",
                  outlined: "",
                  class: "text-success border-success hover:bg-green-50 hover:border-success w-48",
                  onClick: _cache[0] || (_cache[0] = ($event) => visible.value = true)
                })
              ]),
              createBaseVNode("div", _hoisted_6, [
                createBaseVNode("span", _hoisted_7, [
                  _cache[18] || (_cache[18] = createBaseVNode("i", {
                    class: "pi pi-search absolute top-2/4 -mt-2 left-2 text-surface-400 dark:text-surface-600 text-sm",
                    style: { "color": "rgb(117, 119, 120)" }
                  }, null, -1)),
                  createVNode(_component_InputText, {
                    modelValue: searchQuery.value,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => searchQuery.value = $event),
                    placeholder: "Search",
                    class: "pl-7 font-normal rounded-md border-gray-300 font-poppins w-48"
                  }, null, 8, ["modelValue"])
                ])
              ]),
              createBaseVNode("ul", null, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(filteredLists.value, (items) => {
                  return openBlock(), createElementBlock("li", {
                    key: items.title,
                    class: "cursor-pointer flex flex-col mt-4 w-full mr-4"
                  }, [
                    (openBlock(), createElementBlock("div", {
                      key: items.title,
                      class: "flex px-2 py-2 ml-1 hover:bg-surface-100 rounded font-poppins",
                      onClick: ($event) => handleopensubmenu(items)
                    }, [
                      createBaseVNode("i", {
                        class: normalizeClass(["pt-1 text-gray-500", {
                          "pi pi-chevron-down": items.opensubmenu,
                          "text-primaryBlue": items.title === tableData.value.title,
                          "pi pi-chevron-right": !items.opensubmenu
                        }]),
                        onClick: ($event) => items.opensubmenu = !items.opensubmenu
                      }, null, 10, _hoisted_9),
                      createBaseVNode("span", {
                        class: normalizeClass(["text-lg font-normal ml-3", {
                          "text-surface-600": items.isHovered,
                          "text-primaryBlue": items.title === tableData.value.title,
                          "text-gray-500": !items.isHovered
                        }]),
                        innerHTML: highlight(items.title) || items.title
                      }, null, 10, _hoisted_10)
                    ], 8, _hoisted_8)),
                    items.opensubmenu ? (openBlock(), createElementBlock("ul", _hoisted_11, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(items.sublists, (subItem) => {
                        return openBlock(), createElementBlock("li", {
                          key: subItem.id
                        }, [
                          subItem?.sublists && subItem.sublists.length > 0 ? (openBlock(), createElementBlock("div", {
                            key: subItem.id,
                            class: "flex py-2 pl-1 hover:bg-surface-100 items-center ml-4 font-poppins",
                            onClick: ($event) => handleopensubmenu(subItem)
                          }, [
                            createBaseVNode("i", {
                              class: normalizeClass(["text-gray-500", {
                                "pi pi-chevron-down": subItem.opensubmenu,
                                "text-primaryBlue": subItem.title === tableData.value.title,
                                "pi pi-chevron-right": !subItem.opensubmenu
                              }]),
                              onClick: ($event) => subItem.opensubmenu = !subItem.opensubmenu
                            }, null, 10, _hoisted_13),
                            createBaseVNode("p", {
                              class: normalizeClass(["text-base font-normal ml-3 text-gray-500", {
                                "text-primaryBlue": subItem.title === tableData.value.title
                              }]),
                              innerHTML: highlight(subItem.title) || subItem.title
                            }, null, 10, _hoisted_14)
                          ], 8, _hoisted_12)) : createCommentVNode("", true),
                          subItem.opensubmenu ? (openBlock(), createElementBlock("ul", _hoisted_15, [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(subItem.sublists, (subsubItem) => {
                              return openBlock(), createElementBlock("li", {
                                key: subsubItem.title
                              }, [
                                subsubItem?.sublists && subsubItem.sublists.length > 0 ? (openBlock(), createElementBlock("div", {
                                  key: subsubItem.title,
                                  class: "ml-5 font-poppins flex py-2 pl-1 hover:bg-surface-100 items-center",
                                  onClick: ($event) => handleopensubmenu(subsubItem)
                                }, [
                                  createBaseVNode("i", {
                                    class: normalizeClass(["text-gray-500", {
                                      "pi pi-chevron-down": subsubItem.opensubmenu,
                                      "text-primaryBlue": subsubItem.title === tableData.value.title,
                                      "pi pi-chevron-right": !subsubItem.opensubmenu
                                    }]),
                                    onClick: ($event) => subsubItem.opensubmenu = !subsubItem.opensubmenu
                                  }, null, 10, _hoisted_17),
                                  createBaseVNode("p", {
                                    class: normalizeClass(["text-base font-normal ml-4 text-gray-500", {
                                      "text-primaryBlue": subsubItem.title === tableData.value.title
                                    }]),
                                    innerHTML: highlight(subsubItem.title) || subsubItem.title
                                  }, null, 10, _hoisted_18)
                                ], 8, _hoisted_16)) : createCommentVNode("", true)
                              ]);
                            }), 128))
                          ])) : createCommentVNode("", true)
                        ]);
                      }), 128))
                    ])) : createCommentVNode("", true)
                  ]);
                }), 128))
              ])
            ]),
            createBaseVNode("div", _hoisted_19, [
              createBaseVNode("div", _hoisted_20, [
                createVNode(_component_Button, {
                  icon: "pi pi-plus",
                  label: "Add item(s)",
                  outlined: "",
                  onClick: _cache[2] || (_cache[2] = ($event) => openAddItems.value = true),
                  class: "text-success border-success hover:bg-green-50"
                }),
                createVNode(_component_Button, {
                  icon: "pi pi-cog",
                  label: "List options",
                  class: "p-button-success",
                  outlined: "",
                  onClick: _cache[3] || (_cache[3] = ($event) => openListOptions.value = true)
                })
              ]),
              createBaseVNode("div", _hoisted_21, [
                createVNode(DataTableComponent, {
                  tableData: tableData.value,
                  filters: filters.value,
                  onRowReorder,
                  onEditItem: handleEditItem,
                  onOpenDelete: handleOpenDelete
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
          "onUpdate:visible": _cache[4] || (_cache[4] = ($event) => visible.value = $event),
          onCreateList: handleCreateList,
          onCancel: _cache[5] || (_cache[5] = ($event) => visible.value = false),
          onError: "showError" in _ctx ? _ctx.showError : unref(showError),
          onSuccess: showSuccess
        }, null, 8, ["visible", "onError"])) : createCommentVNode("", true),
        openCreateSubList.value ? (openBlock(), createBlock(_sfc_main$1, {
          key: 1,
          visible: openCreateSubList.value,
          "onUpdate:visible": _cache[6] || (_cache[6] = ($event) => openCreateSubList.value = $event),
          level: currentListLevel.value,
          onCreateSubSubList: handleCreateSubSublist,
          onCancel: _cache[7] || (_cache[7] = ($event) => openCreateSubList.value = false)
        }, null, 8, ["visible", "level"])) : createCommentVNode("", true),
        createVNode(_sfc_main$4, {
          visible: openAddItems.value,
          "onUpdate:visible": _cache[8] || (_cache[8] = ($event) => openAddItems.value = $event),
          onAddItems: handleAddItems,
          onCancel: _cache[9] || (_cache[9] = ($event) => openAddItems.value = false)
        }, null, 8, ["visible"]),
        openListOptions.value ? (openBlock(), createBlock(_sfc_main$2, {
          key: 2,
          visible: openListOptions.value,
          "onUpdate:visible": _cache[10] || (_cache[10] = ($event) => openListOptions.value = $event),
          onCancel: _cache[11] || (_cache[11] = ($event) => openListOptions.value = false),
          tableData: tableData.value,
          "onUpdate:tableData": _cache[12] || (_cache[12] = ($event) => tableData.value = $event)
        }, null, 8, ["visible", "tableData"])) : createCommentVNode("", true),
        editableItem.value ? (openBlock(), createBlock(_sfc_main$3, {
          key: 3,
          visible: openItemOptions.value,
          "onUpdate:visible": _cache[13] || (_cache[13] = ($event) => openItemOptions.value = $event),
          onEditItem: handleEditItem,
          editableItem: editableItem.value,
          "onUpdate:editableItem": _cache[14] || (_cache[14] = ($event) => editableItem.value = $event),
          onCancel: _cache[15] || (_cache[15] = ($event) => openItemOptions.value = false),
          onOpenCreateListModal: createSubList
        }, null, 8, ["visible", "editableItem"])) : createCommentVNode("", true),
        createVNode(_component_Dialog, {
          visible: openDeleteModal.value,
          "onUpdate:visible": _cache[17] || (_cache[17] = ($event) => openDeleteModal.value = $event),
          header: "Delete",
          modal: "",
          style: { width: "25rem" }
        }, {
          default: withCtx(() => [
            _cache[20] || (_cache[20] = createBaseVNode("span", { class: "p-text-secondary block mb-5" }, [
              createBaseVNode("i", { class: "pi pi-exclamation-triangle text-error mr-2" }),
              createTextVNode("Are you sure you want to delete this Item?")
            ], -1)),
            createBaseVNode("div", _hoisted_22, [
              createVNode(_component_Button, {
                type: "button",
                label: "Cancel",
                outlined: "",
                onClick: _cache[16] || (_cache[16] = ($event) => openDeleteModal.value = false)
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
const List = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8f23d34f"]]);
export {
  List as default
};
