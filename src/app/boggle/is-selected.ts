import { BoggleLetter } from '@/types/letter'

const isSelected = (
  row: number,
  column: number,
  letter: string,
  selectedLetters: BoggleLetter[],
) =>
  selectedLetters.some(
    (l) => l.row === row && l.column === column && l.letter === letter,
  )

export default isSelected
