<script lang="ts">

    import { mdiUploadOutline, mdiSendVariantOutline } from "@mdi/js";
    import IconButton from "./buttons/IconButton.svelte";
    import { sendMessage as baseSendMessage } from "$lib/stores/messages";

    let message:string = "";

    const sendMessage = async () => {
        if(message.length == 0) return;
        baseSendMessage(message);
        message = ""
    }

    const handleKeyDown = async (event: KeyboardEvent) => {
        if(event.key == "Enter" && !event.shiftKey){
            event.preventDefault();
            sendMessage()
        }
    }

</script>

<div class="w-full h-[134px] flex flex-col justify-end items-center max-w-screen-lg">
    <div class="w-full rounded-full pt-2 pb-2 pl-8 pr-8 bg-slate-100 flex flex-row justify-between">

        <textarea
            bind:value={message}
            on:keydown = {handleKeyDown} 
            rows="1" 
            class="bg-transparent flex-grow p-3 resize-none focus:outline-none"
            placeholder="Ask anything here..."
        />

        <div class="flex flex-row space-x-0">
            <IconButton icon={mdiUploadOutline} size={52} class="hover:bg-slate-200"></IconButton>
            <IconButton on:click={sendMessage} icon={mdiSendVariantOutline} size={52} class="hover:bg-slate-200"></IconButton>
        </div>

    </div>
</div>
