import pool from '../config';
import { Education, CreateEducationInput, UpdateEducationInput } from '../../types';
import { AppError } from '../errors';

export class EducationModel {
  static async findAll(): Promise<Education[]> {
    const query = 'SELECT * FROM educations ORDER BY start_date DESC';
    const result = await pool.query<Education>(query);
    return result.rows;
  }

  static async findById(id: number): Promise<Education | null> {
    const query = 'SELECT * FROM educations WHERE id = $1';
    const result = await pool.query<Education>(query, [id]);
    return result.rows[0] || null;
  }

  static async create(input: CreateEducationInput): Promise<Education> {
    const query = `
      INSERT INTO educations (institution, degree, major, start_date, end_date, gpa, description)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const result = await pool.query<Education>(query, [
      input.institution, input.degree, input.major || null, input.start_date,
      input.end_date || null, input.gpa || null, input.description || null
    ]);
    return result.rows[0];
  }

  static async update(id: number, input: UpdateEducationInput): Promise<Education | null> {
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
      UPDATE educations 
      SET ${updates.join(', ')} 
      WHERE id = $${paramCount} 
      RETURNING *
    `;

    const result = await pool.query<Education>(query, values);
    return result.rows[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
    const query = 'DELETE FROM educations WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rowCount !== null && result.rowCount > 0;
  }
}
