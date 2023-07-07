import { BoggleLetter } from '@/types/letter'
import ScrabbleLetter from '../scrabble-letter'
import useBoggleBoardLetter from './hooks/use-boggle-board-letter'

interface BoggleLetterProps {
  letter: string
  rowIndex: number
  columnIndex: number
  selectedLetters: BoggleLetter[]
  onClick: (row: number, column: number, newLetter: BoggleLetter) => void
}

function BoggleBoardLetter({
  letter,
  rowIndex,
  columnIndex,
  selectedLetters,
}: BoggleLetterProps) {
  const { selected, canClick } = useBoggleBoardLetter(
    rowIndex,
    columnIndex,
    letter,
    selectedLetters,
  )

  return (
    <ScrabbleLetter
      width={16}
      depth={2}
      letter={letter}
      hover={canClick && !selected}
      selected={selected}
      disabled={!canClick && !selected}
    />
  )
}

export default BoggleBoardLetter
