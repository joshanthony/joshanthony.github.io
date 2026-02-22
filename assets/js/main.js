(() => {
  const blocks = document.querySelectorAll("pre > code");
  if (!blocks.length || !navigator.clipboard) return;

  blocks.forEach((codeBlock) => {
    const pre = codeBlock.parentElement;
    if (!pre) return;

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

    pre.insertAdjacentElement("afterbegin", button);
  });
})();
