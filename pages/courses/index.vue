<template>
  <div class="container">
    <h1>Courses</h1>
    <div v-for="(course, index) in courses" :key="index">
      <b-card v-if="course.lessons.length">
        <nuxt-link :to="`courses/${course.slug}`">
          <h1>{{ course.title }}</h1>
          <img
            :src="`http://img.youtube.com/vi/${course.lessons[0].youtubeVideoId}/0.jpg`"
            alt="Course Image"
            width="400"
            height="315"
          />
        </nuxt-link>
      </b-card>
    </div>
  </div>
</template>

<script>
import coursesQuery from '~/apollo/queries/course/courses'
export default {
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
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
}
</style>
