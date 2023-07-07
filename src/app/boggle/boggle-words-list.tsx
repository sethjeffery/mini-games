import clsx from 'clsx'
import { Set } from 'immutable'
import { useEffect, useMemo, useState } from 'react'

function calculateScore(words: Set<string>) {
  // 3 letters = 1 point
  // 4 letters = 2 points
  // etc
  return words.reduce((score, word) => score + Math.max(0, word.length - 2), 0)
}

function BoggleWordsList({ words }: { words: Set<string> }) {
  const [bestScore, setBestScore] = useState(0)

  const groupedByCount = useMemo(() => {
    const grouped: string[][] = []
    words.forEach((word) => {
      const count = word.length
      if (!grouped[count]) grouped[count] = []
      grouped[count].push(word)
    })
    return grouped
  }, [words])

  const score = useMemo(() => calculateScore(words), [words])

  useEffect(() => {
    const storedScore = localStorage.getItem('boggle-best-score')
    if (score > bestScore) {
      localStorage.setItem('boggle-best-score', score.toString())
      setBestScore(score)
    } else if (!bestScore && storedScore) {
      setBestScore(parseInt(storedScore))
    }
  }, [score, bestScore])

  return (
    <div className="border-l bg-white p-12 w-[300px] overflow-y-auto max-h-screen">
      <div className="font-mono text-8xl text-gray-400 mb-6">{score}</div>
      {bestScore && (
        <div
          className={clsx(
            'font-grandstander text-xl mb-6',
            score === bestScore ? 'text-yellow-600' : 'text-gray-300',
          )}
        >
          Best: {bestScore}
        </div>
      )}

      {groupedByCount.map(
        (group, letterCount) =>
          group && (
            <div key={letterCount} className="flex flex-col">
              <div className="font-grandstander text-lg text-blue-600">
                {letterCount} letters
              </div>
              <div className="flex flex-wrap gap-y-1 gap-x-4 w-full mb-6">
                {group.map((word) => (
                  <div key={word} className="font-mono gap-1">
                    {word}
                  </div>
                ))}
              </div>
            </div>
          ),
      )}
    </div>
  )
}

export default BoggleWordsList
