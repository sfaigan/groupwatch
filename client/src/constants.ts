export enum View {
  LANDING,
  CREATE_GROUP_STEP_ONE,
  CREATE_GROUP_STEP_TWO,
  GROUP_START,
  RESULT_SUCCESS,
  READY_TO_WATCH,
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
  },
};

export const GENRE_MAP = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};
