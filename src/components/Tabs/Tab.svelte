<script>
	import { getContext, onDestroy } from 'svelte';
	import { TABS } from './Tabs.svelte';

	export let label;

	const tab = {label};
	const { registerTab, unregisterTab, selectedTab } = getContext(TABS);
	registerTab(tab);

	onDestroy(() => {
		unregisterTab(tab);
	});
</script>

<style>
    .tab-panel{
        padding: 10px 0;
    }
</style>

{#if $selectedTab === tab}
    <div class="tab-panel">
	    <slot></slot>
	</div>
{/if}
