export default function formatDate(inputDate) {
  const formattedDate = new Date(inputDate);
  return formattedDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}

export const TagRootClass = rootProps => {
  return [
    //Font
    "text-sm",

    //Alignments
    "inline-flex items-center justify-center",

    //Spacing
    "px-2 py-1",

    //Shape
    {
      "rounded-md": !rootProps.rounded,
      "rounded-full": rootProps.rounded
    },

    //Colors
    "text-white dark:text-surface-900",
    {
      "bg-primary-500 dark:bg-primary-400":
        rootProps.severity == null || rootProps.severity == "primary",
      "bg-green-500 dark:bg-green-400": rootProps.severity == "success",
      "bg-blue-500 dark:bg-blue-400": rootProps.severity == "info",
      "bg-orange-500 dark:bg-orange-400": rootProps.severity == "warning",
      "bg-red-500 dark:bg-red-400": rootProps.severity == "danger"
    }
  ];
};
