<!-- #region CopyBar - January 2026 -->
<script>
  let { title="", codeblock=false, ...props } = $props();

  async function copy(e) {
    const el = e.target
                .parentElement
                .nextElementSibling;

    if (!navigator.clipboard)
      return {status: 204, message: "clipboard unavailable"}

    const text = el.innerText || el.value;
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error('Failed to copy!', err)
    }
  }
</script>

<div class="copy_bar" class:codeblock {...props} >
  <div class="title">
    {title}
  </div>
  <button class="unset copyBtn" 
    aria-label="copy" title="copy"
    onclick={(e) => copy(e)}>
    <svg xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24">
      <path d="M14 19H6c-1.1 0-2-.9-2-2V9h2v8h8zm3-4h-7c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h7c1.1 0 2 .9 2 2v7c0 1.1-.9 2-2 2zm0-9h-7v7h7z"/>
    </svg>
  </button>
</div>

<style>
  .copy_bar {
    display: flex;
    justify-content: space-between;
    gap: 0 1ch;
    padding: 0.5rem 0 0 ;
    z-index: 1;

    .title, .copyBtn { color: hsl(0 0 50); }
    .title {  user-select: auto; }
    .copyBtn:hover:not(:active) {
      color: hsl(0 0 70);
      svg { fill: hsl(0 0 70); }
    }
    .title {
      font-family: var(--monospace);
      font-size: 0.75em;
    }
    svg {
      font-size: 0.75em;
      height: 1.5em;
      width: 1.5em;
      fill: currentColor;
      pointer-events: none;
    }
  }

  .codeblock {
    background: hsl(0 0 12);
    border-radius: 0.5rem 0.5rem 0 0;
    padding: 1rem 1rem 0 1.5rem;
    margin: 0.5rem 0 -1.5rem 0;
  }
</style>

<!-- 
import CopyBar from '$lib/components/CopyBar.svelte';
<CopyBar title="demo" />
-->
<!-- #region CopyBar -->
