import type { AnyMessagePart } from "./MessagePart"

export enum MessageType{
    HUMAN = "human",
    AI = "ai"
}

export interface Message {
    id?: string
    timestamp?: number
    type: MessageType
    parts: AnyMessagePart[]
}

export interface HumanMessage extends Message{
    type: MessageType.HUMAN
}

export interface Feedback {
    value: number,
    comment: string
}

export interface AIMessage extends Message{
    type: MessageType.AI
    feedback?: Feedback
}

export type AnyMessage = HumanMessage | AIMessage;