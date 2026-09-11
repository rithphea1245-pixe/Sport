// import React from 'react'

import { ProductDetail1 } from "@/components/product-detail1";

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
      {/* ProductID:{id} */}
      <ProductDetail1></ProductDetail1>
    </div>
  )
}
