'use client'

import { Set } from 'immutable'
import { useState } from 'react'
import BoggleBoard from './boggle-board'
import BoggleWordsList from './boggle-words-list'
import generateBoggleGrid from './generate-boggle-grid'

export default function BogglePage() {
  const [words, setWords] = useState<Set<string>>(Set())
  const [grid] = useState(generateBoggleGrid(5))

  const addWord = (word: string) => setWords((prev) => prev.add(word))

  return (
    <>
      <BoggleBoard onAddWord={addWord} boggleGrid={grid} />
      <BoggleWordsList words={words} />
    </>
  )
}
