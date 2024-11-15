<template>
  <div
    :class="`key-type-${keyType} text-white transition-colors duration-300 uppercase flex justify-center items-center font-semibold text-xl sm:text-2xl`"
  >
    {{ letter }}
  </div>
</template>

<script setup>
const props = defineProps({
  keyType: {
    type: String,
    default: 'empty',
  },
  letter: {
    type: String,
    default: '',
  },
});
</script>

<style scoped>
.key-type-empty {
  @apply border-2 border-empty text-black;
}
.key-type-empty-bg {
  @apply bg-empty text-black;
}
.key-type-correct {
  @apply bg-correct;
}
.key-type-present {
  @apply bg-present;
}
.key-type-absent {
  @apply bg-absent;
}
</style>
