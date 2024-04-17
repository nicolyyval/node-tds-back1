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

export const getStudent = async (req, res) => {
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

export const createStudent = async (req, res) => {
  try {
    const { name, age } = req.body;

    const studentAlreadyExists = await studentsRepository.getStudentByName(name);

    if (studentAlreadyExists) {
      return res.status(409).send({ message: "Estudante já cadastrado" });
    }

    const student = new Student(name, age);

    await studentsRepository.createStudent(student);

    return res.status(201).send({ message: "Estudante criado com sucesso", student });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao criar estudante", error: error.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age } = req.body;

    const student = await studentsRepository.getStudentById(id);

    if (!student) {
      return res.status(404).send({ message: "Estudante não encontrado" });
    }

    const updatedStudent = new Student(name, age);

    await studentsRepository.updateStudent(id, updatedStudent);

    return res.status(200).send({ message: "Estudante atualizado com sucesso", student: updatedStudent });
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
