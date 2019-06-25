<script>
    export let value;
    export let options;
    export let size='normal';

    const handleClick = (option)=>{
        value = option.key;
    }

    $: selected = value ? options.find(option=>option.key===value) : null;
</script>

<div class="buttons has-addons">
    {#each options as option, optionIndex}
        <span class="button is-{size} {(selected && option.key===selected.key)? 'is-info is-selected' : ''}" 
              on:click={()=>handleClick(option)}
        >
            {option.label}
        </span>
    {/each}
</div>