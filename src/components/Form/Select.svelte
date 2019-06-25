<script >
    export let value;
    export let placeholder='';
    export let options=[];
    export let onChange = ()=>void(0);
    export let disabled = false;
</script>
<style>
    select{
        width: 100%;
    }

    .select{
        width: 100%;
    }
</style>

<div class="select">
    <select bind:value placeholder={placeholder} on:change={onChange} {disabled}>
        {#each options as options, optionIndex}
            <option value={options.key}>{options.label}</option>
        {/each}
    </select>
</div>
