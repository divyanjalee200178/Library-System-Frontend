"use client";

import React, { useEffect, useState } from "react";
import { User, UserFormData } from "@/types/index";
import UserForm from "@/components/user/user-form";
import { getUsers, deleteUser } from "@/lib/api";

const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [editingUser, setEditingUser] = useState<UserFormData | null>(null); // Use UserFormData

    const fetchUsers = async () => {
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (userId: string) => {
        if (!confirm("Are you sure you want to delete this user?")) return;
        try {
            await deleteUser(userId);
            alert("User deleted successfully!");
            fetchUsers();
        } catch (err) {
            console.error(err);
            alert("Failed to delete user");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
                Users Management
            </h1>

            <UserForm
                isEditing={!!editingUser}
                initialData={editingUser ?? undefined} // Now matches UserFormData
                onUserCreated={fetchUsers}
                onUserUpdated={() => {
                    setEditingUser(null);
                    fetchUsers();
                }}
                onClearEditing={() => setEditingUser(null)}
            />

            <hr className="my-6 border-gray-300" />

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-indigo-600 text-white">
                    <tr>
                        <th className="py-3 px-4 text-left">User ID</th>
                        <th className="py-3 px-4 text-left">Name</th>
                        <th className="py-3 px-4 text-left">Address</th>
                        <th className="py-3 px-4 text-left">Mobile</th>
                        <th className="py-3 px-4 text-left">Email</th>
                        <th className="py-3 px-4 text-left">Membership</th>
                        <th className="py-3 px-4 text-left">Role</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((u) => (
                        <tr
                            key={u.userId}
                            className="border-b hover:bg-gray-100 transition-colors"
                        >
                            <td className="py-2 px-4">{u.userId}</td>
                            <td className="py-2 px-4">{u.name}</td>
                            <td className="py-2 px-4">{u.address}</td>
                            <td className="py-2 px-4">{u.mobile}</td>
                            <td className="py-2 px-4">{u.email || "-"}</td>
                            <td className="py-2 px-4">{u.membershipType}</td>
                            <td className="py-2 px-4">{u.role}</td>
                            <td className="py-2 px-4 space-x-2">
                                <button
                                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded"
                                    onClick={() =>
                                        setEditingUser({
                                            userId: u.userId,
                                            name: u.name,
                                            address: u.address,
                                            mobile: u.mobile,
                                            email: u.email,
                                            membershipType: u.membershipType,
                                            role: u.role,
                                        })
                                    }
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                                    onClick={() => handleDelete(u.userId)}
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

export default UsersPage;