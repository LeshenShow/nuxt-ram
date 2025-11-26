<script setup lang="ts">
const dynamic = `bg-gray-200  animate-pulse`
</script>
<template>
  <UCard class="flex flex-col items-center p-4">
    <div class="w-32 h-32 rounded-full mb-4" :class="`${dynamic}`"></div>
    <div class="text-lg font-bold mb-2 rounded" :class="`${dynamic}`">&nbsp;</div>
    <div class="text-gray-500 mb-2 rounded" :class="`${dynamic}`">&nbsp;</div>

    <div class="flex gap-2 mt-2 w-full justify-center">
      <div class="h-8 w-20 rounded" :class="`${dynamic}`"></div>
      <div class="h-8 w-20 rounded" :class="`${dynamic}`"></div>
      <div class="h-8 w-20 rounded" :class="`${dynamic}`"></div>
    </div>
  </UCard>
</template>
