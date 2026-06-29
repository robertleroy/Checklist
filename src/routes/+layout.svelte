<script>
  import { onMount, tick } from "svelte";
  import { dev } from "$app/environment";
  import { config, titlecase, store, swipe } from "$lib";
  import favicon from "$lib/assets/favicon.svg";
  import dev_icon from "$lib/assets/dev.svg";
  import Icon from "$lib/components/Icon.svelte";
  import MenuToggle from "$lib/components/MenuToggle.svelte";
  import Popover from "$lib/components/Popover.svelte";
  import ListSidebar from "$lib/components/ListSidebar.svelte";
  import "./app.css";

  let { data, children } = $props();
  let appWidth = $state(0);
  let showSidebar = $state(true);
  let mounted = $state(false);
	let timer = $state(null);

  $effect(async () => {
    if (appWidth > 600) {
      showSidebar = true;
    } else {      
      /*  The goal is to direct the view on small screens such that your landing page shows lists when you land, or the page when you have no lists (auth page).
      Is it accurate? time will tell...
      development in progress.. */
      if (!mounted && data?.user) {
        mounted = true;
        await tick()
        showSidebar = true;
      } else {
        showSidebar = false;
      }
    }
    if (store.notice) {
      clearNotice()
    }
    if (store.errorMsg) {
      clearErrorMsg()
    }
  });

  function clearNotice() {
    timer = setTimeout(() => store.notice = null, 3000);
    console.log("clearNotice()");
  }
  function clearErrorMsg() {
    timer = setTimeout(() => store.errorMsg = null, 5000);
    console.log("clearErrorMsg");
  }

  onMount(() => {
   
    const dataset_theme = document.documentElement.dataset.theme;

    if (dataset_theme) {
      store.darkmode = dataset_theme === "dark";
      return;
    }
    const browserPrefDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    store.darkmode = browserPrefDark;
    set_theme(store.darkmode);
  });

  function set_theme(isDark = false) {
    const exp = 60 * 60 * 24 * 365; /*** 1yr ***/
    const val = isDark ? "dark" : "light";
    document.cookie = `${config.cookieNames.theme}=${val}; max-age=${exp}; path=/; secure; SameSite=lax`;
    document.documentElement.dataset.theme = val;
  }
</script>

<svelte:head>
  <link rel="icon" href={dev ? favicon : favicon} />
</svelte:head>

