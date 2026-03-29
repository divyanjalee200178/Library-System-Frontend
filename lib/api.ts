
import axios, { AxiosResponse } from "axios";
import {
    Book,
    BookFormData,
    User,
    UserFormData,
} from "@/types/index";
import {Lending, LendingFormData} from "@/types/lending";

const API_BASE = "http://localhost:8082/api/v1";
const USER_API_BASE = "http://localhost:8081/api/v1/users";
const LENDING_API_BASE = "http://localhost:8083/api/v1";

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

export interface Reader {
    readerId: string;
    name: string;
}

export const getReaders = async (): Promise<Reader[]> => {
    const res = await axios.get(`${LENDING_API_BASE}/lendings/readers`);
    return res.data;
};

export interface Book {
    bookId: string;
    title: string;

}

// Get all books
export const getBookCombo = async (): Promise<Book[]> => {
    const res = await axios.get(`${LENDING_API_BASE}/lendings/books`);
    return res.data;
};


export const getLendings = async (): Promise<Lending[]> => {
    const res = await axios.get(`${LENDING_API_BASE}/lendings`);
    return res.data;
};

export const createLending = async (data: LendingFormData): Promise<Lending> => {
    const res = await axios.post(`${LENDING_API_BASE}/lendings`, data);
    return res.data;
};

export const updateLending = async (id: string, data: LendingFormData): Promise<Lending> => {
    const res = await axios.put(`${LENDING_API_BASE}/lendings/${id}`, data);
    return res.data;
};

export const deleteLending = async (id: string): Promise<void> => {
    await axios.delete(`${LENDING_API_BASE}/lendings/${id}`);
};