"use client";

import React, { useEffect, useState } from "react";
import { UserFormData } from "@/types/index";
import { createUser, updateUser } from "@/lib/api";

interface UserFormProps {
    onUserCreated?: () => void;
    onUserUpdated?: () => void;
    initialData?: UserFormData;
    isEditing?: boolean;
    onClearEditing?: () => void;
}

const UserForm: React.FC<UserFormProps> = ({
                                               onUserCreated,
                                               onUserUpdated,
                                               initialData,
                                               isEditing = false,
                                               onClearEditing,
                                           }) => {
    const [userId, setUserId] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [membershipType, setMembershipType] = useState("");
    const [role, setRole] = useState<"READER" | "LIBRARIAN">("READER");

    // Populate form for editing
    useEffect(() => {
        if (initialData) {
            setUserId(initialData.userId || "");
            setName(initialData.name || "");
            setAddress(initialData.address || "");
            setMobile(initialData.mobile || "");
            setEmail(initialData.email || "");
            setMembershipType(initialData.membershipType || "");
            setRole(initialData.role || "READER");
        } else {
            resetForm();
        }
    }, [initialData]);

    const resetForm = () => {
        setUserId("");
        setName("");
        setAddress("");
        setMobile("");
        setEmail("");
        setMembershipType("");
        setRole("READER");
        if (onClearEditing) onClearEditing();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data: UserFormData = { userId, name, address, mobile, email, membershipType, role };

        try {
            if (isEditing && initialData) {
                await updateUser(userId, data);
                alert("User updated successfully!");
                if (onUserUpdated) onUserUpdated();
                resetForm();
            } else {
                await createUser(data);
                alert("User created successfully!");
                if (onUserCreated) onUserCreated();
                resetForm();
            }
        } catch (err: any) {
            alert(err.response?.data?.message || "Failed to save user");
            console.error(err);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto space-y-4"
        >
            <h2 className="text-xl font-semibold text-indigo-600 text-center mb-4">
                {isEditing ? "Edit User" : "Add New User"}
            </h2>

            {!isEditing && (
                <input
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
            )}

            <input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
                placeholder="Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
                placeholder="Membership Type"
                value={membershipType}
                onChange={(e) => setMembershipType(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <select
                value={role}
                onChange={(e) => setRole(e.target.value as "READER" | "LIBRARIAN")}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
                <option value="READER">READER</option>
                <option value="LIBRARIAN">LIBRARIAN</option>
            </select>

            <div className="flex gap-4">
                <button
                    type="submit"
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-colors"
                >
                    {isEditing ? "Update User" : "Create User"}
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

export default UserForm;