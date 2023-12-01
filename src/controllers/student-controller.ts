import StudentModel from "../models/student-model";

class StudentController {
    async getAll(req:any, res:any, next:any){
        try {
            const skip = parseInt(req.query.skip as string) || 0;
            const limit = parseInt(req.query.limit as string) || 100;

            const students = await StudentModel.findAll({
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
}

export default new StudentController();