import { useEffect, useState } from 'react'

const CAT_IMAGE_PREFIX = 'https://cataas.com/cat'

export function useCatImage ({ fact }) {
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    if (!fact) return

    const threeFirstWords = fact.split(' ', 3).join('%20')

    const imageEnd = `/says/${threeFirstWords}?fontSize=50&fontColor=red`

    setImageUrl('')

    fetch(`${CAT_IMAGE_PREFIX}${imageEnd}&json=true`)
      .then((res) => res.json())
      .then((json) => {
        const { _id: id } = json
        setImageUrl(`${CAT_IMAGE_PREFIX}/${id}${imageEnd}`)
      })
  }, [fact])

  return { imageUrl }
}
