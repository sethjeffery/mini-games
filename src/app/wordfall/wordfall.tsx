'use client'

import { useCallback, useEffect, useState } from 'react'
import useSWR from 'swr'
import GameStateTapper from './game-state-tapper'
import GameStateUpdater from './game-state-updater'
import useTick from './use-tick'
import WordfallFloor from './wordfall-floor'
import {
  MAX_LIVES,
  START_LEVEL,
  WordfallGameState,
} from './wordfall-game-state'
import WordfallSpace from './wordfall-space'

const fetcher = (input: RequestInfo | URL, init?: RequestInit) =>
  fetch(input, init).then((res) => res.json())

const initialState: WordfallGameState = {
  words: [],
  level: START_LEVEL,
  timeSinceLastWord: 0,
  lives: MAX_LIVES,
  time: 0,
  score: 0,
  displayScore: 0,
  state: 'intro',
}

function Wordfall() {
  const { data: dict } = useSWR<string[]>('/api/easy-words', fetcher)
  const [gameState, setGameState] = useState<WordfallGameState>(initialState)

  const tick = useCallback(
    (time: number) => {
      if (!dict || gameState.state === 'intro') return
      setGameState((state) => new GameStateUpdater(dict, state, time).tick())
    },
    [dict, gameState.state],
  )

  useTick(tick)

  useEffect(() => {
    if (gameState.state !== 'playing') return
    const handler = (event: KeyboardEvent) => {
      setGameState((state) => new GameStateTapper(state).tap(event.key))
    }
    addEventListener('keydown', handler)
    return () => removeEventListener('keydown', handler)
  }, [gameState.state])

  const handleStartGame = useCallback(() => {
    setGameState({ ...initialState, state: 'playing' })
  }, [])

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <WordfallSpace
        onStart={handleStartGame}
        score={gameState.score}
        words={gameState.words}
        state={gameState.state}
      />
      <WordfallFloor
        lives={gameState.lives}
        score={Math.round(gameState.displayScore)}
      />
    </div>
  )
}

export default Wordfall
