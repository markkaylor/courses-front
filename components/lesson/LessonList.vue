<template>
  <div class="container-list-lesson">
    <div
      v-for="(lesson, index) in lessons"
      :key="index + lesson.youtubeVideoId"
      :class="
        lesson.youtubeVideoId === currentLesson.youtubeVideoId
          ? 'text-primary font-weight-bold'
          : ''
      "
      class="list-item"
      @click="$emit('change-lesson', lesson)"
    >
      <span
        class="container-check"
        :class="lesson.completed_lesson ? 'item-complete' : 'item-incomplete'"
      >
        <b-icon icon="check" aria-hidden="true" />
      </span>
      <span class="lesson-title">{{ lesson.title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lessons: {
      type: Array,
      required: true,
    },
    currentLesson: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.container-list-video {
  display: flex;
  flex-direction: column;
}

.list-item {
  display: flex;
  padding: 1rem;
  border-bottom: 1px dashed gray;

  &:hover {
    cursor: pointer;
    font-weight: bold;
  }
}

.container-check {
  width: 20px;
  height: 20px;
  margin-right: 1rem;
  border: 1px dashed gray;
  border-radius: 50%;
}

.item-complete {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: black;
  color: white;
  border: 1px solid black;
  svg {
    visibility: visible;
  }
}

.item-incomplete {
  svg {
    visibility: hidden;
  }
}
</style>
