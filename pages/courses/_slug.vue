<template>
  <b-container v-if="course.lessons" class="container-course-lessons">
    <b-col cols="8" class="container-video">
      <div class="container-iframe">
        <iframe
          :src="`https://www.youtube.com/embed/${currentLesson.youtubeVideoId}`"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </div>
      <h3>{{ currentLesson.title }}</h3>
      <p>{{ currentLesson.description }}</p>
      <div v-if="currentLesson.completed && currentLesson.userYoutubeVideoUrl">
        <h3>Nice! You've completed this lesson</h3>
        <p>Check out your progress!</p>
        <div class="container-iframe">
          <iframe
            :src="currentLesson.userYoutubeVideoUrl"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        </div>
      </div>
      <div v-else class="container-user-upload">
        <h3>To complete this lesson</h3>
        <p>Send proof that you're practicing!</p>
        <div class="container-upload-form">
          <b-input placeholder="youtube.com/your-video"></b-input>
          <b-btn>Submit</b-btn>
        </div>
      </div>
    </b-col>
    <b-col cols="4" class="container-list-video">
      <div
        v-for="(lesson, index) in course.lessons"
        :key="index + lesson.youtubeVideoId"
        class="list-item"
        @click="changeVideo(lesson)"
      >
        <span
          class="container-check"
          :class="lesson.completed ? 'item-complete' : 'item-incomplete'"
        >
          <b-icon icon="check" aria-hidden="true" />
        </span>
        <strong>{{ lesson.title }}</strong>
        <p>{{ lesson.description }}</p>
      </div>
    </b-col>
  </b-container>
</template>

<script>
import courseQuery from '~/apollo/queries/course/course'
import meQuery from '~/apollo/queries/user/me'

export default {
  middleware: ['authenticated'],
  data() {
    return {
      course: {},
      currentLesson: null,
    }
  },
  async mounted() {
    try {
      const { data } = await this.$apollo.query({
        prefetch: true,
        query: courseQuery,
        variables: { slug: this.$route.params.slug },
      })
      this.course = data.courseBySlug

      const lesson =
        this.course &&
        this.course.lessons.find((lesson) => lesson.completed === false)

      this.currentLesson = lesson
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    changeVideo(lesson) {
      this.currentLesson = lesson
    },
  },
  apollo: {
    me: {
      query: meQuery,
    },
  },
}
</script>

<style scoped>
.container-course-lessons {
  display: flex;
  width: 100%;
}

.container-video {
  padding: 2rem;
}

.container-list-video {
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
}

.container-iframe {
  overflow: hidden;
  /* 16:9 aspect ratio */
  padding-top: 56.25%;
  position: relative;
}

.container-iframe iframe {
  border: 0;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}

.list-item {
  padding: 0 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px dashed gray;
}

.container-check {
  border: 1px dashed gray;
  border-radius: 50%;
}

.item-complete {
  background-color: black;
  color: white;
  border: none;
}

.item-complete svg {
  visibility: visible;
}

.item-incomplete svg {
  visibility: hidden;
}

.container-upload-form {
  display: flex;
}
</style>
