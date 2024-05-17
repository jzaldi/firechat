import { json, error } from '@sveltejs/kit';

export const GET = async ({url, request, params, cookies, locals}) => {

    const session = await locals.auth(); 

    if (session?.user){
        return json(session.user)
    } else {
        return error(403, {"message": "Not authenticated"})
    }

}
