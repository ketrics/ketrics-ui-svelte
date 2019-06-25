<script >
    export let value;
    export let placeholder='';
    export let disabled=false;
    export let onChange = ()=>void(0);

</script>

<input class="input" type="text" {placeholder} bind:value {disabled} on:change={onChange} >
