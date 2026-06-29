<script>
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import { store, config } from "$lib";
  const title = config.appname;
  let { data, form } = $props();
</script>

<div class="listsLandingPage">
  
  <div class="header">
    <!-- <div class="h2">{title}</div> -->
    <div class="placeholder">no list selected..</div>

    <div class="newListForm">
      <form
        method="POST"
        action="?/createList"
        use:enhance={() => {
          return async ({ result, update }) => {
            if (result.type === "success") {
              const id = result.data.newlist.id;
              store.selectedList = result.data.newlist;
              await goto(`/${id}`);
            }
            update();
          };
      }}>

        <input type="text" id="newListName" name="name" placeholder="new list name.." required 
          autocomplete="off"/>
        <button type="submit">add list</button>
      </form>

      {#if form?.message}
        <div class="error">{form.message}</div>
      {/if}
    </div>
  </div>

</div>

<style>
  .listsLandingPage {
    --vertical-align: top;
    display: grid;
    height: 100%;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem 0.25rem;
    flex-wrap: wrap;

    .newListForm {
      form {
        display: contents;
      }
      input {
        width: 10rem;
        min-width: 4rem;
      }
      .error {
        color: tomato;
        margin-block: 1rem;
        font-size: 0.875em;
        text-align: right;
        font-style: italic;
      }
    }
  }

  /* .placeholder {
    margin: 2rem 0;
  } */
</style>
