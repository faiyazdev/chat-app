export interface User {
  id: string;
  socketId: string;
  username: string;
  roomId: string;
  createdAt: Date;
}

// Simple in-memory mock user database
export const mockUsers: User[] = [];

/**
 * Get all users
 */
export const getUsersByRoom = (roomId: string): User[] => {
  return mockUsers.filter((user) => user.roomId === roomId);
};

/**
 * Get user by ID
 */
export const getUserById = (id: string): User | undefined => {
  return mockUsers.find((user) => user.id === id);
};

/**
 * Create a new user in memory
 */
export const createUser = (
  username: string,
  roomId: string,
  socketId: string,
): User => {
  const newUser: User = {
    id: Math.random().toString(36).substring(2, 9),
    socketId,
    username,
    roomId,
    createdAt: new Date(),
  };

  mockUsers.push(newUser);

  return newUser;
};

export const removeUserBySocketId = (socketId: string): User | undefined => {
  const index = mockUsers.findIndex((user) => user.socketId === socketId);

  if (index !== -1) {
    return mockUsers.splice(index, 1)[0];
  }
};
