# Henry's Log

A dependency-free personal research blog for GitHub Pages. The design is inspired by the clarity and
reading focus of Lil'Log, with original layout, typography, colors, and components.

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
       summary: "A short description shown on the homepage.",
       date: "2026-08-06",
       readingTime: "8 min read",
       url: "posts/research-attention.html"
     }
   ];
   ```

Posts are sorted by date automatically, newest first.

## Preview locally

From this directory, run:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Main files

- `index.html`: homepage biography and social links
- `assets/styles.css`: complete visual design and responsive styles
- `assets/posts.js`: ordered blog-post data
- `posts/post-template.html`: copy this for each new article
