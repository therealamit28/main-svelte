<script>
	import MultiSelect from 'svelte-multiselect';
	import LanguageSlot from './LanguageSlot.svelte';
	import { languages } from './options';

	let maxOptions=0;
</script>

<label for="colors">
	<strong>What programming languages do you know?</strong>
</label>
<MultiSelect
	id="languages"
	options={languages}
	placeholder="Select Languages"
	{maxOptions}
	allowEmpty={true}
	selected={['JavaScript']}
	maxSelect={5}
	noMatchingOptionsMsg="No matching options fff"
>
	<LanguageSlot let:option {option} slot="selected" />
	<LanguageSlot let:option {option} slot="option" />
</MultiSelect>


<label>
	maxOptions <input type="range" min="0" max={10} bind:value={maxOptions} />
	{maxOptions} <small>(0 means no limit)</small>
</label>



<style>
  
      label {
          margin: 2em 0 1ex;
      }
  </style>