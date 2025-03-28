'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Theme, Header, HeaderName, HeaderGlobalBar, HeaderGlobalAction } from '@carbon/react';
import { Moon, Sun, Logout } from '@carbon/icons-react';


export default function ProductList() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<'g100' | 'white'>('g100'); // Default to dark theme

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'g100' ? 'white' : 'g100'));
  };

  const handleLogout = () => {
    // Handle logout logic here
    router.push('/'); // Redirect to login page
  };

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        return res.json();
      })
      .then((data) => setProducts(data.products)) // Fetch all products
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (products.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Theme theme={theme}>
      <>
        {/* Navigation Bar */}
        <Header aria-label="Intellispheere Navbar">
          <HeaderName prefix="">Intellispheere</HeaderName>
          <HeaderGlobalBar>
            <HeaderGlobalAction aria-label="Toggle theme" onClick={toggleTheme}>
              {theme === 'g100' ? <Sun size={20} /> : <Moon size={20} />}
            </HeaderGlobalAction>
            <HeaderGlobalAction
              aria-label="Logout"
              onClick={handleLogout}
            >
              <Logout size={20} />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
        </Header>

        <div className="containerproducts">
          <br></br>
          <h1>All Products</h1>
          <div className="productgrid">
            {products.map((product) => (
              <div key={product.id} className="productcard">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="productcardImage"
                />
                <p>{product.title}</p>
                <p><strong>${product.price}</strong></p>
                <Button
                  kind="primary"
                  onClick={() => router.push(`/products/product/${product.id}`)}
                >
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </div>
      </>
    </Theme>
  );
}