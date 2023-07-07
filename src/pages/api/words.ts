import { NextApiRequest, NextApiResponse } from 'next'
import wordlist from 'wordlist-english'

const words = (req: NextApiRequest, res: NextApiResponse) => {
  res
    .status(200)
    .json(
      Array.prototype.concat(
        [],
        wordlist['english/10'],
        wordlist['english/20'],
        wordlist['english/35'],
        wordlist['english/40'],
        wordlist['english/50'],
      ),
    )
}

export default words
