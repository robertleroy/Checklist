<!-- /auth/+page.svelte -->
<script>
  import { store, config } from "$lib";
  import { goto } from "$app/navigation";
  import { enhance } from "$app/forms";
  import { Password } from "$lib/components";

  let { form, data } = $props();
  let showPassword = $state(false);
  let registering = $state(false);
</script>

<div class="card">
  <div class="heading">
    <div class="h1">{config.appname}:</div>
    <div class="subtitle">{registering ? "Registration" : "Login"}</div>
  </div>

  <form
    action={registering ? "?/register" : "?/login"}
    method="post"
    use:enhance>
    <!-- ={() => {
      return async ({ result, update }) => {
        if (result.type === "success") {
          if (result.data?.loggedin) {
            store.notice = `logged in: ${result.data?.username}`;
            await goto("/");
          }
          if (result.data?.registered) {
            store.notice = `registered: ${result.data?.username}`;
          }
        }
        await update({ reset: true });
      };
    }} -->
    <input type="text" name="username" placeholder="username.." autocomplete="off" />

    <Password name="password" placeholder="password.." />

    <div class="flex_sb">
      <button type="submit">{registering ? "Register" : "Login"}</button>

      <div class="toggle">
        <button class="link" type="button" onclick={() => (registering = !registering)}>need to {registering ? "login " : "register"}?</button>
      </div>
    </div>

    <div class="error">
      {form?.message ?? ""}
      <br />
      {form?.detail ?? ""}
    </div>
  </form>
</div>


<style>
  .heading {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 0 1rem;
    margin: 0 0 1.5rem;
    
    .h1 {
      font-weight: 600;
    }
    .subtitle {
      /* color: var(--fg-muted); */
      font-size: 0.875rem;
      font-style: normal;
      text-align: right;
    }
  }

  .card {
    max-width: 25ch;
    background-color: var(--bg);
    border-radius: 0.5rem;
    box-shadow: var(--box-shadow);
    cursor: default;
  }

  input {
    min-width: 4.5rem;
  }

  [type="submit"] {
    margin: 1rem 0 0;
  }

  [type="text"] {
    width: 100%;
    margin-bottom: 0.25rem;
  }

  .flex_sb {
    display: flex;
    justify-content: space-between;
    align-items: end;
    gap: 0 1ch;
    .toggle {
      font-size: smaller;
    }
  }

  .error {
    font-size: small;
    color: tomato;
    margin-top: 1.5rem;
    line-height: 1.4;
  }
</style>
