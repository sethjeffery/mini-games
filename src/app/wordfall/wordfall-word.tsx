import { CSSProperties, useMemo } from 'react'
import ScrabbleLetter from '../scrabble-letter'
import { WordfallWordType } from './wordfall-game-state'

const RANDOM_SALT = 10000

function seedRandom(inputSeed: number) {
  let seed = inputSeed
  return function random(max: number) {
    const x = Math.sin(seed++) * RANDOM_SALT
    return Math.floor((x - Math.floor(x)) * max)
  }
}

const buildParticles = (word: string, particles = 20) => {
  const hashCode = (function (str: string) {
    let hash = 0
    if (str.length === 0) return hash
    for (let i = 0; i < str.length; i++) {
      const chr = str.charCodeAt(i)
      hash = (hash << 5) - hash + chr
      hash |= 0 // Convert to 32bit integer
    }
    return hash
  })(word)

  const rand = seedRandom(hashCode)

  return Array.from({ length: word.length }, (_, letterIndex) =>
    Array.from({ length: particles }, (_, i) => {
      const color = `hsl(${10 + rand(80)}, ${rand(60) + 30}%, ${
        rand(30) + 25
      }%)`
      const distance = 10 + rand(80)
      const size = `${4 + rand(6)}px`
      const rotate = `${rand(360)}deg`
      const squash = 1

      return {
        '--p-color': color,
        '--p-distance': `${distance}px`,
        '--p-rotate': rotate,
        '--p-size': size,
        '--p-squash': squash,
        '--p-duration': `${(distance + letterIndex * 10) * (rand(10) + 2)}ms`,
      } as CSSProperties
    }),
  )
}

function WordfallWord(props: WordfallWordType) {
  const { x, y, word, dead, completion, complete } = props
  const particles = useMemo(() => buildParticles(word), [word])

  return (
    <div
      className="flex flex-row flex-wrap justify-center gap-1 font-mono absolute"
      style={{
        bottom: `calc(${100 - y + '%'} + 4px)`,
        left: x,
      }}
    >
      {word.split('').map((letter, index) =>
        complete ? (
          <div className="explosion w-12 h-12" key={index}>
            {particles[index].map((particle, index) => (
              <div key={index} className="particle" style={particle} />
            ))}
          </div>
        ) : (
          <ScrabbleLetter
            key={index}
            letter={letter}
            width={12}
            depth={4}
            dead={dead}
            selected={!dead && completion > index}
          />
        ),
      )}
    </div>
  )
}

export default WordfallWord
