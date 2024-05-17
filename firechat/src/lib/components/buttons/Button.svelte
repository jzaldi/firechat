<script lang="ts">

    import Icon from "../Icon.svelte";
    import Spinner from "./Spinner.svelte";

    export let size = 28;
    export let icon: string;
    export let isLoading = false;
    export let showContent = true;

    export let margin = size / 4;

    let extraClass = "";
    export {extraClass as class}

    $: fullButton = showContent

    $: conditionalClasses = fullButton? `justify-start`: `justify-center`

</script>

<button 
    on:click
    style= {`height: ${size}px;`  + (fullButton? `padding-left: ${margin}px; padding-right: ${margin}px` : `width: ${size}px`)}
    class= {"rounded-full flex flex-row items-center" + " " + conditionalClasses + " " + extraClass}
    aria-hidden
>

    {#if !isLoading}
        <Icon size={ size / 2 } icon={ icon }></Icon>
    {:else}
        <Spinner size={ size / 2 } class="fill-slate-800 text-slate-300"></Spinner>
    {/if}

    {#if fullButton}
        <div class="ml-2 text-sm max-w-64 truncate">
            <slot/>
        </div>
    {/if}

</button>