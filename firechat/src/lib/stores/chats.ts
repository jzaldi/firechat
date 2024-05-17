import { listChats, createChat, deleteChat as baseDeleteChat } from "$lib/api";

import { writable } from "svelte/store";
import type { Chat } from "$lib/types/Chat";

const chats = writable<Chat[]>([]);
const activeChat = writable<Chat | null>(null);

const selectChat = async (chat: Chat) => {
    activeChat.set(chat);
}

const refreshChats = async () => {
    const retrievedChats = await listChats();
    chats.set(retrievedChats);
};

const addChat = async () => {
    const newChat = await createChat()
    chats.update((previousValue) => [newChat, ...previousValue])
    activeChat.set(newChat)
}

const deleteChat = async (chatID: string) => {
    await baseDeleteChat(chatID);
    chats.update(
        (previousChatList) => {
            return previousChatList.filter((chat) => chat.id != chatID);
        }
    )
    activeChat.update((previousValue) => {
        return (previousValue?.id == chatID)? null: previousValue
    })
}

export {
    chats,
    activeChat,
    refreshChats,
    addChat,
    deleteChat,
    selectChat
}


