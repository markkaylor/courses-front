<template>
  <div class="container">
    <h1>My Courses</h1>
    <div v-if="enrolledCourses.length" class="container-courses">
      <div v-for="(course, index) in enrolledCourses" :key="index">
        <b-card
          v-if="course.lessons.length"
          class="no-border"
          :img-src="`http://img.youtube.com/vi/${course.lessons[0].youtubeVideoId}/0.jpg`"
        >
          <div class="container-description">
            <h2>{{ course.title }}</h2>
            <p>{{ course.description }}</p>
            <b-button
              :to="{
                name: `courses-slug`,
                params: { slug: course.slug },
              }"
            >
              Take Course
            </b-button>
          </div>
        </b-card>
      </div>
    </div>
    <div v-else>You don't have any courses yet!</div>
    <h1>Available Courses</h1>
    <div v-if="courses.length">
      <div class="container-courses">
        <div v-for="(course, index) in courses" :key="index">
          <b-card
            v-if="course.lessons.length"
            class="no-border"
            :img-src="`http://img.youtube.com/vi/${course.lessons[0].youtubeVideoId}/0.jpg`"
          >
            <div class="container-description">
              <h2>{{ course.title }}</h2>
              <p>{{ course.description }}</p>
              <b-button
                variant="primary"
                :to="{
                  name: `courses-slug`,
                  params: { slug: course.slug },
                }"
                @click="addUserToCourse(course)"
              >
                Enroll in Course!
              </b-button>
            </div>
          </b-card>
        </div>
      </div>
    </div>
    <div v-else>Someone needs to make some more courses...</div>
  </div>
</template>

<script>
import coursesQuery from '~/apollo/queries/course/courses'
import userCoursesQuery from '~/apollo/queries/course/userCourses'
import meQuery from '~/apollo/queries/user/me'
import addUserQuery from '~/apollo/mutations/course/addUser'

export default {
  middleware: ['authenticated'],
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
      // eslint-disable-next-line
      console.log(error)
    }

    try {
      const ids = this.enrolledCourses.map((course) => course.id)
      const { data } = await this.$apollo.query({
        query: coursesQuery,
        variables: { ids },
      })
      this.courses = data.courses
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
    }
  },
  apollo: {
    me: {
      query: meQuery,
    },
  },
  methods: {
    async addUserToCourse(course) {
      const ids = course.users.map((user) => user.id)
      await this.$apollo.mutate({
        mutation: addUserQuery,
        variables: { id: course.id, users: [...ids, this.me.id] },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
}

.container-description {
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem 0;
}

.card {
  border: none;
  width: 300px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.container-courses {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>
