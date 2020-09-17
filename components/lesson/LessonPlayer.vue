<template>
  <div class="container-iframe">
    <iframe
      :src="youtubeUrl"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  computed: {
    youtubeUrl() {
      return this.url.includes('youtube')
        ? this.url
        : `https://www.youtube.com/embed/${this.url}`
    },
  },
}
</script>

<style lang="scss" scoped>
.container-iframe {
  overflow: hidden;
  /* 16:9 aspect ratio */
  padding-top: 56.25%;
  position: relative;
  margin-bottom: 1rem;

  iframe {
    border: 0;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
}
</style>
