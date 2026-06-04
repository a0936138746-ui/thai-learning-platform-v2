# Audio Assets

Put Thai pronunciation audio files here.

Recommended structure:

```text
public/audio/vocab/sawasdee.mp3
public/audio/sentences/hello-nice-to-meet-you.mp3
```

Use the public path in `src/data.js`:

```js
audio: "/audio/vocab/sawasdee.mp3"
```

The app will play `audio` first. If `audio` is empty, it falls back to browser speech synthesis.
