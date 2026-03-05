const db = require("../config/db");

class Booking {
  // Get all bookings
  static async findAll() {
    const [rows] = await db.execute("SELECT * FROM bookings");
    return rows;
  }

  // Get booking by ID
  static async findById(id) {
    const [rows] = await db.execute("SELECT * FROM bookings WHERE id = ?", [id]);
    return rows[0];
  }

  // Create a booking AND update destination stock
  static async create({ name, date, destination_id, user_id }) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // 1. Check if tickets are available
      const [dest] = await connection.execute(
        "SELECT stock FROM destinations WHERE id = ? FOR UPDATE",
        [destination_id]
      );

      if (!dest[0] || dest[0].stock <= 0) {
        throw new Error("Sorry, this flight is sold out!");
      }

      // 2. Insert the booking with the user_id
      const [result] = await connection.execute(
        "INSERT INTO bookings (name, date, destination_id, user_id) VALUES (?, ?, ?, ?)",
        [name, date, destination_id, user_id]
      );

      // 3. Subtract 1 from the destination stock
      await connection.execute(
        "UPDATE destinations SET stock = stock - 1 WHERE id = ?",
        [destination_id]
      );

      await connection.commit();
      return { id: result.insertId, name, date, destination_id, user_id };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  static async deleteById(id) {
    const [result] = await db.execute("DELETE FROM bookings WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Booking;