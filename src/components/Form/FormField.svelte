<script >
    export let layout='vertical';
    export let label;
    export let horizontal=null;
    export let vertical=true;
    export let error=null;

    if (horizontal!==null)
        vertical = false;
</script>


{#if vertical}
    <div class="field">
        <label class="label">{label}</label>
        <div class="control">
            <slot></slot>
        </div>

        {#if error}
            <p class="help is-danger">{error}</p>
        {/if}

    </div>
{:else}
    <div class="field is-horizontal">
        <div class="field-label is-normal">
            <label class="label">{label}</label>
        </div>
        <div class="field-body">
            <div class="field">
                <p class="control">
                    <slot></slot>
                </p>
            </div>
        </div>

        {#if error}
            <p class="help is-danger">{error}</p>
        {/if}

    </div>
{/if}


