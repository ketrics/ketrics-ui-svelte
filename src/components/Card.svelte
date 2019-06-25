<script >
    export let title='';
    export let style='';
    export let showContent=true;

    $: style = showContent ? '' : 'display: none;';
</script>
<style>
    .card-content{
        padding: 10px;
    }
    .card{
        border-radius: 6px;
    }
    .extra{
        padding: 10px;
    }
    p{
        margin-bottom: 0!important;
    }
</style>

<div class="card">
    <header class="card-header">
        <p class="card-header-title">
            <slot name="title">
                {title}
            </slot>
        </p>
        <div class="extra">
            <slot name="extra"></slot>
        </div>
    </header>
    <div class="card-content" style={style} >
        <div class="content">
            <slot name="content"></slot>
        </div>
    </div>
</div>
