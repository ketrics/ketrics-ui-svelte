<script >
    export let style='';
    export let onClose=null;
</script>
<style>
    .box{
        border-radius: 6px;
        position: relative;
    }
    .modal{
        z-index: 100;
    }
    .media{
        border-top: 0;
        padding-top: 0;
    }
    .close-button{
        position: absolute;
        right: 10px;
        top: 10px;
    }
</style>

<div id="modal" class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content" style={style}>
        <div class="box">
            <article class="media">
                <div class="media-content">
                    <div class="content">
                        <slot></slot>
                    </div>
                </div>
            </article>

            {#if onClose}
                <a class="button is-rounded is-white close-button" href="javascript:void(0);" on:click={onClose}>
                    <span class="icon is-small">
                        <i class="fas fa-times"></i>
                    </span>
                </a>
            {/if}

        </div>
    </div>



</div>
