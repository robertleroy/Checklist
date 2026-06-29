<!-- #region Treenode - January 2026 -->
<script>
  import { page } from '$app/state';
	import { slide } from 'svelte/transition';
	import Treenode from './Treenode.svelte';
	let { item, expanded = false, ...props } = $props();
	let selectedNode = $state();

  function activePath() {
    return item?.path === page.url.pathname ||
      page.url.hash && item?.path.endsWith(page.url.hash);
  }
</script>


<a href={item.path}
  class="treenode unset" 
  class:expanded {...props}
  class:active={activePath()}
  class:folder={item.children?.length}>
  {item.name}
</a>

{#if item.children?.length && expanded}
<div class="children" transition:slide>
  {#each item.children as child}
    <Treenode item={child} 
		expanded = {child?.name == selectedNode?.name}
		onclick={() => { 
      child?.name == selectedNode?.name ?
      selectedNode = null :
      selectedNode = child;
		}}/>
  {/each}
</div>
{/if}


<style>
  .treenode {
    --active-color: hsl(150 50 50);
    display: block;
		font-size: inherit;
		line-height: inherit;
		background: unset;
    height: unset;
		padding: unset;
		border: unset;
    box-shadow: unset;
		cursor: pointer;
    width: fit-content;
  }
	.children { margin-left: 2ch; }

  .folder { 
    position: relative;
    &::after { 
      content: "\2025"; 
      position: absolute;
      top: 0.125em;
      font-size: 0.75em;
    } 
   }
  .active, .folder.expanded { 
    text-decoration: solid underline; 
    color: var(--active-color);
  }
</style>
<!-- 
{#each item.children as child}
  <Treenode item={child} 
    expanded = {child?.name == selectedNode?.name}
    onclick={() => { 
      child?.name == selectedNode?.name ?
      selectedNode = null :
      selectedNode = child;
  }}/>
{/each}
-->

<!-- #endregion Treenode -->
