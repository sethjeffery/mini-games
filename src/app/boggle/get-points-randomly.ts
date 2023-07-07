type Point = [number, number]

const shuffleArray = (array: Point[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
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
