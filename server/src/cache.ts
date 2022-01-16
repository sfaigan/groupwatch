import { GenreId, ProviderId, Vote } from "./types";
import NodeCache from "node-cache";
import { VOTE_MAYBE, VOTE_NO, VOTE_YES } from "./constants";

let groupCache: NodeCache;

export const createCache = () => {
  groupCache = new NodeCache({
    stdTTL: 7200, // 2 hours
  });
}

// Model: Room
// {
//   [groupId: string]: {
//       groupSize: number,
//       genres: GenreIDs[],
//       streamingServices: ProviderIDs[],
//       users: {
//          [userId: string]: {
//              name: string,
//              socketId: string,
//              isHost: boolean,
//              page: number,
//          },
//       },
//       topMovies: {
//              id: number,
//       }[],
//       movies: {
//          [movieId: number]: {
//              yesCount: number,
//              noCount: number,
//              maybeCount: number,
//              usersVotes: {
//                  [userId: string]: {
//                      vote: string,
//                  },
//              },
//          },
//       },
//    }
// }

// roomCache.set("RMCODE", {})
// roomCache.get("RMCODE").users["userId"] = {page: 1} -> adding a user, by reference (i think)
// roomCache.get(groupId).groupSize -> use in SS movie match logic
// roomCache.get(groupId).movies[movieId].yesCount -> use in SS movie match logic
// roomCache.get(groupId).movies[movieId].maybeCount -> use in SS movie match logic
// roomCache.get(groupId).users[userId].currentPage -> use in movie query

interface UserCacheEntry {
    name: string,
    isHost: boolean,
    page: number,
}

export interface UserCache {
  [userId: string]: UserCacheEntry;
}

export interface UserMovieVotes {
  [userId: string]: {
    vote: Vote;
  };
}

export interface MovieCache {
  [movieId: number]: {
    yesCount: number;
    noCount: number;
    maybeCount: number;
    userVotes: UserMovieVotes;
  };
}

export interface Group {
  groupSize: number;
  genres: GenreId[];
  streamingServices: number[];
  topMovies: any[];
  users: UserCache;
  movies: MovieCache;
}

export interface GroupCache {
  [groupId: string]: Group;
}

function verifyGroupCache(groupId: string) {
  const group = groupCache.get<Group>(groupId);
  if (!group) {
    throw new Error("Room does not exist");
  }

  return group;
}

function verifyMovieCache(groupId: string, movieId: number) {
  verifyGroupCache(groupId);
  const movie = groupCache.get<Group>(groupId)!.movies[movieId];
  if (!movie) {
    throw new Error("Movie does not exist");
  }

  return movie;
}

function verifyUserCache(groupId: string, userId: string) {
  verifyGroupCache(groupId);
  const user = groupCache.get<Group>(groupId)!.users[userId];
  if (!user) {
    throw new Error("User does not exist");
  }

  return user;
}

export function addGroup(
  groupId: string,
  genres: GenreId[] = [],
  streamingServices: number[] = [],
  groupSize = 1
) {
  groupCache.set(groupId, {
    groupSize,
    genres,
    streamingServices,
    users: {},
    movies: {},
  });
}

export function getGroupUserInfo(groupId: string, userId: string) {
  const group = groupCache.get<Group>(groupId);
  if (!group) {
    throw new Error("Room does not exist");
  }
  const user = group!.users[userId];
  if (!user) {
    throw new Error("User does not exist");
  }
  return {
    genres: group!.genres,
    streamingServices: group!.streamingServices,
    page: user.page,
  };
}

export function updateGroupData(
  groupId: string,
  key: keyof Group,
  value: any
) {
  if (!groupCache.has(groupId)) {
    return;
  }
  const group = groupCache.get<Group>(groupId);
  groupCache.set(groupId, {...group, [key]: value});
}

/**
 * Adds a yes vote to the room cache for the given user and movie
 * @param groupId - the room code
 * @param movieId - the movie id
 * @param userId - the user id
 */
