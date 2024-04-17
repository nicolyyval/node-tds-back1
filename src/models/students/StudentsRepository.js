import pg from "../../database/index.js";

export default class StudentsRepository {
  constructor() {
    this.pg = pg;
  }

  async getStudents() {
    try {
      const allStudents = await this.pg.manyOrNone("SELECT * FROM students");
      return allStudents;
    } catch (error) {
      throw error;
    }
  }

  async getStudentById(id) {
    try {
      const student = await this.pg.oneOrNone("SELECT * FROM students WHERE id = $1", id);
      console.log(student);
      return student;
    } catch (error) {
      throw error;
    }
  }

  async addStudent(student) {
    try {
      await this.pg.none("INSERT INTO students (id, name, age, email, code, grade) VALUES ($1, $2, $3, $4, $5, $6)", [student.id, student.name, student.age, student.email, student.code, student.grade]);
      return student;
    } catch (error) {
      throw error;
    }
  }

  async updateStudent(id, name, age, email, code, grade) {
    try {
      const student = await this.getStudentById(id);

      if (!student) {
        return null;
      }

      const updatedStudent = await this.pg.oneOrNone("UPDATE students SET name = $1, age = $2, email = $3, code = $4, grade = $5 WHERE id = $6 RETURNING *", [name, age, email, code, grade, id]);
      return updatedStudent;
    } catch (error) {
      throw error;
    }
  }

  async deleteStudent(id) {
    try {
      const student = await this.getStudentById(id);

      if (!student) {
        return null;
      }

      await this.pg.none("DELETE FROM students WHERE id = $1", id);
      return student;
    } catch (error) {
      throw error;
    }
  }
}
