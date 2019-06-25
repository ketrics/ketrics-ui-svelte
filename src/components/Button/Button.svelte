<script >
    export let type='link';
    export let width=null;
    export let icon=null;
    export let style='';
    export let size='normal';
    export let rounded=false;
    export let iconOnly=false;
    export let loading=false;
    export let disabled=false;
    export let clss='';
    export let align='left';

    export let onClick = ()=>{};

    $: isRounded = rounded ? 'is-rounded': ''
    $: isLoading = loading ? 'is-loading': ''
    $: isDisabled = disabled ? {disabled} : {}
    
</script>

<style>
    .button-label{
        margin-left: 3px!important;
    }
</style>

<div class="control" style='text-align: {align};'>
    
    <button class="button is-{type} is-{size} {isRounded} {isLoading} {clss}" on:click={onClick} style={style} {...isDisabled} >
        {#if icon!==null}
            <span class="icon is-small">
                <i class="fas {icon}"></i>
            </span>
        {/if}

        {#if !iconOnly}
            <span class="button-label">
                <slot></slot>
            </span>
        {/if}

    </button>
</div>
