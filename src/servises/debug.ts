import {IUserService} from "../subject/user/UserController";

export default function Log(...args: any[]) {
    // const err = new Error();
    // const stack = err.stack || '';
    // const stackLines = stack.split('\n');
    // let callerLine = stackLines.find(line => line.includes('at '));
    // if (callerLine) {
    //     // Remove the "at " prefix and any leading spaces
    //     callerLine = callerLine.replace(/^\s*at\s+/, '');
    //     // Extract the file path and line number
    //     const matchResult = callerLine.match(/(.*):(\d+):(\d+)/) || [];
    //     const [fullMatch, filePath, lineNumber] = matchResult;
    //     console.log(`${filePath}:${lineNumber}`, ...args);
    // } else {
    //     // Fallback to simple log if unable to parse the stack trace
    //     console.log(...args);
    // }

    console.log(args[0])
    // console.log(...args);
}


// export const run = async (runner: Function, ob: IUserService, ...parameters: any[]) => {
//     const boundRunner = runner.bind(ob);
//     return await boundRunner(...parameters);
// };

export const run =   (data:string) => {
    console.log(data)

};

