<template>
  <UModal v-model:open="open" title="Подтверждение">
    <template #body>
      <p>{{ message }}</p>
    </template>
    <template #footer>
      <UContainer class="flex justify-end gap-2">
        <UButton color="neutral" @click="cancel">Отмена</UButton>
        <UButton color="primary" @click="confirm">Подтвердить</UButton>
      </UContainer>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { defineProps, defineEmits } from "vue"

const props = defineProps<{ message?: string }>()
const emit = defineEmits<{
  (e: "confirm"): void
  (e: "cancel"): void
}>()

const open = ref(false)

const confirm = () => {
  emit("confirm")
  open.value = false
}

const cancel = () => {
  emit("cancel")
  open.value = false
}

const show = () => (open.value = true)

export { show }
</script>
