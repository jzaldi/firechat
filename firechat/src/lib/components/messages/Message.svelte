<script lang="ts">
    import UserAvatar from "../UserAvatar.svelte";
    import user from "$lib/stores/user";
    import {type AnyMessage, MessageType} from "$lib/types/Message";
    import { MessagePartType } from "$lib/types/MessagePart";
    import IconButton from "../buttons/IconButton.svelte";
    import { mdiThumbUpOutline, mdiThumbDownOutline, mdiDotsVertical, mdiCreationOutline, mdiClose, mdiSendVariantOutline } from "@mdi/js";
    import Icon from "../Icon.svelte";
    import Markdown from "../Markdown.svelte";
    import { updateFeedback } from "$lib/stores/messages";
    import Button from "../buttons/Button.svelte";

    export let message: AnyMessage;

</script>

<div class="w-full flex flex-row p-5">
    <div class="w-[48px] h-full flex flex-col justify-center items-center">
        
        {#if $user && ( message.type == MessageType.HUMAN)}
            <UserAvatar size={36} user={$user}></UserAvatar>
        {:else}
            <Icon size={32} icon = {mdiCreationOutline} class="fill-blue-500" ></Icon>
        {/if}
    </div>
    <div class="flex-col" style="width:calc(100% - 48px); margin-left: 12px; margin-top:6px">
        <div class="flex-grow">
            {#each message.parts as part}
                {#if part.type == MessagePartType.TEXT}
                    <Markdown source={part.text}></Markdown>
                {/if}
            {/each}
        </div>
        {#if message.type == MessageType.AI}
            <div class="h-4"></div>
            <div class="flex flex-row w-full h-10 justify-start items-center space-x-1">
                <IconButton 
                    on:click={() => updateFeedback(message, 1)} 
                    icon={mdiThumbUpOutline} size={36} 
                    class= {(message.feedback && message.feedback.value > 0)? "bg-blue-100" : "bg-button-base"}
                />
                <IconButton 
                    on:click={() => updateFeedback(message, -1)} 
                    icon={mdiThumbDownOutline} 
                    size={36} 
                    class={(message.feedback && message.feedback.value < 0)? "bg-blue-100" : "bg-button-base"}
                />
                <div class="h-2"></div>
                <IconButton icon={mdiDotsVertical} size={36} class="bg-button-base"></IconButton>
            </div>
            <div class="h-4"></div>
            <div class="flex flex-col w-full bg-slate-100 rounded-xl max-w-[620px] pt-4 pb-4 pl-6 pr-3 shadow-sm">
                <div class="flex flex-row items-center justify-between">
                    <div>Provide additional feedback (optional)</div>
                    <IconButton icon={mdiClose} size={32} class="bg-button-base"></IconButton>
                </div>
                <div class="flex flex-col mt-3">
                    <textarea 
                        rows="2"
                        class="rounded-xl p-3 resize-none focus:outline-none max-w-[520px]" 
                        placeholder="Write something here..."
                    />
                </div>
                <div class="mt-4">
                    <Button size={32} icon={mdiSendVariantOutline} class="bg-button-important w-20 pr-1">Send</Button>
                </div>
            </div>
        {/if}
    </div>
</div>
