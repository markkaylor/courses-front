<template>
  <div v-if="course">Hello from {{ course.title }}</div>
</template>

<script>
import courseQuery from '~/apollo/queries/course/course'
export default {
  // TODO: Create custom graphql query to get course by slug
  computed: {
    course() {
      return this.courses && this.courses[0]
    },
  },
  apollo: {
    courses: {
      query: courseQuery,
      variables() {
        return { slug: this.$route.params.slug }
      },
    },
  },
}
</script>

<style lang="scss" scoped></style>
