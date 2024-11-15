<template>
  <div
    :class="`uppercase py-2 cursor-pointer rounded key-type-${keyType} text-sm sm:text-lg text-white flex justify-center items-center transition-colors`"
  >
    <span v-if="letter.length === 1">
      {{ letter }}
    </span>
    <Icon
      v-if="letter === 'Backspace'"
      name="material-symbols:backspace-outline-rounded"
    />
    <Icon
      v-if="letter === 'Enter'"
      name="material-symbols:keyboard-return-rounded"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  keyType: {
    type: String,
    default: 'empty-bg',
  },
  letter: {
    type: String,
  },
});
</script>

<style scoped>
.key-type-empty-bg {
  @apply bg-empty hover:bg-empty-dark text-black;
}
.key-type-correct {
  @apply bg-correct hover:bg-correct-dark;
}
.key-type-present {
  @apply bg-present hover:bg-present-dark;
}
.key-type-absent {
  @apply bg-absent hover:bg-absent-dark;
}
</style>
