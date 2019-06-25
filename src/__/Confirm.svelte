<script >
    import Modal from './Modal.svelte';
    import { createEventDispatcher } from 'svelte';

    export let title;
    export let isConfirmationOk;
    export let loading;

    const dispatch = createEventDispatcher();

    function close(){
        dispatch('closeConfirmation');
    }

    function confirm(){
        dispatch('submitConfirmation');
    }

    $: isLoading = loading ? 'is-loading' : '';
    $: isDisabled = loading ? {disabled: true} : {};
    $: isDisabledConfirmation = isConfirmationOk ?  {} :{disabled: true};
</script>

<Modal>
    <h3 class="title">{title}</h3>

    <div class="content" >
        <slot></slot>
    </div>

    <div class="field is-grouped is-grouped-right form-buttons">
        <p class="control">
            <a class="button is-danger {isLoading}"
               on:click={confirm}
               {...isDisabledConfirmation}
               {...isDisabled}
               href="javascript:void(0);"
            >
                Confirm
            </a>
        </p>
        <p class="control">
            <a class="button {isLoading}"
               on:click={close}
               {...isDisabled}
               href="javascript:void(0);"
            >
                Cancel
            </a>
        </p>
    </div>
</Modal>
