<script lang="ts">

    import type { User } from "@auth/sveltekit";

    export let user: User;
    export let size: number = 32;

</script>

<div 
    class="rounded-full flex flex-col justify-center items-center"
    style={`width: ${size}px; height: ${size}px;`}
>
    <img class="rounded-full" width="80%" src={user.image} alt="User"/>
</div>
<div class="h-2"></div>