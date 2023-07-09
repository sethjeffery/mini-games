import { WordfallGameState } from './wordfall-game-state'

function updateHighScore(score: number) {
  const highScore = parseInt(localStorage.getItem('wordfall-high-score') || '0')
  if (score > highScore) {
    localStorage.setItem('wordfall-high-score', score.toString())
  }
}

class GameStateTapper {
  constructor(private gameState: WordfallGameState) {}

  tap(key: string) {
    const state = this.gameState
    const { words } = state
    for (const word of words.filter((word) => !word.dead)) {
      if (word.word[word.completion] === key.toUpperCase()) {
        const completion = word.completion + 1
        if (completion === word.word.length) {
          const score = state.score + 10 + word.word.length
          updateHighScore(score)

          return {
            ...state,
            level: state.level + 1,
            score,
            words: [
              ...words.slice(0, words.indexOf(word)),
              { ...word, completion, dead: true, complete: true },
              ...words.slice(words.indexOf(word) + 1),
            ],
          }
        } else {
          return {
            ...state,
            words: [
              ...words.slice(0, words.indexOf(word)),
              { ...word, completion },
              ...words.slice(words.indexOf(word) + 1),
            ],
          }
        }
      }
    }
    return state
  }
}

export default GameStateTapper
