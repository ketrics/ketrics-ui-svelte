<script>
	import { fade } from 'svelte/transition';
</script>
<style>
    .loading-container{
        position: relative;
        height: 100vh;
        max-width: 500px;
        margin: 0 auto;
        overflow: auto;
    }

    .loading-card{
        width: 100%;
        margin: -100px 0 0 0;
        padding: 10px;
        position: absolute;
        top: 50%;
        text-align: center;
    }
</style>

<div class="loading-container" transition:fade="{{delay: 0, duration: 300}}">
    <div class="loading-card">
        <img src="loader.gif" alt="" width="100">
    </div>
</div>
