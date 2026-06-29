<script>
  let { value=$bindable(), data, ...rest } = $props();
</script>

<div class="my-textbox">
  <input type="text" {...rest}
    bind:value>

  <button class="unset" 
    class:searching={value} 
    onclick={() => value = ""}>
    <span>🞫</span>
  </button>
</div>

<style>
  .my-textbox {
    display: inline flex;
    font-family: inherit;
    height: 1.5em;
    max-width: 100%;
    color: var(--fg-button, inherit);
    background-color: var(--bg-button, inherit);
    border: 1px solid var(--border-color, #ccc);
    border-radius: var(--border-radius, 0.25em);
    overflow: hidden;
    align-content: center;

    input {
			--outline-color: transparent;
      flex: 1;
      height: 100%;
      border-radius: 0;
      outline: none;
      border-radius: 0;
    }

    input, button {
      min-width: 1.5em;
      background: none;
      border: none;
    }
    button {
      text-align: center;
      opacity: 0.3;
      color: currentColor;
    }
    &:focus-within {
      border-color: var(--outline-color);
      outline: 1px solid var(--outline-color);
    }
    button.searching {
      opacity: 0.8;
    }
  }
</style>