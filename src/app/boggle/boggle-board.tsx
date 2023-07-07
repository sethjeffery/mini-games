'use client'

import clsx from 'clsx'
import BoggleBoardLetter from './boggle-board-letter'
import BoggleWordEntry from './boggle-word-entry'
import useBoggleBoard from './hooks/use-boggle-board'
import useBoggleDrag from './hooks/use-boggle-drag'

interface BoggleBoardProps {
  boggleGrid: string[][]
  onAddWord: (word: string) => void
}

function BoggleBoard({ boggleGrid, onAddWord }: BoggleBoardProps) {
  const {
    dict,
    selectedLetters,
    handleLetterClick,
    handleReset,
    handleSubmit,
  } = useBoggleBoard(onAddWord)

  const { handleMouseDown, handleMouseMove, ref } = useBoggleDrag({
    size: 72.0,
    offset: 36.0,
    onClick: handleLetterClick,
    selectedLetters,
    boggleGrid,
  })

  if (!dict) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-24 font-grandstander text-3xl">
        Loading...
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-24">
      <div
        className={clsx(
          'grid gap-2 border-2 rounded-lg border-[#95660f] p-1 pb-2 shadow-[0_8px_0_0_#95660f] bg-white relative select-none',
          boggleGrid[0].length === 4 && 'grid-cols-4',
          boggleGrid[0].length === 5 && 'grid-cols-5',
          boggleGrid[0].length === 6 && 'grid-cols-6',
        )}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        ref={ref}
      >
        {boggleGrid.map((row, rowIndex) =>
          row.map((letter, columnIndex) => (
            <BoggleBoardLetter
              key={`${rowIndex}-${columnIndex}`}
              letter={letter}
              rowIndex={rowIndex}
              columnIndex={columnIndex}
              selectedLetters={selectedLetters}
              onClick={handleLetterClick}
            />
          )),
        )}
      </div>
      <BoggleWordEntry
        selectedLetters={selectedLetters}
        dict={dict}
        onSubmit={handleSubmit}
        onReset={handleReset}
      />
    </div>
  )
}

export default BoggleBoard
