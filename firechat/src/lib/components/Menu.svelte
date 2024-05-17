<script lang="ts">

    export let isOpen: boolean = true;
    export let top: number;
    export let left: number | undefined = undefined;
    export let right: number | undefined = undefined;

    import { browser } from "$app/environment"

    const handleMenuClose = () => {
        isOpen = false;
        if(browser){
            document.body.removeEventListener('click', handleMenuClose)
        }
    }

    const handleMenuOpen = () => {
        if(isOpen){
            if(browser){
            document.body.addEventListener('click', handleMenuClose)
            }
        }
    }

    $: isOpen? handleMenuOpen() : handleMenuClose();

</script>

{#if isOpen}

    <div    
        on:click|stopPropagation={() => {}}
        on:keydown = {() => {}}
        aria-hidden
        class="absolute"
        style = {`top:${top}px; left:${left}px; right:${right}px;`}
    >

    <slot/>
    
    </div>

{/if}