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
      themeToggle.setAttribute("aria-pressed", String(isDark));
      const label = themeToggle.querySelector(".theme-label");
      if (label) label.textContent = isDark ? "Light" : "Dark";
    }
    if (themeColor) {
      themeColor.setAttribute("content", isDark ? "#191a1b" : "#faf9f6");
    }
  };

  themeToggle?.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = nextTheme;
    try {
      localStorage.setItem("hanqing-site-theme", nextTheme);
    } catch {
      // Theme switching does not require storage permission.
    }
    syncThemeUi();
  });

  syncThemeUi();

  const year = document.querySelector("#current-year");
  if (year) year.textContent = new Date().getFullYear();

  const postList = document.querySelector("#post-list");
  if (!postList) return;

  const posts = Array.isArray(window.BLOG_POSTS) ? [...window.BLOG_POSTS] : [];
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  const categoryButtons = [...document.querySelectorAll("[data-category]")];

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  const renderPosts = (category = "All") => {
    postList.replaceChildren();
    const visiblePosts = category === "All"
      ? posts
      : posts.filter((post) => post.category === category);

    if (visiblePosts.length === 0) {
      const emptyState = document.createElement("div");
      emptyState.className = "empty-state";

      const message = document.createElement("p");
      const title = document.createElement("strong");
      title.textContent = category === "Project" ? "Projects are on the way." : "Notes are on the way.";
      message.append(title, category === "Project"
        ? "Papers, systems, and research artifacts will appear here."
        : "Long-form writing on self-improving AI, agent evolution, and research systems will appear here.");
      emptyState.append(message);
      postList.append(emptyState);
      return;
    }

    visiblePosts.forEach((post) => {
      const card = document.createElement("a");
      card.className = "post-card";
      card.href = post.url;

      const body = document.createElement("div");
      const meta = document.createElement("div");
      meta.className = "post-meta";

      const categoryLabel = document.createElement("span");
      categoryLabel.className = "post-type";
      categoryLabel.textContent = post.category || "Essay";
      meta.append(categoryLabel);

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
  };

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category || "All";
      categoryButtons.forEach((candidate) => {
        candidate.setAttribute("aria-pressed", String(candidate === button));
      });
      renderPosts(category);
    });
  });

  renderPosts();
})();
