// (async () => {
//   const includeElements = document.querySelectorAll("[data-include]");

//   await Promise.all(
//     [...includeElements].map(async (element) => {
//       const file = element.dataset.include;
//       const response = await fetch(file);

//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}: ${file}`);
//       }

//       element.innerHTML = await response.text();
//     })
//   );

//   document.dispatchEvent(new Event("includesLoaded"));
// })();




export async function loadComponents() {
  const elements = document.querySelectorAll("[data-include]");

  await Promise.all(
    [...elements].map(async (element) => {
      const file = element.dataset.include;

      try {
        const response = await fetch(file);

        if (!response.ok) {
          console.warn(`Component not found: ${file}`);
          return;
        }

        element.innerHTML = await response.text();
      } catch (error) {
        console.error(`Failed to load component: ${file}`, error);
      }
    })
  );
}