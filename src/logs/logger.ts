import pino, { Logger } from "pino";

class Log {
    private log: Logger;
    constructor() {
        this.log = pino({ transport: { target: "pino-pretty", options: { colorize: true } } });
    }

    /**
     * Log info
     * @param message
     */
    public info(message: any) {
        this.log.info(message);
    }

    /**
     * Log debug
     * @param message 
     */
    public debug(message: any) {
        this.log.debug(message);
    }
}

export default new Log();