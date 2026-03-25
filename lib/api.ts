// // src/lib/api.ts
// import axios from "axios";
// import {
//     Book,
//     BookFormData,
//     Reader,
//     ReaderFormData,
//     Lending,
//     LendingFormData,
// } from "@/types/index";
//
// const API_BASE = "http://localhost:8082/api/v1";
//
// const api = axios.create({
//     baseURL: API_BASE,
//     withCredentials: true
// });
//
// // Books
// export const getBooks = async (): Promise<Book[]> => {
//     const res = await api.get("/books");
//     return res.data;
// };
//
// export const createBook = async (data: BookFormData): Promise<Book> => {
//     const form = new FormData();
//     form.append("bookId", data.bookId);
//     form.append("title", data.title);
//     form.append("author", data.author);
//     form.append("publisher", data.publisher);
//     form.append("year", String(data.year));
//     form.append("isbn", data.isbn);
//     if (data.picture) form.append("picture", data.picture);
//
//     const res = await api.post("/books", form, {
//         headers: { "Content-Type": "multipart/form-data" },
//     });
//     return res.data;
// };
//
// export const updateBook = async (bookId: string, data: BookFormData): Promise<Book> => {
//     const form = new FormData();
//     form.append("title", data.title);
//     form.append("author", data.author);
//     form.append("publisher", data.publisher);
//     form.append("year", String(data.year));
//     form.append("isbn", data.isbn);
//     if (data.picture) form.append("picture", data.picture);
//
//     const res = await api.put(`/books/${bookId}`, form, {
//         headers: { "Content-Type": "multipart/form-data" },
//     });
//     return res.data;
// };
//
// export const deleteBook = async (bookId: string): Promise<void> => {
//     await api.delete(`/api/v1/books/${bookId}`);
// };
//
// // ────────────────────────────────
// // READER API
// // ────────────────────────────────
// export const getReaders = async (): Promise<Reader[]> => {
//     const res = await api.get("/api/v1/readers");
//     return res.data;
// };
//
// export const getReader = async (readerId: string): Promise<Reader> => {
//     const res = await api.get(`/api/v1/readers/${readerId}`);
//     return res.data;
// };
//
// export const createReader = async (data: ReaderFormData): Promise<Reader> => {
//     const form = new FormData();
//     form.append("readerId", data.readerId);
//     form.append("name", data.name);
//     form.append("address", data.address);
//     form.append("mobile", data.mobile);
//     form.append("membershipType", data.membershipType);
//     if (data.email) form.append("email", data.email);
//     if (data.picture) form.append("picture", data.picture);
//
//     const res = await api.post("/api/v1/readers", form, {
//         headers: { "Content-Type": "multipart/form-data" },
//     });
//     return res.data;
// };
//
// export const updateReader = async (readerId: string, data: ReaderFormData): Promise<Reader> => {
//     const form = new FormData();
//     form.append("name", data.name);
//     form.append("address", data.address);
//     form.append("mobile", data.mobile);
//     form.append("membershipType", data.membershipType);
//     if (data.email) form.append("email", data.email);
//     if (data.picture) form.append("picture", data.picture);
//
//     const res = await api.put(`/api/v1/readers/${readerId}`, form, {
//         headers: { "Content-Type": "multipart/form-data" },
//     });
//     return res.data;
// };
//
// export const deleteReader = async (readerId: string): Promise<void> => {
//     await api.delete(`/api/v1/readers/${readerId}`);
// };
//
// export const getReaderPictureUrl = (fileName: string): string =>
//     `${API_BASE}/uploads/${fileName}`;
//
// // ────────────────────────────────
// // LENDING API (JSON)
// // ────────────────────────────────
// export const getLendings = async (): Promise<Lending[]> => {
//     const res = await api.get("/api/v1/lendings");
//     return res.data;
// };
//
// export const getLending = async (lendingId: string): Promise<Lending> => {
//     const res = await api.get(`/api/v1/lendings/${lendingId}`);
//     return res.data;
// };
//
// export const createLending = async (data: LendingFormData): Promise<Lending> => {
//     const res = await api.post("/api/v1/lendings", data);
//     return res.data;
// };
//
// export const updateLending = async (lendingId: string, data: LendingFormData): Promise<Lending> => {
//     const res = await api.put(`/api/v1/lendings/${lendingId}`, data);
//     return res.data;
// };
//
// export const deleteLending = async (lendingId: string): Promise<void> => {
//     await api.delete(`/api/v1/lendings/${lendingId}`);
// };