<div class="app" bind:clientWidth={appWidth}>
  <header>
    <div class="inner">
      {#if data?.user}
        <div class="titlebar">
          <div class="brand">
            
            <a href="/"
              onclick={() => {
                if (appWidth < 600) {
                  showSidebar = false;
                }
            }}>
              <!-- <span>{@render Checklist()}</span> -->
              <span class="title">
                {config.appname}
              </span>
            </a>
          </div>
        </div>

        <div class="featurebar">
          <div class="error">{store.errorMsg}</div>
          {#if dev}
            <span>{appWidth}</span>
          {/if}
        </div>

        <div class="toolbar">
          {#if appWidth < 600}
            <button class="toggleSidebar unset"
              title="toggle sidebar"
              onclick={() => {
                showSidebar = !showSidebar;
            }}>
              <MenuToggle toggled={showSidebar} />
            </button>
          {:else}
            <Popover id="headerSettings"
              title="settings" unset>
              {#snippet anchor()}
                <Icon name="settings" style="font-size:0.75rem" />
              {/snippet}

              {#snippet target()}
                <div class="settings_target">
                  <a href="/account"
                    class="unset"
                    onclick={() => {
                      if (appWidth < 600) {
                        showSidebar = false;
                      }
                      const settings_target = document.getElementById("headerSettings");
                      settings_target.hidePopover();
                  }}>account</a>

                  <button
                    class="unset"
                    onclick={() => {
                      store.darkmode = !store.darkmode;
                      set_theme(store.darkmode);
                  }}>
                    {store.darkmode ? "dark" : "light"} theme
                  </button>

                  <hr />

                  <form method="POST" action="/?/logout">
                    <button class="unset"
                      popovertarget="footerSettings"
                      popovertargetaction="hide"
                      onclick={() => {
                        if (appWidth < 600) {
                          showSidebar = false;
                        }
                    }}>
                      log out
                    </button>
                  </form>
                </div>
              {/snippet}
            </Popover>
          {/if}
        </div>      
      {/if}
    </div>
  </header>

  <main
    {@attach (node) =>
      swipe(node, (data) => {
        const { pointerType, direction } = data;
        if (appWidth < 600) {
          if (direction === "right" && showSidebar === false) {
            showSidebar = true;
          } else if (direction === "left" && showSidebar === true) {
            showSidebar = false;
          }
        }
    })}>

    <aside class:hideSidebar={!showSidebar}>
      <div class="sidebar">
        {#if data?.user}
          <nav>
            {#if data?.lists.length}
              <ListSidebar lists={data.lists} 
                onnav={(list) => {
                  if (appWidth < 600) {
                    showSidebar=false;
                  }
              }}/> 
            {:else}
              <div class="placeholder">no list created..</div>
            {/if}
            
            <!-- {#each config.routes as route}
              <div class="route">
                <a href={route.path}
                  onclick={() => {
                    if (appWidth < 600) {
                      showSidebar = false;
                    }
                }}>{route.name}</a>
              </div>
            {/each} -->

            <!-- {#each {length: 50} as item, i}
              <div class="route">Item {i}</div>
            {/each} -->
          </nav>

          <a href="/#newListName" class="addList unset"
            title="create list"
            onclick={async () => {
              // await tick();
              // console.log("addlist");
              if (showSidebar && appWidth < 600) {
                showSidebar = false;
              }
            }
          }>
            <Icon name="add" />
          </a>
        {/if}
      </div>
    </aside>

    <section class="router">
      <div class="inner">
        <div class="page">
          {@render children()}
          <!-- <{#each {length: 10} as item, i}
          p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis et beatae perspiciatis, eius voluptatem saepe quod! Sapiente magnam repellat assumenda quis? Eum recusandae, repellat fugiat incidunt minus delectus officiis? Provident.</p>
          {/each} -->
        </div>
      </div>
    </section>
  </main>

  <footer>
    <div class="inner">
      <div class="featurebar">
        {#if appWidth < 600}
          <Popover id="footerSettings" 
            title="settings" unset>
            {#snippet anchor()}
              <Icon name="settings" style="font-size:0.75em" />
            {/snippet}

            {#snippet target()}
              <div class="settings_target">
                <a href="/account"
                  class="unset"
                  onclick={() => {
                    if (appWidth < 600) {
                      showSidebar = false;
                    }
                    const settings_target = document.getElementById("footerSettings");
                    settings_target.hidePopover();
                }}>account</a>

                <button class="unset"
                  onclick={() => {
                    store.darkmode = !store.darkmode;
                    set_theme(store.darkmode);
                }}>
                  {store.darkmode ? "dark" : "light"} theme
                </button>

                <hr />

                <form method="POST" action="/?/logout">
                  <button
                    class="unset"
                    popovertarget="footerSettings"
                    popovertargetaction="hide"
                    onclick={() => {
                      if (appWidth < 600) {
                        showSidebar = false;
                      }
                  }}>
                    log out
                  </button>
                </form>
              </div>
            {/snippet}
          </Popover>

          <span>&emsp;</span>
        {/if}
        
        <span>{store?.notice}</span>
      </div>

      <div class="toolbar"></div>
    </div>
  </footer>
</div>

{#snippet Checklist()}
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="1.5em" width="1.5em" fill="currentColor">
  <path d="M3 16v-2h8v2zm0 -4v-2h12v2zM3 8V6h12v2zm13.35 11L12.8 15.45l1.4 -1.4l2.15 2.1L20.6 11.9l1.4 1.45z"/>
</svg>
{/snippet}


<style>
</style>
