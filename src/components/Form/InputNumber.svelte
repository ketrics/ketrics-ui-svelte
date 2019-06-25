<script >
    export let value;
    export let placeholder='';
    export let disabled=false;
</script>
<style>
    input{
        text-align: right;
    }
</style>

<input class="input" type="number" {placeholder} bind:value {disabled} >
