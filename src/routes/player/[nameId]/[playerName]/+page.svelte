
<script lang="ts">

   import type {PageData} from './$types';

	import PlayerCard from '$lib/components/PlayerCard.svelte';
export let data: PageData;

let player = data.player;


</script>

<main>

    <PlayerCard {player} />

</main>

