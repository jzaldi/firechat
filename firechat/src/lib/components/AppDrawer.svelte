<script lang="ts">

    import Button from "./buttons/Button.svelte";
    import { mdiPlus, mdiCogOutline, mdiHelpCircleOutline, mdiLoading } from "@mdi/js";
    import { flip } from "svelte/animate";
    import ChatListItem from "./ChatListItem.svelte";

    import { chats, addChat, deleteChat, refreshChats } from "$lib/stores/chats";

    export let isDrawerOpen = true;

    let isCreatingChat = false;
    const refreshPromise = refreshChats();

</script>

<div class="h-full w-full">

    <div style={`width: 100%; height: 64px; padding: 14px`}>
        <Button 
            on:click = {async () => {
                if (isCreatingChat) return;
                isCreatingChat = true;
                try{
                    await addChat()
                } finally {
                    isCreatingChat = false;
                }
            }}
            icon = {mdiPlus} 
            isLoading = {isCreatingChat}
            size={36} 
            class="bg-slate-200 hover:bg-slate-300 max-w-40 w-full" 
            showContent={isDrawerOpen}
        >
            Create new chat
        </Button>
    </div>

    <div
        style={`width: 100%; height: calc(100% - 120px - 64px)`}
    >
        {#if isDrawerOpen}
        <div style={`width: 100%; height: 44px`} class="pl-5 text-sm flex flex-col justify-end pb-3 truncate font-semibold">
            Recent chats
        </div>
        <div 
            style={`width: 100%; height: calc(100% - 44px)`}
            class = "pl-3 pr-3 overflow-y-auto overflow-x-hidden flex flex-col space-y-1"
        >
            {#await refreshPromise}
                {#each {length: 3} as _}
                <div class = "flex flex-row items-center justify-start h-10 animate-pulse">
                    <div class="ml-3 h-5 w-5 rounded-full bg-slate-200"></div>
                    <div class="h-5 ml-3 mr-3 text-sm w-[244px] truncate rounded-full bg-slate-200"></div>
                </div>
                {/each}
            {:then}

                {#each $chats as chat (chat.id)}
                <div animate:flip>
                    <ChatListItem chat={chat}></ChatListItem>
                </div>
                {/each}
    
            {/await}

        </div>
        {/if}

    </div>

    <div 
        style={`width: 100%; height: 120px; padding: 16px`}
        class = "flex flex-col justify-start items-start space-y-1"
    >
        <Button 
            icon = {mdiCogOutline} 
            size={32} 
            class="bg-transparent hover:bg-slate-200 w-full" 
            showContent={isDrawerOpen}
        >
            Settings
        </Button>
        <Button 
            icon = {mdiHelpCircleOutline} 
            size={32} 
            class="bg-transparent hover:bg-slate-200 w-full" 
            showContent={isDrawerOpen}
        >
            Help
        </Button>
    </div>

</div>