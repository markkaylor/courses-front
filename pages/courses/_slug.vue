<template>
  <b-container v-if="course.lessons" class="shadow rounded container-course">
    <b-row class="container-course-lesson">
      <b-col sm="12" lg="8">
        <LessonPlayer :url="currentLesson.youtubeVideoId" />
        <LessonContent
          :lesson="currentLesson"
          :completed-lesson="completedLesson"
          :course-id="course.id"
          :user-id="me.id"
          @update-completed-lesson="updateCompletedLesson"
        />
      </b-col>
      <b-col sm="12" lg="4">
        <LessonList
          :lessons="course.lessons"
          :completed-lessons="course.completed_lessons"
          :current-lesson="currentLesson"
          @change-lesson="changeLesson"
        />
      </b-col>
    </b-row>
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
  computed: {
    completedLesson() {
      if (!this.course.completed_lessons) return false
      return this.course.completed_lessons.find(
        (completedLesson) => completedLesson.lesson.id === this.currentLesson.id
      )
    },
  },
  async mounted() {
    try {
      const { data } = await this.$apollo.query({
        query: courseQuery,
        variables: { slug: this.$route.params.slug, id: this.me.id },
      })
      this.course = data.courseBySlug
      this.setCurrentCourse()
    } catch (error) {
      // eslint-disable-next-line
      console.error(error)
    }
  },
  methods: {
    changeLesson(lesson) {
      this.currentLesson = lesson
    },
    setCurrentCourse() {
      const lessonsToComplete = this.course.lessons.filter(
        (lesson) =>
          !this.course.completed_lessons.find(
            (completedLesson) => lesson.id === completedLesson.lesson.id
          )
      )
      this.currentLesson = lessonsToComplete[0] || this.course.lessons[0]
    },
    updateCompletedLesson(completedLesson) {
      this.course.completed_lessons.push(completedLesson)
      this.setCurrentCourse()
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

.container-course-lesson {
  width: 100%;
}
</style>
