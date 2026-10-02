/* Language toggle for the HeroiK pages.
 *
 * The institutional page swaps `textContent` from data-pt/data-en attributes,
 * which is right for a tagline and wrong for a legal document: these pages have
 * links, emphasis and lists inside the sentences. So each language is a block of
 * real markup — `[data-lang="pt"]` and `[data-lang="en"]` — and the toggle hides
 * one of them.
 *
 * It keeps `astra-lang` in localStorage, the same key the institutional page
 * uses, so a visitor who chose EN there does not choose again here. The markup
 * ships with Portuguese visible and English `hidden`, so the page is readable
 * with no JavaScript at all — and with no storage, which is what a private
 * window gives us.
 */
(function () {
  var blocks = document.querySelectorAll("[data-lang]");
  var buttons = document.querySelectorAll(".langs button");

  function setLang(lang) {
    for (var i = 0; i < blocks.length; i++) {
      blocks[i].hidden = blocks[i].getAttribute("data-lang") !== lang;
    }
    for (var j = 0; j < buttons.length; j++) {
      buttons[j].setAttribute(
        "aria-pressed",
        buttons[j].getAttribute("data-lang") === lang ? "true" : "false"
      );
    }
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    var title = document.querySelector("title[data-title-" + lang + "]");
    if (title) document.title = title.getAttribute("data-title-" + lang);
    try {
      localStorage.setItem("astra-lang", lang);
    } catch (e) {
      /* private mode: the choice simply does not survive the page */
    }
  }

  for (var k = 0; k < buttons.length; k++) {
    buttons[k].addEventListener("click", function () {
      setLang(this.getAttribute("data-lang"));
    });
  }

  try {
    var stored = localStorage.getItem("astra-lang");
    if (stored === "en" || stored === "pt") setLang(stored);
    else if ((navigator.language || "").slice(0, 2) !== "pt") setLang("en");
  } catch (e) {
    /* keep the markup default, pt */
  }

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
