import { BoggleLetter } from '@/types/letter'
import clsx from 'clsx'
import { useEffect } from 'react'

interface BoggleWordEntryProps {
  selectedLetters: BoggleLetter[]
  dict: string[]
  onSubmit: (word: string) => void
  onReset: () => void
}

const isWord = (word: string, dict: string[]) =>
  word.length > 2 && dict.includes(word.toLocaleLowerCase())

function BoggleWordEntry({
  selectedLetters,
  dict,
  onSubmit,
  onReset,
}: BoggleWordEntryProps) {
  const word = selectedLetters.map((l) => l.letter).join('')

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onReset()
      if (e.key === 'Enter' && isWord(word, dict)) onSubmit(word)
    }

    document.addEventListener('keydown', handleKeydown)
    return () => {
      document.removeEventListener('keydown', handleKeydown)
    }
  }, [onSubmit, onReset, word, dict])

  return (
    <>
      <p
        className={clsx(
          'text-4xl my-4 font-mono',
          isWord(word, dict) && 'text-green-900',
        )}
      >
        {word}_
      </p>
      <p className={clsx('font-sans', word ? 'opacity-80' : 'opacity-10')}>
        Press ENTER to submit. ESC to cancel.
      </p>
    </>
  )
}

export default BoggleWordEntry
