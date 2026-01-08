import { pool } from "./db";
import bcrypt from "bcrypt";

export const resolvers = {
  Query: {
    users: async () => {
      const result = await pool.query(
        "SELECT unique_id, name, email FROM users"
      );
      return result.rows;
    }
  },

  Mutation: {
    register: async (_: any, args: any) => {
    const { name, email, password } = args;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING unique_id, name, email`,
      [name, email, hashedPassword]
    );

      return result.rows[0];
    },


    login: async (_: any, args: any) => {
      const { email, password } = args;

      const result = await pool.query(
        `SELECT unique_id, password FROM users WHERE email = $1`,
        [email]
      );

      if (result.rows.length === 0) {
        throw new Error("Invalid credentials");
      }

      const user = result.rows[0];

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new Error("Invalid credentials");
      }

      return "Login successful";
    },
  }
};
