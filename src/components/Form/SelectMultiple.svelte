<script >
    export let value;
    export let placeholder='';
    export let options=[];
    export let size=2;
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
    <select bind:value placeholder={placeholder} multiple size={size}>
        {#each options as options, optionIndex}
            <option value={options.key}>{options.label}</option>
        {/each}
    </select>
</div>
