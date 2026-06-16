import pool from '../config';
import { Achievement, CreateAchievementInput, UpdateAchievementInput } from '../../types';
import { AppError } from '../errors';

export class AchievementModel {
  static async findAll(): Promise<Achievement[]> {
    const query = 'SELECT * FROM achievements ORDER BY year DESC';
    const result = await pool.query<Achievement>(query);
    return result.rows;
  }

  static async findById(id: number): Promise<Achievement | null> {
    const query = 'SELECT * FROM achievements WHERE id = $1';
    const result = await pool.query<Achievement>(query, [id]);
    return result.rows[0] || null;
  }

  static async create(input: CreateAchievementInput): Promise<Achievement> {
    const query = `
      INSERT INTO achievements (title, description, year)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const result = await pool.query<Achievement>(query, [
      input.title, input.description || null, input.year
    ]);
    return result.rows[0];
  }

  static async update(id: number, input: UpdateAchievementInput): Promise<Achievement | null> {
    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    Object.entries(input).forEach(([key, value]) => {
      if (value !== undefined && key !== 'id' && key !== 'created_at' && key !== 'updated_at') {
        updates.push(`${key} = $${paramCount++}`);
        values.push(value);
      }
    });

    if (updates.length === 0) {
      throw new AppError('No fields to update', 400);
    }

    updates.push(`updated_at = NOW()`);
    values.push(id);

    const query = `
      UPDATE achievements 
      SET ${updates.join(', ')} 
      WHERE id = $${paramCount} 
      RETURNING *
    `;

    const result = await pool.query<Achievement>(query, values);
    return result.rows[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
    const query = 'DELETE FROM achievements WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rowCount !== null && result.rowCount > 0;
  }
}
