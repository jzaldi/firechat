import { sequence } from '@sveltejs/kit/hooks';
import { SvelteKitAuth } from '@auth/sveltekit';
import GoogleProvider from '@auth/core/providers/google';

import {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
} from '$env/static/private';

const {handle: authInitHandle, signIn, signOut} = SvelteKitAuth({
    providers: [
        GoogleProvider({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET })
    ]
});

export const handle = sequence(authInitHandle);