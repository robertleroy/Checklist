<!-- Popover.svelte -->
<script>
  let { id, target, anchor, unset, title } = $props();
</script>

<button class="anchor" {title}
  class:unset={unset}
	popovertarget={id}
	style:anchor-name="--{id}">		
	{#if anchor}
		{@render anchor()}
	{:else}
		<span>no anchor</span>
	{/if}
</button>

<div class="target" 
	{id} popover="auto"
	style:position-anchor="--{id}">
	{#if target}
		{@render target()}
	{:else}
	<span>no target..</span>
{/if}
</div>

<style>
	.target { border: none; }
  [popover] {
    margin-block: 0.5rem;
    color: inherit; 
    background-color: var(--bg, inherit); 
		min-width: max-content;
		position-area: block-end span-inline-end;
		position-try-fallbacks: 
		  flip-inline,            /* try horizontal flip first */
		  flip-block,             /* then vertical */
		  flip-inline flip-block; /* then both */
	}
</style>

<!-- 
<script>
	import Popover from "./Popover.svelte";
</script>

<Popover id="test">
	{#snippet anchor()}
		<span>anchor</span>
	{/snippet}
	
	{#snippet target()}			
		<div class="panel">
			{#each {length:3} as item, i}
				<button 
					popovertarget="test" 
					popovertargetaction="hide">
					test.{i + 1}</button>
			{/each}
		</div>
	{/snippet}
</Popover>
-->