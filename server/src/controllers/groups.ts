import { Request, Response } from "express";
import { randomBytes } from "crypto";

export interface User {
  name: string;
  groupId: string;
  streamingServices?: number[];
  genres?: number[];
  isHost: boolean;
}

const users: { [id: string]: User } = {};

export const addUserToGroup = (userId: string, name: string, streamingServices: number[], genres: number[], groupId?: string) => {
  let isHost = false;
  if (!groupId) {
    groupId = randomBytes(3).toString("hex").toString().toUpperCase();
  } else if (!groupExists(groupId)) {
    return { error: `Unable to find group with ID ${groupId}`};
  }

  const user = {
    name: name.trim(),
    groupId,
    streamingServices,
    genres,
    isHost,
  };

  users[userId] = user;
  console.log(getUsersInGroup(groupId));
  return { groupId, user };
}

export const getUser = (userId: string): User | undefined => {
  return users[userId];
}

export const getUsersInGroup = (groupId: string) => {
  return Object.fromEntries(Object.entries(users).filter(([userId, user]) => user.groupId === groupId));
}

export const groupExists = (groupId: string) => {
  return Object.entries(users).filter(([userId, user]) => user.groupId === groupId).length > 0;
}

export const deleteUser = (userId: string): { groupId: string, userId: string, userName: string } | null => {
  const user = users[userId];

  if (user) {
    const ret = {
      groupId: user.groupId,
      userId: userId,
      userName: user.name,
    }
    delete users[userId];
    return ret;
  }

  return null
}



const create = async (req: Request, res: Response): Promise<void> => {
  console.log("Created group");
}

const join = async (req: Request, res: Response): Promise<void> => {
  console.log("Joined group");
}



export const GroupsController = {
  create,
  join
};