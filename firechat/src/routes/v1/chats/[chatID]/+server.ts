import { json } from '@sveltejs/kit';

import { getUserID } from '$lib/server/utils.js';
import { deleteChat, updateChat } from '$lib/server/database.js';

export const DELETE = async ({url, request, params, cookies, locals}): Promise<any> => {

    const userID = await getUserID(locals);
    await deleteChat(userID, params.chatID);

    return json({})
    
}

export const PATCH = async ({url, request, params, cookies, locals}) => {

    const userID = await getUserID(locals);
    const chat = await updateChat(userID, params.chatID, request.json())

    return json(chat);
}