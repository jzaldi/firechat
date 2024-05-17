import { json, error } from '@sveltejs/kit';

import { generateContent } from '$lib/server/generativeModel.js';

export const POST = async ({url, request, params, cookies, locals}) => {

    const session = await locals.auth(); 

    if (session?.user){
        const messages = await request.json();
        const generatedContent = await generateContent(messages)
        return json(generatedContent)
    } else {
        return error(403, {"message": "Not authenticated"})
    }

}
