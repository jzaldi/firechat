import { json } from '@sveltejs/kit'

import { getUserID} from '$lib/server/utils'
import { updateMessage } from '$lib/server/database';

export const PATCH = async ({url, request, params, cookies, locals}) => {

    const userID = await getUserID(locals);
    const body = await request.json();
    const message = await updateMessage(userID, params.chatID, params.messageID, body);

    return json(message);
}