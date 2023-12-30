import { Request, Response } from 'express';

interface RequestResponsePair {
    req: Request;
    res: Response;
}

class RequestBuffer {
    private buffer: RequestResponsePair[];

    constructor() {
        this.buffer = [];
    }

    // Get the number of objects in the buffer
    public getSize(): number {
        return this.buffer.length;
    }

    // Add an object to the buffer
    public enqueue(reqResPair: RequestResponsePair): void {
        this.buffer.push(reqResPair);
    }

    // Retrieve an object from the buffer
    public dequeue(): RequestResponsePair | null {
        if (this.getSize() > 0) {
            return this.buffer.shift() || null; // Remove and return the first item
        }
        return null; // Buffer is empty
    }
}

export default RequestBuffer;