<script lang="ts">
    import IconButton from "./buttons/IconButton.svelte";
    import { mdiSendVariantOutline, mdiUploadOutline } from "@mdi/js";
    import Message from "./messages/Message.svelte";
    import { messages, isLoading, isGenerating } from "$lib/stores/messages";
    import MessageSkeleton from "./messages/MessageSkeleton.svelte";
    import user from "$lib/stores/user";

	const scrollToBottom = (node: HTMLElement, other: any) => {
		const scroll = () => node.scroll({
			top: node.scrollHeight,
			behavior: 'smooth',
		});
		scroll();

		return { update: scroll }
	};

</script>
<div class="w-full h-full">

    <div style="height: calc(100% - 166px)" class="w-full flex flex-row justify-center items-center overflow-y-auto">

        <div class="h-full w-full max-w-screen-lg " use:scrollToBottom={$messages}>
            {#if $isLoading}
                {#each {length: 2} as _}
                    <MessageSkeleton></MessageSkeleton>
                {/each}
            {:else if $messages.length === 0}
                <div class="h-full w-full flex flex-col items-start justify-start">
                    <div class="text-4xl text-blue-500 font-bold mt-10">
                        Hello, {$user?.name}!
                    </div>
                    <div class="text-6xl text-slate-500 font-bold mt-4">
                        How can I help you?
                    </div>
                    <div class="flex flex-row w-full space-x-3 mt-20">
                        <button class="flex-grow bg-slate-100 hover:bg-slate-200 h-[190px] shadow-sm rounded-xl">
                            
                        </button>
                        <button class="flex-grow bg-slate-100 hover:bg-slate-200  h-[190px]  shadow-sm rounded-xl">
                            
                        </button>
                        <button class="flex-grow bg-slate-100 hover:bg-slate-200  h-[190px]  shadow-sm rounded-xl">
                            
                        </button>

                    </div>

                    <div class="flex flex-row w-full bg-slate-100 mt-16 rounded-xl h-[120px]">

                    </div>

                </div>
            {:else}
                {#each $messages as message}
                    <Message message={message}></Message>
                {/each}
                {#if $isGenerating}
                    <MessageSkeleton></MessageSkeleton>
                {/if}
            {/if}
        </div>

    </div>
    
    <div class="w-full h-[166px] flex flex-col items-center justify-center">

        <slot name = "user-input"/>

        <div class="w-full h-[32px]">
            <slot name= "disclaimer"/>
        </div>
    </div>

</div>