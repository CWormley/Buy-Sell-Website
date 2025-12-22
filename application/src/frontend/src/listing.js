/**
 * @file listing.js
 * @description Product detail/listing page component.
 * Displays full product information including image, title, price, category, and description.
 * Provides link to contact seller messaging interface.
 * @author Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
 * @version 1.0.0
 */

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

/**
 * Listing component - Product detail view
 * @component
 * @returns {React.ReactElement} Product detail with image and specifications
 */
const Listing = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  /**
   * Fetch product details and image on component mount
   */
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/show_product/${productId}`
        );
        const data = (await response.json())[0];
                const data = (await response.json())[0];

                const filename = data.images;
                const imageResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/protected-image/${filename}`);

                if (!imageResponse.ok) {
                    throw new Error('Failed to load image');
                }

                const imageBlob = await imageResponse.blob();
                const imageObjectURL = URL.createObjectURL(imageBlob);

                const formatted = {
                    id: data.product_id,
                    title: data.title,
                    description: data.description,
                    price: data.price,
                    category: data.category,
                    class_name: data.class_name,
                    image: imageObjectURL
                };

                setProduct(formatted);
                console.log('Product fetched:', formatted);
            } catch (error) {
                console.error('Failed to fetch product:', error);
            }
        };

        fetchProduct();
    }, [productId]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>

            <div className="listing-detail" style={{ padding: '2rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>

                <div style={{ flex: 1, minWidth: '300px' }}>
                    <img
                        src={product.image}
                        alt= {product.title }
                        style={{ width: '100%', maxWidth: '500px', borderRadius: '8px' }}
                    />
                </div>

                <div style={{ flex: 1, minWidth: '300px' }}>
                    <h2>{product.title}</h2>
                    <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}> ${product.price}</p>
                    <p><strong>Category:</strong> {product.category}</p>
                    {product.class_name && (
                        <p><strong>Course:</strong> {product.class_name}</p>
                    )}
                    <div style={{ marginTop: '1rem' }}>
                        <p><strong>Description:</strong></p>
                        <p>{product.description}</p>
                            
                    
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                    <Link
                        to="/message"
                        state={{ product }}
                        style={{ textDecoration: 'none' }}
                        >
                        <button style={{
                            padding: '0.6rem 1.2rem',
                            backgroundColor: '#4a3c6a',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer'
                        }}>
                            Contact Seller
                        </button>
                    </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Listing;
