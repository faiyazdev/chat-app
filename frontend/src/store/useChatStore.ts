import { create } from "zustand";
import axiosInstance from "../lib/axios";

interface ChatStore {
  selectedUserId: string | null;
  setSelectedUserId: (userId: string | null) => void;
  isMessagesLoading: boolean;
  isUsersLoading: boolean;
  users: {
    id: string;
    clerkUserId: string;
    name: string;
    email: string;
  }[];
  messages: {
    id: string;
    senderId: string;
    receiverId: string;
    text: string;
    createdAt?: Date | undefined;
    senderClerkId: string;
    senderName: string;
  }[];
  getUsers: () => void;
  getMessages: (selectedUserId: string | null) => void;
  createMessage: (text: string) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  users: [],
  messages: [],
  selectedUserId: null,
  isMessagesLoading: false,
  isUsersLoading: false,
  setSelectedUserId: (userId) => set({ selectedUserId: userId }),
  getUsers: async () => {
    try {
      const response = await axiosInstance.get("/users");
      set({ users: response.data.data.users });
      console.log("users fetched:", response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },
  getMessages: (selectedUserId: string | null) => {
    try {
      set({ isMessagesLoading: true });

      axiosInstance
        .get(`/messages/chat/targetUser/${selectedUserId}`)
        .then((response) => {
          console.log(response.data.data.messages);
          set({ messages: response.data.data.messages });
        });
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  createMessage: async (text: string) => {
    try {
      const { selectedUserId } = get();
      if (selectedUserId) {
        const response = await axiosInstance.post(
          `/messages/chat/targetUser/${selectedUserId}`,
          {
            text,
          },
        );
        set({ messages: [...get().messages, response.data.data.message] });
      }
    } catch (error) {
      console.error("Error creating message:", error);
    }
  },
}));
