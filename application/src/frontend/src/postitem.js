/**
 * @file postitem.js
 * @description Product creation form component for listing new items.
 * Allows users to submit new products with title, price, category, and image.
 * @author Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth_controller';
import './style.css';

/**
 * PostItem component - Product creation form
 * @component
 * @returns {React.ReactElement} Form for creating new product listings
 */
const PostItem = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const [course, setCourse] = useState('');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [successMessage, setSuccessMessage] = useState('');

  /**
   * Handle form submission for creating new product
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('course', course);
        if (image) {
            formData.append('image', image);
        }

         try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/post`, {
                method: 'POST',
                credentials: 'include', // Include credentials for session management
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to create post');
            }

            const result = await response.json();
            setSuccessMessage('Post created successfully! \n Please give our team 24 hours to review before it is made public'); // Display success message
            sessionStorage.removeItem("postDraft");
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
            // You can redirect or display success message here
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    useEffect(() => {
        const savedData = sessionStorage.getItem("postDraft");
        if (savedData) {
            const { title, description, price, category, course } = JSON.parse(savedData);
            setTitle(title);
            setDescription(description);
            setPrice(price);
            setCategory(category);
            setCourse(course);
        }
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/categories`);
                if (!response.ok) throw new Error('Failed to fetch categories');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div id="form-page">
            <form className="post-item-form" onSubmit={handleSubmit}>
                <h2 className="form-title">Post an Item</h2>
                <p className="mandatory-fields">* All fields mandatory</p>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter the item title"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter price"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Select a category</option>
                            {categories.map((cat, idx) => (
                            <option key={idx} value={cat.name}>{cat.name}</option>
                  
                        ))}
                    </select>
                </div>
                {category === "Class Books" && (
                    <div className="form-group">
                        <label htmlFor="course">Course (Optional):</label>
                        <input
                            type="text"
                            id="course"
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            placeholder="Enter course name or code"
                        />
                    </div>
                )}
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter a description of the item"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image:</label>
                    <input
                        type="file"
                        id="image"
                        onChange={handleImageChange}
                        accept="image/*"
                        required
                    />
                </div>
                {successMessage && (
                    <div style={{
                        position: 'fixed',
                        top: '1.5rem',
                        right: '1.5rem',
                        backgroundColor: '#d4edda',
                        color: '#155724',
                        padding: '1rem 1.5rem',
                        borderRadius: '8px',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                        zIndex: 1000,
                        fontWeight: 'bold',
                    }}>
                        {successMessage}
                    </div>
                )}
                {isLoggedIn ? (
                    <button type="submit" className="post-item-button">Post Item</button>
                ) : (
                    <button
                        type="button"
                        className="post-item-button"
                        onClick={() => {
                            // Save form state to sessionStorage
                            sessionStorage.setItem("postDraft", JSON.stringify({
                                title,
                                description,
                                price,
                                category,
                                course
                            }));
                            // Redirect to sign in
                            navigate('/signin?redirect=/postitem');
                        }}
                    >
                        Sign In to Post
                    </button>
                )}
                <p className="approval-notice">Posts will be approved within 24 hours</p>
            </form>
        </div>
    );
};

export default PostItem;