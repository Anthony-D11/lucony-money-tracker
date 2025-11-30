export interface Transaction {
    id: string;
    amount: number;
    currency: string;
    categoryId: string;
    createdAt: string;
    note: string;
}
export interface Category {
    id: string;
    name: string;
    type: "expense" | "income" | "investment";
    icon: string;
    color: string;
    default: boolean;
}
export interface Expense extends Transaction {
    type: "expense";
}
export interface Income extends Transaction {
    type: "income";
}
export interface Investment extends Transaction {
    type: "investment";
    action: "buy" | "sell";
    price: number;
    exchange_rate: string;
}