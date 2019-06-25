<script >
    export let title, imgUrl, style='', onClick=null;
</script>
<style>
    .cursor-pointer{
        cursor: pointer;
    }
</style>

<div class="card" style={style}>
    <div class="card-content">
        <div class="media">
            <div class="media-left">
                <figure class="image is-48x48">
                    <img src={imgUrl} alt={title}>
                </figure>
            </div>
            <div class="media-content">
                <p class="title is-4" on:click={onClick} class:cursor-pointer={onClick}>{title}</p>
                <p class="subtitle is-6">
                    <slot name="description"></slot>
                </p>
            </div>
            <div class="media-right">
                <slot name="extra"></slot>
            </div>
        </div>
    </div>

    <slot name="footer"></slot>
</div>
