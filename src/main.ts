const cells = document.querySelector(".connections");

if (!cells) {
  throw new Error("its broken");
}

let selected: HTMLButtonElement[] = [];

cells.addEventListener("click", (e) => {
  if (e.target instanceof HTMLButtonElement) {
    if (e.target.classList.contains("connections-cell")) {
      if (selected.length < 4) {
        e.target.classList.add("active");

        selected.push(e.target);
      }
    }
  }
});

let insertRef: Element | null = null;

document.addEventListener("click", (e) => {
  if (e.target instanceof HTMLButtonElement) {
    if (e.target.id === "guess") {
      const bgColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

      document.startViewTransition(() => {
        for (const el of selected) {
          if (!insertRef) {
            cells.prepend(el);
          } else {
            insertRef.insertAdjacentElement("afterend", el);
          }

          insertRef = el;

          el.style.backgroundColor = bgColor;

          el.classList.remove("active");
        }

        selected = [];
      });
    }
  }
});
