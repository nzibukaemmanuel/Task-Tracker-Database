const pool = require("../config/db");

const COLUMNS = 'id, title, completed, created_at AS "createdAt"';

class Task {
  static async getAll() {
    const { rows } = await pool.query(
      `SELECT ${COLUMNS} FROM tasks ORDER BY id`
    );
    return rows;
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT ${COLUMNS} FROM tasks WHERE id = $1`,
      [id]
    );
    return rows[0] || null;
  }

  static async count() {
    const { rows } = await pool.query("SELECT COUNT(*)::int AS count FROM tasks");
    return rows[0].count;
  }

  static async create({ title }) {
    const { rows } = await pool.query(
      `INSERT INTO tasks (title) VALUES ($1) RETURNING ${COLUMNS}`,
      [title]
    );
    return rows[0];
  }

  // Updates only the provided fields (title and/or completed)
  static async update(id, { title, completed }) {
    const { rows } = await pool.query(
      `UPDATE tasks
         SET title = COALESCE($2, title),
             completed = COALESCE($3, completed)
       WHERE id = $1
       RETURNING ${COLUMNS}`,
      [id, title ?? null, completed ?? null]
    );
    return rows[0] || null;
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE FROM tasks WHERE id = $1 RETURNING ${COLUMNS}`,
      [id]
    );
    return rows[0] || null;
  }
}

module.exports = Task;
