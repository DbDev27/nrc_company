import { loadComponents } from "./core/include.js";
import { initLanguageSelect } from "./components/lang.js";
import { initMarquee } from "./components/marquee.js";

async function App() {
  await loadComponents();

  initLanguageSelect();
  initMarquee();
}

App();