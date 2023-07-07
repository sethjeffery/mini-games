import { BoggleLetter } from '@/types/letter'
import clsx from 'clsx'
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
    <div
      className={clsx(
        'font-mono rounded border-2 border-dotted border-transparent w-16 h-16 text-3xl flex items-center justify-center',
        canClick &&
          !selected &&
          'hover:border-blue-200 hover:bg-blue-50 cursor-pointer',
        !canClick && !selected && 'pointer-events-none opacity-50',
        !selected && canClick && selectedLetters.length > 0 && 'bg-blue-50',
        selected
          ? 'bg-yellow-300 hover:bg-yellow-400 cursor-pointer shadow-[0_2px_0_#caa757]'
          : 'bg-[#f4ead3] shadow-[0_2px_0_#ddc690]',
      )}
    >
      {letter}
    </div>
  )
}

export default BoggleBoardLetter
