import { v4 as uuidv4 } from 'uuid';

import { Firestore } from "@google-cloud/firestore";

import type { Chat } from '$lib/types/Chat';
import type { AnyMessage } from '$lib/types/Message';


const firestore = new Firestore();

const CHAT_COLLECTION = "chats";
const USER_COLLECTION = "users";
const MESSAGE_COLLECTION = "messages";


export const createChat = async (userID: string, title?: string):  Promise<Chat> => {
    
    const chatID = uuidv4();

    const chat: Chat = {
        id: chatID,
        title: title? title: chatID,
        timestamp: Date.now()
    }

    const chatCollectionRef = getChatCollectionRef(userID);

    await chatCollectionRef.doc(chat.id).create(chat);

    return chat;

}

export const listChats = async (userID: string): Promise<Chat[]> => {

    const documentCollRefList = await getChatCollectionRef(userID).listDocuments();
    const documentRefList = await Promise.all(documentCollRefList.map((document) => {return document.get()}));

    // @ts-ignore All documents exist, we just queried them.
    const documentList: Chat[] =  documentRefList.map((doc) => doc.data()).filter((doc?) => doc)
    documentList.sort((a, b) => b.timestamp - a.timestamp)
    return documentList;
    
}

export const deleteChat = async (userID: string, chatID: string): Promise<void> => {

    const chatRef = await getChatCollectionRef(userID).doc(chatID);
    await chatRef.delete()

}

export const updateChat = async (userID: string, chatID: string, props: Record<string, any>): Promise<Chat|null> => {

    const chatRef = await getChatCollectionRef(userID).doc(chatID);

    const updateableFields = ["title", ];

    const toUpdate: Record<string, any> = {};
    for(const field in updateableFields){
        if (field in props){
            toUpdate[field] = props[field];
        }
    }

    try {
        await chatRef.update(toUpdate);
    } catch {
        return null;
    }
    
    const modifiedChat = await chatRef.get();
    
    if (modifiedChat.exists){        
        // @ts-ignore The document have the chat interface
        return modifiedChat.data();
    } else {
        return null;
    }

}

export const createMessage = async (userID: string, chatID: string, message: AnyMessage):  Promise<AnyMessage> => {

    message.id = uuidv4();
    message.timestamp = Date.now();

    const messageCollectionRef = getMessageCollectionRef(userID, chatID);

    await messageCollectionRef.doc(message.id).create(message);

    return message;

}

export const listMessages = async (userID: string, chatID: string): Promise<AnyMessage[]> => {

    const documentCollRefList = await getMessageCollectionRef(userID, chatID).listDocuments();
    const documentRefList = await Promise.all(documentCollRefList.map((document) => {return document.get()}));

    // @ts-ignore All documents exist, we just queried them.
    const documentList: AnyMessage[] =  documentRefList.map((doc) => doc.data()).filter((doc?) => doc)
    // @ts-ignore All documents exist, we just queried them.
    documentList.sort((a, b) => a.timestamp - b.timestamp)
    return documentList;
    
}

export const updateMessage = async (userID: string, chatID: string, messageID: string, props: Record<string, any>): Promise<AnyMessage|null> => {

    const messageRef = await getMessageCollectionRef(userID, chatID).doc(messageID);

    const updateableFields = ["feedback", ];

    const toUpdate: Record<string, any> = {};
    for(var i = 0; i < updateableFields.length; i++){
        const field = updateableFields[i];
        if (field in props){
            toUpdate[field] = props[field];
        }
    }

    try {
        await messageRef.update(toUpdate);
    } catch {
        throw Error;
    }
    
    const modifiedMessage = await messageRef.get();
    
    if (modifiedMessage.exists){        
        // @ts-ignore The document have the chat interface
        return modifiedMessage.data();
    } else {
        return null;
    }

}


const getChatCollectionRef = (userID: string) => {
    return  firestore.collection(USER_COLLECTION).doc(userID).collection(CHAT_COLLECTION);
}

const getMessageCollectionRef = (userID: string, chatID: string) => {
    return getChatCollectionRef(userID).doc(chatID).collection(MESSAGE_COLLECTION);
}