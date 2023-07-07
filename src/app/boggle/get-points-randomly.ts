type Point = [number, number]

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export default function getPointsRandomly(size: number): Point[] {
  const points: Point[] = []
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      points.push([i, j])
    }
  }

  return shuffleArray(points)
}
