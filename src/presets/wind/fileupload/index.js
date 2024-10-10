export default {
    input: {
        class: 'hidden'
    },
    buttonbar: {
        class: ['flex', 'flex-wrap', 'bg-surface-0', 'dark:bg-surface-900', 'text-surface-700', 'dark:text-white/80', 'p-[1.125rem]', 'gap-2', 'border', 'border-solid', 'border-surface-200', 'dark:border-surface-700', 'border-b-0', 'rounded-tr-lg', 'rounded-tl-lg']
    },
    chooseButton: {
        class: ['relative', 'items-center inline-flex text-center align-bottom justify-center', 'px-4 py-2', 'rounded-md', 'leading-[normal]', 'font-medium', 'text-primary-inverse', 'bg-primary', 'border-primary', 'hover:bg-primary-hover', 'focus:outline-none focus:outline-offset-0 focus:ring-1', 'focus:ring-primary', 'overflow-hidden', 'cursor-pointer']
    },
    chooseIcon: {
        class: ['mr-2', 'inline-block']
    },
    chooseButtonLabel: {
        class: ['flex-1', 'font-bold']
    },
    uploadbutton: {
        icon: {
            class: 'mr-2'
        }
    },
    cancelbutton: {
        icon: {
            class: 'mr-2'
        }
    },
    content: {
        class: ['relative', 'bg-surface-0', 'dark:bg-surface-900', 'text-surface-700', 'dark:text-white/80', 'p-[1.125rem]', 'border border-t-0', 'border-surface-200', 'dark:border-surface-700', 'rounded-b-lg']
    },
    file: {
        class: ['flex', 'items-center', 'flex-wrap', 'p-4', 'mb-2', 'last:mb-0', 'border', 'border-surface-200', 'dark:border-surface-700', 'gap-2', 'rounded']
    },
    thumbnail: {
        class: 'shrink-0'
    },
    fileName: {
        class: 'mb-2 break-all'
    },
    fileSize: {
        class: 'mr-2'
    },
    uploadicon: {
        class: 'mr-2'
    },
    progressbar: {
        root: {
            class: ['overflow-hidden', 'absolute top-0 left-0', 'border-0', 'h-2', 'rounded-md', 'w-full', 'bg-surface-100 dark:bg-surface-700']
        },
        value: {
            class: ['absolute flex items-center justify-center overflow-hidden', 'bg-primary', 'm-0', 'h-full w-0', 'border-0', 'transition-width duration-1000 ease-in-out']
        }
    }

}