import { defineStore } from "pinia"
import axios from "axios"
import type { Character, RickAndMortyApiResponse } from "./types"
import { RICK_AND_MORTY_API } from "~/shared/api/api"

export const useCharactersStore = defineStore("characters", {
  state: () => ({
    characters: [] as Character[],
  }),
  actions: {
    async fetchCharacters(page = 1) {
      try {
        const { data } = await axios.get<RickAndMortyApiResponse>(`${RICK_AND_MORTY_API}?page=${page}`)
        this.characters = data.results.map(character => ({
          ...character,
          favorite: false,
          notes: "",
        }))
      } catch (error) {
        console.error("Ошибка при загрузке персонажей", error)
      }
    },
    toggleFavorite(id: number) {
      const char = this.characters.find(character => character.id === id)
      if (char) char.favorite = !char.favorite
    },
    removeCharacter(id: number) {
      this.characters = this.characters.filter(character => character.id !== id)
    },
    updateNotes(id: number, notes: string) {
      const char = this.characters.find(character => character.id === id)
      if (char) char.notes = notes
    },
  },
})
