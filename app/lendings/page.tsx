"use client";
import React, { useState, useEffect } from "react";
import { Lending } from "@/types/lending";
import LendingForm from "@/components//lendings/lendings-form";
import { getLendings, deleteLending } from "@/lib/api";

const LendingPage: React.FC = () => {
    const [lendings, setLendings] = useState<Lending[]>([]);
    const [editingLending, setEditingLending] = useState<Lending | null>(null);

    const fetchLendings = async () => {
        try {
            const data = await getLendings();
            setLendings(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this lending?")) return;
        try {
            await deleteLending(id);
            alert("Lending deleted successfully!");
            fetchLendings();
        } catch (err) {
            console.error(err);
            alert("Failed to delete lending");
        }
    };

    useEffect(() => {
        fetchLendings();
    }, []);

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">Lendings</h1>

            <LendingForm
                isEditing={!!editingLending}
                initialData={editingLending ?? undefined}
                onLendingCreated={fetchLendings}
                onLendingUpdated={() => { setEditingLending(null); fetchLendings(); }}
                onClearEditing={() => setEditingLending(null)}
            />

            <hr className="my-6 border-gray-300" />

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-indigo-600 text-white">
                    <tr>
                        <th className="py-3 px-4 text-left">Lending ID</th>
                        <th className="py-3 px-4 text-left">Reader ID</th>
                        <th className="py-3 px-4 text-left">Book ID</th>
                        <th className="py-3 px-4 text-left">Borrowed Date</th>
                        <th className="py-3 px-4 text-left">Due Date</th>
                        <th className="py-3 px-4 text-left">Return Date</th>
                        <th className="py-3 px-4 text-left">Status</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {lendings.map(l => (
                        <tr key={l.lendingId} className="border-b hover:bg-gray-100 transition-colors">
                            <td className="py-2 px-4">{l.lendingId}</td>
                            <td className="py-2 px-4">{l.readerId}</td>
                            <td className="py-2 px-4">{l.bookId}</td>
                            <td className="py-2 px-4">{l.borrowedDate.slice(0, 10)}</td>
                            <td className="py-2 px-4">{l.dueDate.slice(0, 10)}</td>
                            <td className="py-2 px-4">{l.returnDate?.slice(0, 10) || "-"}</td>
                            <td className="py-2 px-4">{l.status}</td>
                            <td className="py-2 px-4 space-x-2">
                                <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded" onClick={() => setEditingLending(l)}>Edit</button>
                                <button className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded" onClick={() => handleDelete(l.lendingId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LendingPage;