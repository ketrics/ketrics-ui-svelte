<script >
    import {onMount} from 'svelte';

    export let value;
    export let placeholder='';
    export let options = [];
    let visible = false;
    let search = '';
    let currentIndex=0;
    const refs = {};

    onMount(()=>{
        if(value){
            const option = options.find(o=>o.key.toString().toLowerCase()===value.toString().toLowerCase());
            if(option){
                handleSelect(option);
            }
        }
    })

    function handleSelect(option){
        value = option.key;
        search = option.label;
        visible = false;
    }

    function handleFocus(){
        visible=true;
        currentIndex = filteredOptions.findIndex(o=>o.key.toString().toLowerCase()===value.toString().toLowerCase());
    }

    function handleKeyDown(event){
        if(event.keyCode===38){
            //Up
            if(currentIndex-1 < 0)
                currentIndex = filteredOptions.length;
            else
                currentIndex = currentIndex-1;
        }else if (event.keyCode===40){
            //Down
            if(currentIndex+1 > filteredOptions.length)
                currentIndex = 0;
            else
                currentIndex = currentIndex+1;
        }else if (event.keyCode===13){
            //Enter
            if(currentIndex===filteredOptions.length){
                handleReset();
            }else{
                handleSelect(filteredOptions[currentIndex]);
                if(refs.input)
                    refs.input.blur();
            }
        }else if (event.keyCode===27){
             //Esc
             const option = options.find(o=>o.key.toString().toLowerCase()===search.toString().toLowerCase());
             if(option){
                 handleSelect(option);
             }else{
                 handleReset();
             }

         }else{
            currentIndex=0;
        }
    }

    function handleClose(){
        if(refs.input)
            refs.input.blur();
        visible=false;
    }

    function handleReset(){
        if(refs.input)
            refs.input.blur();
        value='';
        visible='';
        search='';
    }

    $: filteredOptions = options.filter(o=>o.label.toLowerCase().includes(search.toLowerCase())).slice(0,10);

</script>
<style>
    .current-option{
        background-color: hsl(204, 86%,  53%);
        color: hsl(0, 0%, 100%);
    }
    .dropdown, .dropdown-trigger, .dropdown-trigger input, .dropdown-menu, .dropdown-content{
        width: 100%;
    }
    p.control{
        margin-bottom: 0!important;
    }
</style>

<div class="dropdown is-active">
    <div class="dropdown-trigger">

        <p class="control has-icons-right">
            <input class="input" type="text" placeholder={placeholder} bind:value={search}
                   on:focus={handleFocus}
                   on:keydown={handleKeyDown}
                   bind:this={refs.input}
            >
            <span class="icon is-small is-right">
                <button class="delete is-small" on:click={handleReset}></button>
            </span>
        </p>

    </div>

    {#if visible}
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
                {#each filteredOptions as option, optionIndex}
                    <a href="javascript:void(0);" class="dropdown-item"
                       on:click={()=>handleSelect(option)}
                       class:current-option={currentIndex===optionIndex}
                    >
                        {option.label}
                    </a>
                {/each}
                <a href="javascript:void(0);" class="dropdown-item"
                   on:click={handleClose}
                   class:current-option={currentIndex===filteredOptions.length}
                >
                    <b>Close</b>
                </a>
            </div>
        </div>
    {/if}
</div>
