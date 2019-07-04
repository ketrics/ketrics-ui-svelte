<script >
    export let value;
    export let placeholder='';
    export let options = [];
    let visible = false;
    let search = '';
    let currentIndex=0;
    const refs = {};

    let tags=[];
    let elementId=`SelectTags-${Date.now()}-${Math.random().toString().replace('.','')}`;

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
        console.log(currentIndex, filteredOptions.length)
    }

    const handleClose = ()=>{
        refs.input.blur();
        visible=false;
        window.removeEventListener("click", handleWindowClick);
    }

    const handleReset = ()=>{
        refs.input.blur();
        tags = [];
        value=[];
        visible=false;
        search='';
    }

    const handleRemove = (index)=>{
        tags.splice(index,1);
        tags=tags;
        value= tags.map(tag=>tag.key);
    }


    $: filteredOptions = options ? options.filter(o=>!tags.includes(o)).filter(o=>o.label.toLowerCase().includes(search.toLowerCase())).slice(0,10): [];

</script>
<style>
    .current-option{
        background-color: hsl(204, 86%,  53%);
        color: hsl(0, 0%, 100%);
    }
    .dropdown, .dropdown-trigger, .dropdown-trigger input, .dropdown-menu, .dropdown-content{
        width: 100%;
    }
    .tag{
        margin-right: 5px;
    }
    .dropdown{
        max-width: 300px;
    }

    p.control{
        margin-bottom: 0!important;
    }
</style>


<div class="dropdown is-active">
    <div class="dropdown-trigger">
        <p class="control has-icons-right">
            <input class="input dropdown-input-trigger-{elementId}" type="text" placeholder={placeholder} bind:value={search}
                   on:focus={handleFocus}
                   on:keydown={handleKeyDown}
                   bind:this={refs.input}
            >
            <span class="icon is-small is-right">
                <button class="delete is-small" on:click={handleReset}></button>
            </span>
        </p>

        <div>
            {#each tags as tag, tagIndex}
                <span class="tag is-light">
                    {tag.label}
                    <button class="delete is-small" on:click={()=>handleRemove(tagIndex)}></button>
                </span>
            {/each}
        </div>
    </div>

    {#if visible}
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
