// products.js
router.get('/recent-posts', async (req, res) => {
    try {
      const [recentPosts] = await db.query(`
        SELECT 
          p.product_id,
          p.title,
          p.description,
          p.price,
          c.name AS category,
          u.email AS seller
        FROM Product p
        JOIN Category c ON p.category_id = c.category_id
        JOIN User u ON p.user_id = u.user_id
        ORDER BY p.created_at DESC
        LIMIT 4
      `);
      res.json(recentPosts);
    } catch (error) {
      console.error('Error fetching recent posts:', error);
      res.status(500).json({ error: 'Database query failed' });
    }
  });
  