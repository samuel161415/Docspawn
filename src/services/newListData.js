
import { ref } from 'vue';

export const newListData = ref([
    { 
        id: 1, 
        name: 'Item 1' 
    },
    { 
        id: 2, 
        name: 'Item 2' 
    },
    { 
        id: 3, 
        name: 'Item 3' 
    },
]);


export const addNewListItem = ref([
    {
        id: 1,
        title: 'List 1',
        isHovered: false,
        opensubmenu: true,
        level: 0,
        isSublistSimple : true,
        path: '1',
        sublists: [
            {
                id: 1,
                title: 'L1 e.1',
                isHovered: false,
                opensubmenu: false,
                level: 1,
                isSublistSimple : true,
                path: '1-1',
                sublists:[
                ]
            },
            {
                id: 2,
                title: 'L1 e.2',
                isHovered: false,
                sublist: true,
                opensubmenu: false,
                level: 1,
                isSublistSimple : true,
                path: '1-2',
                sublists:[  
                ]
            },
            {
                id: 3,
                title: 'L1 e.3',
                isHovered: false,
                sublist: true,
                opensubmenu: false,
                level: 1,
                isSublistSimple : true,
                path: '1-3',
                sublists:[]
            },
            {
                id: 4,
                title: 'L1 e.4',
                isHovered: false,
                sublist: true,
                opensubmenu: false,
                level: 1,
                isSublistSimple : true,
                path: '1-4',
                sublists:[]
            },
            {
                id: 5,
                title: 'L1 Sublist 1',
                isHovered: false,
                sublist: true,
                opensubmenu: false,
                level: 1,
                isSublistSimple : true,
                path: '1-5',
                sublists:[
                    {
                        id: 1,
                        title: 'L1 SL 1 e.1',
                        isHovered: false,
                        opensubmenu: false,
                        level: 2,
                        isSublistSimple : true,
                        path: '1-5-1',
                        sublists:[]
                    },
                    {
                        id: 2,
                        title: 'L1 SL 1 e.1',
                        isHovered: false,
                        opensubmenu: false,
                        level: 2,
                        isSublistSimple : true,
                        path: '1-5-2',
                        sublists:[]
                    },
                ]
            },
            {
                id: 6,
                title: 'L1 Sublist 2',
                isHovered: false,
                sublist: true,
                opensubmenu: false,
                level: 1,
                isSublistSimple : true,
                path: '1-6',
                sublists:[
                    {
                        id: 1,
                        title: 'L1 SL 2 e.1',
                        isHovered: false,
                        opensubmenu: false,
                        level: 2,
                        isSublistSimple : true,
                        path: '1-6-1',
                        sublists:[]
                    },
                    {
                        id: 2,
                        title: 'L1 SL 2 e.2',
                        isHovered: false,
                        opensubmenu: false,
                        level: 2,
                        isSublistSimple : true,
                        path: '1-6-2',
                        sublists:[]
                    },
                ]
            },
            
        ]
    },
    {
        id: 2,
        title: 'List 2',
        isHovered: false,
        opensubmenu: true,
        level: 0,
        isSublistSimple : true,
        path: '2',
        sublists: [
            {
                id: 1,
                title: 'L2 e.1',
                isHovered: false,
                sublist: true,
                opensubmenu: false,
                level: 1,
                isSublistSimple : true,
                path: '2-1',
                sublists:[]
            },
            {
                id: 2,
                title: 'L2 e.2',
                isHovered: false,
                sublist: true,
                opensubmenu: false,
                level: 1,
                isSublistSimple : true,
                path: '2-2',
                sublists:[]
            },
            {
                id: 3,
                title: 'L2 e.2',
                isHovered: false,
                sublist: true,
                opensubmenu: false,
                level: 1,
                isSublistSimple : true,
                path: '2-3',
                sublists:[]
            },
            {
                id: 4,
                title: 'L2 Sublist 1',
                isHovered: false,
                sublist: true,
                opensubmenu: false,
                level: 1,
                isSublistSimple : true,
                path: '2-4',
                sublists:[
                    {
                        id: 1,
                        title: 'L2 SL 1 e.1',
                        isHovered: false,
                        opensubmenu: false,
                        level: 2,
                        isSublistSimple : true,
                        path: '2-4-1',
                        sublists:[]
                    },
                    {
                        id: 2,
                        title: 'L2 SL 1 e.2',
                        isHovered: false,
                        opensubmenu: false,
                        level: 2,
                        isSublistSimple : true,
                        path: '2-4-2',
                        sublists:[]
                    },
                ]
            },
            {
                id: 5,
                title: 'L2 Sublist 2',
                isHovered: false,
                sublist: true,
                opensubmenu: false,
                level: 1,
                isSublistSimple : true,
                path: '2-5',
                sublists:[
                    {
                        id: 1,
                        title: 'L2 SL 2 e.1',
                        isHovered: false,
                        opensubmenu: false,
                        level: 2,
                        isSublistSimple : true,
                        path: '2-5-1',
                        sublists:[]
                    },
                    {
                        id: 2,
                        title: 'L2 SL 2 e.2',
                        isHovered: false,
                        opensubmenu: false,
                        level: 2,
                        isSublistSimple : true,
                        path: '2-5-2',
                        sublists:[]
                    },
                ]
            }
        ]
    },
    // {
    //     id: 3,
    //     title: 'List 3',
    //     isHovered: false,
    //     opensubmenu: true,
    //     level: 0,
    //     isSublistSimple : true,
    //     path: '3',
    //     sublists: [
    //         {id: 3,
    //         title: 'List 3',
    //         isHovered: false,
    //         opensubmenu: true,
    //         level: 1,
    //         isSublistSimple : true,
    //         path: '3-1',
    //         sublists: []
    //     }
    //     ]
    // },
    // {
    //     id: 4,
    //     title: 'List 4',
    //     isHovered: false,
    //     opensubmenu: true,
    //     level: 0,
    //     isSublistSimple : true,
    //     path: '4',
    //     sublists: [
    //         {id: 4,
    //             title: 'List 4',
    //             isHovered: false,
    //             opensubmenu: true,
    //             level: 1,
    //             isSublistSimple : true,
    //             path: '4-1',
    //             sublists: []
    //         }
    //     ]
    // },
    // {
    //     id: 5,
    //     title: 'List  5',
    //     isHovered: false,
    //     opensubmenu: true,
    //     level: 0,
    //     isSublistSimple : true,
    //     path: '5',
    //     sublists: [
    //         {id: 5,
    //             title: 'List child 5',
    //             isHovered: false,
    //             opensubmenu: true,
    //             level: 1,
    //             isSublistSimple : true,
    //             path: '3-1',
    //             sublists: []
    //         }
    //     ]
    // },
    // {
    //     id: 6,
    //     title: 'List 6',
    //     isHovered: false,
    //     opensubmenu: true,
    //     level: 0,
    //     isSublistSimple : true,
    //     path: '6',
    //     sublists: [
    //         {id: 3,
    //             title: 'List child 6',
    //             isHovered: false,
    //             opensubmenu: true,
    //             level: 1,
    //             isSublistSimple : true,
    //             path: '6-1',
    //             sublists: []
    //         }
    //     ]
    // },
    // {
    //     id: 7,
    //     title: 'List 7',
    //     isHovered: false,
    //     opensubmenu: true,
    //     level: 0,
    //     isSublistSimple : true,
    //     path: '7',
    //     sublists: [
    //         {id: 7,
    //             title: 'List child 7',
    //             isHovered: false,
    //             opensubmenu: true,
    //             level: 1,
    //             isSublistSimple : true,
    //             path: '7-1',
    //             sublists: []
    //         }
    //     ]
    // },
    // {
    //     id: 8,
    //     title: 'List 8',
    //     isHovered: false,
    //     opensubmenu: true,
    //     level: 0,
    //     isSublistSimple : true,
    //     path: '8',
    //     sublists: [
    //         {id: 3,
    //             title: 'List child 8',
    //             isHovered: false,
    //             opensubmenu: true,
    //             level: 1,
    //             isSublistSimple : true,
    //             path: '8-1',
    //             sublists: []
    //         }
    //     ]
    // },
    // {
    //     id: 9,
    //     title: 'List 9',
    //     isHovered: false,
    //     opensubmenu: true,
    //     level: 0,
    //     isSublistSimple : true,
    //     path: '9',
    //     sublists: [
    //         {id: 9,
    //             title: 'List child 9',
    //             isHovered: false,
    //             opensubmenu: true,
    //             level: 1,
    //             isSublistSimple : true,
    //             path: '9-1',
    //             sublists: []
    //         }
    //     ]
    // },
    // {
    //     id: 10,
    //     title: 'List 10',
    //     isHovered: false,
    //     opensubmenu: true,
    //     level: 0,
    //     isSublistSimple : true,
    //     path: '10',
    //     sublists: [{id: 3,
    //         title: 'List child 10',
    //         isHovered: false,
    //         opensubmenu: true,
    //         level: 1,
    //         isSublistSimple : true,
    //         path: '10-1',
    //         sublists: []
    //     }]
    // },
])
