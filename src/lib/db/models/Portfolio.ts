import pool from '../config';
import { Portfolio, CreatePortfolioInput, UpdatePortfolioInput } from '../../types';
import { AppError } from '../errors';

export class PortfolioModel {
  // Get all portfolios
  static async findAll(): Promise<Portfolio[]> {
    const query = 'SELECT * FROM portfolios ORDER BY created_at DESC';
    const result = await pool.query<Portfolio>(query);
    return result.rows;
  }

  // Get portfolio by ID
  static async findById(id: number): Promise<Portfolio | null> {
    const query = 'SELECT * FROM portfolios WHERE id = $1';
    const result = await pool.query<Portfolio>(query, [id]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return result.rows[0];
  }

  // Get portfolios by category
  static async findByCategory(category: string): Promise<Portfolio[]> {
    const query = 'SELECT * FROM portfolios WHERE category = $1 ORDER BY created_at DESC';
    const result = await pool.query<Portfolio>(query, [category]);
    return result.rows;
  }

  // Create new portfolio
  static async create(input: CreatePortfolioInput): Promise<Portfolio> {
    const { title, description, image, technologies, category, link, github } = input;
    
    const query = `
      INSERT INTO portfolios (title, description, image, technologies, category, link, github) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING *
    `;
    
    const result = await pool.query<Portfolio>(
      query, 
      [
        title, 
        description, 
        image || null, 
        technologies || [],
        category,
        link || null, 
        github || null
      ]
    );
    return result.rows[0];
  }

  // Update portfolio
  static async update(id: number, input: UpdatePortfolioInput): Promise<Portfolio | null> {
    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    // Build dynamic update query
    if (input.title !== undefined) {
      updates.push(`title = $${paramCount++}`);
      values.push(input.title);
    }
    if (input.description !== undefined) {
      updates.push(`description = $${paramCount++}`);
      values.push(input.description);
    }
    if (input.image !== undefined) {
      updates.push(`image = $${paramCount++}`);
      values.push(input.image);
    }
    if (input.technologies !== undefined) {
      updates.push(`technologies = $${paramCount++}`);
      values.push(input.technologies);
    }
    if (input.category !== undefined) {
      updates.push(`category = $${paramCount++}`);
      values.push(input.category);
    }
    if (input.link !== undefined) {
      updates.push(`link = $${paramCount++}`);
      values.push(input.link);
    }
    if (input.github !== undefined) {
      updates.push(`github = $${paramCount++}`);
      values.push(input.github);
    }

    if (updates.length === 0) {
      throw new AppError('No fields to update', 400);
    }

    updates.push(`updated_at = NOW()`);
    values.push(id);

    const query = `
      UPDATE portfolios 
      SET ${updates.join(', ')} 
      WHERE id = $${paramCount} 
      RETURNING *
    `;

    const result = await pool.query<Portfolio>(query, values);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return result.rows[0];
  }

  // Delete portfolio
  static async delete(id: number): Promise<boolean> {
    const query = 'DELETE FROM portfolios WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rowCount !== null && result.rowCount > 0;
  }

  // Search portfolios by title or description
  static async search(searchTerm: string): Promise<Portfolio[]> {
    const query = `
      SELECT * FROM portfolios 
      WHERE title ILIKE $1 OR description ILIKE $1 
      ORDER BY created_at DESC
    `;
    const result = await pool.query<Portfolio>(query, [`%${searchTerm}%`]);
    return result.rows;
  }

  // Get all unique categories
  static async getCategories(): Promise<string[]> {
    const query = 'SELECT DISTINCT category FROM portfolios ORDER BY category';
    const result = await pool.query<{ category: string }>(query);
    return result.rows.map((row) => row.category);
  }
}
