<script lang="ts">
    import SvelteMarkdown from 'svelte-markdown';
    export let source: string = "";
</script>



<div class="table-fixed text-slate-700">
    <SvelteMarkdown source={source}></SvelteMarkdown>
</div>