// export interface Reader {
//     readerId: string;
//     name: string;
//     address: string;
//     mobile: string;
//     email?: string;
//     membershipType: string;
//     picture?: string;
// }
//
// export interface ReaderFormData {
//     readerId: string;
//     name: string;
//     address: string;
//     mobile: string;
//     email?: string;
//     membershipType: string;
//     picture?: File | null;
// }
//
// export interface Book {
//     bookId: string;
//     title: string;
//     author: string;
//     category: string;
//     available: boolean;
//     picture?: string;
// }
//
// export interface BookFormData {
//     bookId: string;
//     title: string;
//     author: string;
//     category: string;
//     available: boolean;
//     picture?: File | null;
// }
//
// export interface ReaderSummary {
//     name: string;
//     email?: string;
//     mobile: string;
//     picture?: string;
// }
//
// export interface BookSummary {
//     title: string;
//     author: string;
//     picture?: string;
// }
//
// export interface Lending {
//     lendingId: string;
//     borrowedDate: string;
//     dueDate: string;
//     returnDate?: string;
//     status: string;
//     readerId: string;
//     bookId: string;
//     reader?: ReaderSummary;
//     book?: BookSummary;
// }
//
// export interface LendingFormData {
//     lendingId: string;
//     borrowedDate: string;
//     dueDate: string;
//     returnDate?: string;
//     status: string;
//     readerId: string;
//     bookId: string;
// }
//
// export interface ApiError {
//     message: string;
//     status?: number;
// }


export interface User {
    userId: string;
    name: string;
    address: string;
    mobile: string;
    email?: string;
    membershipType: string;
    role: "READER" | "LIBRARIAN";
}

export interface UserFormData {
    userId: string;
    name: string;
    address: string;
    mobile: string;
    email?: string;
    membershipType: string;
    role: "READER" | "LIBRARIAN";
}

export interface Book {
    bookId: string;
    title: string;
    author: string;
    publisher: string;
    year: number;
    isbn: string;
    pictureUrl?: string | null;
}

export interface BookFormData {
    bookId: string;
    title: string;
    author: string;
    publisher: string;
    year: number;
    isbn: string;
    picture?: File | null;
}

export interface ReaderSummary {
    name: string;
    email?: string;
    mobile: string;
    picture?: string;
}

export interface BookSummary {
    title: string;
    author: string;
    picture?: string;
}

export interface Lending {
    lendingId: string;
    borrowedDate: string;
    dueDate: string;
    returnDate?: string;
    status: string;
    readerId: string;
    bookId: string;
    reader?: ReaderSummary;
    book?: BookSummary;
}

export interface LendingFormData {
    lendingId: string;
    borrowedDate: string;
    dueDate: string;
    returnDate?: string;
    status: string;
    readerId: string;
    bookId: string;
}

export interface ApiError {
    message: string;
    status?: number;
}