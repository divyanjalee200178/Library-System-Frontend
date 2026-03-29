export interface Lending {
    lendingId: string;
    readerId: string;
    bookId: string;
    borrowedDate: string;
    dueDate: string;
    returnDate?: string;
    status: "borrowed" | "returned" | "overdue";
}

export interface LendingFormData {
    readerId: string;
    bookId: string;
    borrowedDate: string;
    dueDate: string;
    returnDate?: string;
    status: "borrowed" | "returned" | "overdue";
}