
export function focus(node) {
  node.focus();
  return {
    update() {},
    destroy() {}
  };
}
/* 
import { focus } from "$lib";
<input type="text" {@attach focus}>
*/


export function swipe(node, handleSwipe) {
  let startX, startY, timeStart;
  const SWIPE_DIST = 30;
  const MIN_TIME = 10;
  const MAX_TIME = 300;
	node.style.touchAction = 'none';

  const handleStart = (e) => {
    startX = e.clientX;
    startY = e.clientY;
		timeStart = Date.now();
  };

  const handleEnd = (e) => {
		let timeDiff = Date.now() - timeStart;
		if (timeDiff < MIN_TIME || timeDiff > MAX_TIME) return;
		
    const diffX = e.clientX - startX;
    const diffY = e.clientY - startY;
    const absX = Math.abs(diffX);
    const absY = Math.abs(diffY);
    if (Math.max(absX, absY) < SWIPE_DIST) return;

    const direction = absX > absY 
      ? (diffX > 0 ? 'right' : 'left') 
      : (diffY > 0 ? 'down' : 'up');

      handleSwipe({ direction, pointerType: e.pointerType });
  };

  node.addEventListener('pointerdown', handleStart);
  node.addEventListener('pointerup', handleEnd);

  return () => {
    node.removeEventListener('pointerdown', handleStart);
    node.removeEventListener('pointerup', handleEnd);
  };
}

/*
<script>
  import { swipe } from './attachments.js';
</script>

<div class=""
  {@attach (node) => swipe(node, data => {
		("data",data);
	})} >
  swipe data in console <br />
</div>
*/


/* clickOutside ========================= */
export function clickOutside(node, outclick) {
	const handleClick = (event) => {
		if (!node.contains(event.target)) {
			outclick();
		}
	};
	document.addEventListener('click', handleClick, true);
  return () => {
		document.removeEventListener('click', handleClick, true);
  };
}
/* 
<script>
  import { clickOutside } from './attachments.js';
</script>

<div class="panel" 
	{@attach (node) => clickOutside(node, () => 
		console.log("outclicked")
)}>
	panel
</div>
*/
