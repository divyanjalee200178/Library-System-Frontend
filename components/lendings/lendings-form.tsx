"use client";

import React, { useState, useEffect } from "react";
import { LendingFormData } from "@/types/lending";
import { createLending, updateLending, getReaders, getBookCombo, Reader, Book } from "@/lib/api";

interface LendingFormProps {
    onLendingCreated?: () => void;
    onLendingUpdated?: () => void;
    initialData?: LendingFormData & { lendingId?: string };
    isEditing?: boolean;
    onClearEditing?: () => void;
}

const LendingForm: React.FC<LendingFormProps> = ({
                                                     onLendingCreated,
                                                     onLendingUpdated,
                                                     initialData,
                                                     isEditing = false,
                                                     onClearEditing,
                                                 }) => {
    const [readerId, setReaderId] = useState("");
    const [bookId, setBookId] = useState("");
    const [borrowedDate, setBorrowedDate] = useState(new Date().toISOString().slice(0, 10));
    const [dueDate, setDueDate] = useState(new Date().toISOString().slice(0, 10));
    const [returnDate, setReturnDate] = useState<string | undefined>(undefined);
    const [status, setStatus] = useState<"borrowed" | "returned" | "overdue">("borrowed");

    const [readers, setReaders] = useState<Reader[]>([]);
    const [books, setBooks] = useState<Book[]>([]);

    // Load readers and books from backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const readersData = await getReaders();
                setReaders(readersData);

                const booksData = await getBookCombo();
                setBooks(booksData);
            } catch (err) {
                console.error("Failed to load readers or books", err);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (initialData) {
            setReaderId(initialData.readerId);
            setBookId(initialData.bookId);
            setBorrowedDate(initialData.borrowedDate.slice(0, 10));
            setDueDate(initialData.dueDate.slice(0, 10));
            setReturnDate(initialData.returnDate?.slice(0, 10));
            setStatus(initialData.status);
        } else {
            resetForm();
        }
    }, [initialData]);

    const resetForm = () => {
        setReaderId("");
        setBookId("");
        setBorrowedDate(new Date().toISOString().slice(0, 10));
        setDueDate(new Date().toISOString().slice(0, 10));
        setReturnDate(undefined);
        setStatus("borrowed");
        if (onClearEditing) onClearEditing();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data: LendingFormData = { readerId, bookId, borrowedDate, dueDate, returnDate, status };
        try {
            if (isEditing && initialData?.lendingId) {
                await updateLending(initialData.lendingId, data);
                alert("Lending updated successfully!");
                onLendingUpdated?.();
            } else {
                await createLending(data);
                alert("Lending created successfully!");
                onLendingCreated?.();
            }
            resetForm();
        } catch (err: any) {
            alert(err.response?.data?.message || "Failed to save lending");
            console.error(err);
        }
    };

    return (
        <form className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto space-y-4" onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold text-indigo-600 text-center mb-4">
                {isEditing ? "Edit Lending" : "Add New Lending"}
            </h2>

            {/* Reader Dropdown */}
            <select
                value={readerId}
                onChange={(e) => setReaderId(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg"
            >
                <option value="" disabled>Select Reader</option>
                {readers.map((r) => (
                    <option key={r.readerId} value={r.readerId}>
                        {r.name}
                    </option>
                ))}
            </select>

            {/* Book Dropdown */}
            <select
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg"
            >
                <option value="" disabled>Select Book</option>
                {books.map((b) => (
                    <option key={b.bookId} value={b.bookId}>
                        {b.title} ({b.bookId})
                    </option>
                ))}
            </select>

            <label>
                Borrowed Date:
                <input
                    type="date"
                    value={borrowedDate}
                    onChange={(e) => setBorrowedDate(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                />
            </label>

            <label>
                Due Date:
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                />
            </label>

            <label>
                Return Date:
                <input
                    type="date"
                    value={returnDate || ""}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                />
            </label>

            <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-4 py-2 border rounded-lg"
            >
                <option value="borrowed">Borrowed</option>
                <option value="returned">Returned</option>
                <option value="overdue">Overdue</option>
            </select>

            <div className="flex gap-4">
                <button type="submit" className="flex-1 bg-indigo-600 text-white py-2 rounded-lg">
                    {isEditing ? "Update Lending" : "Create Lending"}
                </button>
                <button type="button" onClick={resetForm} className="flex-1 bg-gray-400 text-white py-2 rounded-lg">
                    Clear
                </button>
            </div>
        </form>
    );
};

export default LendingForm;