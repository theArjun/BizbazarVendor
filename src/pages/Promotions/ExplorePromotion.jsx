import React from 'react'
import { useParams } from 'react-router-dom'
const ExplorePromotion = () => {
const param= useParams('id')
console.log(param)
  return (
    <div>ExplorePromotion</div>
  )
}

export default ExplorePromotion