(() => {
  const root = document.documentElement;
  const toggle = document.querySelector("[data-theme-toggle]");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark" || savedTheme === "light") {
    root.setAttribute("data-theme", savedTheme);
  }

  const updateToggleLabel = () => {
    if (!toggle) return;
    const currentTheme = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    toggle.textContent = currentTheme === "dark" ? "Light" : "Dark";
  };

  if (toggle) {
    updateToggleLabel();
    toggle.addEventListener("click", () => {
      const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", nextTheme);
      localStorage.setItem("theme", nextTheme);
      updateToggleLabel();
    });
  }

  const blocks = document.querySelectorAll("pre > code");
  if (!blocks.length) return;

  const getLanguage = (codeBlock) => {
    const classes = [...codeBlock.classList, ...(codeBlock.parentElement?.classList ?? [])];
    const langClass = classes.find((value) => value.startsWith("language-"));
    if (!langClass) return "text";
    return langClass.replace("language-", "").replace(/[-_]+/g, " ");
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
