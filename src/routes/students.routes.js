import { Router } from "express";

import {
  getStudents,
  getStudentbyId,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/students.controller.js";

const studentsRouter = Router();

studentsRouter.get("/", getStudents);
studentsRouter.get("/:id", getStudentbyId);
studentsRouter.post("/", addStudent);
studentsRouter.put("/:id", updateStudent);
studentsRouter.delete("/:id", deleteStudent);

export default studentsRouter;