// src/lib/api.ts
import axios, { AxiosResponse } from "axios";
import {
    Book,
    BookFormData,
    User,
    UserFormData,
    Lending,
    LendingFormData,
} from "@/types/index";

const API_BASE = "http://localhost:8082/api/v1";
const USER_API_BASE = "http://localhost:8081/api/v1/users";

const api = axios.create({
    baseURL: API_BASE,
    withCredentials: true,
});

// ────────────────────────────────
// Generic FormData sender for POST/PUT
// ────────────────────────────────
async function sendFormData<T>(
    url: string,
    form: FormData,
    method: "post" | "put"
): Promise<T> {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    let response: AxiosResponse<T>;
    if (method === "post") {
        response = await api.post<T>(url, form, config);
    } else {
        response = await api.put<T>(url, form, config);
    }
    return response.data;
}

// ────────────────────────────────
// BOOK API
// ────────────────────────────────
export const getBooks = async (): Promise<Book[]> => {
    const res: AxiosResponse<Book[]> = await api.get("/books");
    return res.data;
};

export const createBook = async (data: BookFormData): Promise<Book> => {
    const form = new FormData();
    form.append("bookId", data.bookId);
    form.append("title", data.title);
    form.append("author", data.author);
    form.append("publisher", data.publisher);
    form.append("year", String(data.year));
    form.append("isbn", data.isbn);
    if (data.picture) form.append("picture", data.picture);

    return sendFormData<Book>("/books", form, "post");
};

export const updateBook = async (bookId: string, data: BookFormData): Promise<Book> => {
    const form = new FormData();
    form.append("title", data.title);
    form.append("author", data.author);
    form.append("publisher", data.publisher);
    form.append("year", String(data.year));
    form.append("isbn", data.isbn);
    if (data.picture) form.append("picture", data.picture);

    return sendFormData<Book>(`/books/${bookId}`, form, "put");
};

export const deleteBook = async (bookId: string): Promise<void> => {
    await api.delete(`/books/${bookId}`);
};

export const getUsers = async (): Promise<User[]> => {
    const res: AxiosResponse<User[]> = await axios.get(`${USER_API_BASE}`);
    return res.data;
};

export const getUser = async (userId: string): Promise<User> => {
    const res: AxiosResponse<User> = await axios.get(`${USER_API_BASE}/${userId}`);
    return res.data;
};

export const createUser = async (data: UserFormData): Promise<User> => {
    const res: AxiosResponse<User> = await axios.post(`${USER_API_BASE}`, data);
    return res.data;
};

export const updateUser = async (userId: string, data: UserFormData): Promise<User> => {
    const res: AxiosResponse<User> = await axios.put(`${USER_API_BASE}/${userId}`, data);
    return res.data;
};

export const deleteUser = async (userId: string): Promise<void> => {
    await axios.delete(`${USER_API_BASE}/${userId}`);
};

export const getReaderPictureUrl = (fileName: string): string =>
    `${API_BASE}/uploads/${fileName}`;

// ────────────────────────────────
// LENDING API (JSON)
// ────────────────────────────────
export const getLendings = async (): Promise<Lending[]> => {
    const res: AxiosResponse<Lending[]> = await api.get("/lendings");
    return res.data;
};

export const getLending = async (lendingId: string): Promise<Lending> => {
    const res: AxiosResponse<Lending> = await api.get(`/lendings/${lendingId}`);
    return res.data;
};

export const createLending = async (data: LendingFormData): Promise<Lending> => {
    const res: AxiosResponse<Lending> = await api.post("/lendings", data);
    return res.data;
};

export const updateLending = async (lendingId: string, data: LendingFormData): Promise<Lending> => {
    const res: AxiosResponse<Lending> = await api.put(`/lendings/${lendingId}`, data);
    return res.data;
};

export const deleteLending = async (lendingId: string): Promise<void> => {
    await api.delete(`/lendings/${lendingId}`);
};