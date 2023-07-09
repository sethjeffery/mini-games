import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { WordfallWordType } from './wordfall-game-state'
import WordfallWord from './wordfall-word'

const WordfallSpace = ({
  state,
  words,
  score,
  onStart,
}: {
  state: string
  words: WordfallWordType[]
  score: number
  onStart: () => void
}) => {
  const [playedOnce, setPlayedOnce] = useState(false)

  useEffect(() => {
    if (state === 'gameover') setPlayedOnce(true)
  }, [state])

  const highScore = parseInt(localStorage.getItem('wordfall-high-score') || '0')
  const title = playedOnce ? 'GAME OVER' : 'WORD FALL'
  const playText = playedOnce ? 'PLAY AGAIN' : 'PLAY'

  return (
    <div
      className="flex flex-1 w-full bg-gradient-to-b from-[#dee9ef] to-[#f9fcff] relative overflow-hidden"
      id="game-space"
    >
      <div
        className={clsx(
          'flex flex-col gap-4 items-center justify-center w-full h-full relative z-10',
          state === 'playing' && 'pointer-events-none',
        )}
      >
        <div
          className={clsx(
            'text-7xl font-grandstander flex transition-all duration-500',
            state === 'playing'
              ? 'opacity-0 -translate-y-8 invisible'
              : 'opacity-100 translate-y-0 visible',
          )}
        >
          <div>{title.split(' ')[0]}</div>
          <div className="-rotate-6 translate-y-2">{title.split(' ')[1]}</div>
        </div>
        <div
          className={clsx(
            'flex flex-col justify-center transition-all duration-500',
            state === 'playing'
              ? 'opacity-0 translate-y-8 invisible'
              : 'opacity-100 translate-y-0 visible',
          )}
        >
          <button
            onClick={onStart}
            className="font-mono text-xl relative uppercase bg-red-600 text-white hover:bg-red-500 px-8 py-2 rounded-full shadow-[0_4px_0_#800] active:shadow-[0_2px_0_#800] active:top-[2px]"
          >
            {playText}
          </button>
          {playedOnce ? (
            <div className="text-lg font-sans mt-4 gap-6 flex">
              <span>Your score: {score}</span>
              <span>Best score: {highScore}</span>
            </div>
          ) : (
            <div className="text-lg font-sans mt-4">
              Type the words before they hit the ground!
            </div>
          )}
        </div>
      </div>
      {words.map((word) => (
        <WordfallWord key={word.word} {...word} />
      ))}
    </div>
  )
}

export default WordfallSpace
