document.addEventListener("includesLoaded", () => {
  const languageSelect = document.querySelector(".language-select");
  const languageBtn = document.querySelector(".language-btn");
  const currentLanguage = document.querySelector(".language-current");
  const languageOptions = document.querySelectorAll(".language-menu button");

  if (!languageSelect || !languageBtn || !currentLanguage) {
    return;
  }

  languageBtn.addEventListener("click", () => {
    languageSelect.classList.toggle("active");

    const isOpen = languageSelect.classList.contains("active");
    languageBtn.setAttribute("aria-expanded", isOpen);
  });

  languageOptions.forEach((option) => {
    option.addEventListener("click", () => {
      currentLanguage.textContent = option.dataset.lang;
      languageSelect.classList.remove("active");
      languageBtn.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (event) => {
    if (!languageSelect.contains(event.target)) {
      languageSelect.classList.remove("active");
      languageBtn.setAttribute("aria-expanded", "false");
    }
  });
});