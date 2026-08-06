(() => {
  const root = document.documentElement;
  const themeToggle = document.querySelector(".theme-toggle");
  const themeColor = document.querySelector('meta[name="theme-color"]');

  const syncThemeUi = () => {
    const isDark = root.dataset.theme === "dark";
    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light theme" : "Switch to dark theme"
      );
    }
    if (themeColor) {
      themeColor.setAttribute("content", isDark ? "#151514" : "#f4f1eb");
    }
  };

  themeToggle?.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = nextTheme;
    localStorage.setItem("theme", nextTheme);
    syncThemeUi();
  });

  syncThemeUi();

  const year = document.querySelector("#current-year");
  if (year) year.textContent = new Date().getFullYear();

  const postList = document.querySelector("#post-list");
  if (!postList) return;

  const posts = Array.isArray(window.BLOG_POSTS) ? [...window.BLOG_POSTS] : [];
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  if (posts.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";

    const message = document.createElement("p");
    const title = document.createElement("strong");
    title.textContent = "Notes are on the way.";
    message.append(title, "Long-form writing on self-improving AI, agent evolution, and research systems will appear here.");
    emptyState.append(message);
    postList.append(emptyState);
    return;
  }

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  posts.forEach((post) => {
    const card = document.createElement("a");
    card.className = "post-card";
    card.href = post.url;

    const body = document.createElement("div");
    const meta = document.createElement("div");
    meta.className = "post-meta";

    const date = document.createElement("span");
    date.textContent = dateFormatter.format(new Date(`${post.date}T12:00:00`));
    meta.append(date);

    if (post.readingTime) {
      const readingTime = document.createElement("span");
      readingTime.textContent = post.readingTime;
      meta.append(readingTime);
    }

    const title = document.createElement("h3");
    title.textContent = post.title;
    body.append(meta, title);

    if (post.summary) {
      const summary = document.createElement("p");
      summary.className = "post-summary";
      summary.textContent = post.summary;
      body.append(summary);
    }

    const arrow = document.createElement("span");
    arrow.className = "post-arrow";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "→";

    card.append(body, arrow);
    postList.append(card);
  });
})();
