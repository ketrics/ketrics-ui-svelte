<script >
    export let span=null;
    export let style=''

    $: spanClass = span ? `is-${span}`: '';
</script>
<style>

</style>

<div class="column {spanClass}" style={style}>
    <slot></slot>
</div>
