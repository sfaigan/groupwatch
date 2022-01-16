import NodeCache from "node-cache";

export const roomCache = new NodeCache({
  stdTTL: 7200, // 2 days
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
