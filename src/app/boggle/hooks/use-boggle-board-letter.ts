import { BoggleLetter } from '@/types/letter'
import { useMemo } from 'react'
import canClick from '../can-click'
import isSelected from '../is-selected'

function useBoggleBoardLetter(
  row: number,
  column: number,
  letter: string,
  selectedLetters: BoggleLetter[],
) {
  return useMemo(() => {
    return {
      canClick: canClick(row, column, letter, selectedLetters),
      selected: isSelected(row, column, letter, selectedLetters),
    }
  }, [row, column, letter, selectedLetters])
}

export default useBoggleBoardLetter
