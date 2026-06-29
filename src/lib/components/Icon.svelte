<!-- #region Icon - January 2026 -->
<script>
  // import { lucidicons } from './lucidicons';
  import { icons } from './icons';
  let { name="add", ...props} = $props();

  const icon = $derived(findObjectByTag(icons, name) || icons[0]);

  function findObjectByTag(array, searchString) {
    return array.find(el => el.tags.includes(searchString));
  }
</script>

<svg xmlns="http://www.w3.org/2000/svg" 
  viewBox={icon.viewbox} class="svg_icon" 
  class:stroked={icon.stroke===true}
  style="--size: {icon.size}" {...props}
  style:stroke-linecap={icon.stroke===true ? "round" : "butt"}
  style:stroke-linejoin={icon.stroke===true ? "round" : "mitre"}>
   {@html icon.vectors}
</svg>

<style >
  svg { 
    --size: 1.5em;
    height: var(--size); 
    width: var(--size); 
    font-size: 1em;
    line-height: 0;
    color: currentColor;
    fill: currentColor;
    overflow: hidden;
    vertical-align: middle;
  }
  .stroked {
    fill: none;
    stroke: currentColor;
    stroke-linecap: "round";
    stroke-linejoin: "round";
    stroke-width: 2px;
  }
</style>

<!-- 
  <button class="edit"
    onclick={() => { /***/}}>
    <Icon name="edit" />
  </button>  
-->
<!-- #endregion Icon -->