export function incrementYesCountByUser(
  groupId: string,
  movieId: number,
  userId: string
) {
  const group = verifyGroupCache(groupId);
  const movie = verifyMovieCache(groupId, movieId);

  const newMovie = {
    ...movie,
    yesCount: movie.yesCount + 1,
    userVotes: {
      ...movie.userVotes,
      [userId]: {
        vote: VOTE_YES,
      },
    },
  };
  const newGroup = {
    ...group,
    movies: {
      ...group.movies,
      [movieId]: newMovie,
    },
  };
  groupCache.set(groupId, newGroup);
}

/**
 * Adds a no vote to the room cache for the given user and movie
 */
export function incrementNoCountByUser(
  groupId: string,
  movieId: number,
  userId: string
) {
  const group = verifyGroupCache(groupId);
  const movie = verifyMovieCache(groupId, movieId);

  const newMovie = {
    ...movie,
    noCount: movie.noCount + 1,
    userVotes: {
      ...movie.userVotes,
      [userId]: {
        vote: VOTE_NO,
      },
    },
  };
  const newGroup = {
    ...group,
    movies: {
      ...group.movies,
      [movieId]: newMovie,
    },
  };
  groupCache.set(groupId, newGroup);
}

/**
 * Adds a maybe vote to the room cache for the given user and movie
 * @param groupId - the room code
 * @param movieId - the movie id
 * @param userId - the user id
 */
export function incrementMaybeCountByUser(
  groupId: string,
  movieId: number,
  userId: string
) {
  const group = verifyGroupCache(groupId);
  const movie = verifyMovieCache(groupId, movieId);

  const newMovie = {
    ...movie,
    maybeCount: movie.maybeCount + 1,
    userVotes: {
      ...movie.userVotes,
      [userId]: {
        vote: VOTE_MAYBE,
      },
    },
  };
  const newGroup = {
    ...group,
    movies: {
      ...group.movies,
      [movieId]: newMovie,
    },
  };
  groupCache.set(groupId, newGroup);
}

export function getRoom(groupId: string) {
  return groupCache.get(groupId);
}

export function getYesCount(groupId: string, movieId: number) {
  return groupCache.get<Group>(groupId)!.movies[movieId].yesCount;
}

export function getNoCount(groupId: string, movieId: number) {
  return groupCache.get<Group>(groupId)!.movies[movieId].noCount;
}

export function getMaybeCount(groupId: string, movieId: number) {
  return groupCache.get<Group>(groupId)!.movies[movieId].maybeCount;
}

export function getYesVotes(groupId: string, movieId: number) {
  // returns an array of userIds who voted yes
  return Object.keys(
    groupCache.get<Group>(groupId)!.movies[movieId].userVotes
  ).filter(
    (userId) =>
      groupCache.get<Group>(groupId)!.movies[movieId].userVotes[userId].vote ===
      VOTE_YES
  );
}

export function getNoVotes(groupId: string, movieId: number) {
  // returns an array of userIds who voted no
  return Object.keys(
    groupCache.get<Group>(groupId)!.movies[movieId].userVotes
  ).filter(
    (userId) =>
      groupCache.get<Group>(groupId)!.movies[movieId].userVotes[userId].vote ===
      VOTE_NO
  );
}

export function getMaybeVotes(groupId: string, movieId: number) {
  // returns an array of userIds who voted maybe
  return Object.keys(
    groupCache.get<Group>(groupId)!.movies[movieId].userVotes
  ).filter(
    (userId) =>
      groupCache.get<Group>(groupId)!.movies[movieId].userVotes[userId].vote ===
      VOTE_MAYBE
  );
}

export function getUserPage(groupId: string, userId: string) {
  return groupCache.get<Group>(groupId)!.users[userId].page;
}

export function setUserPage(groupId: string, userId: string, page: number) {
  const group = verifyGroupCache(groupId);
  const user = verifyUserCache(groupId, userId);
  const newUser = {
    ...user,
    page,
  };
  const newGroup = {
    ...group,
    users: {
      ...group.users,
      [userId]: newUser,
    },
  };
  groupCache.set(groupId, newGroup);
}

export function getUserData(groupId: string, userId: string) {
  return groupCache.get<Group>(groupId)!.users[userId];
}

