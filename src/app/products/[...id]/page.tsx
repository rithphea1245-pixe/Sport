// import React from 'react'

// import { param } from "motion/react-client"
// test dynamic rote

export default async function DetailProductPage({
    params
    }:{
    params: Promise<{id : number}>
    }) {
        const {id} = await params;
  return (
    <div>
      ProductID:{id}
    </div>
  )
}
