<script context="module">
	export const TABS = {};
</script>

<script>
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	const tabs = [];
	const panels = [];
	const selectedTab = writable(null);

	const selectTab = tab => {
        selectedTab.set(tab);
    }

	setContext(TABS, {
		registerTab: tab => {
			tabs.push(tab);
			selectedTab.update(current => current || tab);
		},

		unregisterTab: tab => {
			const i = tabs.indexOf(tab);
			tabs.splice(i, 1);
			selectedTab.update(current => current === tab ? (tabs[i] || tabs[tabs.length - 1]) : current);
		},

		selectTab,

		selectedTab
	});
</script>

<style>
    ul{
        margin: 0!important;
    }
    .tabs{
        margin-bottom: 0;
    }
</style>


<div class="tabs">
    <ul>
        {#each tabs as tab, tabIndex}
            <li class:is-active="{$selectedTab === tab}" on:click="{() => selectTab(tab)}">
                <a href="javascript:void(0);">
                    {tab.label}
                </a>
            </li>
        {/each}
    </ul>
</div>

<slot></slot>
