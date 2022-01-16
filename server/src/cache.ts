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
//              page: number,
//          },
//       },
//       movies: {
//          [movieId: number]: {
//              yesCount: number,
//              noCount: number,
//              maybeCount: number,
//              yesVotes: [userIds],
//              noVotes: [userIds],
//              maybeVotes: [userIds],
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

export interface MovieCache {
  [movieId: number]: {
    yesCount: number;
    noCount: number;
    maybeCount: number;
    yesVotes: string[];
    noVotes: string[];
    maybeVotes: string[];
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
  roomCache.get<Room>(roomCode)!.movies[movieId].yesVotes.push(userId);
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
  roomCache.get<Room>(roomCode)!.movies[movieId].noVotes.push(userId);
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
  roomCache.get<Room>(roomCode)!.movies[movieId].maybeVotes.push(userId);
}

export function getRoom(roomCode: string) {
  return roomCache.get(roomCode);
}

export function getUserPage(roomCode: string, userId: string) {
  return roomCache.get<Room>(roomCode)!.users[userId].page;
}

export function setUserPage(roomCode: string, userId: string, page: number) {
  roomCache.get<Room>(roomCode)!.users[userId].page = page;
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
  return roomCache.get<Room>(roomCode)!.movies[movieId].yesVotes;
}

export default roomCache;
