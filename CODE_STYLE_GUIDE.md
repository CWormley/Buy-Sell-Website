# Gator Market - Code Style Guide

## Overview
This guide documents the code styling conventions applied throughout the Gator Market project.

---

## JavaScript/Node.js Style

### File Headers
Every file should start with a JSDoc comment block:

```javascript
/**
 * @file filename.js
 * @description Brief description of what this file does
 * @author Names
 * @version 1.0.0
 */
```

### Variable Naming
- **camelCase** for variables and functions
  ```javascript
  const userId = 123;
  const productTitle = 'Textbook';
  ```

- **UPPER_SNAKE_CASE** for constants
  ```javascript
  const MAX_CONNECTIONS = 10;
  const DATABASE_HOST = 'localhost';
  ```

- **PascalCase** for classes and components
  ```javascript
  class Product { }
  const MyComponent = () => { }
  ```

### Indentation & Spacing
- **2 spaces** for indentation (no tabs)
- **Blank line** between logical sections
- **Space around operators**: `a + b`, `if (condition)`
- **No space** inside parentheses: `func()` not `func( )`

### Function Documentation
All functions should include JSDoc:

```javascript
/**
 * Brief description of function purpose
 * @param {type} paramName - Description
 * @returns {type} What is returned
 * @throws {Error} When errors occur
 */
async function fetchData(userId) {
  // implementation
}
```

### Error Handling
Always use try-catch with meaningful messages:

```javascript
try {
  const result = await db.query(sql, params);
  res.json(result);
} catch (error) {
  console.error('Specific error context:', error);
  res.status(500).json({ error: 'User-friendly message' });
}
```

---

## Express/Backend Conventions

### Route Organization
Organize routes into sections with comments:

```javascript
// ==================== Middleware Configuration ====================
app.use(express.json());

// ==================== Route Imports ====================
const routes = require('./routes');

// ==================== Route Configuration ====================
app.use('/api/endpoint', routes);
```

### Route Handlers
Use consistent structure:

```javascript
/**
 * GET /api/resource
 * @route GET /
 * @returns {Object} Resource data
 */
router.get('/', async (req, res) => {
  try {
    const data = await db.query(sql, params);
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});
```

### Database Queries
- Always use parameterized queries
- Format queries for readability
- Extract parameters to variables

```javascript
const [results] = await db.query(
  `SELECT * FROM users 
   WHERE email = ? AND active = 1`,
  [email]
);
```

### Status Codes
Use appropriate HTTP status codes:
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

---

## React/Frontend Conventions

### Component Structure
```javascript
/**
 * @component
 * Brief description
 * @returns {React.ReactElement} Component JSX
 */
const ComponentName = ({ prop1, prop2 }) => {
  // State declarations
  const [state, setState] = useState(initial);

  // Effects
  useEffect(() => {
    // Side effects
  }, [dependencies]);

  // Helper functions
  const helperFunction = () => { };

  // Render
  return (
    <div>
      {/* JSX content */}
    </div>
  );
};

export default ComponentName;
```

### Imports Organization
1. React imports
2. Third-party libraries
3. Custom components
4. Styles

```javascript
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MyComponent from './MyComponent';
import './style.css';
```

### Hook Usage
- All hooks at the top of component
- Meaningful dependency arrays
- Clean up in effect returns

```javascript
useEffect(() => {
  // Setup
  return () => {
    // Cleanup
  };
}, [dependency]);
```

### Props & Destructuring
Always destructure props in function signature:

```javascript
// Good
const Card = ({ title, description, price }) => {
  return <div>{title}</div>;
};

// Avoid
const Card = (props) => {
  return <div>{props.title}</div>;
};
```

---

## Naming Conventions

### API Routes
- Use **kebab-case** for route paths
- Describe resource, not action
  ```javascript
  /api/user-products      // Good
  /api/getUserProducts    // Avoid
  /api/getProducts        // Avoid
  ```

### Database Operations
- Use **snake_case** for database fields
- Use **camelCase** in JavaScript

### File Names
- **Components**: PascalCase `HomePage.js`
- **Utilities**: camelCase `utilities.js`
- **Routes**: camelCase `product-routes.js`

---

## Comments & Documentation

### When to Comment
- Complex logic needing explanation
- Non-obvious purpose of code section
- Important business rules
- Workarounds and hacks

### Comment Style
```javascript
// Single line comments start with lowercase after //

/*
 * Multi-line comments
 * explain complex logic
 */
```

### Avoid
- Comments that restate code
- Outdated comments
- Debug console.logs
- TODO comments without context

---

## Code Quality Checklist

Before committing code:

- [ ] All functions have JSDoc comments
- [ ] Variable names are descriptive (camelCase)
- [ ] Indentation is consistent (2 spaces)
- [ ] No unused imports or variables
- [ ] Error handling is present
- [ ] Database queries are parameterized
- [ ] Routes are properly documented
- [ ] Code follows DRY principle
- [ ] No hardcoded values (use constants)
- [ ] No console.log debug statements

---

## Tools & Integration

### Recommended Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Pre-commit hooks
- **Jest** - Testing

### .eslintrc Example
```json
{
  "env": {
    "node": true,
    "es2021": true,
    "browser": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "indent": ["error", 2],
    "quotes": ["error", "single"],
    "semi": ["error", "always"]
  }
}
```

---

## Examples

### Good Code Example
```javascript
/**
 * Fetches user profile data from database
 * @async
 * @param {number} userId - User ID
 * @returns {Promise<Object>} User profile object
 */
async function getUserProfile(userId) {
  try {
    const [user] = await db.query(
      'SELECT * FROM User WHERE user_id = ?',
      [userId]
    );
    
    if (!user) {
      throw new Error('User not found');
    }
    
    return user;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}
```

### Avoid
```javascript
// No comment/documentation
// Poor variable names
// No error handling
function getUser(id) {
  const u = db.query('SELECT * FROM User WHERE user_id = ' + id);
  return u;
}
```

---

## References

- [JSDoc](https://jsdoc.app/)
- [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Express Best Practices](https://expressjs.com/en/advanced/best-practices-security.html)
- [React Style Guide](https://react.dev/)

---

Last Updated: December 2025
