
<script>
  import { goto } from "$app/navigation";
  import { enhance } from "$app/forms";
  import { slide } from "svelte/transition";
  import { store } from "$lib";

  import { clickOutside } from "$lib";
  import Password from "$lib/components/Password.svelte";
  import Icon from "$lib/components/Icon.svelte";

  const title = "Account";
  let { form, data } = $props();
  let pendingConfirmation = $state(false);
  let currentPasswordVerified = $state(false);
  let editMode = $state("password username");
  let edit_panel = $state();

  let val1 = $state();
  let val2 = $state();

  $effect(() => {
    currentPasswordVerified = form?.verified === true ? true : false;
  });
</script>

<h2 class="">
  {title}
</h2>

<br />

<section class="personal_data">
  <div class="grid">
    <div class="key">Username</div>
    <div class="val">{data.user.username}</div>
    <button title="edit username" class="anchor_edit" popovertarget="target_panel" onclick={() => (editMode = "username")}>
      <Icon name="edit" />
    </button>




    <div class="key">Password</div>
    <div class="val">********</div>
    <button title="edit password" class="anchor_edit" popovertarget="target_panel" onclick={() => (editMode = "password")}>
      <Icon name="edit" />
    </button>
  </div>

  <br /><br />

  <div class="row">
    <form
      method="post"
      action="/?/logout"
      use:enhance={() => {
        return async ({ result, update }) => {
          const username = data.user?.username;
          if (result.type === "success" && result.data?.loggedout) {
            store.notice = `logged out: ${username}`;
          }
          await update({ reset: true });
        };
      }}
    >
      <button class="">Logout</button>
    </form>

    <form
      method="post"
      action="?/deleteAccount"
      use:enhance={() => {      
        return async ({ result, update }) => {
          if (result.type === "success" && result.data?.success) {
            store.notice = `deleted: ${result.data.username}`;
            await goto("/");
          }
        };
      }}
    >
      <input type="hidden" name="userId" value={data.user.id} />
      <input type="hidden" name="username" value={data.user.username} />
      {#if !pendingConfirmation}
        <button type="button" onclick={() => (pendingConfirmation = true)}> Delete account </button>
      {:else}
        <button style="color: tomato; 
          box-shadow: 0 0 16px hsl(from tomato h s l / 0.4);"
          {@attach (node) => clickOutside(node, () => {
            if (pendingConfirmation) {
              pendingConfirmation = false;
            }
        })}>
          Confirm Delete
        </button>
      {/if}
    </form>
  </div>
</section>

<section class="panel" id="target_panel" bind:this={edit_panel} popover>
  {#if editMode === "username"}
    <form
      action="?/editName"
      method="POST"
      use:enhance={() => {
        return async ({ result, update }) => {
          if (result.type === "success") {
            edit_panel.hidePopover();
          }
          await update({ reset: true });
        };
      }}
    >
      <h3>Edit Username:</h3>
      <input type="hidden" name="userid" value={data.user.id} />
      <input type="text" name="username" required placeholder="username.." autocomplete="off" />
      <input type="submit" value="update" />
    </form>
  {:else}
    <div class="contents">
      {#if !currentPasswordVerified}
        <div class="contents">
          {@render passwordVerify()}
        </div>
      {:else}
        <div class="contents">
          {@render passwordEdit()}
        </div>
      {/if}
    </div>
  {/if}

  {#if form?.message}
    <div class="error" transition:slide={{ duration: 200 }}>
      {form?.message ?? ""}
      <br />
      {form?.detail ?? ""}
    </div>
  {/if}
</section>

{#snippet passwordVerify()}
  <form action="?/verifyPassword" method="POST" use:enhance>
    <h3>Current Password:</h3>
    <input type="hidden" name="userId" value={data.user.id} />
    <Password name="currentPassword" autocomplete="off" required placeholder="current password.." />

    <input type="submit" value="submit" />
  </form>
{/snippet}

{#snippet passwordEdit()}
  <form
    action="?/editPassword"
    method="POST"
    use:enhance={() => {
      return async ({ result, update }) => {
        if (result.type === "success") {
          edit_panel.hidePopover();
        }
        await update({ reset: true });
      };
    }}
  >
    <h3>Edit Password:</h3>
    <input type="hidden" name="userId" value={data.user.id} />
    <div class="gap">
      <Password bind:value={val1} name="newPassword" autocomplete="off" required placeholder="new password.." />
      <Password bind:value={val2} name="confirmPassword" autocomplete="off" required placeholder="confirm password.." />
    </div>

    <input type="submit" value="update" disabled={!val1 || !val2 || val1 !== val2} />
  </form>
{/snippet}


<style>
  .personal_data {
    width: clamp(20rem, 100%, 24rem);

    .grid {
      display: grid;
      grid-template-columns: max-content 1fr max-content;
      gap: 0.25rem 1rem;
      line-height: 1.6rem;

      .key {
        font-size: smaller;
        font-variant: small-caps;
        &::after {
          content: ":";
        }
      }
      .val {
        font-size: 1.125rem;
      }
    }
    .row {
      display: flex;
      justify-content: space-between;
      gap: 0 1ch;
    }
  }
  #target_panel {
    position-anchor: --anchor_edit;
    &::backdrop {
      background: hsla(0 0 0 / 0.5);
    }
  }
  .anchor_edit {
    anchor-name: --anchor_edit;
    display: grid;
    place-items: center;
    height: 1.5rem;
    width: 1.5rem;
    font-size: inherit;
    padding: 0;
  }

  .panel {
    width: clamp(16rem, 100%, 19rem);
    background: var(--bg);
    padding: 1rem 2rem 2rem;
    border-radius: 0.5rem;
    z-index: 100;
    border: 1px solid gainsboro;
    box-shadow: 2px 2px 0 light-dark(gainsboro, hsl(0 0 30));
    h3 {
      margin-bottom: 1rem;
    }
    form {
      display: grid;
    }
    .gap {
      display: grid;
      gap: 0.25rem;
    }
    [type="submit"] {
      justify-self: end;
      margin-top: 0.5rem;
    }
    .error {
      font-size: small;
      color: tomato;
      margin-top: 0.25rem;
      line-height: 1.4;
    }
  }
</style>




<!-- <script>
  const title = "Account";
  let { form, data } = $props();
</script>

<h2 class="">
  {title}
</h2>

<br>

<pre>{JSON.stringify(data?.user, 0, 2)}
{JSON.stringify(data?.session, 0, 2)}
</pre>

<br>

<form method="POST"
  action="/?/logout">
  <button class=""> 
    log out 
  </button>
</form>


<style>

</style> -->
