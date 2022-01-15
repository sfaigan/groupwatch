const NodeCache = require("node-cache");

export const roomCache = new NodeCache({
  stdTTL: 7200, // 2 days
});

// Model: Room
// {
//   [roomCode: string]: {
//       currentPage: number,
//       ...
//    }
// }
