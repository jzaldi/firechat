<script lang="ts">
    export let size: number;
    export let icon: string;
    let extraClass = "fill-slate-600 ";
    export {extraClass as class}
</script>

<div style={`height: ${size}px; width: ${size}px;`} class={"shrink-0" + " " + extraClass}>
    <svg 
        viewBox="0 0 24 24"         
        xmlns="http://www.w3.org/2000/svg">
        <path d = {icon} fill="currentFill"></path>
    </svg>
</div>