<script>
    export let options;
    export let value;
</script>


<div class="control">
    {#each options as {key, label}, optionIndex}
        <label class="radio">
            <input type="radio" bind:group={value} value={key} >
                {label}
        </label>
    {/each}
</div>
