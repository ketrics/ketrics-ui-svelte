<script >
    import { createEventDispatcher } from 'svelte';

    export let items;
    export let key;
    export let selected;
    export let onClick;
    export let onAdd=null;
    export let sortable=true;

    const dispatch = createEventDispatcher();

    function handleDragOver(ev){
        ev.preventDefault();
        ev.dataTransfer.dropEffect = 'move';
    }

    function handleDragStart(ev, sourceIndex){
        ev.dataTransfer.setData("sourceIndex", sourceIndex);
    }

    function handleDrop(ev, targetIndex){
        const sourceIndex = ev.dataTransfer.getData("sourceIndex");
        if(sourceIndex)
            dispatch('sortItems', {sourceIndex, targetIndex})
    }

</script>

<style>
    .panel-block{
        justify-content: left;
        position: relative;
    }
</style>

<nav class="panel">
    {#each items as item, itemIndex}
        <a class="panel-block" class:is-active={selected && itemIndex===selected.index}
           on:click={()=>onClick(itemIndex)}
           draggable='true'
           on:dragstart={event=>handleDragStart(event, itemIndex)}
           on:drop={event=>handleDrop(event, itemIndex)}
           on:dragover={handleDragOver}
           href="javascript:void(0);"
        >
            {#if sortable}
                <span class="panel-icon">
                    <i class="fas fa-arrows-alt"></i>
                </span>
            {/if}
            {item[key]}
        </a>
    {/each}

    {#if onAdd}
        <a class="panel-block" on:click={onAdd} href="javascript:void(0);" >
            <span class="panel-icon">
                <i class="fas fa-plus" aria-hidden="true"></i>
            </span>
            Add
        </a>
    {/if}
</nav>
