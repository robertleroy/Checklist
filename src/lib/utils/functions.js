
// #region FUNCTIONS - January 2026 */

/* round */
export function round(num,d = 0) {
  return Math.round(num * 10**d) / 10**d;
} 

/* titlecase */
export function titlecase(text) {
  if (!text) return '';
  return text.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
}

/* sentencecase */
export function sentencecase(text) {
  if (!text) return '';
  return text.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, char => char.toUpperCase());
}

/* capitalizeFirstLetter */
export function capitalizeFirstLetter(text) {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}




// #endregion FUNCTIONS  */





