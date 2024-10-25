import script$1 from "./Baw2AddS.js";
import script$5 from "./CUcU1_b1.js";
import script$9 from "./BvlYCdsq.js";
import { _ as _export_sfc, r as ref, F as useToast, g as resolveComponent, v as openBlock, x as createElementBlock, A as createVNode, B as withCtx, y as createBaseVNode, C as createTextVNode, z as toDisplayString, G as createCommentVNode, H as Fragment, I as renderList, D as createBlock, o as onMounted, J as watch, K as normalizeClass, L as withModifiers, E as unref, i as computed, M as showError, N as FilterMatchMode, O as FilterOperator } from "./DyjNdRHt.js";
import script from "./Dz12RMYV.js";
import script$2 from "./ycwTQksa.js";
import script$3 from "./u3Yk3fxT.js";
import { _ as __vitePreload } from "./BhN5mE98.js";
import script$6 from "./CHirn0gA.js";
import script$7 from "./Dij0Qyvg.js";
import script$8 from "./BnQ7fhy3.js";
import script$4 from "./B-EtTEmN.js";
import { _ as _sfc_main$3, E as ExcelJS, a as addNewListItem } from "./Dov-pDCf.js";
import "./BBVQdFXZ.js";
import "./BWH3yJqN.js";
import "./4wxJ5Old.js";
import "./Dofyt3Eo.js";
import "./jKhOJpVL.js";
import "./CEYdRomh.js";
import "./DliO46ZC.js";
import "./xfCdUIm5.js";
import "./COQKb9jd.js";
import "./drfrg8Wy.js";
import "./Dj7N_jV2.js";
import "./_UDGq7dy.js";
import "./NPriEXSe.js";
import "./QtDYuRef.js";
import "./BMEOiPYu.js";
import "./bkWGANWE.js";
import "./3FbTNfyL.js";
import "./BK81WfCA.js";
import "./g8Q7qc9G.js";
import "./BfTXC8yA.js";
import "./MXJcw6Bp.js";
import "./DGZu76FE.js";
import "./DY6itHiE.js";
import "./C3bhgFCd.js";
import "./D3bA4_PM.js";
import "./D4Z_u5SJ.js";
const _hoisted_1$2 = { key: 0 };
const _hoisted_2$2 = { class: "flex flex-row" };
const _hoisted_3$2 = { class: "mr-auto" };
const _hoisted_4$2 = { class: "relative flex" };
const _hoisted_5$2 = { class: "flex flex-wrap justify-end gap-2" };
const _hoisted_6$2 = { class: "flex items-center space-x-4" };
const _hoisted_7$2 = { class: "font-poppins" };
const _hoisted_8$1 = { class: "flex items-center space-x-4" };
const _hoisted_9$1 = { class: "font-poppins" };
const _hoisted_10$1 = { class: "flex gap-4" };
const _hoisted_11$1 = { class: "p-4 max-w-[90vw]" };
const _hoisted_12$1 = { class: "font-semibold" };
const _hoisted_13 = {
  key: 0,
  class: "text-sm font-normal"
};
const _hoisted_14 = { class: "expanded-table-container" };
const _hoisted_15 = {
  key: 0,
  class: "p-2 w-full flex justify-center"
};
const _hoisted_16 = { key: 1 };
const _hoisted_17 = { key: 1 };
const _sfc_main$2 = {
  __name: "Table",
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
    return (_ctx, _cache) => {
      const _component_InputText = script;
      const _component_Button = script$1;
      const _component_Column = script$2;
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      const _component_DataTable = script$3;
      return __props.tableData && __props.tableData.length ? (openBlock(), createElementBlock("div", _hoisted_1$2, [
        createVNode(_component_DataTable, {
          filters: filters.value,
          "onUpdate:filters": _cache[1] || (_cache[1] = ($event) => filters.value = $event),
          expandedRows: expandedRows.value,
          "onUpdate:expandedRows": _cache[2] || (_cache[2] = ($event) => expandedRows.value = $event),
          "striped-rows": "",
          "show-gridlines": "",
          value: __props.tableData,
          paginator: __props.tableData?.length > 0 ? true : false,
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
          empty: withCtx(() => _cache[3] || (_cache[3] = [
            createBaseVNode("p", { class: "flex text-center" }, "No data", -1)
          ])),
          header: withCtx(() => [
            createBaseVNode("div", _hoisted_2$2, [
              createBaseVNode("div", _hoisted_3$2, [
                createBaseVNode("span", _hoisted_4$2, [
                  _cache[4] || (_cache[4] = createBaseVNode("i", {
                    class: "pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600 text-gray-400",
                    style: { "color": "rgb(117, 119, 120)" }
                  }, null, -1)),
                  createVNode(_component_InputText, {
                    modelValue: filters.value.global.value,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => filters.value.global.value = $event),
                    placeholder: "Keyword search",
                    class: "pl-10 font-normal rounded-xl"
                  }, null, 8, ["modelValue"])
                ])
              ]),
              createBaseVNode("div", _hoisted_5$2, [
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
            createBaseVNode("div", _hoisted_11$1, [
              createBaseVNode("h5", _hoisted_12$1, [
                createTextVNode(" Data for " + toDisplayString(data.name.replace(/\.[^/.]+$/, "")) + " ", 1),
                data.subtitles?.length ? (openBlock(), createElementBlock("span", _hoisted_13, " (" + toDisplayString(data.subtitles.length) + " subtitle" + toDisplayString(data.subtitles.length > 1 ? "s" : "") + ") ", 1)) : createCommentVNode("", true)
              ]),
              createBaseVNode("div", _hoisted_14, [
                loadingRows.value[data.index] ? (openBlock(), createElementBlock("div", _hoisted_15, _cache[8] || (_cache[8] = [
                  createBaseVNode("i", {
                    class: "pi pi-spin pi-spinner",
                    style: { "font-size": "2rem" }
                  }, null, -1)
                ]))) : (openBlock(), createElementBlock("div", _hoisted_16, [
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
                      (openBlock(true), createElementBlock(Fragment, null, renderList(data.columnNames, (col) => {
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
          ]),
          default: withCtx(() => [
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
              rowreordericon: withCtx(() => _cache[5] || (_cache[5] = [
                createBaseVNode("i", {
                  class: "pi pi-ellipsis-v cursor-move p-8",
                  "data-pc-section": "rowreordericon"
                }, null, -1)
              ])),
              _: 1
            }),
            createVNode(_component_Column, {
              field: "type",
              header: "Type",
              "header-style": { height: "4.5rem" }
            }, {
              body: withCtx(({ data, field }) => [
                createBaseVNode("div", _hoisted_6$2, [
                  createVNode(_component_font_awesome_icon, {
                    icon: ["fat", "list-tree"],
                    style: { "color": "#00000000" }
                  }),
                  createBaseVNode("p", _hoisted_7$2, toDisplayString(data[field]), 1)
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
                createBaseVNode("div", _hoisted_8$1, [
                  createVNode(_component_font_awesome_icon, {
                    icon: ["fat", "list-tree"],
                    style: { "color": "#00000000" }
                  }),
                  createBaseVNode("p", _hoisted_9$1, toDisplayString(data[field]), 1)
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
                createBaseVNode("div", _hoisted_10$1, [
                  createVNode(_component_Button, {
                    class: "w-max px-4",
                    severity: "success",
                    onClick: ($event) => handleEditItem(data)
                  }, {
                    default: withCtx(() => _cache[6] || (_cache[6] = [
                      createTextVNode(" Edit ")
                    ])),
                    _: 2
                  }, 1032, ["onClick"]),
                  createVNode(_component_Button, {
                    outlined: "",
                    class: "w-max px-4",
                    severity: "danger",
                    onClick: ($event) => handleOpenDelete(data)
                  }, {
                    default: withCtx(() => _cache[7] || (_cache[7] = [
                      createTextVNode(" Delete ")
                    ])),
                    _: 2
                  }, 1032, ["onClick"])
                ])
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["filters", "expandedRows", "value", "paginator"])
      ])) : (openBlock(), createElementBlock("div", _hoisted_17, _cache[9] || (_cache[9] = [
        createBaseVNode("p", { class: "flex text-center" }, "No data available", -1)
      ])));
    };
  }
};
const DataTableComponent = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-48a1105b"]]);
const _hoisted_1$1 = {
  key: 0,
  class: "w-full flex justify-center"
};
const _hoisted_2$1 = { class: "w-max flex flex-col gap-6 items-center justify-center" };
const _hoisted_3$1 = { class: "drop-zone py-6" };
const _hoisted_4$1 = {
  key: 0,
  class: "font-poppins p-4"
};
const _hoisted_5$1 = {
  key: 1,
  class: "bg-red-50 p-4 text-red-400 font-poppins"
};
const _hoisted_6$1 = {
  key: 1,
  class: "file-list custom-file-upload flex flex-col gap-6 items-center justify-center"
};
const _hoisted_7$1 = {
  key: 1,
  class: "my-6 p-4 py-8 w-full flex flex-col gap-8 bg-primary-50 rounded"
};
const _hoisted_8 = { class: "gap-4" };
const _hoisted_9 = { class: "gap-4" };
const _hoisted_10 = { class: "font-poppins text-sm text-surface-600 mb-2" };
const _hoisted_11 = {
  key: 2,
  class: "w-full flex justify-center mt-12"
};
const _hoisted_12 = {
  key: 4,
  class: "mb-4 mt-2 flex justify-center gap-2"
};
const _sfc_main$1 = {
  __name: "CreateListModal",
  props: ["editableItem"],
  emits: ["cancel", "createDataSource", "updateDataSource", "removeEditable"],
  setup(__props, { emit: __emit }) {
    const props = __props;
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
    onMounted(() => {
      if (props?.editableItem?.name) {
        isEditable.value = true;
        dataSourceColumnNames.value = props?.editableItem?.columnNames, dataSourceSelectedColumns.value = props?.editableItem?.selectedColumns;
        dataSourceFileCompleteJSON.value = props?.editableItem?.completeData;
        dataSourceSelectedRows.value = props?.editableItem?.selectedRows;
        fileName.value = props?.editableItem?.name;
        editIndex.value = props?.editableItem?.index;
        lookupColumn.value = props?.editableItem?.lookupColumn;
        emit("removeEditable");
      }
    });
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
            dataSourceFileCompleteJSON.value = jsonData?.map((f, i) => {
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
      if (newVal > dataSourceFileCompleteJSON.value?.length)
        newVal = dataSourceFileCompleteJSON.value?.length;
    });
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
        dataSourceSelectedColumns.value = isEditable.value ? dataSourceSelectedColumns.value : Object.keys(JSON2[0]);
      }
    });
    return (_ctx, _cache) => {
      const _component_Toast = script$5;
      const _component_Dropdown = script$6;
      const _component_InputNumber = script$7;
      const _component_SelectButton = script$8;
      const _component_Dialog = script$9;
      return openBlock(), createBlock(_component_Dialog, {
        visible: _ctx.visible,
        "onUpdate:visible": _cache[5] || (_cache[5] = ($event) => _ctx.visible = $event),
        modal: "",
        draggable: false,
        style: { width: "80vw" }
      }, {
        header: withCtx(() => _cache[6] || (_cache[6] = [
          createBaseVNode("div", { class: "flex justify-center items-center ml-5" }, [
            createBaseVNode("p", { class: "font-semibold text-xl flex justify-center text-center font-poppins" }, " Create data source ")
          ], -1)
        ])),
        default: withCtx(() => [
          !isEditable.value ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
            createBaseVNode("div", _hoisted_2$1, [
              createVNode(_component_Toast),
              selectedFiles.value.length === 0 ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass(["custom-file-upload", { "error-border": hasError.value }]),
                onDragover: _cache[0] || (_cache[0] = withModifiers(() => {
                }, ["prevent"])),
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
                createBaseVNode("div", _hoisted_3$1, [
                  !hasError.value ? (openBlock(), createElementBlock("span", _hoisted_4$1, "Drag and drop csv or xlsx files here to upload or")) : (openBlock(), createElementBlock("span", _hoisted_5$1, toDisplayString(fileErrorText.value), 1)),
                  createVNode(unref(script$1), {
                    label: "Browse",
                    icon: "pi pi-plus",
                    class: "font-poppins mt-4",
                    onClick: triggerFileInput
                  })
                ])
              ], 34)) : (openBlock(), createElementBlock("div", _hoisted_6$1, [
                createBaseVNode("ul", null, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(selectedFiles.value, (file) => {
                    return openBlock(), createElementBlock("li", {
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
          dataSourceFileCompleteJSON.value?.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_7$1, [
            createBaseVNode("div", _hoisted_8, [
              _cache[7] || (_cache[7] = createBaseVNode("p", { class: "font-poppins text-lg text-surface-600 mb-1" }, " Lookup column ", -1)),
              createVNode(_component_Dropdown, {
                modelValue: lookupColumn.value,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => lookupColumn.value = $event),
                options: dataSourceColumnNames.value,
                filter: "",
                placeholder: "Select country",
                class: "w-full md:w-80"
              }, null, 8, ["modelValue", "options"])
            ]),
            createBaseVNode("div", _hoisted_9, [
              _cache[8] || (_cache[8] = createBaseVNode("p", { class: "font-poppins text-lg text-surface-600" }, " Data starts on line ", -1)),
              createBaseVNode("p", _hoisted_10, " write between 1 to " + toDisplayString(dataSourceFileCompleteJSON.value?.length), 1),
              createVNode(_component_InputNumber, {
                modelValue: dataStartLine.value,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => dataStartLine.value = $event),
                disabled: "",
                class: "w-full md:w-80",
                "input-id": "minmax-buttons",
                mode: "decimal",
                "show-buttons": "",
                min: 1,
                max: dataSourceFileCompleteJSON.value?.length ? dataSourceFileCompleteJSON.value?.length : 100
              }, null, 8, ["modelValue", "max"])
            ])
          ])) : createCommentVNode("", true),
          dataSourceFileCompleteJSON.value?.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_11, [
            createVNode(_component_SelectButton, {
              modelValue: tableViewType.value,
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => tableViewType.value = $event),
              options: tableViewOptions.value,
              "aria-labelledby": "basic",
              class: "font-poppins"
            }, null, 8, ["modelValue", "options"])
          ])) : createCommentVNode("", true),
          dataSourceFileCompleteJSON.value?.length > 0 ? (openBlock(), createBlock(_sfc_main$3, {
            key: 3,
            "data-source-file-complete-j-s-o-n": dataSourceFileCompleteJSON.value,
            "data-source-column-names": dataSourceColumnNames.value,
            "data-source-selected-columns": dataSourceSelectedColumns.value,
            "data-source-selected-rows": dataSourceSelectedRows.value,
            "table-view-type": tableViewType.value,
            onChangeSelectedColumns: handleChangeSelectedColumns,
            onChangeSelectedRows: handleChangeSelectedRows
          }, null, 8, ["data-source-file-complete-j-s-o-n", "data-source-column-names", "data-source-selected-columns", "data-source-selected-rows", "table-view-type"])) : createCommentVNode("", true),
          dataSourceFileCompleteJSON.value?.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_12, [
            createVNode(unref(script$1), {
              outlined: "",
              label: "Cancel",
              onClick: _cache[4] || (_cache[4] = ($event) => emit("cancel"))
            }),
            createVNode(unref(script$1), {
              label: isEditable.value ? "Update data source" : "Create data source",
              onClick: createDataSource
            }, null, 8, ["label"])
          ])) : createCommentVNode("", true)
        ]),
        _: 1
      }, 8, ["visible"]);
    };
  }
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
const _hoisted_1 = { class: "w-full h-full bg-white overflow-scroll no-scrollbar" };
const _hoisted_2 = { class: "py-8 rounded-lg" };
const _hoisted_3 = { class: "flex flex-col" };
const _hoisted_4 = { class: "w-full flex" };
const _hoisted_5 = { class: "w-full py-5" };
const _hoisted_6 = { class: "mt-4 mb-12 ml-2" };
const _hoisted_7 = { class: "flex justify-end gap-2" };
const _sfc_main = {
  __name: "data_sources",
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
      if (!searchQuery.value) return copiedList.value;
      return filterItems(addNewListItem.value, (item) => {
        return item.title.toLowerCase().includes(searchQuery.value.toLowerCase());
      });
    });
    watch(searchQuery, (newValue) => {
      if (newValue === "") filteredLists.value = addNewListItem.value;
      else filteredLists.value = filteredList.value;
    });
    onMounted(() => {
    });
    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      list_elements: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
      }
    });
    function handleCreateDataSource(data) {
      allDataSources.value = [
        ...allDataSources.value,
        { ...data, type: "Data table", index: allDataSources.value?.length + 1 }
      ];
      visible.value = false;
    }
    function handleUpdateDataSource(data) {
      if (data?.isEditable) {
        allDataSources.value = allDataSources.value?.map((d) => {
          if (d?.index === data?.index) return { ...data, type: "Data table" };
          else return d;
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
    return (_ctx, _cache) => {
      const _component_Button = script$1;
      const _component_Toast = script$5;
      const _component_Dialog = script$9;
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          _cache[6] || (_cache[6] = createBaseVNode("p", { class: "font-semibold text-surface-600 text-xl py-2" }, "Data source", -1)),
          createBaseVNode("div", null, [
            createBaseVNode("div", _hoisted_3, [
              createBaseVNode("div", _hoisted_4, [
                createVNode(_component_Button, {
                  icon: "pi pi-plus",
                  label: "Create new data source",
                  outlined: "",
                  class: "text-success border-success hover:bg-green-50 hover:border-success w-max ml-auto",
                  severity: "success",
                  onClick: _cache[0] || (_cache[0] = ($event) => visible.value = true)
                })
              ]),
              createBaseVNode("div", _hoisted_5, [
                createBaseVNode("div", _hoisted_6, [
                  createVNode(DataTableComponent, {
                    "table-data": tableData.value,
                    filters: filters.value,
                    onRowReorder,
                    onEditItem: handleEditItem,
                    onOpenDelete: handleOpenDelete
                  }, null, 8, ["table-data", "filters"]),
                  createVNode(_component_Toast)
                ])
              ])
            ])
          ])
        ]),
        createVNode(_component_Toast),
        visible.value ? (openBlock(), createBlock(_sfc_main$1, {
          key: 0,
          visible: visible.value,
          "onUpdate:visible": _cache[1] || (_cache[1] = ($event) => visible.value = $event),
          "editable-item": editableItem.value,
          onCreateList: handleCreateList,
          onCreateDataSource: handleCreateDataSource,
          onUpdateDataSource: handleUpdateDataSource,
          onCancel: _cache[2] || (_cache[2] = ($event) => {
            visible.value = false;
            editableItem.value = {};
          }),
          onRemoveEditable: _cache[3] || (_cache[3] = ($event) => editableItem.value = {}),
          onError: "showError" in _ctx ? _ctx.showError : unref(showError),
          onSuccess: showSuccess
        }, null, 8, ["visible", "editable-item", "onError"])) : createCommentVNode("", true),
        createVNode(_component_Dialog, {
          visible: openDeleteModal.value,
          "onUpdate:visible": _cache[5] || (_cache[5] = ($event) => openDeleteModal.value = $event),
          header: "Delete",
          modal: "",
          style: { width: "25rem" }
        }, {
          default: withCtx(() => [
            _cache[7] || (_cache[7] = createBaseVNode("span", { class: "p-text-secondary block mb-5" }, [
              createBaseVNode("i", { class: "pi pi-exclamation-triangle text-error mr-2" }),
              createTextVNode("Are you sure you want to delete this Item?")
            ], -1)),
            createBaseVNode("div", _hoisted_7, [
              createVNode(_component_Button, {
                type: "button",
                label: "Cancel",
                outlined: "",
                onClick: _cache[4] || (_cache[4] = ($event) => openDeleteModal.value = false)
              }),
              createVNode(_component_Button, {
                type: "button",
                label: "Delete",
                severity: "error",
                class: "bg-error hover:bg-red-500 hover:border-error text-white",
                onClick: handleDelete
              })
            ])
          ]),
          _: 1
        }, 8, ["visible"])
      ]);
    };
  }
};
const DataSources = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8cda8ce2"]]);
export {
  DataSources as default
};
