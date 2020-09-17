<template>
  <div class="container-lesson">
    <h1>{{ lesson.title }}</h1>
    <div class="container-lesson-content" v-html="$md.render(lesson.content)" />

    <div v-if="lesson.completed && lesson.userYoutubeVideoUrl">
      <h2>Nice! You've completed this lesson</h2>
      <p>Check out your progress!</p>

      <UserVideoPlayer :url="lesson.userYoutubeVideoUrl" />
    </div>
    <div v-else class="container-user-upload">
      <h2>To complete this lesson</h2>
      <p>Send proof that you're practicing!</p>
      <div class="container-upload-form">
        <b-input placeholder="https://www.youtube.com/embed/video-id" />
        <b-btn variant="primary">Submit</b-btn>
      </div>
    </div>
  </div>
</template>

<script>
import UserVideoPlayer from '~/components/lesson/LessonPlayer'

export default {
  components: {
    UserVideoPlayer,
  },
  props: {
    lesson: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.container-lesson {
  margin-top: 2rem;
}

.container-upload-form {
  display: flex;
}

.container-upload-form {
  button {
    margin-left: 1rem;
  }
}
</style>
