import { WordfallGameState, WordfallWordType } from './wordfall-game-state'

const MAX_DISTANCE = 100

class GameStateUpdater {
  private gameState: WordfallGameState
  private delta: number

  constructor(
    private dict: string[],
    gameState: WordfallGameState,
    time: number = 0,
  ) {
    this.delta = Math.min(time - gameState.time, 100)

    // build a copy of the gameState so we can mutate it
    this.gameState = {
      ...gameState,
      time,
      words: gameState.words.map((word) => ({ ...word })),
    }
  }

  private get words() {
    return this.gameState.words
  }

  private set words(words: WordfallWordType[]) {
    this.gameState.words = words
  }

  private get level() {
    return this.gameState.level
  }

  private set level(level: number) {
    this.gameState.level = level
  }

  private get wordInterval() {
    return 50000 / (this.level * 0.5 + 5)
  }

  private get lives() {
    return this.gameState.lives
  }

  private set lives(lives: number) {
    this.gameState.lives = lives
  }

  private get timeSinceLastWord() {
    return this.gameState.timeSinceLastWord
  }

  private set timeSinceLastWord(timeSinceLastWord: number) {
    this.gameState.timeSinceLastWord = timeSinceLastWord
  }

  private get activeWordCount() {
    return this.words.filter((word) => !word.dead).length
  }

  private get gameWidth() {
    const gameSpace = document.getElementById('game-space')
    return gameSpace?.getBoundingClientRect().width || 300
  }

  private get maxWordLength() {
    if (this.level < 10) return 5
    if (this.level < 20) return 7
    if (this.level < 30) return 9
    return 12
  }

  private get minWordLength() {
    if (this.level < 20) return 3
    if (this.level < 30) return 5
    return 7
  }

  getRandomWord() {
    const max = this.maxWordLength
    const min = this.minWordLength
    // keep picking word until we get one that is not already in the game
    // and is within the length range
    let word = ''
    while (
      word.length < min ||
      word.length > max ||
      this.words.some((w) => w.word === word)
    ) {
      const index = Math.floor(Math.random() * this.dict.length)
      word = this.dict[index].toLocaleUpperCase()
    }
    return word
  }

  buildNewWord(): WordfallWordType {
    const word = this.getRandomWord()
    const wordWith = word.length * 52
    return {
      word,
      x: 20 + Math.random() * (this.gameWidth - 40 - wordWith),
      y: 0,
      completion: 0,
    }
  }

  updateTimeSinceLastWord() {
    let interval = this.wordInterval
    if (this.activeWordCount > 3) interval = interval * 1.25

    if (this.timeSinceLastWord < 0 || this.activeWordCount === 0) {
      this.words.push(this.buildNewWord())
      this.timeSinceLastWord = interval
    } else {
      this.timeSinceLastWord = this.timeSinceLastWord - this.delta
    }
  }

  updateDisplayScore() {
    // for each delta, move the display score 1% closer to the actual score
    for (let i = 0; i < this.delta; i++) {
      this.gameState.displayScore =
        this.gameState.displayScore +
        (this.gameState.score - this.gameState.displayScore) * 0.005
    }

    // if the display score is within 1 of the actual score, just set it to the actual score
    if (this.gameState.score - 1 <= this.gameState.displayScore) {
      this.gameState.displayScore = this.gameState.score
    }
  }

  wordShallDie(word: WordfallWordType) {
    return !word.dead && word.y + this.wordSpeed(word.y) >= MAX_DISTANCE
  }

  wordSpeed(wordY = 0) {
    return (
      this.delta * (wordY >= MAX_DISTANCE ? 0.001 : 0.0002 * (this.level + 20))
    )
  }

  endGame() {
    if (this.gameState.state !== 'playing') return
    this.gameState.state = 'gameover'
    this.gameState.lives = 0
  }

  updateWords() {
    this.words.forEach((word) => {
      word.y += word.complete ? this.delta * 0.01 : this.wordSpeed(word.y)
      if (word.y >= MAX_DISTANCE && !word.dead) {
        word.y = MAX_DISTANCE
        word.dead = true
        this.lives = Math.max(this.lives - 1, 0)
        this.level = Math.floor(this.level * 0.5)
        if (this.lives <= 0) this.endGame()
      }
    })

    this.words = this.words.filter((word) => word.y < MAX_DISTANCE + 20)
  }

  tick() {
    this.updateWords()
    this.updateDisplayScore()
    if (this.lives) this.updateTimeSinceLastWord()

    return this.gameState
  }
}

export default GameStateUpdater
