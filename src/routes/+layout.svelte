<script lang="ts">
	import '../app.css';
	import * as Menubar from '$lib/components/ui/menubar';
</script>

<Menubar.Root class="mb-10">
	<Menubar.Menu>
		
		<a href="/">
			<Menubar.Trigger>HOME</Menubar.Trigger>
		</a>
		<a href="/multi">
			<Menubar.Trigger>MULTI</Menubar.Trigger>
		</a>
	
		<a href="/ownk">
			<Menubar.Trigger>OWNK</Menubar.Trigger>
		</a>

		<a href="/multisql">
			<Menubar.Trigger>MULTISELECT</Menubar.Trigger>
		</a>
	</Menubar.Menu>
</Menubar.Root>

<slot></slot>
