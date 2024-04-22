import { hash } from "bcrypt";
import Student from "../models/students/Student.js";
import StudentsRepository from "../models/students/StudentsRepository.js";

const studentsRepository = new StudentsRepository();

export const getStudents = async (req, res) => {
  try {
    const students = await studentsRepository.getStudents();

    if (!students) {
      return res.status(404).send({ message: "Não há estudantes cadastrados" });
    }
    return res.status(200).send({ totalStudents: students.length, students });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao buscar estudantes", error: error.message });
  }
};

export const getStudentbyId = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await studentsRepository.getStudentById(id);

    if (!student) {
      return res.status(404).send({ message: "Estudante não encontrado" });
    }
    return res.status(200).send({ message: "Estudante encontrado", student });

  } catch (error) {
    return res.status(500).send({ message: "Erro ao buscar estudante por id", error: error.message });
  }
};

export const addStudent = async (req, res) => {
  try {
    const { name, age, email, code, grade } = req.body;

    const student = new Student( name, age, email, code, grade);

    await studentsRepository.addStudent(student);

    return res.status(201).send({ message: "Estudante criado com sucesso", student });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao criar estudante", error: error.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, email, code, grade} = req.body;

    const getStudentById = await studentsRepository.getStudentById(id);

    if (!getStudentById) {
      return res.status(404).send({ message: "Estudante não encontrado" });
    }

const student = await studentsRepository.updateStudent(id, name, age, email, code, grade );

    return res.status(200).send({ message: "Estudante atualizado com sucesso", student });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao atualizar estudante", error: error.message });
  }

};

export const deleteStudent = async (req, res) => {

  try {
    const { id } = req.params;

    const student = await studentsRepository.getStudentById(id);

    if (!student) {
      return res.status(404).send({ message: "Estudante não encontrado" });
    }

    await studentsRepository.deleteStudent(id);

    return res.status(200).send({ message: "Estudante deletado com sucesso" });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao deletar estudante", error: error.message });
  }

};
