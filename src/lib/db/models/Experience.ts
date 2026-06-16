import pool from '../config';
import { Experience, CreateExperienceInput, UpdateExperienceInput } from '../../types';
import { AppError } from '../errors';

export class ExperienceModel {
  // Get all experiences
  static async findAll(): Promise<Experience[]> {
    const query = 'SELECT * FROM experiences ORDER BY (end_date IS NULL) DESC, start_date DESC, created_at DESC';
    const result = await pool.query<Experience>(query);
    return result.rows;
  }

  // Get experience by ID
  static async findById(id: number): Promise<Experience | null> {
    const query = 'SELECT * FROM experiences WHERE id = $1';
    const result = await pool.query<Experience>(query, [id]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return result.rows[0];
  }

  // Get experiences by type
  static async findByType(type: 'organization' | 'work' | 'volunteer'): Promise<Experience[]> {
    const query = 'SELECT * FROM experiences WHERE type = $1 ORDER BY start_date DESC';
    const result = await pool.query<Experience>(query, [type]);
    return result.rows;
  }

  // Get current/ongoing experiences (end_date is NULL)
  static async findCurrent(): Promise<Experience[]> {
    const query = 'SELECT * FROM experiences WHERE end_date IS NULL ORDER BY start_date DESC';
    const result = await pool.query<Experience>(query);
    return result.rows;
  }

  // Create new experience
  static async create(input: CreateExperienceInput): Promise<Experience> {
    const { 
      organization, 
      role, 
      description, 
      image, 
      start_date,
      end_date,
      type,
      skills, 
      location,
      photos
    } = input;
    
    const query = `
      INSERT INTO experiences (
        organization, role, description, image, start_date, end_date, type, skills, location, photos
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
      RETURNING *
    `;
    
    const result = await pool.query<Experience>(query, [
      organization,
      role,
      description,
      image || null,
      start_date,
      end_date || null,
      type,
      skills || [],
      location || null,
      photos || []
    ]);
    
    return result.rows[0];
  }

  // Update experience
  static async update(id: number, input: UpdateExperienceInput): Promise<Experience | null> {
    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    // Build dynamic update query
    if (input.organization !== undefined) {
      updates.push(`organization = $${paramCount++}`);
      values.push(input.organization);
    }
    if (input.role !== undefined) {
      updates.push(`role = $${paramCount++}`);
      values.push(input.role);
    }
    if (input.description !== undefined) {
      updates.push(`description = $${paramCount++}`);
      values.push(input.description);
    }
    if (input.image !== undefined) {
      updates.push(`image = $${paramCount++}`);
      values.push(input.image);
    }
    if (input.start_date !== undefined) {
      updates.push(`start_date = $${paramCount++}`);
      values.push(input.start_date);
    }
    if (input.end_date !== undefined) {
      updates.push(`end_date = $${paramCount++}`);
      values.push(input.end_date);
    }
    if (input.type !== undefined) {
      updates.push(`type = $${paramCount++}`);
      values.push(input.type);
    }
    if (input.skills !== undefined) {
      updates.push(`skills = $${paramCount++}`);
      values.push(input.skills);
    }
    if (input.location !== undefined) {
      updates.push(`location = $${paramCount++}`);
      values.push(input.location);
    }
    if (input.photos !== undefined) {
      updates.push(`photos = $${paramCount++}`);
      values.push(input.photos);
    }

    if (updates.length === 0) {
      throw new AppError('No fields to update', 400);
    }

    updates.push(`updated_at = NOW()`);
    values.push(id);

    const query = `
      UPDATE experiences 
      SET ${updates.join(', ')} 
      WHERE id = $${paramCount} 
      RETURNING *
    `;

    const result = await pool.query<Experience>(query, values);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return result.rows[0];
  }

  // Delete experience
  static async delete(id: number): Promise<boolean> {
    const query = 'DELETE FROM experiences WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rowCount !== null && result.rowCount > 0;
  }

  // Search experiences by organization, role, or description
  static async search(searchTerm: string): Promise<Experience[]> {
    const query = `
      SELECT * FROM experiences 
      WHERE organization ILIKE $1 OR role ILIKE $1 OR description ILIKE $1
      ORDER BY (end_date IS NULL) DESC, start_date DESC
    `;
    const result = await pool.query<Experience>(query, [`%${searchTerm}%`]);
    return result.rows;
  }

  // Get all unique types
  static async getTypes(): Promise<string[]> {
    const query = 'SELECT DISTINCT type FROM experiences ORDER BY type';
    const result = await pool.query<{ type: string }>(query);
    return result.rows.map((row) => row.type);
  }
}
