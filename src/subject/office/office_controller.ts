import Office_model from "./office_model";

class OfficeConrtoller {
    getAll =  async (req: any, res: any) => {
        try {
            const skip = parseInt(req.query.skip as string) || 0;
            const limit = parseInt(req.query.limit as string) || 20;

            const offices = await Office_model.findAll({
                offset: skip,
                limit: limit,
                order:['id']
            });

            res.json(offices);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    }
}

export default new OfficeConrtoller()