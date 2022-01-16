import NodeCache from "node-cache";

export const roomCache = new NodeCache({
  stdTTL: 7200, // 2 hours
});

// Model: Room
// {
//   [roomCode: string]: {
//       groupSize: number,
//       users: {
//          [userId: string]: {
//              name: string,
//              socketId: string,
//              ready: boolean,
//              isHost: boolean,
//              page: number,
//          },
//       },
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
// roomCache.get(roomCode).groupSize -> use in SS movie match logic
// roomCache.get(roomCode).movies[movieId].yesCount -> use in SS movie match logic
// roomCache.get(roomCode).movies[movieId].maybeCount -> use in SS movie match logic
// roomCache.get(roomCode).users[userId].currentPage -> use in movie query

export type Vote = "yes" | "no" | "maybe";

export interface UserCache {
  [userId: string]: {
    page: number;
  };
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

export interface Room {
  groupSize: number;
  users: UserCache;
  movies: MovieCache;
}

export interface RoomCache {
  [roomCode: string]: Room;
}

export function addRoom(roomCode: string, groupSize = 1) {
  roomCache.set(roomCode, {
    groupSize,
    users: {},
    movies: {},
  });
}

/**
 * Adds a yes vote to the room cache for the given user and movie
 * @param roomCode - the room code
 * @param movieId - the movie id
 * @param userId - the user id
 */
export function incrementYesCountByUser(
  roomCode: string,
  movieId: number,
  userId: string
) {
  roomCache.get<Room>(roomCode)!.movies[movieId].yesCount++;
  roomCache.get<Room>(roomCode)!.movies[movieId].userVotes[userId] = {
    vote: "yes",
  };
}

/**
 * Adds a no vote to the room cache for the given user and movie
 */
export function incrementNoCountByUser(
  roomCode: string,
  movieId: number,
  userId: string
) {
  roomCache.get<Room>(roomCode)!.movies[movieId].noCount++;
  roomCache.get<Room>(roomCode)!.movies[movieId].userVotes[userId] = {
    vote: "no",
  };
}

/**
 * Adds a maybe vote to the room cache for the given user and movie
 * @param roomCode - the room code
 * @param movieId - the movie id
 * @param userId - the user id
 */
export function incrementMaybeCountByUser(
  roomCode: string,
  movieId: number,
  userId: string
) {
  roomCache.get<Room>(roomCode)!.movies[movieId].maybeCount++;
  roomCache.get<Room>(roomCode)!.movies[movieId].userVotes[userId] = {
    vote: "maybe",
  };
}

export function getRoom(roomCode: string) {
  return roomCache.get(roomCode);
}

export function getYesCount(roomCode: string, movieId: number) {
  return roomCache.get<Room>(roomCode)!.movies[movieId].yesCount;
}

export function getNoCount(roomCode: string, movieId: number) {
  return roomCache.get<Room>(roomCode)!.movies[movieId].noCount;
}

export function getMaybeCount(roomCode: string, movieId: number) {
  return roomCache.get<Room>(roomCode)!.movies[movieId].maybeCount;
}

export function getYesVotes(roomCode: string, movieId: number) {
  // returns an array of userIds who voted yes
  return Object.keys(
    roomCache.get<Room>(roomCode)!.movies[movieId].userVotes
  ).filter(
    (userId) =>
      roomCache.get<Room>(roomCode)!.movies[movieId].userVotes[userId].vote ===
      "yes"
  );
}

export function getNoVotes(roomCode: string, movieId: number) {
  // returns an array of userIds who voted no
  return Object.keys(
    roomCache.get<Room>(roomCode)!.movies[movieId].userVotes
  ).filter(
    (userId) =>
      roomCache.get<Room>(roomCode)!.movies[movieId].userVotes[userId].vote ===
      "no"
  );
}

export function getMaybeVotes(roomCode: string, movieId: number) {
  // returns an array of userIds who voted maybe
  return Object.keys(
    roomCache.get<Room>(roomCode)!.movies[movieId].userVotes
  ).filter(
    (userId) =>
      roomCache.get<Room>(roomCode)!.movies[movieId].userVotes[userId].vote ===
      "maybe"
  );
}

export function getUserPage(roomCode: string, userId: string) {
  return roomCache.get<Room>(roomCode)!.users[userId].page;
}

export function setUserPage(roomCode: string, userId: string, page: number) {
  roomCache.get<Room>(roomCode)!.users[userId].page = page;
}

export function getUserData(roomCode: string, userId: string) {
  return roomCache.get<Room>(roomCode)!.users[userId];
}

export function setUserData(
  roomCode: string,
  userId: string,
  data: {
    name: string;
    socketId: string;
    ready: boolean;
    isHost: boolean;
    page: number;
  }
) {
  roomCache.get<Room>(roomCode)!.users[userId] = data;
}

export function updateUserData(
  roomCode: string,
  userId: string,
  data: {
    name?: string;
    socketId?: string;
    ready?: boolean;
    isHost?: boolean;
    page?: number;
  }
) {
  roomCache.get<Room>(roomCode)!.users[userId] = {
    ...roomCache.get<Room>(roomCode)!.users[userId],
    ...data,
  };
}

export function getUserVotes(roomCode: string, userId: string) {
  return roomCache.get<Room>(roomCode)!.movies[
    roomCache.get<Room>(roomCode)!.users[userId].page
  ].userVotes[userId];
}

export function setUserVote(
  roomCode: string,
  userId: string,
  movieId: number,
  vote: Vote
) {
  roomCache.get<Room>(roomCode)!.movies[movieId].userVotes[userId] = {
    vote,
  };
}

export function getMovieData(roomCode: string, movieId: number) {
  return roomCache.get<Room>(roomCode)!.movies[movieId];
}

export function getGroupSize(roomCode: string) {
  return roomCache.get<Room>(roomCode)!.groupSize;
}

export function getUserIds(roomCode: string) {
  return Object.keys(roomCache.get<Room>(roomCode)!.users);
}

export default {
  addRoom,
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
  setUserData,
  updateUserData,
  getUserVotes,
  setUserVote,
  getMovieData,
  getGroupSize,
  getUserIds,
};