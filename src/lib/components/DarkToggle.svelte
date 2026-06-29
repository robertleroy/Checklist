<!-- #region DarkToggle - January 2026 -->
<script>
  let { darkmode, ...props } = $props();
</script>


<svg xmlns="http://www.w3.org/2000/svg" version="1.1"
  class="sun-and-moon" viewBox="0 0 24 24" class:toggled={darkmode} {...props}>
  <circle class="sun" cx="12" cy="12" r="6" 
    mask="url(#moon-mask)"/>
  <path class="sun-beams" d="M4.223 3.223a1 1 0 0 0-.707.293 1 1 0 0 0 0 1.414L4.93 6.344a1 1 0 0 0 1.414 0 1 1 0 0 0 0-1.414L4.93 3.516a1 1 0 0 0-.707-.293Zm1.413 2.413L4.222 4.222m13.434 13.434a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414 0 1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0zM1 11a1 1 0 0 0-1 1 1 1 0 0 0 1 1h2a1 1 0 0 0 1-1 1 1 0 0 0-1-1Zm2 1H1m20-1a1 1 0 0 0-1 1 1 1 0 0 0 1 1h2a1 1 0 0 0 1-1 1 1 0 0 0-1-1zm2 1h-2M5.637 17.363a1 1 0 0 0-.707.293L3.516 19.07a1 1 0 0 0 0 1.414 1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414 1 1 0 0 0-.707-.293zm-.001 1.001-1.414 1.414M19.07 3.516 17.656 4.93a1 1 0 0 0 0 1.414 1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414 1 1 0 0 0-1.414 0zm.708.706-1.414 1.414M12 20a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1zm0 1v2m0-23a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 1 1 0 0 0 1-1V1a1 1 0 0 0-1-1Zm0 1v2"/>
  <mask class="moon" id="moon-mask">
    <rect x="0" y="0" width="100%" height="100%" fill="white" />
    <circle cx="24" cy="9" r="4" fill="black" />
  </mask>
</svg>

<style>
	svg {
		height: 1em; width: 1em;
		font-size: inherit;
		fill: currentColor;
	}
	circle, path {
		transform-origin: center;
		transition: scale 300ms, translate 300ms, 
			rotate 500ms, color 150ms;
	}
	.toggled {
		& circle.sun { scale: 1.5; }
		& .moon circle { translate: -7px; }
		& .sun-beams { scale: 0; rotate: -90deg; }
	}
</style>

<!-- 
<button class="unset" 
  onclick={() => {
    toggleDarkmode = !toggleDarkmode
}}>
  <DarkToggle darkmode={toggleDarkmode} />
</button>
-->
<!-- #endregion DarkToggle -->
