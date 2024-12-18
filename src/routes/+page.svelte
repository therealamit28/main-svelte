<script lang="ts">
    import Button from '$lib/components/ui/button/button.svelte';
    import { get, writable} from 'svelte/store';
    import type { Player } from '$lib/server/db/type';
    import PlayerTable from '$lib/components/PlayerTable.svelte';
import type { PageData } from './$types';
import PlayerCommandDialog from '$lib/components/PlayerCommandDialog.svelte';
import {onMount} from 'svelte';
import {searchPlayer,handleNavigation,handleKeydown} from '../lib/components/logic/playerLogic';

import Searchinput from '$lib/components/Searchinput.svelte';

export let data: PageData;

let timer: NodeJS.Timeout;

let popoverOpen = false;
let searchTerm= writable <string>("");
let players= writable <Player[]>(data.players);


async function performSearch() {
    const term = get(searchTerm);
    players.set(await searchPlayer(term));
}


function handleInput(e: Event) {
		clearTimeout(timer);
		timer = setTimeout(() => {
			const target = e.target as HTMLInputElement;
			searchTerm.set(target.value);
			performSearch();
		}, 300);
	}


$:if (get(searchTerm).length<3){
    players.set(data.players);
}
onMount(()=>{
    performSearch()
})

</script>

<div class="container mx-auto max-w-4xl px-4  sm:px-6 lg:px-8">
    <Searchinput bind:searchTerm {handleInput}/>

</div>


<div class="container mx-auto max-w-4xl px-4  sm:px-6 lg:px-8">
    <PlayerTable {handleNavigation} {players}/>
</div>



<Button  on:click={() => (popoverOpen = true)}>Select Player</Button>

<PlayerCommandDialog
	bind:open={popoverOpen}
	bind:searchTerm
	bind:players
	{handleInput}
	{handleNavigation}
	{handleKeydown}
/>






<style>
	:global(body) {
		background-color: #F2F3F4;
	}
	
</style>