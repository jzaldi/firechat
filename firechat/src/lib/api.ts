import axios from "axios";

import type { User } from '@auth/sveltekit';
import type { Chat } from "./types/Chat";
import type { AnyMessage, AIMessage } from "./types/Message";

export const createChat = async (): Promise<Chat> => {
    const response = await axios.post("/v1/chats");
    return response.data;
}

export const listChats = async (): Promise<Chat[]> => {
    const response = await axios.get("/v1/chats");
    return response.data;
}

export const deleteChat = async (chatID: string): Promise<void> => {
    await axios.delete(`/v1/chats/${chatID}`);
}

export const updateChat = async (chatID: string, props: Record<string, any>): Promise<Chat> => {
    const response = await axios.patch(`/v1/chats/${chatID}`, props);
    return response.data
}

export const createMessage = async (chatID: string, message: AnyMessage): Promise<AnyMessage> => {
    const response = await axios.post(`/v1/chats/${chatID}/messages`, message);
    return response.data;
}

export const listMessages = async (chatID: string): Promise<AnyMessage[]> => {
    const response = await axios.get(`/v1/chats/${chatID}/messages`);
    return response.data;
}

export const deleteMessage = async (chatID: string, messageID: string): Promise<void> => {
    await axios.delete(`/v1/chats/${chatID}/messages/${messageID}`);
}

export const updateMessage = async (chatID: string, messageID: string, props: Record<string, any>) => {
    const response = await axios.patch(`/v1/chats/${chatID}/messages/${messageID}`, props);
    return response.data
}

export const getUser = async (): Promise<User> => {
    const response = await axios.get(`/v1/users/me`);
    return response.data
}

export const generateContent = async (messages: AnyMessage[]): Promise<AIMessage> => {
    const response = await axios.post(`/v1/generate/`, messages);
    return response.data
}