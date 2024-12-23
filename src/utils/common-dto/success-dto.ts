export class Success <T> {
    message: string;
    statusCode: number;
    data: T;
    total_records: number;

    constructor(message: string, data: T, statusCode?: number, length?: number) {
        this.statusCode = statusCode || 200;
        this.total_records = length;
        this.message = message;
        this.data = data;
    }
}

export class SuccessResponse {
    message: string;
    statusCode: number;

    constructor(message: string, statusCode?: number) {
        this.statusCode = statusCode || 200;
        this.message = message;
    }
}