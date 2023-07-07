import { BoggleLetter } from '@/types/letter'

const isAdjacent = (lastLetter: BoggleLetter, newLetter: BoggleLetter) => {
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (
        lastLetter.row + i === newLetter.row &&
        lastLetter.column + j === newLetter.column
      ) {
        return true
      }
    }
  }
  return false
}

export default isAdjacent
