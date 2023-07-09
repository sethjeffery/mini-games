import { NextApiRequest, NextApiResponse } from 'next'
import wordlist from 'wordlist-english'

const easyWords = (req: NextApiRequest, res: NextApiResponse) => {
  res
    .status(200)
    .json(wordlist['english/10'].filter((word) => /^[a-z]+$/.test(word)))
}

export default easyWords
