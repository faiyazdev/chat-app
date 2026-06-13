import { useEffect } from "react";
import axiosInstance from "../lib/axios";
import { useAuth } from "@clerk/react";
import { useChatStore } from "../store/useChatStore";

export function useAuthReq() {
  const { isSignedIn, getToken, isLoaded } = useAuth();
  const {socket,connectSocket}= useChatStore( (state) => state);
  useEffect(() => {
    if (isSignedIn && !socket) {
      connectSocket();
    }
  }, [isSignedIn, socket, connectSocket]);
  useEffect(() => {
    const interceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        const token = await getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
    );

    return () => {
      axiosInstance.interceptors.request.eject(interceptor);
    };
  }, [getToken]);

  return { isSignedIn, isClerkLoaded: isLoaded };
}
