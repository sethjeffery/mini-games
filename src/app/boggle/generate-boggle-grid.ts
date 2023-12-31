import getPointsRandomly from './get-points-randomly'

type Grid = string[][]

const boggleDice = {
  en: [
    ['QBZJXK', 'TOUOTC', 'OVWRGR', 'AAAFSR', 'AUMEEO'],
    ['HHLRDC', 'NHDTHO', 'LHNROD', 'AFAISR', 'YIFASR'],
    ['TELPCI', 'SSNSEU', 'RIYPRH', 'DORDLN', 'CCWNST'],
    ['TTOTEM', 'SCTIEP', 'EANDNN', 'MNNEAG', 'UOTOWN'],
    ['AEAEEE', 'YIFPSR', 'EEEEMA', 'ITITIE', 'ETILIC'],
  ],
}

function randomElement(array: string[]): string {
  return array[Math.floor(Math.random() * array.length)]
}

function generateBoggleGrid(size: 4 | 5 = 4): Grid {
  const grid: Grid = Array(size)
    .fill(null)
    .map(() => Array(size).fill(' '))

  const dicePoints = getPointsRandomly(boggleDice.en.length)
  const gridPoints = getPointsRandomly(size)

  for (let i = 0; i < gridPoints.length; i++) {
    const [gx, gy] = gridPoints[i]
    const [dx, dy] = dicePoints[i]
    grid[gx][gy] = randomElement(boggleDice.en[dx][dy].split(''))
  }

  return grid
}

export default generateBoggleGrid
