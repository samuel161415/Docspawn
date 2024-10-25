import script from './datatable.esm--i0bte5q.mjs';
import script$1 from './column.esm-smoz5X4x.mjs';
import { ref, watch, mergeProps, withCtx, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = {
  __name: "TableForDataSourceEdit",
  __ssrInlineRender: true,
  props: ["dataSourceFileCompleteJSON", "dataSourceColumnNames", "dataSourceSelectedColumns", "dataSourceSelectedRows", "tableViewType"],
  emits: ["changeSelectedColumns", "changeSelectedRows"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const selectedColumns = ref((props == null ? void 0 : props.dataSourceSelectedColumns) ? props == null ? void 0 : props.dataSourceSelectedColumns : []);
    const dt = ref();
    const loading = ref(false);
    const totalRecords = ref(0);
    const completeData = ref();
    const selectedRows = ref();
    const selectAll = ref(false);
    const first = ref(0);
    const lazyParams = ref({});
    watch(selectedColumns, (newVal) => {
      emit("changeSelectedColumns", newVal);
    });
    watch(selectedRows, (newVal) => {
      emit("changeSelectedRows", newVal);
    });
    function loadLazyData(event) {
      loading.value = true;
      lazyParams.value = { ...lazyParams.value, first: (event == null ? void 0 : event.first) || first.value };
      setTimeout(() => {
        var _a;
        completeData.value = props == null ? void 0 : props.dataSourceFileCompleteJSON;
        totalRecords.value = (_a = props == null ? void 0 : props.dataSourceColumnNames) == null ? void 0 : _a.length;
        loading.value = false;
      }, Math.random() * 1e3 + 250);
    }
    function onPage(event) {
      lazyParams.value = event;
      loadLazyData(event);
    }
    function onSort(event) {
      lazyParams.value = event;
      loadLazyData(event);
    }
    function onSelectAllChange(event) {
      const cData = JSON.parse(JSON.stringify(completeData == null ? void 0 : completeData.value));
      if (event.checked) {
        selectedRows.value = cData;
        selectAll.value = true;
      } else {
        selectedRows.value = [];
        selectAll.value = false;
      }
    }
    function onRowSelect(event) {
    }
    function onRowUnselect(event) {
    }
    function toggleColumnSelection(columnName) {
      const index = selectedColumns.value.indexOf(columnName);
      if (index > -1)
        selectedColumns.value.splice(index, 1);
      else
        selectedColumns.value.push(columnName);
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_DataTable = script;
      const _component_Column = script$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card p-fluid mt-8" }, _attrs))}>`);
      if ((props == null ? void 0 : props.tableViewType) === "Editable View") {
        _push(ssrRenderComponent(_component_DataTable, {
          ref_key: "dt",
          ref: dt,
          selection: selectedRows.value,
          "onUpdate:selection": ($event) => selectedRows.value = $event,
          value: completeData.value,
          lazy: "",
          paginator: ((_a = completeData.value) == null ? void 0 : _a.length) > 0,
          first: first.value,
          rows: 10,
          "data-key": "auto_index_by_docspawn",
          "total-records": totalRecords.value,
          loading: loading.value,
          "select-all": selectAll.value,
          "table-style": "min-width: 75rem",
          onPage: ($event) => onPage($event),
          onSort: ($event) => onSort($event),
          onSelectAllChange,
          onRowSelect,
          onRowUnselect
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Column, {
                "selection-mode": "multiple",
                "header-style": "width: 3rem"
              }, null, _parent2, _scopeId));
              _push2(`<!--[-->`);
              ssrRenderList(props == null ? void 0 : props.dataSourceColumnNames, (columnName, index) => {
                _push2(ssrRenderComponent(_component_Column, {
                  key: index,
                  field: columnName
                }, {
                  header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    var _a2, _b2, _c, _d;
                    if (_push3) {
                      _push3(`<div class="flex flex-col items-center gap-2"${_scopeId2}><input type="checkbox"${ssrRenderAttr("value", (_a2 = selectedColumns.value) == null ? void 0 : _a2.includes(columnName))}${ssrIncludeBooleanAttr((_b2 = selectedColumns.value) == null ? void 0 : _b2.includes(columnName)) ? " checked" : ""} binary variant="filled"${_scopeId2}><p class="font-poppins whitespace-nowrap"${_scopeId2}>${ssrInterpolate(columnName)}</p></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "flex flex-col items-center gap-2" }, [
                          createVNode("input", {
                            type: "checkbox",
                            value: (_c = selectedColumns.value) == null ? void 0 : _c.includes(columnName),
                            checked: (_d = selectedColumns.value) == null ? void 0 : _d.includes(columnName),
                            binary: "",
                            variant: "filled",
                            onChange: ($event) => toggleColumnSelection(columnName)
                          }, null, 40, ["value", "checked", "onChange"]),
                          createVNode("p", { class: "font-poppins whitespace-nowrap" }, toDisplayString(columnName), 1)
                        ])
                      ];
                    }
                  }),
                  body: withCtx(({ data, field }, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<p class="font-poppins whitespace-nowrap"${_scopeId2}>${ssrInterpolate(data[field])}</p>`);
                    } else {
                      return [
                        createVNode("p", { class: "font-poppins whitespace-nowrap" }, toDisplayString(data[field]), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              return [
                createVNode(_component_Column, {
                  "selection-mode": "multiple",
                  "header-style": "width: 3rem"
                }),
                (openBlock(true), createBlock(Fragment, null, renderList(props == null ? void 0 : props.dataSourceColumnNames, (columnName, index) => {
                  return openBlock(), createBlock(_component_Column, {
                    key: index,
                    field: columnName
                  }, {
                    header: withCtx(() => {
                      var _a2, _b2;
                      return [
                        createVNode("div", { class: "flex flex-col items-center gap-2" }, [
                          createVNode("input", {
                            type: "checkbox",
                            value: (_a2 = selectedColumns.value) == null ? void 0 : _a2.includes(columnName),
                            checked: (_b2 = selectedColumns.value) == null ? void 0 : _b2.includes(columnName),
                            binary: "",
                            variant: "filled",
                            onChange: ($event) => toggleColumnSelection(columnName)
                          }, null, 40, ["value", "checked", "onChange"]),
                          createVNode("p", { class: "font-poppins whitespace-nowrap" }, toDisplayString(columnName), 1)
                        ])
                      ];
                    }),
                    body: withCtx(({ data, field }) => [
                      createVNode("p", { class: "font-poppins whitespace-nowrap" }, toDisplayString(data[field]), 1)
                    ]),
                    _: 2
                  }, 1032, ["field"]);
                }), 128))
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(ssrRenderComponent(_component_DataTable, {
          ref_key: "dt",
          ref: dt,
          value: selectedRows.value,
          lazy: "",
          paginator: ((_b = selectedRows.value) == null ? void 0 : _b.length) > 0,
          first: first.value,
          rows: 10,
          "data-key": "auto_index_by_docspawn",
          "total-records": totalRecords.value,
          loading: loading.value,
          "select-all": selectAll.value,
          "table-style": "min-width: 75rem",
          onPage: ($event) => onPage($event),
          onSort: ($event) => onSort($event)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(selectedColumns.value, (columnName, index) => {
                _push2(ssrRenderComponent(_component_Column, {
                  key: index,
                  field: columnName
                }, {
                  header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="flex flex-col items-center gap-2"${_scopeId2}><p class="font-poppins whitespace-nowrap"${_scopeId2}>${ssrInterpolate(columnName)}</p></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "flex flex-col items-center gap-2" }, [
                          createVNode("p", { class: "font-poppins whitespace-nowrap" }, toDisplayString(columnName), 1)
                        ])
                      ];
                    }
                  }),
                  body: withCtx(({ data, field }, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<p class="font-poppins whitespace-nowrap"${_scopeId2}>${ssrInterpolate(data[field])}</p>`);
                    } else {
                      return [
                        createVNode("p", { class: "font-poppins whitespace-nowrap" }, toDisplayString(data[field]), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(selectedColumns.value, (columnName, index) => {
                  return openBlock(), createBlock(_component_Column, {
                    key: index,
                    field: columnName
                  }, {
                    header: withCtx(() => [
                      createVNode("div", { class: "flex flex-col items-center gap-2" }, [
                        createVNode("p", { class: "font-poppins whitespace-nowrap" }, toDisplayString(columnName), 1)
                      ])
                    ]),
                    body: withCtx(({ data, field }) => [
                      createVNode("p", { class: "font-poppins whitespace-nowrap" }, toDisplayString(data[field]), 1)
                    ]),
                    _: 2
                  }, 1032, ["field"]);
                }), 128))
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/settings/data_source/TableForDataSourceEdit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
ref([
  {
    id: 1,
    name: "Item 1"
  },
  {
    id: 2,
    name: "Item 2"
  },
  {
    id: 3,
    name: "Item 3"
  }
]);
const addNewListItem = ref([
  {
    id: 1,
    title: "List 1",
    isHovered: false,
    opensubmenu: true,
    level: 0,
    isSublistSimple: true,
    path: "1",
    sublists: [
      {
        id: 1,
        title: "Report",
        isHovered: false,
        opensubmenu: false,
        level: 1,
        isSublistSimple: true,
        path: "1-1",
        sublists: [
          {
            id: 1,
            title: "Section",
            isHovered: false,
            opensubmenu: true,
            level: 2,
            isSublistSimple: true,
            path: "1-1-1",
            sublists: [
              {
                id: 1,
                title: "Data",
                isHovered: false,
                opensubmenu: true,
                level: 3,
                isSublistSimple: true,
                path: "1-1-1-1",
                sublists: [
                  // {
                  //     id: 1,
                  //     title: 'Inside data',
                  //     isHovered: false,
                  //     level: 4,
                  //     isSublistSimple : true,
                  //     path: '1-1-1-1-1',
                  //     sublists:[
                  //         {   id: 1,
                  //             title: 'inner data',
                  //             isHovered: false,
                  //             level: 5,
                  //             isSublistSimple : true,
                  //             path: '1-1-1-1-1-1',}
                  //     ]
                  // }
                ]
              }
            ]
          },
          {
            id: 2,
            title: "Task",
            isHovered: false,
            level: 2,
            opensubmenu: false,
            isSublistSimple: true,
            path: "1-1-2",
            sublists: [
              {
                id: 1,
                title: "Task Data",
                isHovered: false,
                level: 3,
                isSublistSimple: true,
                path: "1-1-2-1",
                sublists: []
              }
            ]
          }
        ]
      },
      {
        id: 2,
        title: "Trial 1",
        isHovered: false,
        sublist: true,
        opensubmenu: false,
        level: 1,
        isSublistSimple: true,
        path: "1-2",
        sublists: [
          {
            id: 2,
            title: "Trial Ttask",
            isHovered: false,
            level: 2,
            opensubmenu: false,
            isSublistSimple: true,
            path: "1-2-1",
            sublists: [
              {
                id: 2,
                title: "Task data",
                isHovered: false,
                level: 3,
                isSublistSimple: true,
                path: "1-2-1-1",
                sublists: []
              }
            ]
          }
        ]
      },
      {
        id: 3,
        title: "Item 2",
        isHovered: false,
        sublist: true,
        opensubmenu: false,
        level: 1,
        isSublistSimple: true,
        path: "1-3",
        sublists: []
      }
    ]
  },
  {
    id: 2,
    title: "List 2",
    isHovered: false,
    opensubmenu: true,
    level: 0,
    isSublistSimple: true,
    path: "2",
    sublists: [
      {
        id: 1,
        title: "Contract",
        isHovered: false,
        sublist: true,
        opensubmenu: false,
        level: 1,
        isSublistSimple: true,
        path: "2-1",
        sublists: [
          {
            id: 1,
            title: "Contract item",
            isHovered: false,
            opensubmenu: false,
            level: 2,
            isSublistSimple: true,
            path: "2-1-1",
            sublists: []
          }
        ]
      },
      {
        id: 2,
        title: "Form",
        isHovered: false,
        sublist: true,
        opensubmenu: false,
        level: 1,
        isSublistSimple: true,
        path: "2-2",
        sublists: []
      }
    ]
  }
]);

export { _sfc_main as _, addNewListItem as a };
//# sourceMappingURL=newListData-SAE07HcH.mjs.map
