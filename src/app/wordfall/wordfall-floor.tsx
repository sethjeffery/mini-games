import clsx from 'clsx'
import Image from 'next/image'
import heart from './heart.svg'
import { MAX_LIVES } from './wordfall-game-state'

const WordfallFloor = ({ lives, score }: { lives: number; score: number }) => (
  <div className="mt-auto h-[15%] w-full border-t border-[#0f1f95] bg-[#a3c5d4] flex items-center px-8">
    <div className="flex gap-2">
      {Array.from({ length: MAX_LIVES }).map((_, i) => (
        <Image
          key={i}
          src={heart}
          alt="Heart"
          className={clsx(
            'w-8 h-8 transition-all duration-700',
            i < lives ? 'opacity-100' : 'opacity-25 grayscale',
          )}
        />
      ))}
    </div>
    <div className="ml-auto text-xl font-grandstander">
      <span className="text-4xl">{score}</span> points
    </div>
  </div>
)

export default WordfallFloor
