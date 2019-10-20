import * as Yup from "yup";
import Student from "../models/Student";

class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      idade: Yup.integer().required(),
      peso: Yup.integer().required(),
      altura: Yup.integer().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }
    const studentExist = await Student.findOne({
      where: { email: req.body.email }
    });

    if (studentExist) {
      return res.status(400).json({ error: "Student already exist." });
    }

    const { id, name, idade, peso, altura } = await Student.create(req.body);
    //
    return res.json({
      id,
      name,
      idade,
      peso,
      altura
    });
  }

  async update(req, res) {
    const { email } = req.body;
    const student = await Student.findByPk(req.studentId);

    if (email !== student.email) {
      const studentExists = await Student.findOne({
        where: { email }
      });

      if (studentExists) {
        return res.status(400).json({ error: "Student already exist." });
      }
    }

    const { id, name, idade, peso, altura } = await student.update(req.body);
    return res.json({
      id,
      name,
      email,
      idade,
      peso,
      altura
    });
  }
}
export default new StudentController();
