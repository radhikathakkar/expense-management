export interface Amount {
    totalAmount: number;
    userId: string;
    income: Schema;
    expense: Schema;
}

export interface Schema {
    amount: number;
    reason: string;
}
