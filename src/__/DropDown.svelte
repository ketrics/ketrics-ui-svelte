<script >
    export let options=[];
</script>

<a class="card-header-icon" aria-label="more options" href="JavaScript:void(0);">
    <div class="dropdown is-hoverable is-right">
        <div class="dropdown-trigger">
            <a aria-haspopup="true" aria-controls="dropdown-menu4" href="JavaScript:void(0);">
                <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
            </a>
        </div>
        <div class="dropdown-menu" id="dropdown-menu4" role="menu">
            <div class="dropdown-content">
                {#each options as option, optionIndex}
                    <a class="dropdown-item" on:click={option.onClick} href="JavaScript:void(0);">
                        {option.label}
                    </a>
                {/each}
            </div>
        </div>
    </div>
</a>
