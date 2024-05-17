import { json } from '@sveltejs/kit'
import { v4 as uuidv4 } from 'uuid'

import { getUserID} from '$lib/server/utils'
import { createChat, listChats } from '$lib/server/database';

export const POST = async ({url, request, params, cookies, locals}) => {

    const userID = await getUserID(locals);
    const chat = await createChat(userID)

    return json(chat);
}


export const GET = async ({url, request, params, cookies, locals}) => {

    const userID = await getUserID(locals);
    const chatList = await listChats(userID);

    return json(chatList);

}
