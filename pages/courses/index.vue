<template>
  <div class="container">
    <h1>Courses</h1>
    <div v-for="(course, index) in courses" :key="index">
      <b-card v-if="course.lessons.length">
        <img
          :src="`http://img.youtube.com/vi/${course.lessons[0].youtubeVideoId}/0.jpg`"
          alt="Course Image"
          width="400"
          height="315"
        />
        <div class="container-description">
          <h1>{{ course.title }}</h1>
          <p>{{ course.description }}</p>
          <b-button
            :to="{
              name: `courses-slug`,
              params: { slug: course.slug },
            }"
          >
            Learn more
          </b-button>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import coursesQuery from '~/apollo/queries/course/courses'
import meQuery from '~/apollo/queries/user/me'
export default {
  middleware: ['authenticated'],
  data() {
    return {
      courses: [],
    }
  },
  apollo: {
    courses: {
      prefetch: true,
      query: coursesQuery,
    },
    me: {
      query: meQuery,
    },
  },
}
</script>

<style scoped>
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
</style>
