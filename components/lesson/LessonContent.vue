<template>
  <div class="container-lesson">
    <h1>{{ lesson.title }}</h1>
    <!-- eslint-disable-next-line -->
    <div class="container-lesson-content" v-html="$md.render(lesson.content)" />
    <div v-if="completedLesson && completedLesson.userYoutubeVideo">
      <h2>Nice! You've completed this lesson</h2>
      <p>Check out your progress!</p>

      <UserVideoPlayer :url="completedLesson.userYoutubeVideo" />
    </div>
    <div v-else class="container-user-upload">
      <h2>To complete this lesson</h2>
      <p>Send proof that you're practicing!</p>
      <div class="container-upload-form">
        <b-input
          v-model="userYoutubeVideo"
          placeholder="https://www.youtube.com/embed/video-id"
        />
        <b-btn variant="primary" @click="completeLesson">Submit</b-btn>
      </div>
    </div>
  </div>
</template>

<script>
import UserVideoPlayer from '~/components/lesson/LessonPlayer'
import completeLessonQuery from '~/apollo/mutations/lesson/completeLesson'

export default {
  components: {
    UserVideoPlayer,
  },
  props: {
    lesson: {
      type: Object,
      required: true,
    },
    completedLesson: {
      type: Object,
      default: null,
    },
    courseId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      userYoutubeVideo: '',
    }
  },
  methods: {
    async completeLesson(e) {
      e.preventDefault()
      try {
        const {
          data: {
            createCompletedLesson: { completedLesson },
          },
        } = await this.$apollo.mutate({
          mutation: completeLessonQuery,
          variables: {
            userYoutubeVideo: this.userYoutubeVideo,
            course: this.courseId,
            user: this.userId,
            lesson: this.lesson.id,
          },
        })

        this.$emit('update-completed-lesson', completedLesson)
      } catch (error) {
        throw new Error(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.container-lesson {
  h1 {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  margin-top: 2rem;
}

.container-upload-form {
  display: flex;
}

.container-upload-form {
  margin-bottom: 2rem;

  button {
    margin-left: 1rem;
  }
}
</style>
