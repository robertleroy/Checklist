<!-- #region MenuToggle - January 2026 -->
<script>
  let { toggled=false, ...props } = $props();
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
  {...props}>   
  <path class:toggled d="M3 8L21 8L21 10L3 10ZM3 16L3 14L21 14L21 16Z"/>
</svg>

<style>
	svg {
		font-size: 1em;		
		height: 1.5em;
		width: 1.5em;
		fill: currentColor;
		path { 
			transform-origin: center;
			transition: 300ms; 
		}	
		.toggled {
			d: path("M8 6.59L17.41 16L16 17.41L6.59 8ZM8 17.41L6.59 16L16 6.59L17.41 8Z"); 
		}
	}
</style>
<!-- 
  import MenuToggle from "$lib/components/MenuToggle.svelte";
  let showmenu = $state(false);
  
  <button class="unset" title="menu"
    onclick={() => {
      showmenu = !showmenu;
  }} >	
  <MenuToggle toggled={showmenu} />	
</button>	
-->
<!-- #endregion MenuToggle -->