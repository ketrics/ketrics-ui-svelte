<script >
    import {onMount} from 'svelte';

    export let value;
    export let placeholder='';
    export let options = [];
    export let disabled= false;

    let visible = false;
    let search = '';
    let currentIndex=0;
    const refs = {};

    let tags=[];
    let elementId=`SelectTags-${Date.now()}-${Math.random().toString().replace('.','')}`;

    onMount(()=>{
        if(value){
            tags = options.filter(option=>value.includes(option.key));
        }
    })

    const handleSelect = (option)=>{
        search = '';
        tags = [...tags, option];
        value= tags.map(tag=>tag.key);
    }

    function handleWindowClick(e){
        if(visible){
            if(!(e.target.classList.contains('dropdown-item-'+elementId)
            || e.target.classList.contains('dropdown-input-trigger-'+elementId))){
                handleClose()
            }
        }
    }

    const handleFocus = ()=>{
        visible=true;
        currentIndex = filteredOptions.findIndex(o=>o.key===value);
        window.addEventListener("click", handleWindowClick);
    }

    const handleKeyDown = (event)=>{
        if(event.keyCode===38){
            //Up
            if(currentIndex > 0)
                currentIndex--;
            else
                currentIndex = filteredOptions.length-1;
        }else if (event.keyCode===40){
            //Down
            if(currentIndex < filteredOptions.length-1)
                currentIndex++;
            else
                currentIndex = 0;
        }else if (event.keyCode===13){
            //Enter
            if(currentIndex===filteredOptions.length){
                handleReset();
            }else{
                handleSelect(filteredOptions[currentIndex]);
            }
        }else if (event.keyCode===27){
             //Esc
             handleClose();
         }else{
            currentIndex=0;
        }
    }

    const handleClose = ()=>{
        if(refs.input)
            refs.input.blur();
        visible=false;
        window.removeEventListener("click", handleWindowClick);
    }

    const handleReset = ()=>{
        handleClose();
        tags = [];
        value=[];
        search='';
    }

    const handleRemove = (index)=>{
        tags.splice(index,1);
        tags=tags;
        value= tags.map(tag=>tag.key);
    }

    function getFilteredOptions(options){
        let _options=[];
        if(options){
            _options = options.filter(option=>!tags.map(tag=>tag.key).includes(option.key))
                .filter(option=>option.label.toLowerCase().includes(search.toLowerCase())).slice(0,10);
        }
        return _options;
    }


    $: filteredOptions = getFilteredOptions(options);

</script>
<style>
    .current-option{
        background-color: hsl(204, 86%,  53%);
        color: hsl(0, 0%, 100%);
    }
    .dropdown, .dropdown-trigger, .dropdown-menu, .dropdown-content{
        width: 100%;
    }
    .tag{
        margin-right: 5px;
    }
    p.control{
        margin-bottom: 0!important;
    }

    .select-tags{
        -moz-appearance: textfield;
        -webkit-appearance: textfield;
        background-color: white;
        background-color: -moz-field;
        border: 1px solid #dbdbdb;
        box-shadow: inset 0 1px 2px rgba(10,10,10,.1);
        font: -moz-field;
        font: -webkit-small-control;
        margin-top: 5px;
        padding-top: calc(.375em - 1px);
        padding-left: calc(.625em - 1px);
        padding-bottom: calc(.375em - 1px);
        border-radius: 4px;
        width: 100%;
        font-size: 1rem;
        min-height: 2.25em;
        justify-content: flex-start;
        line-height: 1.5;
        position: relative;
    }

    .input-search {
        border: none !important;
        border-color: transparent !important;
        font-size: 1rem;
    }
    input.input-search:focus {
        outline-width: 0;
    }
    .reset-icon{
        right: 0;
        position: absolute;
        height: 2.25em;
        width: 2.25em;
        top: 0;
    }

    .is-disabled{
        background-color: #f5f5f5;
        border: 0;
        box-shadow: none;
        color: #7a7a7a;
    }
</style>


<div class="dropdown is-active">
    <div class="dropdown-trigger">
        <div class="select-tags" class:is-disabled={disabled}>
            {#each tags as tag, tagIndex}
                <span class="tag is-info">
                    {tag.label}
                    {#if !disabled}
                        <button class="delete is-small" on:click={()=>handleRemove(tagIndex)}></button>
                    {/if}
                </span>
            {/each}
            {#if !disabled}
                <input class="input-search dropdown-input-trigger-{elementId}"
                    type="text"
                    placeholder={placeholder}
                    bind:value={search}
                    on:focus={handleFocus}
                    on:keydown={handleKeyDown}
                    bind:this={refs.input}
                >
                <span class="icon is-small is-right reset-icon">
                    <button class="delete is-small" on:click={handleReset}></button>
                </span>
            {/if}
        </div>
    </div>

    {#if !disabled && visible && filteredOptions.length>0}
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
                {#each filteredOptions as option, optionIndex}
                    <a href="javascript:void(0);" class="dropdown-item dropdown-item-{elementId}"
                       on:click={()=>handleSelect(option)}
                       class:current-option={currentIndex===optionIndex}
                    >
                        {option.label}
                    </a>
                {/each}
            </div>
        </div>
    {/if}
</div>
