import React, { useState } from "react";
import './style.css';

const PostItem = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState(''); // New state for category
    const [course, setCourse] = useState(''); // New state for course

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to handle form submission (e.g., API call)
        console.log("Title:", title);
        console.log("Description:", description);
        console.log("Price:", price);
        console.log("Image:", image);
        console.log("Category:", category);
        console.log("Course:", course);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div id="form-page">
            <form className="post-item-form" onSubmit={handleSubmit}>
                <h2 className="form-title">Post an Item</h2>
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
                        placeholder="Enter the price"
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
                        <option value="Class Books">Class Books</option>
                        <option value="Home Goods">Home Goods</option>
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
                            placeholder="Enter the course name or code"
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
                <button type="submit" className="post-item-button">Post Item</button>
            </form>
        </div>
    );
};

export default PostItem;