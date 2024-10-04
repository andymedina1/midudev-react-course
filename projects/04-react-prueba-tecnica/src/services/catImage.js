export const getCatImage = async (fact) => {
  const threeFirstWords = fact.split(' ', 3).join('%20')
  const CAT_IMAGE_END = `/says/${threeFirstWords}?fontSize=50&fontColor=red`

  const res = await fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`)
  const data = await res.json()
  const { _id: imageId } = data

  return { CAT_IMAGE_END, imageId }
}
