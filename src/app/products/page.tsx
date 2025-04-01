"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Theme, Grid, Column, Loading } from "@carbon/react";
import Navbar from "../navbar";

export default function ProductList() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<"g100" | "white">("g100");
  const [language, setLanguage] = useState<"English" | "Spanish">("English");

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <Loading description="Loading products..." withOverlay={false} />
      </div>
    );
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <Theme theme={theme}>
      <Navbar theme={theme} setTheme={setTheme} language={language} setLanguage={setLanguage} /> 
      <div className="containerproducts">
                                                                      <br></br> 
                                                                      <br></br>                                                                                
        <h1>All Products</h1>
        <Grid fullWidth className="productgrid">
          {products.map((product) => (
            <Column key={product.id} lg={4} md={9} sm={12} className="productcard">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="productcardImage"
              />
              <p>{product.title}</p>
              <p>
                <strong>${product.price}</strong>
              </p>
              <Button kind="primary" onClick={() => router.push(`/products/product/${product.id}`)}>
                View Details
              </Button>
            </Column>
          ))}
        </Grid>
      </div>
    </Theme>
  );
}