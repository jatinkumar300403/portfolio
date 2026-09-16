# Project screenshots

Drop real screenshots here and point to them from `src/content/site.ts`:

```ts
preview: {
  kind: "commentlens",
  image: "/projects/commentlens.png",   // <- add this line
  chromeUrl: "youtube.com/watch - CommentLens",
}
```

When `image` is set it replaces the rendered mock UI and the frame label
switches from "UI PREVIEW" to "SCREENSHOT" automatically.

Recommended: 16:10 aspect ratio (e.g. 1600x1000), PNG or WebP.
