<template>
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
            v-if="userIsEnrolled"
            variant="primary"
            :to="{
              name: `courses-slug`,
              params: { slug: course.slug },
            }"
          >
            Take Course
          </b-button>
          <b-button
            v-else
            variant="primary"
            :to="{
              name: `courses-slug`,
              params: { slug: course.slug },
            }"
            @click="addUserToCourse(course)"
          >
            Enroll in Course
          </b-button>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import addUserQuery from '~/apollo/mutations/course/addUser'

export default {
  props: {
    courses: {
      type: Array,
      required: true,
    },
    userIsEnrolled: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
      default: null,
    },
  },
  methods: {
    async addUserToCourse(course) {
      const ids = course.users.map((user) => user.id)
      await this.$apollo.mutate({
        mutation: addUserQuery,
        variables: { id: course.id, users: [...ids, this.userId] },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
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
  padding-bottom: 4rem;
}

.container-courses-available {
  width: 100%;
}
</style>
