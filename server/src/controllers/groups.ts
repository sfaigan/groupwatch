import { Request, Response } from "express";

interface User {
  name: string;
  groupId: string;
  streamingServices?: number[];
  genres?: number[];
}

const users: { [id: string]: User } = {};

export const addUserToGroup = (userId: string, userName: string, groupId: string): { userId?: string, user?: User, error?: string } => {
  if (!groupId) {
    return { error: `Unable to find group with ID ${groupId}`};
  }

  const user = { name: userName.trim(), groupId: groupId };
  users[userId] = user;
  return { userId, user };
}

export const getUser = (userId: string): User | undefined => {
  return users[userId];
}

export const getUsersInGroup = (groupId: string) => {
  return Object.fromEntries(Object.entries(users).filter(([userId, user]) => user.groupId === groupId));
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