<script lang="ts">

    import { mdiMessageOutline, mdiDotsVertical, mdiDeleteOutline, mdiPencilOutline, mdiPinOutline, mdiClose } from "@mdi/js";

    import type { Chat } from "$lib/types/Chat";
    import Icon from "./Icon.svelte";
    import Button from "./buttons/Button.svelte";
    import IconButton from "./buttons/IconButton.svelte";
    import Menu from "./Menu.svelte";
    import Modal from "./Modal.svelte";

    import { activeChat, deleteChat,  selectChat} from "$lib/stores/chats";



    export let chat: Chat;

    let hovered = false;
    let isMenuOpen = false;
    let menuAnchor: HTMLElement;

    $: menuX = menuAnchor?.getBoundingClientRect().right + 28;
    $: menuY = menuAnchor?.getBoundingClientRect().top - 8;

    let toggleMenu = () => {
        isMenuOpen = !isMenuOpen;
        console.log(isMenuOpen);
    }

    let isDeletingChat: boolean = false;

    let isEditingTitle: boolean = false;
    let currentTitle: string = chat.title;
    const toggleTitleEditing = () => {
        isEditingTitle = !isEditingTitle;
    }

    $: isActive = $activeChat?.id == chat.id;

</script>

<button 
    class={`rounded-full flex flex-row items-center justify-start bg-button-base h-9 `}
    class:bg-button-base = {!isActive}
    class:bg-blue-200 = {isActive}
    on:click={async () => {selectChat(chat)}} 
    on:mouseenter={() => {hovered = true}}
    on:mouseleave={() => {hovered = false}}
    aria-hidden
>
    <div 
        style={`height: 16px; width: 16px; margin-left: 10px`}
    >
        <svg viewBox="0 0 24 24">
            <path d = {mdiMessageOutline}></path>
        </svg>
    </div>

    <div class="ml-3 text-sm max-w-48 truncate">
        {chat.title}
    </div>

    <div class="flex-grow"></div>

    {#if hovered || isMenuOpen}
        <button
            bind:this={menuAnchor}
            on:click|stopPropagation={toggleMenu}
            class="bg-button-important rounded-full w-5 h-5 mr-3 flex items-center justify-center" >
            <Icon size={16} icon={mdiDotsVertical}></Icon>
        </button>
    {:else if isActive}
        <div class="w-5 h-5 mr-3">

        </div>
    {/if}
    
</button>

<Menu bind:isOpen={isMenuOpen} top={menuY} left={menuX}>
    <div 
        class="column-stack min-w-36 bg-slate-100 rounded-lg shadow p-2 space-y-1 h-50"
    >
        <Button icon={mdiPinOutline} class = "hover:bg-slate-200 w-full"> Pin </Button>
        <Button on:click={toggleTitleEditing} icon={mdiPencilOutline} class = "hover:bg-slate-200 w-full"> Edit title </Button>
        <div class="flex-grow border-t border-slate-200"></div>
        <Button 
            class = "hover:bg-slate-200 w-full" 
            isLoading={isDeletingChat} 
            icon={mdiDeleteOutline} 
            on:click={async () => {
                if (isDeletingChat) return;
                isDeletingChat = true;
                try {
                    if (!chat.id) return;
                    await deleteChat(chat.id);
                    isMenuOpen = false;
                } finally {
                    isDeletingChat = false;
                }
            }}> 
            Delete 
        </Button>
    </div>
</Menu>

<Modal isOpen = {isEditingTitle}>
    <div class="bg-slate-100 rounded-xl flex flex-col p-4 justify-start min-w-80">

        <div class="w-full flex flex-row justify-between items-center space-x-3">
           
            <div>Edit chat title</div>
            <IconButton icon={mdiClose} size={28} class="bg-button-base" on:click={toggleTitleEditing}></IconButton>
        </div>
        <div class="h-20 flex flex-row justify-center items-center">
            <input class="p-4 w-full rounded-xl" bind:value={currentTitle}  type="text"/>
        </div>
       
        <div class="flex flex-row justify-end items-center space-x-3 w-full h-8">
            <Button size={32} icon={mdiPencilOutline} class="bg-button-base min-w-30 text-center">Change title</Button>
        </div>
    </div>
</Modal>