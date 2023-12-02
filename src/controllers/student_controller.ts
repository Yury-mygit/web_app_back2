import Student_model from "../models/student_model";

class StudentController {
    async getAllStudents(req:any, res:any, next:any){
        try {
            const skip = parseInt(req.query.skip as string) || 0;
            const limit = parseInt(req.query.limit as string) || 100;

            const students = await Student_model.findAll({
                offset: skip,
                limit: limit,
                order:['id']
            });

            res.json(students);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    }

    async createStudent(req:any, res:any, next:any){
        const tempdata = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            parentsName: req.body.firstName,
            age: req.body.age,
            status: 'active',
            sessionTransferRate: 0.05,
            percentageOfAbsences: 0.02,
            contactEmail: req.body.contactEmail,
            contactTelephone: req.body.contactTelephone,
            dateOfInitialDiagnosis: req.body.dateOfInitialDiagnosis,
            address: req.body.address
        }

        try {
            const studentData = req.body;
            const student = await Student_model.create(tempdata);
            res.json(student.id);
        } catch (err: any) {
            res.status(500).json(err)
        }
    }

    async updateStudent(req:any, res:any, next:any){
        const tempdata = {

            firstName: req.body.firstName,
            lastName: req.body.lastName,
            parentsName: req.body.firstName,
            age: req.body.age,
            status: 'active',
            sessionTransferRate: 0.05,
            percentageOfAbsences: 0.02,
            contactEmail: req.body.contactEmail,
            contactTelephone: req.body.contactTelephone,
            dateOfInitialDiagnosis: req.body.dateOfInitialDiagnosis,
            address: req.body.address
        }

        try {
            const studentId = req.body.id;
            await Student_model.update(tempdata, { where: { id: studentId } });
            res.json({ message: 'Student_model updated successfully' });
        } catch (err: any) {
            res.status(500).json(err)
        }
    }

    async deleteStudent(req:any, res:any, next:any){
        try {
            const studentId = req.params.id;
            await Student_model.destroy({ where: { id: studentId } });
            res.json({ message: 'Student_model deleted successfully' });
        } catch (err: any) {
            res.status(500).json(err)
        }
    }
}

export default new StudentController();