(() => {
  const param = new URLSearchParams(location.search).get("scoutTheme");
  document.documentElement.dataset.theme = param || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
})();
