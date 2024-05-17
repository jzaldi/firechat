<script lang="ts">

    import type { User } from "@auth/sveltekit";
    import { signOut } from "@auth/sveltekit/client";
    import { mdiClose, mdiLogout } from "@mdi/js";

    import UserAvatar from "./UserAvatar.svelte";
    import Menu from "./Menu.svelte";
    import Button from "./buttons/Button.svelte";
    import IconButton from "./buttons/IconButton.svelte";

    export let logo: string;
    export let user: User;

    let isUserMenuOpen: boolean = false;

    const toggleUserMenu = () => {
        isUserMenuOpen = !isUserMenuOpen;
    }

</script>

<div class="w-full h-full flex flex-row justify-between items-center pl-4 pr-4">
    <div class="h-6">
        <img class="h-full" src="{logo}" style="position:relative; z-index: 100;" alt="Logo"/>
    </div>

    <div class="flex-grow"></div>
    
    <button 
        class="h-12 w-12 rounded-full bg-button-base flex flex-row justify-center items-center"
        on:click|stopPropagation={toggleUserMenu}
    >
        <UserAvatar user={user} size={48}></UserAvatar>
    </button>

</div>

<Menu bind:isOpen={isUserMenuOpen} top = {80} right={32}>
    <div 
        class="flex flex-row justify-center items-start  min-w-[320px] bg-slate-100 rounded-lg pl-10 pr-4 pt-4 pb-6 space-y-1 shadow" 
    >
        <div class="flex-grow col-stack">
            <div class="h-2"></div>
            <div class="h-8">{user.email}</div>
            <div class="h-2"></div>
            <UserAvatar user={user} size={90}></UserAvatar>
            <div class="text-xl"> Hello {user.name}!</div>
            <div class="h-4"></div>
            <Button  on:click={() => {signOut()}} icon={ mdiLogout} size={32} margin={20} class="bg-button-important"> Log out</Button>
            
        </div>
        <div class="h-8 w-8 row-stack">
            <IconButton size={32} icon={mdiClose} on:click={toggleUserMenu} class="bg-button-base"/>
        </div> 
    </div>
</Menu>