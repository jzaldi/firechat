import { json } from '@sveltejs/kit'

import { getUserID} from '$lib/server/utils'
import { createMessage, listMessages } from '$lib/server/database';

export const POST = async ({url, request, params, cookies, locals}) => {

    const userID = await getUserID(locals);
    const body = await request.json();
    const chat = await createMessage(userID, params.chatID, body);

    return json(chat);
}


export const GET = async ({url, request, params, cookies, locals}) => {

    const userID = await getUserID(locals);
    const chatList = await listMessages(userID, params.chatID);

    return json(chatList);

}
