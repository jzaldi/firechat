import { VertexAI } from "@google-cloud/vertexai";

import { PROJECT_ID, LOCATION } from "$env/static/private";
import { MessageType, type AnyMessage, type AIMessage } from "$lib/types/Message";
import { MessagePartType, type AnyMessagePart } from "$lib/types/MessagePart";
import { type GenerateContentRequest, type Part, type Content } from "@google-cloud/vertexai";

const vertexAI = new VertexAI({project: PROJECT_ID, location: LOCATION});

const generativeModel = vertexAI.getGenerativeModel({model: "gemini-1.0-pro-001"})

const messageToContent = (message: AnyMessage): Content => {
    return {
        role: message.type == MessageType.HUMAN? "user": "model",
        parts: message.parts.map(partToGemini)
    }
}

const partToGemini = (messagePart: AnyMessagePart): Part => {
    switch(messagePart.type){
        case MessagePartType.TEXT:
            return {
                text: messagePart.text
            }
        case MessagePartType.IMAGE:
            return {
                fileData: {
                    fileUri: messagePart.uri,
                    mimeType: "image/jpg"
                }
            }
    }
}

export const generateContent = async (messages: AnyMessage[]): Promise<AIMessage> => {
    const contents = messages.map(messageToContent);
    const result = await generativeModel.generateContent({contents: contents})
    
    const candidates = result.response.candidates;

    if (candidates){
        const firstCandidate = candidates[0];
        const textPart = firstCandidate.content.parts[0];
        return {
            type: MessageType.AI,
            id: "foo",
            timestamp: Date.now(),
            parts: [{
                type: MessagePartType.TEXT,
                text: textPart.text? textPart.text: "<ERROR>"
            }]
        }
    }

    throw Error;
    
}