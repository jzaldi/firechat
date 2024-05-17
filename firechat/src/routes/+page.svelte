<script lang="ts">

    import DrawerLayout from "$lib/components/DrawerLayout.svelte";
    import Logo from "$lib/assets/logo.svg" 
    import AppHeader from "$lib/components/AppHeader.svelte";
    import AppDrawer from "$lib/components/AppDrawer.svelte";
    import AppContent from "$lib/components/AppContent.svelte";

    import user from "$lib/stores/user.js";
    import UserInput from "$lib/components/UserInput.svelte";

    export let data;

    let isDrawerOpen: boolean = true;

    if(data.user){
        user.set(data.user);
    }

</script>



<div class="h-lvh w-lvw flex flex-row text-slate-800">

    {#if data.user}
    <DrawerLayout bind:isDrawerOpen={isDrawerOpen}>
        <AppHeader slot="header" user={data.user} logo={Logo}></AppHeader>
        <AppDrawer slot="drawer" isDrawerOpen={isDrawerOpen}></AppDrawer>
        <AppContent slot="content">
            <UserInput slot="user-input"></UserInput>
        </AppContent>
    </DrawerLayout>
    {/if}

</div>

