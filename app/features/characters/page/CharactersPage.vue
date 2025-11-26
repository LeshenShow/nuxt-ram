<template>
  <UApp>
    <UHeader>
      <div class="flex justify-between items-center w-full px-6 py-3">
        <h1 class="text-2xl font-bold">Rick & Morty Characters</h1>
        <UButton color="primary" size="sm">Favorites</UButton>
      </div>
    </UHeader>

    <UMain>
      <UContainer class="py-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <CharacterCard v-for="char in store.characters" :key="char.id" :character="char" @edit="openNotesModal" />
        </div>
      </UContainer>
    </UMain>

    <EditNotesModal :character="editingCharacter" v-model:open="showModal" @save="saveNotes" />
  </UApp>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import CharacterCard from "~/features/characters/ui/CharacterCard.vue"
import EditNotesModal from "~/features/characters/ui/modal/EditNotesModal.vue"
import { useCharactersStore } from "~/features/characters/model/charactersStore"
import type { Character } from "../model"

const store = useCharactersStore()
const editingCharacter = ref<Character | null>(null)
const editingNotes = ref("")
const showModal = ref(false)

// Открываем модалку с выбранным персонажем
const openNotesModal = (char: Character) => {
  editingCharacter.value = char
  editingNotes.value = char.notes || ""
  showModal.value = true
}

// Сохраняем заметки через store
const saveNotes = (notes: string) => {
  if (editingCharacter.value) {
    store.updateNotes(editingCharacter.value.id, notes)
    editingCharacter.value = null
  }
}

onMounted(() => {
  store.fetchCharacters(1)
})
</script>
