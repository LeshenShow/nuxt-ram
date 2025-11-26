<template>
  <UApp>
    <UHeader>
      <div class="flex justify-between items-center w-full px-6 py-3">
        <h1 class="text-2xl font-bold">Rick & Morty Characters</h1>
        <UButton color="primary" size="sm">Favorites</UButton>
      </div>
    </UHeader>
<!-- v-if="store.loading" -->
    <UMain>
      <UContainer class="py-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
           <CharacterCardSkeleton    v-if="delayedLoading" v-for="i in 8" :key="'skeleton-'+i" />
          <CharacterCard v-if="!delayedLoading" v-for="char in store.characters" :key="char.id" :character="char" @edit="openNotesModal" />
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
import CharacterCardSkeleton from "../ui/CharacterCardSkeleton.vue"

const store = useCharactersStore()
const editingCharacter = ref<Character | null>(null)
const editingNotes = ref("")
const showModal = ref(false)
const delayedLoading = ref(true)
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
watch(() => store.loading, (isLoading) => {
  if (isLoading) {
    delayedLoading.value = true
  } else {
    setTimeout(() => {
      delayedLoading.value = false
    }, 300) // ← задержка исчезновения (мс)
  }
})
</script>
