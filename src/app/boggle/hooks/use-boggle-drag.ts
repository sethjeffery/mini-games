import { BoggleLetter } from '@/types/letter'
import {
  MouseEvent,
  MouseEventHandler,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import canClick from '../can-click'
import isSelected from '../is-selected'

interface UseBoggleDragProps {
  size: number
  offset: number
  onClick: (row: number, column: number, newLetter: BoggleLetter) => void
  selectedLetters: BoggleLetter[]
  boggleGrid: string[][]
}

function _getRowAndColumn(
  ref: RefObject<HTMLDivElement>,
  e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
  offset: number,
  size: number,
  distance: number = 0.33,
) {
  if (ref.current) {
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - offset) / size
    const y = (e.clientY - rect.top - offset) / size

    if (
      Math.abs(x - Math.round(x)) < distance &&
      Math.abs(y - Math.round(y)) < distance
    ) {
      const column = Math.round(x)
      const row = Math.round(y)
      return [row, column]
    }
  }

  return []
}

function useBoggleDrag({
  size,
  offset,
  onClick,
  boggleGrid,
  selectedLetters,
}: UseBoggleDragProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const getRowAndColumn = useCallback(
    (e: MouseEvent<HTMLDivElement>, distance?: number) =>
      _getRowAndColumn(ref, e, offset, size, distance),
    [offset, size],
  )

  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    setIsDragging(true)

    const [row, column] = getRowAndColumn(e, 0.5)
    if (row !== undefined && column !== undefined) {
      const letter = boggleGrid[row][column]

      if (canClick(row, column, letter, selectedLetters)) {
        setIsDeleting(isSelected(row, column, letter, selectedLetters))
        onClick(row, column, { row, column, letter })
      }
    }
  }

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    if (isDragging) {
      const [row, column] = getRowAndColumn(e)
      if (row !== undefined && column !== undefined) {
        const letter = boggleGrid[row][column]

        if (
          canClick(row, column, letter, selectedLetters) &&
          isSelected(row, column, letter, selectedLetters) === isDeleting
        ) {
          onClick(row, column, { row, column, letter })
        }
      }
    }
  }

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false)
    window.addEventListener('mouseup', handleMouseUp)
    return () => window.removeEventListener('mouseup', handleMouseUp)
  })

  return { handleMouseDown, handleMouseMove, ref }
}

export default useBoggleDrag
