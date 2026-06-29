export const config = {
  appname: "Tasks",
  cookieNames: {    
    theme: "test_auth_theme",
    session: "test_auth_session",
  },
  maxAge: 60 * 60 * 24 * 7, // 7 days
  // maxAge: 60 * 15, // 15 min
  
  routes: [
    { name: "Home", path: "/" },
    // { name: "Account", path: "/account" },
    { name: "About", path: "/about" },
  ],
}

export * from "./store.svelte.js";
export * from "./utils/functions";
export { focus, swipe, clickOutside } from "./utils/attachments";