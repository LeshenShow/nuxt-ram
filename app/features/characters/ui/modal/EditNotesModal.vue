<template>
  <UModal v-model:open="handleClose" @close="() => emit('update:open', false)" title="Edit Notes">
    <template #body>
      <textarea v-model="notes" rows="5" class="w-full border rounded p-2 mb-4"></textarea>
    </template>
    <template #footer="{ close }">
      <UContainer class="flex justify-end gap-4">
        <UButton color="primary" @click="save">Save</UButton>
        <UButton color="neutral" @click="cancel">Cancel</UButton>
      </UContainer>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { computed, watch, ref } from "vue"
import { defineProps, defineEmits } from "vue"
import type { Character } from "../../model"
import { useNotifier } from "~/composable/useToaster";

const props = defineProps<{
  character: Character | null
  open: boolean
}>()
const notifier = useNotifier()
const notes = ref("")
watch(
  () => props.character,
  newChar =>notes.value = newChar?.notes || "",
  { immediate: true }
)
const emit = defineEmits<{
  (e: "update:open", val: boolean): void
  (e: "save", notes: string): void
}>()

const handleClose = computed({
  get: () => props.open,
  set: val => emit("update:open", val)
})


const confirmClose = () => {
  // Можно использовать встроенный confirm, или кастомный toast/диалог
  return window.confirm("Вы уверены, что хотите закрыть модалку? Несохранённые данные будут потеряны.")
}
const save = () => {
    if (!notes.value.trim()) {
      return notifier.warning('Текст не должен быть пустым!')
    }
    emit("save", notes.value)
    emit("update:open", false)
    notifier.success('Заметка сохранена')
}
const cancel = () => {
  emit("update:open", false)
}
</script>
