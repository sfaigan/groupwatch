export enum View {
  LANDING,
  CREATE_GROUP_STEP_ONE,
  CREATE_GROUP_STEP_TWO,
  GROUP_START,
  RESULT_SUCCESS,
  RESULT_FAILURE,
  READY_TO_WATCH,
  MOVIE_VOTE_RESULTS,
  MOVIE_RECOMMENDER,
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

export interface Option {
  id: number,
  text: string,
}

export const Genre: { [key: string]: Option } = {
  "ACTION": {
    id: 28,
    text: "Action",
  },
  "ADVENTURE": {
    id: 12,
    text: "Adventure",
  },
  "ANIMATION": {
    id: 16,
    text: "Animation",
  },
  "COMEDY": {
    id: 35,
    text: "Comedy",
  },
  "CRIME": {
    id: 80,
    text: "Crime",
  },
  "DOCUMENTARY": {
    id: 99,
    text: "Documentary",
  },
  "DRAMA": {
    id: 18,
    text: "Drama",
  },
  "FAMILY": {
    id: 10751,
    text: "Family",
  },
  "FANTASY": {
    id: 14,
    text: "Fantasy",
  },
  "HISTORY": {
    id: 36,
    text: "History",
  },
  "HORROR": {
    id: 27,
    text: "Horror",
  },
  "MUSIC": {
    id: 10402,
    text: "Music",
  },
  "MYSTERY": {
    id: 9648,
    text: "Mystery",
  },
  "ROMANCE": {
    id: 10749,
    text: "Romance",
  },
  "SCIENCE FICTION": {
    id: 878,
    text: "Science Fiction",
  },
  "TV MOVIE": {
    id: 10770,
    text: "TV Movie",
  },
  "THRILLER": {
    id: 53,
    text: "Thriller",
  },
  "WAR": {
    id: 10752,
    text: "War",
  },
  "WESTERN": {
    id: 37,
    text: "Western",
  },
};

export const StreamingService: { [key: string]: Option } = {
  NETFLIX: {
    id: 8,
    text: "Netflix",
  },
  AMAZON: {
    id: 9,
    text: "Amazon Prime Video",
  },
  DISNEY: {
    id: 337,
    text: "Disney+",
  },
  APPLE: {
    id: 350,
    text: "Apple TV+",
  },
  CRAVE: {
    id: 230,
    text: "Crave",
  }
};

// 119: "Amazon Prime Video",