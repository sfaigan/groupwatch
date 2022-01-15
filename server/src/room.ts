import { roomCache } from "./cache";

export function generateRoom(): string {
  // generate a room code
  const code = generateRoomCode();

  // check if the code is already in use
  if (roomCache.has(code)) {
    // if in use, recursively call generateRoom() until a unique code is found
    return generateRoom();
  }

  // if not in use, add to cache
  if (roomCache.set(code, {})) {
    // cache success
    return code;
  } else {
    // cache failed
    // TODO what to do here?
    return "";
  }
}

function generateRoomCode() {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }

  return code;
}
