<template>
  <UCard class="flex flex-col items-center p-4">
    <img :src="character.image" :alt="character.name" class="w-32 h-32 rounded-full mb-4" />
    <h2 class="text-lg font-bold mb-2">{{ character.name }}</h2>
    <p class="text-gray-500 mb-2">{{ character.species }} - {{ character.status }}</p>

    <div class="flex gap-2 mt-2 w-full justify-center">
      <UButton size="sm" color="success" @click="toggleFavorite">
        {{ character.favorite ? "Unfavorite" : "Favorite" }}
      </UButton>
      <UButton size="sm" color="warning" @click="editNotes"> Notes </UButton>
      <UButton size="sm" color="neutral" @click="removeCharacter"> Remove </UButton>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue"

import { useCharactersStore } from "~/features/characters/model/charactersStore"
import type { Character } from "../model"

const props = defineProps<{ character: Character }>()
const emit = defineEmits<{
  (e: "edit", char: Character): void
}>()

const store = useCharactersStore()

const toggleFavorite = () => store.toggleFavorite(props.character.id)
const editNotes = () => emit("edit", props.character)
const removeCharacter = () => store.removeCharacter(props.character.id)
</script>
