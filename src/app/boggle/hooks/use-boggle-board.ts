import { BoggleLetter } from '@/types/letter'
import { useCallback, useState } from 'react'
import useSWR from 'swr'

const fetcher = (input: RequestInfo | URL, init?: RequestInit) =>
  fetch(input, init).then((res) => res.json())

function useBoggleBoard(onAddWord: (word: string) => void) {
  const [selectedLetters, setSelectedLetters] = useState<BoggleLetter[]>([])
  const { data: dict } = useSWR<string[]>('/api/words', fetcher)

  const handleLetterClick = useCallback(
    (row: number, column: number, newLetter: BoggleLetter) => {
      const alreadySelected = selectedLetters.findIndex(
        (l) => l.row === row && l.column === column,
      )

      if (alreadySelected !== -1) {
        setSelectedLetters((prev) => prev.slice(0, alreadySelected))
      } else {
        setSelectedLetters((prev) => [...prev, newLetter])
      }
    },
    [selectedLetters],
  )

  const handleReset = useCallback(() => {
    setSelectedLetters([])
  }, [])

  const handleSubmit = useCallback(
    (word: string) => {
      onAddWord(word)
      setSelectedLetters([])
    },
    [onAddWord],
  )

  return {
    selectedLetters,
    handleLetterClick,
    dict,
    handleReset,
    handleSubmit,
  }
}

export default useBoggleBoard
