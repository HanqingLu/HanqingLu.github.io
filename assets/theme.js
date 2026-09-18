// The first visit is always light. Remember only an explicit reader preference.
(() => {
  let theme = "light";
  try {
    if (localStorage.getItem("hanqing-site-theme") === "dark") theme = "dark";
  } catch {
    // Reading the site still works when browser storage is unavailable.
  }
  document.documentElement.dataset.theme = theme;
})();
