import { writable } from "svelte/store";

import { type Chat } from "$lib/types/Chat";
import { MessageType, type AnyMessage } from "$lib/types/Message";
import { MessagePartType } from "$lib/types/MessagePart";

import { activeChat, addChat } from "./chats";
import { createMessage, listMessages, generateContent, updateMessage } from "$lib/api";

export const isGenerating = writable<boolean>(false);
export const isLoading = writable<boolean>(false);
export const messages = writable<AnyMessage[]>([])

let currentChat: Chat | null = null;
let currentMessages: AnyMessage[] = [];

messages.subscribe((value) => {currentMessages = value});

activeChat.subscribe(async (newActiveChat) => {

    const previousWasNull = !currentChat;
    const previousID = currentChat?.id;

    currentChat = newActiveChat;

    if (previousWasNull) {
        return;
    }
    if (previousID == newActiveChat?.id) return;

    messages.set([])
    if (newActiveChat){
        isLoading.set(true);
        try{
            const newMessages = await listMessages(newActiveChat.id);
            messages.set(newMessages);
        } finally {
            isLoading.set(false);
        }
    }
    
})

export const sendMessage = async (newMessage: string) => {

    if (!currentChat){
        await addChat()
    }

    const message: AnyMessage = {
        type: MessageType.HUMAN,
        parts: [
            {
                type: MessagePartType.TEXT, 
                text: newMessage
            }
        ]
    }

    if (currentChat){
        const createdMessage = await createMessage(currentChat.id, message);
        messages.update((previousMessages) => [...previousMessages, createdMessage])
    }

    isGenerating.set(true);
    try {
        
        if (currentChat){
            const aiMessage = await generateContent(currentMessages);
            const createdAIMessage = await createMessage(currentChat.id, aiMessage);
            messages.set([...currentMessages, createdAIMessage]);
        }
        
    } finally {
        isGenerating.set(false);
    }
    
}

export const updateFeedback = async (message: AnyMessage, feedback: number) => {
    if(!currentChat) return;
    if(!message.id) return;
    const newMessage = await updateMessage(currentChat.id, message.id, {feedback: {value: feedback, comment: ""}});
    messages.update((thisMessages) => {
        for(var i = 0; i < thisMessages.length; i++){
            if (!thisMessages[i].id) continue;
            if (thisMessages[i].id === message.id){
                thisMessages[i] = newMessage
            }
        }
        return thisMessages;
    })
}