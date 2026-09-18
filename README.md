# Hanqing Lu — Research Homepage

A dependency-free research homepage and writing archive for GitHub Pages. The homepage groups work
into RSI-Harness, Autoresearch Harness, RSI-Evaluation, and RSI-Training. Henry's Log remains the
writing archive at `writing.html`, and existing article URLs are preserved.

The site opens in light mode on a first visit and remembers an explicit light/dark selection across
the homepage, archive, and articles. No build step or package installation is required.

## Publish on GitHub Pages

1. Create a public repository named `<your-github-username>.github.io`.
2. Copy everything in this directory into that repository.
3. Commit and push to the `main` branch.
4. In GitHub, open **Settings → Pages**.
5. Choose **Deploy from a branch**, then select `main` and `/(root)`.
6. Open `https://<your-github-username>.github.io` after the deployment completes.

The `.nojekyll` file tells GitHub Pages to serve the files exactly as written.

## Add a blog post

1. Copy `posts/post-template.html` to a descriptive filename, for example:

   ```text
   posts/research-attention.html
   ```

2. Edit the page title, date, description, and article body. Remove this line from the copied post:

   ```html
   <meta name="robots" content="noindex" />
   ```

3. Add the post to `assets/posts.js`:

   ```js
   window.BLOG_POSTS = [
     {
       title: "Why Research Attention Is the Bottleneck",
      summary: "A short description shown in the writing archive.",
       date: "2026-08-06",
       readingTime: "8 min read",
       url: "posts/research-attention.html"
     }
   ];
   ```

Posts in the archive are sorted by date automatically, newest first. The homepage has a manually
curated writing selection; update it in `index.html` when featuring another article.

## Preview locally

From this directory, run:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Main files

- `index.html`: biography, lab, research directions, selected papers, and selected writing
- `writing.html`: complete writing archive and category filters
- `assets/research.css`: research homepage design and responsive layout
- `assets/styles.css`: original article and archive layout
- `assets/editorial.css`: shared editorial style for the writing archive and articles
- `assets/theme.js`: first-visit light theme and saved preference initialization
- `assets/site.js`: theme controls and writing archive rendering
- `assets/images/SOURCES.md`: source URLs for the portrait and research figures
- `assets/posts.js`: ordered blog-post data
- `posts/post-template.html`: copy this for each new article
