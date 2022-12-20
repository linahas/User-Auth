import React, { useEffect, useState } from 'react'
import AddProduct from '../components/AddProduct';
import ProductDetails from '../components/ProductDetails';
import { Container } from "reactstrap"
import axios from "axios"


const Home = () => {
  const [products, setproducts] = useState([]);
  const [product, setproduct] = useState(null);
  const [loading, setloading] = useState(false)
  const [open, setopen] = useState(false);

  const toggleModal = () => {
    setopen(!open)
  }

  useEffect(() => {
    const fetchProducts = async () => {
      let prods = await fetch("/api/products/")
      const json = await prods.json()

      if (Response.ok) {
        setproducts(json)
      }
    }

    fetchProducts()

  }, [])
  useEffect(() => {
    const fetchProducts = async () => {
      setloading(true)
      let prods = await axios.get("http://127.0.0.1:9900/api/products/")
      setproducts(prods.data.Products)
    }
    fetchProducts()
  }, [product])


  useEffect(() => {
    if (products.length > 0) {
      setloading(false)
    }
  }, [products])



  return (
    <Container>
      
      <h2>List of products</h2>
      {products !== undefined && products !== null && products.length > 0 ?
        products.map((item) => {
          return (
            <ProductDetails product={item} />
          )
        })

        :
        <p> no products found.</p>
      }

    <AddProduct
        open={open}
        product={product}
        toggle={toggleModal}
        setproduct={setproduct}
      />

    </Container>
    
  )
}

export default Home