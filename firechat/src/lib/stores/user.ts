import { writable } from "svelte/store";
import type { User } from "@auth/sveltekit";

const user = writable<User | null>(null);

export default user;