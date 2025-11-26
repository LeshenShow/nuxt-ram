<template>
  <UModal v-model:open="props.open" title="Edit Notes">
    <template #body>
      <textarea v-model="notes" rows="5" class="w-full border rounded p-2 mb-4"></textarea>
    </template>
    <template #footer="{ close }">
      <div class="flex justify-end gap-2">
        <UButton color="primary" @click="save">Save</UButton>
        <UButton color="neutral" @click="cancel">Cancel</UButton>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { computed, watch, ref } from "vue"
import { defineProps, defineEmits } from "vue"
import type { Character } from "../../model"

const props = defineProps<{
  character: Character | null
  open: boolean
}>()

const emit = defineEmits<{
  (e: "update:open", val: boolean): void
  (e: "save", notes: string): void
}>()

const notes = ref("")

// Синхронизируем при изменении character
watch(
  () => props.character,
  newChar => {
    notes.value = newChar?.notes || ""
  },
  { immediate: true }
)

const save = () => {
  emit("save", notes.value)
  emit("update:open", false)
}

const cancel = () => {
  emit("update:open", false)
}
</script>
