<script lang="ts">

    import Button from "./Button.svelte";


    export let size = 18;
    export let icon: string;
    export let isLoading = false;
    let extraClass = "";
    export {extraClass as class}

</script>

<Button on:click {size} {icon} {isLoading} showContent={false} class={extraClass}></Button>

