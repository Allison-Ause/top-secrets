const pool = require('../utils/pool');

module.exports = class Secrets {
  id;
  title;
  description;
  created_at;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.description = row.description;
    this.createdAt = row.created_at;
  }

  static async getAll() {
    const { rows } = await pool.query(`
    SELECT (title, description, created_at) FROM secrets`);

    return new Secrets(rows[0]);
  }
};
