<script >
    export let value;
    export let placeholder='';
    export let disabled=false;
</script>

<input class="input" type="password" {placeholder} bind:value {disabled} >
