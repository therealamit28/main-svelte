<script lang="ts">

    import * as Command from "$lib/components/ui/command";
    import Input from "./ui/input/input.svelte";
import type {Writable} from 'svelte/store';
import type {Player} from "$lib/server/db/type";


export let open :boolean;
export let players: Writable<Player[]>;
export let searchTerm: Writable<string>;
    export let handleInput: (e: Event) => void;
    export let handleNavigation: (event: Event, nameId: number, playerName: string) => void;
	 export let handleKeydown: (event: KeyboardEvent, nameId: number, playerName: string) => void;
</script>


<Command.Dialog bind:open>
	<Input
		type="search"
		class="input search-bar mb-5"
		placeholder="Type a command or search..."
		bind:value={$searchTerm}
		on:keyup={handleInput}
	/>



<Command.List role="listbox">
	<Command.Empty>No results found.</Command.Empty>
	{#each $players as { playerName, nameId }}
		{#if playerName}
			<Command.Item role="option" value={playerName}>
				<span>
					<a
						href={`/player/${nameId}/${playerName.replace(/ /g, '-').toLowerCase()}`}
						tabindex="0"
						class="text-sm font-medium text-blue-600 hover:underline"
						on:click={(event) => handleNavigation(event, nameId, playerName)}
						on:keydown={(event) => handleKeydown(event, nameId, playerName)}
					>
						{playerName}
					</a>
				</span>
			</Command.Item>
		{/if}
	{/each}
</Command.List>























</Command.Dialog>