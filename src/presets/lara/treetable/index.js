export default {
    root: ({ props }) => ({
        class: [
            'relative',
            {
                'flex flex-col h-full': props.scrollHeight === 'flex'
            }
        ]
    }),
    loadingoverlay: {
        class: [
            // Position
            'absolute',
            'top-0 left-0',
            'z-20',

            // Flex & Alignment
            'flex items-center justify-center',

            // Size
            'w-full h-full',

            // Color
            'bg-surface-100/40 dark:bg-surface-800/40',

            // Transition
            'transition duration-200'
        ]
    },
    loadingicon: {
        class: 'w-8 h-8 animate-spin'
    },
    wrapper: ({ props }) => ({
        class: [
            // Overflow
            {
                'relative overflow-auto': props.scrollable,
                'overflow-x-auto': props.resizableColumns
            }
        ]
    }),
    header: ({ props }) => ({
        class: [
            'font-bold',

            // Shape
            props.showGridlines ? 'border-x border-t border-b-0' : 'border-y border-x-0',

            // Spacing
            'p-4',

            // Color
            'bg-surface-50 dark:bg-surface-800',
            'border-surface-200 dark:border-surface-700',
            'text-surface-700 dark:text-white/80'
        ]
    }),
    footer: {
        class: [
            // Background, Border & Text
            'bg-slate-50 text-slate-700',
            'border border-x-0 border-t-0 border-surface-50',
            // Padding & Font
            'p-4 font-bold',
            // Dark Mode
            'dark:bg-surface-900 dark:text-white/70 dark:border-surface-700'
        ]
    },
    table: {
        class: [
            // Table & Width
            'border-collapse table-fixed w-full '
        ]
    },
    thead: ({ props }) => ({
        class: [
            // Position & Z-index
            {
                'top-0 z-40 sticky': props.scrollable
            }
        ]
    }),
    tbody: ({ props }) => ({
        class: [
            // Block Display
            {
                block: props.scrollable
            }
        ]
    }),
    tfoot: ({ props }) => ({
        class: [
            // Block Display
            {
                block: props.scrollable
            }
        ]
    }),
    headerrow: ({ props }) => ({
        class: [
            // Flexbox & Width
            {
                'flex flex-nowrap w-full': props.scrollable
            }
        ]
    }),
    row: ({ context, props }) => ({
        class: [
            // Flex
            { 'flex flex-nowrap w-full': context.scrollable },

            // Color
            'dark:text-white/80',
            { 'bg-primary-50 text-primary-700 dark:bg-primary-400/30': context.selected },
            { 'bg-surface-0 text-surface-600 dark:bg-surface-800': !context.selected },

            // Hover & Flexbox
            {
                'hover:bg-surface-300/20 hover:text-surface-600': context.selectable && !context.selected
            },
            'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 ring-inset dark:focus:ring-primary-300/50',

            // Transition
            { 'transition duration-200': (props.selectionMode && !context.selected) || props.rowHover }
        ]
    }),
    headercell: ({ context, props }) => ({
        class: [
            'font-bold',

            // Position
            { 'sticky z-40': context.scrollable && context.scrollDirection === 'both' && context.frozen },

            // Flex & Alignment
            {
                'flex flex-1 items-center': context.scrollable,
                'flex-initial shrink-0': context.scrollable && context.scrollDirection === 'both' && !context.frozen
            },
            'text-left',

            // Shape
            { 'first:border-l border-y border-r': context?.showGridlines },
            'border-0 border-b border-solid',

            // Spacing
            context?.size === 'small' ? 'p-2' : context?.size === 'large' ? 'p-5' : 'p-4',

            // Color
            (props.sortable === '' || props.sortable) && context.sorted ? 'bg-primary-50 text-primary-700' : 'bg-surface-50 text-surface-700',
            (props.sortable === '' || props.sortable) && context.sorted ? 'dark:text-white dark:bg-primary-400/30' : 'dark:text-white/80 dark:bg-surface-800',
            'border-surface-200 dark:border-surface-700',

            // States
            { 'hover:bg-surface-100 dark:hover:bg-surface-400/30': (props.sortable === '' || props.sortable) && !context?.sorted },
            'focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring focus-visible:ring-inset focus-visible:ring-primary-400/50 dark:focus-visible:ring-primary-300/50',

            // Transition
            { 'transition duration-200': props.sortable === '' || props.sortable },

            // Misc
            {
                'overflow-hidden relative bg-clip-padding': context.resizable && !context.frozen
            }
        ]
    }),
    column: {
        headercell: ({ context, props }) => ({
            class: [
                'font-bold',

                // Position
                { 'sticky z-40': context.scrollable && context.scrollDirection === 'both' && context.frozen },

                // Flex & Alignment
                {
                    'flex flex-1 items-center': context.scrollable,
                    'flex-initial shrink-0': context.scrollable && context.scrollDirection === 'both' && !context.frozen
                },
                'text-left',

                // Shape
                { 'first:border-l border-y border-r': context?.showGridlines },
                'border-0 border-b border-solid',

                // Spacing
                context?.size === 'small' ? 'p-2' : context?.size === 'large' ? 'p-5' : 'p-4',

                // Color
                (props.sortable === '' || props.sortable) && context.sorted ? 'bg-primary-50 text-primary-700' : 'bg-surface-50 text-surface-700',
                (props.sortable === '' || props.sortable) && context.sorted ? 'dark:text-white dark:bg-primary-400/30' : 'dark:text-white/80 dark:bg-surface-800',
                'border-surface-200 dark:border-surface-700',

                // States
                { 'hover:bg-surface-100 dark:hover:bg-surface-400/30': (props.sortable === '' || props.sortable) && !context?.sorted },
                'focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring focus-visible:ring-inset focus-visible:ring-primary-400/50 dark:focus-visible:ring-primary-300/50',

                // Transition
                { 'transition duration-200': props.sortable === '' || props.sortable },

                // Misc
                {
                    'overflow-hidden relative bg-clip-padding': context.resizable && !context.frozen
                }
            ]
        }),
        bodycell: ({ context }) => ({
            class: [
                // Position
                {
                    sticky: context.scrollable && context.scrollDirection === 'both' && context.frozen
                },

                // Flex & Alignment
                {
                    'flex flex-1 items-center': context.scrollable,
                    'flex-initial shrink-0': context.scrollable && context.scrollDirection === 'both' && !context.frozen
                },
                'text-left',

                // Shape
                'border-0 border-b border-solid',
                'border-surface-200 dark:border-surface-700',
                {
                    'border-x-0 border-l-0': !context.showGridlines
                },
                { 'first:border-l border-r border-b': context?.showGridlines },

                // Color
                'bg-surface-0 dark:bg-surface-800',

                // Spacing
                context?.size === 'small' ? 'p-2' : context?.size === 'large' ? 'p-5' : 'p-4',

                // Misc
                'dark:border-surface-700',
                {
                    'cursor-pointer': context.selectable,
                    sticky: context.scrollable && context.scrollDirection === 'both' && context.frozen,
                    'border-x-0 border-l-0': !context.showGridlines
                }
            ]
        }),
        rowtoggler: {
            class: [
                'relative',

                // Flex & Alignment
                'inline-flex items-center justify-center',
                'text-left align-middle',

                // Spacing
                'm-0 mr-2 p-0',

                // Size
                'w-8 h-8',

                // Shape
                'border-0 rounded-full',

                // Color
                'text-surface-500 dark:text-white/70',
                'bg-transparent',

                // States
                'hover:bg-surface-50 dark:hover:bg-surface-700',
                'focus-visible:outline-none focus-visible:outline-offset-0',
                'focus-visible:ring focus-visible:ring-primary-400/50 dark:focus-visible:ring-primary-300/50',

                // Transition
                'transition duration-200',

                // Misc
                'overflow-hidden',
                'cursor-pointer select-none'
            ]
        },
        sorticon: ({ context }) => ({
            class: ['ml-2 inline-block', context.sorted ? 'fill-primary-700 dark:fill-white/80' : 'fill-surface-700 dark:fill-white/70']
        }),
        sortbadge: {
            class: [
                // Flex & Alignment
                'inline-flex items-center justify-center align-middle',

                // Shape
                'rounded-full',

                // Size
                'w-[1.143rem] leading-[1.143rem]',

                // Spacing
                'ml-2',

                // Color
                'text-primary-700 dark:text-white',
                'bg-primary-50 dark:bg-primary-400/30'
            ]
        },
        columnresizer: {
            class: [
                'block',

                // Position
                'absolute top-0 right-0',

                // Sizing
                'w-2 h-full',

                // Spacing
                'm-0 p-0',

                // Color
                'border border-transparent',

                // Misc
                'cursor-col-resize'
            ]
        },
        checkboxwrapper: {
            class: [
                'relative',

                // Flex & Alignment
                'inline-flex align-bottom',

                // Size
                'w-6 h-6',

                // Spacing
                'mr-2',

                // Misc
                'cursor-pointer select-none'
            ]
        },
        checkbox: ({ context }) => ({
            class: [
                // Flex & Alignment
                'flex items-center justify-center',

                // Shape
                'border-2 rounded-lg',

                // Size
                'w-6 h-6',

                // Color
                'text-surface-600',
                {
                    'border-surface-200 bg-surface-0 dark:border-surface-700 dark:bg-surface-900': !context.checked,
                    'border-primary-500 bg-primary-500 dark:border-primary-400 dark:bg-primary-400': context.checked
                },

                // States
                'focus:outline-none focus:outline-offset-0',
                {
                    'ring ring-primary-400/50 dark:ring-primary-300/50': context.focused
                },

                // Transition
                'transition-colors duration-200',

                // Misc
                { 'cursor-default opacity-60': context.disabled }
            ]
        }),
        checkboxicon: {
            class: [
                // Size
                'w-4 h-4',
                'text-base leading-none',

                // Color
                'text-white dark:text-surface-900',

                // Transition
                'transition-all duration-200'
            ]
        },
        transition: {
            enterFromClass: 'opacity-0 scale-y-[0.8]',
            enterActiveClass: 'transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]',
            leaveActiveClass: 'transition-opacity duration-100 ease-linear',
            leaveToClass: 'opacity-0'
        }
    },
    resizehelper: {
        class: 'absolute hidden w-[2px] z-20 bg-primary-500 dark:bg-primary-400'
    }
};
