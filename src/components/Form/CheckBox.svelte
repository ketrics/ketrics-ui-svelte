<script >
    export let label = '';
    export let checked = true;
    export let onClick = void(0);
    export let disabled = false;

</script>

<style>
    input{
        margin-top: 12px;
    }
</style>

<div class="field">
    <div class="control">
        <label class="checkbox">
            <input type="checkbox" bind:checked on:click={onClick} {disabled}>
            <slot>{label}</slot>
        </label>
    </div>
</div>


