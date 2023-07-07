import { BoggleLetter } from '@/types/letter'
import isAdjacent from './is-adjacent'
import isSelected from './is-selected'

const canClick = (
  row: number,
  column: number,
  letter: string,
  selectedLetters: BoggleLetter[],
) =>
  isSelected(row, column, letter, selectedLetters) ||
  selectedLetters.length === 0 ||
  isAdjacent(selectedLetters[selectedLetters.length - 1], {
    row,
    column,
    letter,
  })

export default canClick
