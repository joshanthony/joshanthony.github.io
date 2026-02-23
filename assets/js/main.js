(() => {
  const root = document.documentElement;
  const toggle = document.querySelector("[data-theme-toggle]");
  const toggleIcon = toggle?.querySelector(".theme-icon");
  const savedTheme = localStorage.getItem("theme");
  const iconSun = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2"></circle><line x1="12" y1="2.5" x2="12" y2="5.1"></line><line x1="12" y1="18.9" x2="12" y2="21.5"></line><line x1="2.5" y1="12" x2="5.1" y2="12"></line><line x1="18.9" y1="12" x2="21.5" y2="12"></line><line x1="5.2" y1="5.2" x2="7.1" y2="7.1"></line><line x1="16.9" y1="16.9" x2="18.8" y2="18.8"></line><line x1="16.9" y1="7.1" x2="18.8" y2="5.2"></line><line x1="5.2" y1="18.8" x2="7.1" y2="16.9"></line></svg>';
  const iconMoon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.1a8.6 8.6 0 1 1-10.6-10.6 7 7 0 1 0 10.6 10.6Z"></path></svg>';

  // Default to dark for new visitors; only override if they explicitly chose light
  if (savedTheme === "light") {
    root.setAttribute("data-theme", "light");
  } else {
    root.setAttribute("data-theme", "dark");
  }

  const updateToggleIcon = () => {
    if (!toggle) return;
    const currentTheme = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    if (toggleIcon) {
      toggleIcon.innerHTML = currentTheme === "dark" ? iconSun : iconMoon;
    }
    toggle.setAttribute("aria-label", currentTheme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  };

  if (toggle) {
    updateToggleIcon();
    toggle.addEventListener("click", () => {
      const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", nextTheme);
      localStorage.setItem("theme", nextTheme);
      updateToggleIcon();
    });
  }

  const blocks = document.querySelectorAll("pre > code");
  if (!blocks.length) return;

  const getLanguage = (codeBlock) => {
    const classes = [...codeBlock.classList, ...(codeBlock.parentElement?.classList ?? [])];
    const langClass = classes.find((value) => value.startsWith("language-"));
    if (!langClass) return "text";
    const language = langClass.replace("language-", "").replace(/[-_]+/g, " ");
    return language === "markdown" ? "text" : language;
  };

  const canCopy = Boolean(navigator.clipboard);

  blocks.forEach((codeBlock) => {
    const pre = codeBlock.parentElement;
    if (!pre) return;

    const blockContainer = pre.closest(".highlight") || pre;
    if (blockContainer.parentElement?.classList.contains("code-shell")) return;

    const shell = document.createElement("div");
    shell.className = "code-shell";
    blockContainer.insertAdjacentElement("beforebegin", shell);

    const meta = document.createElement("div");
    meta.className = "code-meta";

    const language = document.createElement("span");
    language.className = "code-language";
    language.textContent = getLanguage(codeBlock);
    meta.appendChild(language);

    if (canCopy) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "copy-code";
      button.textContent = "Copy";

      button.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(codeBlock.innerText);
          button.textContent = "Copied";
          window.setTimeout(() => {
            button.textContent = "Copy";
          }, 1200);
        } catch {
          button.textContent = "Failed";
          window.setTimeout(() => {
            button.textContent = "Copy";
          }, 1200);
        }
      });

      meta.appendChild(button);
    }

    shell.append(meta, blockContainer);
  });
})();
