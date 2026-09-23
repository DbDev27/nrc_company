(async () => {
  const includeElements = document.querySelectorAll("[data-include]");

  await Promise.all(
    [...includeElements].map(async (element) => {
      const file = element.dataset.include;
      const response = await fetch(file);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${file}`);
      }

      element.innerHTML = await response.text();
    })
  );

  document.dispatchEvent(new Event("includesLoaded"));
})();