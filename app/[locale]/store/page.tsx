import React from 'react'
import StoreClientPage from './ProductsClientPage'
import { fakeProducts } from '@/data/products'

const page = () => {
  return (
    <>
    <StoreClientPage products={fakeProducts} />
    </>
  )
}

export default page