export enum View {
  LANDING,
  CREATE_GROUP_STEP_ONE,
  CREATE_GROUP_STEP_TWO,
  GROUP_START,
  RESULT_SUCCESS,
}

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
