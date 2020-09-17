<template>
  <b-container v-if="course.lessons" class="shadow rounded container-course">
    <b-col cols="8" class="container-course-lesson">
      <LessonPlayer :url="currentLesson.youtubeVideoId" />
      <LessonContent :lesson="currentLesson" />
    </b-col>
    <b-col cols="4">
      <LessonList
        :lessons="course.lessons"
        :current-lesson="currentLesson"
        @change-lesson="changeLesson"
      />
    </b-col>
  </b-container>
</template>

<script>
import courseQuery from '~/apollo/queries/course/course'
import meQuery from '~/apollo/queries/user/me'

import LessonPlayer from '~/components/lesson/LessonPlayer'
import LessonContent from '~/components/lesson/LessonContent'
import LessonList from '~/components/lesson/LessonList'

export default {
  middleware: ['authenticated'],
  components: {
    LessonPlayer,
    LessonContent,
    LessonList,
  },
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
    changeLesson(lesson) {
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

<style lang="scss" scoped>
.container-course {
  display: flex;
  margin-top: 2rem;
  margin-bottom: 2rem;
  width: 100%;
  padding: 4rem;
}
</style>
