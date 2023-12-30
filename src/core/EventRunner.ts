
interface ImyEmitter   {
    eventQueue: any
}

import EventEmitter from "events";

interface ImyEmitter {
    emit(event: string | symbol, ...args: any[]): boolean;
    processNext(): void;
}
export class myEmitter extends EventEmitter implements ImyEmitter {
    eventQueue: Array<{ event: string | symbol; args: any[] }>;
    processing: boolean;

    constructor() {
        super();
        this.eventQueue = [];
        this.processing = false;
    }

    emit(event: string | symbol, ...args: any[]): boolean {

        this.eventQueue.push({ event, args });
        this.processNext();
        return true;
    }

    async processNext(): Promise<void> {
        // console.log(this.processing || this.eventQueue.length === 0)
        if (this.processing || this.eventQueue.length === 0) {
            return;
        }
        this.processing = true;
        const { event, args } = this.eventQueue.shift()!;
        super.emit(event, ...args);

    }
}