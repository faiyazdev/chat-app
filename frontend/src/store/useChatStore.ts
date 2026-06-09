import { create } from "zustand";

interface ChatStore {
  selectedUserId: string | null;
  setSelectedUserId: (userId: string | null) => void;
  getUsers: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  selectedUserId: null,
  setSelectedUserId: (userId) => set({ selectedUserId: userId }),
  getUsers: () => {
    // Implementation for fetching users
    fetch(`http://localhost:3000/api/users`)
      .then((response) => response.json())
      .then((data) => {
        // Handle the fetched users data
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  },
}));
