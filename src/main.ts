const connections = document.querySelector(".connections");

const guess = document.getElementById("guess");

if (!connections || !guess) {
  throw new Error("");
}

connections.addEventListener("click", (e) => {
  if (e.target instanceof HTMLButtonElement) {
    if (e.target.classList.contains("connections-cell")) {
      e.target.classList.add("active");
    }
  }
});

let insertRef: Element | null = null;

guess.addEventListener("click", (e) => {
  const bgColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  const activeCells = document.querySelectorAll<HTMLElement>(
    ".connections-cell.active",
  );

  document.startViewTransition(() => {
    for (const cell of activeCells) {
      cell.classList.remove("active");
    }

    for (const cell of activeCells) {
      if (!insertRef) {
        insertRef = connections.firstElementChild;
      }

      if (insertRef) {
        const sibling1 = cell.nextSibling;
        const sibling2 = insertRef.nextSibling;

        connections.insertBefore(insertRef, sibling1);
        connections.insertBefore(cell, sibling2);
      }

      insertRef = cell.nextElementSibling;

      cell.style.backgroundColor = bgColor;
    }
  });
});
