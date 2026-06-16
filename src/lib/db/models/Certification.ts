import pool from '../config';
import { Certification, CreateCertificationInput, UpdateCertificationInput } from '../../types';
import { AppError } from '../errors';

export class CertificationModel {
  static async findAll(): Promise<Certification[]> {
    const query = 'SELECT * FROM certifications ORDER BY date DESC';
    const result = await pool.query<Certification>(query);
    return result.rows;
  }

  static async findById(id: number): Promise<Certification | null> {
    const query = 'SELECT * FROM certifications WHERE id = $1';
    const result = await pool.query<Certification>(query, [id]);
    return result.rows[0] || null;
  }

  static async create(input: CreateCertificationInput): Promise<Certification> {
    const query = `
      INSERT INTO certifications (name, issuer, date, description, credential_url)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const result = await pool.query<Certification>(query, [
      input.name, input.issuer, input.date, input.description || null, input.credential_url || null
    ]);
    return result.rows[0];
  }

  static async update(id: number, input: UpdateCertificationInput): Promise<Certification | null> {
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
      UPDATE certifications 
      SET ${updates.join(', ')} 
      WHERE id = $${paramCount} 
      RETURNING *
    `;

    const result = await pool.query<Certification>(query, values);
    return result.rows[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
    const query = 'DELETE FROM certifications WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rowCount !== null && result.rowCount > 0;
  }
}
