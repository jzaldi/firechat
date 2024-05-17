export enum MessagePartType{
    IMAGE = "IMAGE",
    TEXT = "TEXT"
}

export interface MessagePart{
    type: MessagePartType
}

export interface TextMessagePart extends MessagePart{
    type: MessagePartType.TEXT
    text: string
}

export interface ImageMessagePart extends MessagePart{
    type: MessagePartType.IMAGE
    uri: string
}

export type AnyMessagePart = TextMessagePart | ImageMessagePart;