export function addUserToGroupCache(
  groupId: string,
  userId: string,
  data: {
    name?: string;
    isHost?: boolean;
    page?: number;
  } = {name: '', isHost: false, page: 1}
) {
  console.log(userId);
  const group = groupCache.get<Group>(groupId);
  groupCache.set(groupId, {
    ...group,
    users: {
      ...group!.users,
      [userId]: data,
    }
  });
  groupCache.get<Group>(groupId)!.groupSize++;
}

export function updateUserData(
  groupId: string,
  userId: string,
  data: {
    name?: string;
    isHost?: boolean;
    page?: number;
  }
) {
  groupCache.get<Group>(groupId)!.users[userId] = {
    ...groupCache.get<Group>(groupId)!.users[userId],
    ...data,
  };
}

export function removeUserFromGroup(groupId: string, userId: string) {
  const group = groupCache.get<Group>(groupId);
  groupCache.set(groupId, {
    ...group,
    groupSize: group!.groupSize - 1,
    users: {
      ...group!.users,
      [userId]: undefined,
    },
  });
}

export function getUserVotes(groupId: string, userId: string) {
  return groupCache.get<Group>(groupId)!.movies[
    groupCache.get<Group>(groupId)!.users[userId].page
  ].userVotes[userId];
}

export function setUserVote(
  groupId: string,
  userId: string,
  movieId: number,
  vote: Vote
) {
  const group = groupCache.get<Group>(groupId);


  if (!group?.movies[movieId]) {
    const yesCount = vote === VOTE_YES ? 1 : 0;
    const maybeCount = vote === VOTE_MAYBE ? 1 : 0;
    const noCount = vote === VOTE_NO ? 1 : 0;
    const userVotes: UserMovieVotes = {[userId]: { vote }};
    const movie = {
      yesCount,
      maybeCount,
      noCount,
      userVotes,
    }

    groupCache.set(groupId, {
      ...group,
      movies: {
        ...group!.movies,
        [movieId]: movie,
      },
    });
  } else {
    const yesCount = vote === VOTE_YES ? group!.movies[movieId].yesCount+1 : group!.movies[movieId].yesCount;
    const maybeCount = vote === VOTE_MAYBE ? group!.movies[movieId].maybeCount+1 : group!.movies[movieId].maybeCount;
    const noCount = vote === VOTE_NO ? group!.movies[movieId].noCount+1 : group!.movies[movieId].noCount;
    groupCache.set(groupId, {
      ...group,
      movies: {
        ...group!.movies,
        [movieId]: {
          yesCount,
          maybeCount,
          noCount,
          userVotes: {
            ...group!.movies[movieId]?.userVotes,
            [userId]: {
              vote,
            },
          },
        },
      },
    });
  }
}

export function getMovieData(groupId: string, movieId: number) {
  return groupCache.get<Group>(groupId)!.movies[movieId];
}

export function getGroupSize(groupId: string) {
  return groupCache.get<Group>(groupId)!.groupSize;
}

export function getUserIds(groupId: string) {
  return Object.keys(groupCache.get<Group>(groupId)!.users);
}

// get the top five movies with the most yes votes and return a list of movie ids
export function getTopVotedMovies(groupId: string) {
  const movies = groupCache.get<Group>(groupId)!.movies;
  const topFive = Object.keys(movies)
    .map((movieId) => {
      return {
        movieId: parseInt(movieId),
        yesCount: movies[movieId as any].yesCount,
      };
    })
    .sort((a, b) => b.yesCount - a.yesCount)
    .slice(0, 5);
  return topFive.map((movie) => movie.movieId);
}


export default {
  addGroup,
   addUserToGroupCache,
  incrementYesCountByUser,
  incrementNoCountByUser,
  incrementMaybeCountByUser,
  getRoom,
  getYesCount,
  getNoCount,
  getMaybeCount,
  getYesVotes,
  getNoVotes,
  getMaybeVotes,
  getUserPage,
  setUserPage,
  getUserData,
  updateUserData,
  getUserVotes,
  setUserVote,
  getMovieData,
  getGroupSize,
  getUserIds,
};
