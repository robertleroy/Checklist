<script>
  import { Icon } from "$lib/components";
  import { clickOutside } from "$lib";
  let { txt1=null, txt2="🗙", warning=false, onconfirm, ...attr } = $props();
  let pending = $state(false);
</script>   
  
<button class="unset" {...attr}
	class:warning={warning && pending} 
	onclick={() => {
		if (pending) onconfirm();
		pending = !pending;
	}}
	{@attach (node) => clickOutside(node, () => pending = false )}>
  <!-- {pending ? txt2 : txt1} -->
   {#if pending}
   <div class="txt2">{txt2}</div>
   {:else}
   <Icon name="cancel-md" />
   {/if}
</button>

<style>
	.warning {
		color: hsl(from tomato h s l / 0.8);
		text-shadow: 0 0 12px hsl(from tomato h s l / 0.3);
    box-shadow: none;
	}
  .txt2 {
    font-size: 0.9375em;
    font-style: italic;
  }
</style>

<!-- 
import { ConfirmBtn } from "$lib/components";

<ConfirmBtn 
  txt1="delete" 
  txt2="confirm delete" 
  warning=true
  onconfirm={(msg) => {
    console.log("onconfirm", msg);
}}/>
-->