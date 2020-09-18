<template>
  <b-container v-if="course.lessons" class="shadow rounded container-course">
    <b-col cols="8" class="container-course-lesson">
      <LessonPlayer :url="currentLesson.youtubeVideoId" />
      <LessonContent
        :lesson="currentLesson"
        :completed-lesson="completedLesson"
        :course-id="course.id"
        :user-id="me.id"
      />
    </b-col>
    <b-col cols="4">
      <LessonList
        :lessons="course.lessons"
        :completed-lessons="course.completed_lessons"
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
        variables: { slug: this.$route.params.slug, id: this.me.id },
      })
      this.course = data.courseBySlug

      // TODO: return first lesson that is not in array of completed lesson
      this.currentLesson = this.course.lessons[0]
    } catch (error) {
      console.log(error)
    }
  },
  computed: {
    completedLesson() {
      if (!this.course.completed_lessons) return false
      return this.course.completed_lessons.find(
        (completedLesson) => completedLesson.lesson.id === this.currentLesson.id
      )
    },
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
