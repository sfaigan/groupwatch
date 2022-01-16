export enum BadgeType {
    READY,
    YES,
    MAYBE,
    NO,
    NOBADGE,
}

export const BadgeProps = {
    READY: {
        label: "Ready",
        colour: "purple",
    },
    YES: { 
      label: "Yes",
      colour: "green",
    },
    NO: {
        label: "No",
        colour: "red",
    },
    MAYBE: {
        label: "Maybe",
        colour: "blue",
    },
    NOBADGE: {
        label: "",
        colour: "",
    }
  } 
