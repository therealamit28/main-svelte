<script lang="ts">

    import Input from "./ui/input/input.svelte";
import type {Writable} from 'svelte/store';
export let searchTerm: Writable<string>;
    export let handleInput: (e: Event) => void;
</script>



<Input
type="search"
class="input search-bar mb-5"
placeholder="Type to search..."
bind:value={$searchTerm}
on:keyup={handleInput}


/>