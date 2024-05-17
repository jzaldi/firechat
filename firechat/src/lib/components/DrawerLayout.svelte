<script lang="ts">

    import { mdiMenu } from "@mdi/js";
    import { slide } from "svelte/transition";
    import IconButton from "./buttons/IconButton.svelte";

    const SMALL_SCREEN_SIZE = 960;
    let innerWidth: number = 0;
    $: isSmallScreen = innerWidth < SMALL_SCREEN_SIZE;

    export let isDrawerOpen: boolean = false;

    const toggleDrawerOpen = () => {
        isDrawerOpen = !isDrawerOpen;
        console.log(isDrawerOpen)
    }

    const drawerFullWidth: number = 284;
    const drawerMinimizedWidth: number = 64;
    $: drawerWidth = isSmallScreen? drawerFullWidth: isDrawerOpen? drawerFullWidth: drawerMinimizedWidth;
    $: mainWidth = isSmallScreen? "100%": `calc(100% - ${drawerWidth}px)`

</script>

<style>

    .transition-resize{
        transition: width 0.3s ease-out;    
    }

</style>

<svelte:window bind:innerWidth/>

<div class="flex flex-row w-full h-full bg-background-primary">

    {#if !isSmallScreen || isDrawerOpen}
    <div 
        class="transition-resize bg-background-secondary"
        style= {`width: ${drawerWidth}px; height: 100%;`}
        class:absolute = {isSmallScreen}
        transition:slide = {{axis: 'x', duration: isSmallScreen? 300: 0}}
    >
        <div 
            style={`width: 100%; height: 64px; padding: 10px`}
        >
            <IconButton icon = {mdiMenu} size={44} class="bg-transparent hover:bg-slate-200"  on:click={toggleDrawerOpen}/>
        </div>
        <div style={`width: 100%; height: calc(100% - 64px)`}>
            <!--

            -->
            <slot name="drawer"></slot>

        </div>

    </div>
    {/if}

    <div
        style={`width: ${mainWidth}; height: 100%`}
        class="transition-resize"
    >
        <div 
            style={`width: 100%; height: 64px;`}
        >
            
            {#if isSmallScreen}
            <div
                style={`width: 64px; height: 100%px; padding: 10px; float:left;`}>
                <IconButton icon = {mdiMenu} size={44} class="bg-transparent hover:bg-slate-200"  on:click={toggleDrawerOpen}/>
            </div>
            {/if}

            <div style={`width: ${isSmallScreen? "calc(100% - 64px)" : "100%" }; height: 100%; float:left;`}>

                <slot name="header"></slot>

            </div>

        </div>

        <div style={`width: 100%; height: calc(100% - 64px)`}>
            <slot name="content"></slot>
        </div>

        
    </div>

</div>