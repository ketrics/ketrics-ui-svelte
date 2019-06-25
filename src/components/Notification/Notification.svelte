<script>
    import { createEventDispatcher, onDestroy, onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    export let message;
    export let title=null;
    export let duration=3000;
    export let type='info';

    let visible = false;

    const show = ()=>{
        visible = true;
        setTimeout(close,duration)
    }

    const close = ()=>{
        visible = false;
    }

    onMount(show)

</script>

<style lang="scss">
    .ketrics-notification {
        position: fixed;
        top: 60px;
        right: 10px;
        z-index: 1000;
        border-radius: 6px;
    }
    .no-title{
        position: absolute;
        right: .5rem;
        top: .5rem;
    }
    .message-body{
        padding: 10px 40px 10px 10px;
    }
    .message-header{
        padding: 10px;
    }
</style>

{#if visible}
    <div class="ketrics-notification" transition:fade>
        <article class="message is-{type}" >
            {#if title}
                <div class="message-header">
                    <p>{title}</p>
                    <button class="delete" aria-label="delete" on:click={close}></button>
                </div>
            {/if}
            <div class="message-body">
                {#if !title}
                    <button class="delete no-title" aria-label="delete" on:click={close}></button>
                {/if}
                {@html message}
            </div>
        </article>
    </div>
{/if}