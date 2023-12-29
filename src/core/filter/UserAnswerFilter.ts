

interface IUserAnswerFilter {
    build(data: any, filter: string[]): any
}

class UserAnswerFilter implements IUserAnswerFilter {
    constructor() {
    }

    public build = (data: any, filter: string[]) => {
        const filteredData: any = {};
        filter.forEach((field) => {
            if (data.hasOwnProperty(field)) {
                filteredData[field] = data[field];
            }
        });
        return filteredData;
    }
}

export default UserAnswerFilter
export {
    IUserAnswerFilter
}