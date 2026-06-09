import { create } from "zustand";
import axiosInstance from "../lib/axios";

interface ChatStore {
  selectedUserId: string | null;
  setSelectedUserId: (userId: string | null) => void;
  getUsers: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  selectedUserId: null,
  setSelectedUserId: (userId) => set({ selectedUserId: userId }),
  getUsers: () => {
    axiosInstance.get("/users").then((response) => {
      console.log("Users:", response.data);
    });
  },
}));
