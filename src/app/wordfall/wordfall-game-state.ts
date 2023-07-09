export const MAX_LIVES = 3
export const START_LEVEL = 1

export interface WordfallWordType {
  word: string
  x: number
  y: number
  dead?: boolean
  completion: number
  complete?: boolean
}

export interface WordfallGameState {
  paused?: boolean
  words: WordfallWordType[]
  lives: number
  level: number
  timeSinceLastWord: number
  time: number
  score: number
  displayScore: number
  state: 'intro' | 'playing' | 'gameover'
}
