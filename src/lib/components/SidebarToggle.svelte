<!-- #region SidebarToggle - January 2026 -->
<script>
  let { side = "left", toggled = false, ...props } = $props();
  let left = $derived(side === "left");
</script>


<svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24">
  <rect class="stroked" />
  <rect class="filled" class:left class:right={!left} class:toggled />
</svg>


<style>
  svg {
    color: currentColor;
    width: 1.5em;
    height: 1.5em;
    font-size: 1em;

    .stroked {
      fill: none;
      stroke: currentColor;
      stroke-width: 2px;
      stroke-linecap: round;
      stroke-linejoin: round;
      width:18px;
      height:18px;
      x:3px;
      y:3px;
      rx:2px;
    }

    .filled {
      fill: currentColor;
      transition: 300ms;
      height: 12px;
      width: 5px;
      y: 6px;
      rx: 0.5px;

      &.toggled {
        width: 3px;
      }
    }
    .left {
      x: 6px;
    }
    .right {
      x: 13px;

      &.toggled {
        x: 14px;
      }
    }
  }
</style>

<!-- 
<button class="unset" 
  title="right toggle"
  onclick={() => {
    toggled.right = !toggled.right
  }} >	
  <SidebarToggle side="right" toggled={toggled.right} />	
</button>	
-->
<!-- #endregion SidebarToggle -->