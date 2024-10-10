export default {
    root: ({ props, state }) => ({
        class: [
          // Display and Position
          "inline-flex",
          "relative",
          // Shape
          "rounded-lg",
          // Color and Background
          "bg-surface-0 dark:bg-surface-900",
          "border border-surface-300 dark:border-surface-700",
          // Transitions
          "transition-all",
          "duration-200",
          // States
          "hover:border-primary-500 dark:hover:border-primary-300",
          { "outline-none outline-offset-0 ring ring-primary-400/50 dark:ring-primary-300/50": state.focused },
          // Misc
          "cursor-pointer",
          "select-none",
          { "opacity-60": props.disabled, "pointer-events-none": props.disabled, "cursor-default": props.disabled }
        ]
      }),
    labelContainer: {
      class: "overflow-hidden flex flex-auto cursor-pointer "
    },
    label: ({ props }) => {
        var _a, _b;
        return {
          class: [
            "leading-none font-poppins mt-1",
            "block ",
            // Spacing
            {
              "p-3": props.display !== "chip",
              "py-3 px-3": props.display === "chip" && !((_a = props == null ? void 0 : props.modelValue) != null && _a.length),
              "py-1.5 px-3": props.display === "chip" && ((_b = props == null ? void 0 : props.modelValue) == null ? void 0 : _b.length) > 0
            },
            // Color
            { "text-surface-600 dark:text-white/80": props.modelValue, "text-surface-500 dark:text-surface-500": !props.modelValue },
            "placeholder:text-surface-400 dark:placeholder:text-surface-500",
            // Transitions
            "transition duration-200",
            // Misc
            "overflow-hidden whitespace-nowrap cursor-pointer overflow-ellipsis"
          ]
        };
      },
    token: {
      class: ["inline-flex items-center", "py-1.5 px-3 mr-2", "rounded-[1.14rem]", "bg-surface-200 dark:bg-surface-700", "text-surface-700 dark:text-white/70", "cursor-default"]
    },
    removeTokenIcon: {
      class: ["rounded-md leading-6", "ml-2", "w-4 h-4", "transition duration-200 ease-in-out", "cursor-pointer"]
    },
    trigger: {
      class: ["flex items-center justify-center", "shrink-0", "bg-transparent", "text-surface-500", "w-12", "rounded-tr-md", "rounded-br-md"]
    },
    panel: {
      class: ["absolute top-0 left-0", "border-0 dark:border", "rounded-md", "shadow-md", "bg-surface-0 dark:bg-surface-800", "text-surface-800 dark:text-white/80", "dark:border-surface-700"]
    },
    header: {
      class: ["flex items-center justify-between", "py-3 px-5", "m-0", "border-b", "rounded-tl-md", "rounded-tr-md", "text-surface-700 dark:text-white/80", "bg-surface-100 dark:bg-surface-800", "border-surface-300 dark:border-surface-700"]
    },
    headerCheckboxContainer: {
      class: ["relative", "inline-flex", "align-bottom", "w-6", "h-6", "cursor-pointer", "select-none"]
    },
    headerCheckbox: {
      root: {
        class: ["relative", "inline-flex", "align-bottom", "w-6", "h-6", "mr-2", "cursor-pointer", "select-none"]
      },
      box: ({ props, context }) => ({
            class: [
              // Alignment
              "flex",
              "items-center",
              "justify-center",
              // Size
              "w-6",
              "h-6",
              // Shape
              "rounded-md",
              "border-2",
              // Colors
              {
                "border-surface-200 bg-surface-0 dark:border-surface-700 dark:bg-surface-900": !context.checked,
                "border-primary-500 bg-primary-500 dark:border-primary-400 dark:bg-primary-400": context.checked
              },
              // States
              {
                "peer-hover:border-primary-500 dark:peer-hover:border-primary-400": !props.disabled && !context.checked,
                "peer-hover:bg-primary-600 dark:peer-hover:bg-primary-300 peer-hover:border-primary-700 dark:peer-hover:border-primary-300": !props.disabled && context.checked,
                "peer-focus-visible:border-primary-500 dark:peer-focus-visible:border-primary-400 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-400/20 dark:peer-focus-visible:ring-primary-300/20": !props.disabled,
                "cursor-default opacity-60": props.disabled
              },
              // Transitions
              "transition-colors",
              "duration-200"
            ]
        }),
      input: {
        class: ["peer", "w-full ", "h-full", "absolute", "top-0 left-0", "z-10", "p-0", "m-0", "opacity-0", "rounded-md", "outline-none", "border-2 border-surface-200 dark:border-surface-700", "appareance-none", "cursor-pointer"]
      },
      icon: {
        class: ["text-base leading-none", "w-4", "h-4", "text-white dark:text-surface-900", "transition-all", "duration-200"]
      }
    },
    itemCheckbox: {
      root: {
        class: ["relative", "inline-flex", "align-bottom", "w-6", "h-6", "mr-2", "cursor-pointer", "select-none"]
      },
      box: ({ props, context }) => ({
            class: [
              // Alignment
              "flex",
              "items-center",
              "justify-center",
              // Size
              "w-6",
              "h-6",
              // Shape
              "rounded-md",
              "border-2",
              // Colors
              {
                "border-surface-200 bg-surface-0 dark:border-surface-700 dark:bg-surface-900": !context.checked,
                "border-primary-500 bg-primary-500 dark:border-primary-400 dark:bg-primary-400": context.checked
              },
              // States
              {
                "peer-hover:border-primary-500 dark:peer-hover:border-primary-400": !props.disabled && !context.checked,
                "peer-hover:bg-primary-600 dark:peer-hover:bg-primary-300 peer-hover:border-primary-700 dark:peer-hover:border-primary-300": !props.disabled && context.checked,
                "peer-focus-visible:border-primary-500 dark:peer-focus-visible:border-primary-400 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-400/20 dark:peer-focus-visible:ring-primary-300/20": !props.disabled,
                "cursor-default opacity-60": props.disabled
              },
              // Transitions
              "transition-colors",
              "duration-200"
            ]
        }),
      input: {
        class: ["peer", "w-full ", "h-full", "absolute", "top-0 left-0", "z-10", "p-0", "m-0", "opacity-0", "rounded-md", "outline-none", "border-2 border-surface-200 dark:border-surface-700", "appareance-none", "cursor-pointer"]
      },
      icon: {
        class: ["text-base leading-none", "w-4", "h-4", "text-white dark:text-surface-900", "transition-all", "duration-200"]
      }
    },
    closeButton: {
      class: ["relative", "flex items-center justify-center", "mr-2", "last:mr-0", "w-8 h-8", "border-0", "rounded-full", "text-surface-500", "bg-transparent", "transition duration-200 ease-in-out", "hover:text-surface-700 dark:hover:text-white/80", "hover:bg-surface-100 dark:hover:bg-surface-800/80", "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-inset", "focus:ring-primary-400/50 dark:focus:ring-primary-300/50", "overflow-hidden"]
    },
    closeButtonIcon: {
      class: "w-4 h-4 inline-block"
    },
    wrapper: {
      class: ["max-h-[200px]", "overflow-auto"]
    },
    list: {
      class: "py-3 list-none m-0"
    },
    item: ({ context }) => ({
        class: [
          // Font
          "font-normal font-poppins",
          "leading-none",
          // Flexbox
          "flex items-center",
          // Position
          "relative",
          // Shape
          "border-0",
          "rounded-none",
          // Spacing
          "m-0",
          "py-3 px-5",
          // Color
          { "text-surface-600 dark:text-white/80": !context.focused && !context.selected },
          { "bg-surface-200 dark:bg-surface-600/60 text-surface-600 dark:text-white/80": context.focused && !context.selected },
          { "bg-primary-100 dark:bg-primary-400/40 text-primary-700 dark:text-white/80": context.focused && context.selected },
          { "bg-primary-50 dark:bg-primary-400/40 text-primary-700 dark:text-white/80": !context.focused && context.selected },
          //States
          { "hover:bg-surface-100 dark:hover:bg-surface-600/80": !context.focused && !context.selected },
          { "hover:text-surface-700 hover:bg-surface-100 dark:hover:text-white dark:hover:bg-surface-600/80": context.focused && !context.selected },
          // Transitions
          "transition-shadow",
          "duration-200",
          // Misc
          "cursor-pointer",
          "overflow-hidden",
          "whitespace-nowrap"
        ]
      }),
    itemgroup: {
      class: ["font-bold", "m-0", "p-3 px-5", "text-surface-800 dark:text-white/80", "bg-surface-0 dark:bg-surface-600/80", "cursor-auto"]
    },
    filtercontainer: {
      class: "relative w-full mx-2"
    },
    filterinput: {
      class: ["font-poppins", "leading-none", "pr-7 py-3 px-3", "-mr-7", "w-full", "text-surface-700 dark:text-white/80", "bg-surface-0 dark:bg-surface-900", "border-surface-200 dark:border-surface-700", "placeholder:text-surface-400 dark:placeholder:text-surface-500", "border", "rounded-lg", "appearance-none", "transition", "duration-200", "hover:border-primary-500 dark:hover:border-primary-300", "focus:ring focus:outline-none focus:outline-offset-0", "focus:ring-primary-400/50 dark:focus:ring-primary-300/50", "appearance-none"]
    },
    filtericon: {
      class: ["absolute", "top-1/2 right-3", "-mt-2"]
    },
    clearicon: {
      class: ["text-surface-500", "absolute", "top-1/2", "right-12", "-mt-2"]
    },
    emptymessage: {
      class: ["leading-none", "py-3 px-5", "text-surface-800 dark:text-white/80", "bg-transparent"]
    },
    transition: {
      enterFromClass: "opacity-0 scale-y-[0.8]",
      enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
      leaveActiveClass: "transition-opacity duration-100 ease-linear",
      leaveToClass: "opacity-0"
    }
  }