import pool from '../config';
import { Profile, UpdateProfileInput } from '../../types';
import { AppError } from '../errors';

export class ProfileModel {
  static async get(): Promise<Profile | null> {
    const query = 'SELECT * FROM profile LIMIT 1';
    const result = await pool.query<Profile>(query);
    return result.rows[0] || null;
  }

  static async update(input: UpdateProfileInput): Promise<Profile | null> {
    const profile = await this.get();
    
    if (!profile) {
      // If no profile exists, insert one (fallback)
      const query = `
        INSERT INTO profile (name, tagline, about_text, email, phone, location, github, linkedin, cv_url, photo_url)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *
      `;
      const result = await pool.query<Profile>(query, [
        input.name || '', input.tagline || '', input.about_text || '', input.email || '', 
        input.phone || '', input.location || '', input.github || '', input.linkedin || '', 
        input.cv_url || null, input.photo_url || null
      ]);
      return result.rows[0];
    }

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
      return profile;
    }

    updates.push(`updated_at = NOW()`);
    
    const query = `
      UPDATE profile 
      SET ${updates.join(', ')} 
      WHERE id = ${profile.id}
      RETURNING *
    `;

    const result = await pool.query<Profile>(query, values);
    return result.rows[0];
  }
}
