<!-- #region Password - January 2026 
          WIDTH PROP EXPOSED          
-->
<script>
  let { width="",  value = $bindable(), ...props } = $props();
  let showPassword = $state(false);
</script>

<div class="passwordWrapper" style:width>
  <input type={showPassword ? "text" : "password"} 
    autocomplete="off" {...props}
    bind:value>

  <button class="passwordToggle" type="button"
    onclick={() => showPassword = !showPassword}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="feather">
      {#if showPassword}
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
      {:else}
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
      {/if}
    </svg>
  </button>
</div>

<style>
  .passwordWrapper {
    font-family: inherit;
    line-height: 1.5;
    height: var(--button-height, 1.5);
    width: 11.1875rem;
    max-width: 100%;
    padding: 0 0 0 1ch ;
    color: var(--fg-button, inherit);
    background-color: var(--bg-button, inherit);
    border: 1px solid var(--border-color, #ccc);
    border-radius: var(--border-radius, 0.25em);
    overflow: hidden;
    vertical-align: var(--vertical-align);
    display: inline flex;
    gap: 0 1ch;

    input { 
      flex: 1; 
      margin-left: -1px;
      min-width: 100px;
    }
    * {
      background: transpaerent;
      border: none;
      padding-inline: unset;
      &:focus, &:active {
        outline: none;
      }
    }
    &:focus-within {
      outline: 2px solid var(--outline-color, #ccc);
    }
  }

  button.passwordToggle {
    display: inline grid;
    place-items: center;
    height: 1.5rem;
    width: 1.5rem;    
    
    svg {
      fill: none; 
      stroke: light-dark(hsl(0 0 40), hsl(0 0 60));
      stroke-width: 2; 
      stroke-linecap: round; 
      stroke-linejoin: round;
      height: 1em;
      width: 1em;
    }
  }
</style>

<!-- 
import Password from "$lib/components/Password.svelte";

<Password required
  name="password" 
  placeholder="password.."
  autocomplete="off"
  width="fit-content"/>
-->
<!-- #endregion Password -->