"use client";

import React, { useEffect, useState } from "react";
import { Book } from "@/types/index";
import BookForm from "@/components/books/book-form";
import { getBooks, deleteBook } from "@/lib/api";

const BookPage: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [editingBook, setEditingBook] = useState<Book | null>(null);

    const fetchBooks = async () => {
        try {
            const data = await getBooks();
            setBooks(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (bookId: string) => {
        if (!confirm("Are you sure you want to delete this book?")) return;
        try {
            await deleteBook(bookId);
            alert("Book deleted successfully!");
            fetchBooks();
        } catch (err) {
            console.error(err);
            alert("Failed to delete book");
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
                Books Library
            </h1>

            <BookForm
                isEditing={!!editingBook}
                initialData={
                    editingBook
                        ? {
                            bookId: editingBook.bookId,
                            title: editingBook.title,
                            author: editingBook.author,
                            publisher: editingBook.publisher,
                            year: editingBook.year,
                            isbn: editingBook.isbn,
                            picture: null,
                        }
                        : undefined
                }
                onBookCreated={fetchBooks}
                onBookUpdated={() => {
                    setEditingBook(null);
                    fetchBooks();
                }}
                onClearEditing={() => setEditingBook(null)} // Clear editing when Clear clicked
            />

            <hr className="my-6 border-gray-300" />

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-indigo-600 text-white">
                    <tr>
                        <th className="py-3 px-4 text-left">Book ID</th>
                        <th className="py-3 px-4 text-left">Title</th>
                        <th className="py-3 px-4 text-left">Author</th>
                        <th className="py-3 px-4 text-left">Publisher</th>
                        <th className="py-3 px-4 text-left">Year</th>
                        <th className="py-3 px-4 text-left">ISBN</th>
                        <th className="py-3 px-4 text-left">Picture</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {books.map((b) => (
                        <tr
                            key={b.bookId}
                            className="border-b hover:bg-gray-100 transition-colors"
                        >
                            <td className="py-2 px-4">{b.bookId}</td>
                            <td className="py-2 px-4">{b.title}</td>
                            <td className="py-2 px-4">{b.author}</td>
                            <td className="py-2 px-4">{b.publisher}</td>
                            <td className="py-2 px-4">{b.year}</td>
                            <td className="py-2 px-4">{b.isbn}</td>
                            <td className="py-2 px-4">
                                {b.pictureUrl ? (
                                    <img
                                        src={b.pictureUrl}
                                        alt={b.title}
                                        className="w-16 h-20 object-cover rounded-md border"
                                    />
                                ) : (
                                    "-"
                                )}
                            </td>
                            <td className="py-2 px-4 space-x-2">
                                <button
                                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded"
                                    onClick={() => setEditingBook(b)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                                    onClick={() => handleDelete(b.bookId)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookPage;