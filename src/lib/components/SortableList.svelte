<!-- src\lib\components\SortableList.svelte -->
<script>
  import { onMount, tick } from 'svelte';
  import Sortable from 'sortablejs';

  let { 
    items, 
    children, 
    onOrderChange, 
    handle = ".drag-handle" 
  } = $props();

  let container = $state();

  onMount(() => {
    const sortable = Sortable.create(container, {
      handle: ".drag-handle",
      animation: 150,
      dataIdAttr: 'data-id',
      setData: (dataTransfer) => {
        dataTransfer.setDragImage(new Image(), 0, 0);
      },
      onEnd: async () => {
        const order = sortable.toArray();
        
        // 1. Map the new positions based on the DOM order SortableJS just created
        // const updatedItems = items.map(item => {
        //   return { ...item, position: order.indexOf(item.id.toString()) };
        // });

        const newlySortedItems = order.map(id => 
            items.find(item => item.id.toString() === id)
        ).filter(Boolean);

        // 2. Update local state (triggers the $bindable)
        // items = updatedItems;
        // items = newlySortedItems;
    
        // 3. Inform parent to persist to DB
        // if (onOrderChange) onOrderChange(items);
        if (onOrderChange) onOrderChange(newlySortedItems);
      }
    });

    return () => sortable.destroy();
  });
</script>

<div bind:this={container} class="sortable-container">
  {@render children()}
</div>


<style>
  :global {
    .drag-handle { 
      cursor: grab !important;
      &:active { cursor: grabbing !important; }
    }
  }
</style>