<template>
  <b-container class="container">
    <h1>My Courses</h1>
    <CourseList
      v-if="enrolledCourses.length"
      :courses="enrolledCourses"
      user-is-enrolled
    />
    <div v-else>You don't have any courses yet!</div>

    <h1>Available Courses</h1>
    <CourseList v-if="courses.length" :courses="courses" :user-id="me.id" />
    <div v-else>Someone needs to make some courses</div>
  </b-container>
</template>

<script>
import coursesQuery from '~/apollo/queries/course/courses'
import userCoursesQuery from '~/apollo/queries/course/userCourses'
import meQuery from '~/apollo/queries/user/me'

import CourseList from '~/components/course/CourseList'

export default {
  middleware: ['authenticated'],
  components: {
    CourseList,
  },
  data() {
    return {
      courses: [],
      enrolledCourses: [],
      me: {},
    }
  },
  async mounted() {
    try {
      const { data } = await this.$apollo.query({
        query: userCoursesQuery,
        variables: { id: this.me.id },
      })
      this.enrolledCourses = data.courses
    } catch (error) {
      throw new Error(error)
    }

    try {
      const ids = this.enrolledCourses.map((course) => course.id)
      const { data } = await this.$apollo.query({
        query: coursesQuery,
        variables: { ids },
      })
      this.courses = data.courses
    } catch (error) {
      throw new Error(error)
    }
  },
  apollo: {
    me: {
      query: meQuery,
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  padding-top: 4rem;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
}
</style>
