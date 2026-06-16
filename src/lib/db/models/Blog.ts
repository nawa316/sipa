import pool from '../config';
import { Blog, CreateBlogInput, UpdateBlogInput } from '../../types';
import { AppError } from '../errors';

export class BlogModel {
  // Get all blogs
  static async findAll(): Promise<Blog[]> {
    const query = 'SELECT * FROM blogs ORDER BY published_at DESC, created_at DESC';
    const result = await pool.query<Blog>(query);
    return result.rows;
  }

  // Get blog by ID
  static async findById(id: number): Promise<Blog | null> {
    const query = 'SELECT * FROM blogs WHERE id = $1';
    const result = await pool.query<Blog>(query, [id]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return result.rows[0];
  }

  // Get blog by slug
  static async findBySlug(slug: string): Promise<Blog | null> {
    const query = 'SELECT * FROM blogs WHERE slug = $1';
    const result = await pool.query<Blog>(query, [slug]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return result.rows[0];
  }

  // Get blogs by category
  static async findByCategory(category: string): Promise<Blog[]> {
    const query = 'SELECT * FROM blogs WHERE category = $1 ORDER BY published_at DESC';
    const result = await pool.query<Blog>(query, [category]);
    return result.rows;
  }

  // Get blogs by tag
  static async findByTag(tag: string): Promise<Blog[]> {
    const query = 'SELECT * FROM blogs WHERE $1 = ANY(tags) ORDER BY published_at DESC';
    const result = await pool.query<Blog>(query, [tag]);
    return result.rows;
  }

  // Create new blog
  static async create(input: CreateBlogInput): Promise<Blog> {
    const { 
      title, 
      slug, 
      excerpt, 
      content, 
      image, 
      author, 
      category, 
      tags, 
      published_at,
      read_time 
    } = input;
    
    const query = `
      INSERT INTO blogs (
        title, slug, excerpt, content, image, author, category, tags, published_at, read_time
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
      RETURNING *
    `;
    
    const result = await pool.query<Blog>(query, [
      title,
      slug,
      excerpt || null,
      content,
      image || null,
      author || 'Muhammad Ade Dzakwan',
      category,
      tags || [],
      published_at || new Date(),
      read_time || 5
    ]);
    
    return result.rows[0];
  }

  // Update blog
  static async update(id: number, input: UpdateBlogInput): Promise<Blog | null> {
    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    // Build dynamic update query
    if (input.title !== undefined) {
      updates.push(`title = $${paramCount++}`);
      values.push(input.title);
    }
    if (input.slug !== undefined) {
      updates.push(`slug = $${paramCount++}`);
      values.push(input.slug);
    }
    if (input.excerpt !== undefined) {
      updates.push(`excerpt = $${paramCount++}`);
      values.push(input.excerpt);
    }
    if (input.content !== undefined) {
      updates.push(`content = $${paramCount++}`);
      values.push(input.content);
    }
    if (input.image !== undefined) {
      updates.push(`image = $${paramCount++}`);
      values.push(input.image);
    }
    if (input.author !== undefined) {
      updates.push(`author = $${paramCount++}`);
      values.push(input.author);
    }
    if (input.category !== undefined) {
      updates.push(`category = $${paramCount++}`);
      values.push(input.category);
    }
    if (input.tags !== undefined) {
      updates.push(`tags = $${paramCount++}`);
      values.push(input.tags);
    }
    if (input.published_at !== undefined) {
      updates.push(`published_at = $${paramCount++}`);
      values.push(input.published_at);
    }
    if (input.read_time !== undefined) {
      updates.push(`read_time = $${paramCount++}`);
      values.push(input.read_time);
    }

    if (updates.length === 0) {
      throw new AppError('No fields to update', 400);
    }

    updates.push(`updated_at = NOW()`);
    values.push(id);

    const query = `
      UPDATE blogs 
      SET ${updates.join(', ')} 
      WHERE id = $${paramCount} 
      RETURNING *
    `;

    const result = await pool.query<Blog>(query, values);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return result.rows[0];
  }

  // Delete blog
  static async delete(id: number): Promise<boolean> {
    const query = 'DELETE FROM blogs WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rowCount !== null && result.rowCount > 0;
  }

  // Search blogs by title or content
  static async search(searchTerm: string): Promise<Blog[]> {
    const query = `
      SELECT * FROM blogs 
      WHERE title ILIKE $1 OR content ILIKE $1 OR excerpt ILIKE $1
      ORDER BY published_at DESC
    `;
    const result = await pool.query<Blog>(query, [`%${searchTerm}%`]);
    return result.rows;
  }

  // Get all unique categories
  static async getCategories(): Promise<string[]> {
    const query = 'SELECT DISTINCT category FROM blogs ORDER BY category';
    const result = await pool.query<{ category: string }>(query);
    return result.rows.map((row: any) => row.category);
  }

  // Get all unique tags
  static async getTags(): Promise<string[]> {
    const query = 'SELECT DISTINCT UNNEST(tags) as tag FROM blogs ORDER BY tag';
    const result = await pool.query<{ tag: string }>(query);
    return result.rows.map((row: any) => row.tag);
  }
}
