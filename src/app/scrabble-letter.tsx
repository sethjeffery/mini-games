import clsx from 'clsx'

interface ScrabbleLetterProps {
  letter: string
  width: 12 | 16
  depth: 2 | 4
  hover?: boolean
  selected?: boolean
  disabled?: boolean
  dead?: boolean
}

function ScrabbleLetter({
  letter,
  width = 16,
  depth = 2,
  hover,
  selected,
  disabled,
  dead,
}: ScrabbleLetterProps) {
  return (
    <div
      className={clsx(
        'font-mono rounded-md flex items-center justify-center border-dotted border-transparent border-[2px] select-none',
        !selected && !dead && 'bg-[#f6e9ca]',
        width === 16 && 'w-16 h-16 text-3xl',
        width === 12 && 'w-12 h-12 text-3xl',
        depth === 2 && !dead && 'shadow-[0_2px_0_#d8b76b]',
        depth === 4 && !dead && 'shadow-[0_4px_0_0_#d8b76b]',
        disabled && 'pointer-events-none opacity-50',
        hover &&
          !selected &&
          'hover:border-blue-200 hover:bg-blue-50 cursor-pointer',
        !hover && !selected && 'pointer-events-none',
        selected && 'bg-yellow-300',
        selected && hover && 'hover:bg-yellow-400 cursor-pointer',
        selected && depth === 2 && 'shadow-[0_2px_0_#c29325]',
        selected && depth === 4 && 'shadow-[0_4px_0_#c29325]',

        dead && 'bg-blue-300 text-[#486688] pointer-events-none',
        depth === 2 && dead && 'shadow-[0_2px_0_#2e72c1]',
        depth === 4 && dead && 'shadow-[0_4px_0_0_#2e72c1]',
      )}
    >
      {letter}
    </div>
  )
}

export default ScrabbleLetter
