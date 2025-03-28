'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Theme, Header, HeaderName, HeaderGlobalBar, HeaderGlobalAction } from '@carbon/react';
import { Moon, Sun, Logout } from '@carbon/icons-react';
import styles from './product.module.scss';


interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface Product {
  title: string;
  thumbnail: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  images: string[];
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  meta: {
    barcode: string;
  };
}

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [theme, setTheme] = useState<'g100' | 'white'>('g100'); // Default to dark theme

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'g100' ? 'white' : 'g100'));
  };

  const handleLogout = () => {
    router.push('/'); 
  };

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch product');
        }
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
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
<br></br>
        <div className={styles.container}>
          <br></br>
          <h1>{product.title}</h1>
          <img
            src={product.thumbnail}
            alt={`Image of ${product.title}`}
            className={styles.productImage}
          />
          <p className={styles.productDescription}>{product.description}</p>
          <p className={styles.price}><strong>Price:</strong> ${product.price}</p>
          <p><strong>Discount:</strong> {product.discountPercentage}%</p>
          <p><strong>Rating:</strong> {product.rating} / 5</p>
          <p><strong>Stock:</strong> {product.stock}</p>
          <p><strong>Tags:</strong> {product.tags.join(', ')}</p>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Warranty:</strong> {product.warrantyInformation}</p>
          <p><strong>Shipping:</strong> {product.shippingInformation}</p>
          <p><strong>Availability:</strong> {product.availabilityStatus}</p>
          <p><strong>Return Policy:</strong> {product.returnPolicy}</p>

          <div className={styles.sectionButtons}>
            <Button kind="primary" onClick={() => setActiveSection('reviews')}>
              Show Reviews
            </Button>
            <Button kind="primary" onClick={() => setActiveSection('images')}>
              Show Images
            </Button>
            <Button kind="primary" onClick={() => setActiveSection('details')}>
              Show Details
            </Button>
          </div>

          {activeSection === 'reviews' && (
            <div className={styles.reviewsSection}>
              <h2>Reviews</h2>
              {product.reviews.length > 0 ? (
                <ul>
                  {product.reviews.map((review, index) => (
                    <li key={index}>
                      <p><strong>{review.reviewerName}</strong> ({review.rating} / 5)</p>
                      <p>{review.comment}</p>
                      <p><em>{new Date(review.date).toLocaleDateString()}</em></p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No reviews available.</p>
              )}
            </div>
          )}

          {activeSection === 'images' && (
            <div className={styles.imageGallery}>
              <h2>Images</h2>
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Additional view of ${product.title}`}
                  className={styles.additionalImage}
                />
              ))}
            </div>
          )}

          {activeSection === 'details' && (
            <div className={styles.detailsSection}>
              <h2>Additional Details</h2>
              <p><strong>SKU:</strong> {product.sku}</p>
              <p><strong>Weight:</strong> {product.weight} kg</p>
              <p><strong>Dimensions:</strong> {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm</p>
              <p><strong>Barcode:</strong> {product.meta.barcode}</p>
            </div>
          )}

          <div className={styles.buttonContainer}>
            <Button kind="secondary" onClick={() => router.back()}>
              Go Back
            </Button>
          </div>
        </div>
      </>
    </Theme>
  );
}