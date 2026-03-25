"use client";

import React, { useState, useEffect } from "react";
import { BookFormData } from "@/types/index";
import { createBook, updateBook } from "@/lib/api";

interface BookFormProps {
    onBookCreated?: () => void;
    onBookUpdated?: () => void;
    initialData?: BookFormData;
    isEditing?: boolean;
    onClearEditing?: () => void; // NEW: callback to clear editing
}

const BookForm: React.FC<BookFormProps> = ({
                                               onBookCreated,
                                               onBookUpdated,
                                               initialData,
                                               isEditing = false,
                                               onClearEditing,
                                           }) => {
    const [bookId, setBookId] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publisher, setPublisher] = useState("");
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [isbn, setIsbn] = useState("");
    const [picture, setPicture] = useState<File | null>(null);

    // Populate form for editing
    useEffect(() => {
        if (initialData) {
            setBookId(initialData.bookId || "");
            setTitle(initialData.title || "");
            setAuthor(initialData.author || "");
            setPublisher(initialData.publisher || "");
            setYear(initialData.year || new Date().getFullYear());
            setIsbn(initialData.isbn || "");
            setPicture(null);
        } else {
            resetForm();
        }
    }, [initialData]);

    const resetForm = () => {
        setBookId("");
        setTitle("");
        setAuthor("");
        setPublisher("");
        setYear(new Date().getFullYear());
        setIsbn("");
        setPicture(null);
        if (onClearEditing) onClearEditing(); // Reset editing state in parent
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data: BookFormData = { bookId, title, author, publisher, year, isbn, picture };

        try {
            if (isEditing && initialData) {
                await updateBook(bookId, data);
                alert("Book updated successfully!");
                if (onBookUpdated) onBookUpdated();
                resetForm(); // clear after update
            } else {
                await createBook(data);
                alert("Book created successfully!");
                if (onBookCreated) onBookCreated();
                resetForm();
            }
        } catch (err: any) {
            alert(err.response?.data?.message || "Failed to save book");
            console.error(err);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto space-y-4"
        >
            <h2 className="text-xl font-semibold text-indigo-600 text-center mb-4">
                {isEditing ? "Edit Book" : "Add New Book"}
            </h2>

            {!isEditing && (
                <input
                    placeholder="Book ID"
                    value={bookId}
                    onChange={(e) => setBookId(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
            )}

            <input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
                placeholder="Publisher"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
                type="number"
                placeholder="Year"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
                placeholder="ISBN"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setPicture(e.target.files?.[0] ?? null)}
                className="w-full"
            />

            <div className="flex gap-4">
                <button
                    type="submit"
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-colors"
                >
                    {isEditing ? "Update Book" : "Create Book"}
                </button>
                <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 rounded-lg transition-colors"
                >
                    Clear
                </button>
            </div>
        </form>
    );
};

export default BookForm;