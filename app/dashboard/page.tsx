"use client";

import { useEffect, useState } from "react";
import {
    Users,
    BookOpen,
    BookMarked,
    ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
// import { readerApi, bookApi, lendingApi } from "@/lib/api";
import type { User, Book, Lending } from "@/types/index";

interface Stats {
    readers: number;
    books: number;
    lendings: number;
}

export default function DashboardPage() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [recentLendings, setRecentLendings] = useState<Lending[]>([]);
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const [readers, booksData, lendings] = await Promise.all([
                    readerApi.getAll(),
                    bookApi.getAll(),
                    lendingApi.getAll(),
                ]);
                setStats({
                    readers: readers.length,
                    books: booksData.length,
                    lendings: lendings.length,
                });
                setRecentLendings(lendings.slice(-5).reverse());
                setBooks(booksData);
            } catch {
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    const statCards = [
        {
            label: "Total Readers",
            value: stats?.readers ?? 0,
            icon: Users,
            color: "text-blue-600",
            bg: "bg-blue-50",
            href: "/readers",
        },
        {
            label: "Total Books",
            value: stats?.books ?? 0,
            icon: BookOpen,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            href: "/books",
        },
        {
            label: "Total Lendings",
            value: stats?.lendings ?? 0,
            icon: BookMarked,
            color: "text-purple-600",
            bg: "bg-purple-50",
            href: "/lendings",
        }
    ];

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-3">
                {statCards.map(({ label, value, icon: Icon, color, bg, href }) => (
                    <Link key={label} href={href}>
                        <Card className="hover:shadow-md transition-shadow cursor-pointer">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-500">{label}</p>
                                        {loading ? (
                                            <Skeleton className="h-8 w-16 mt-1" />
                                        ) : (
                                            <p className="text-3xl font-bold text-slate-900 mt-1">
                                                {value}
                                            </p>
                                        )}
                                    </div>
                                    <div className={`${bg} rounded-full p-3`}>
                                        <Icon className={`h-6 w-6 ${color}`} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* Recent Lendings & Books Overview */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-3">
                        <CardTitle className="text-base font-semibold">
                            Recent Lendings
                        </CardTitle>
                        <Link href="/lendings">
                            <Button variant="ghost" size="sm" className="text-blue-600 gap-1">
                                View all <ArrowRight className="h-3 w-3" />
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {loading ? (
                            Array.from({ length: 4 }).map((_, i) => (
                                <Skeleton key={i} className="h-12 w-full" />
                            ))
                        ) : recentLendings.length === 0 ? (
                            <p className="text-sm text-slate-400 text-center py-4">
                                No lendings yet
                            </p>
                        ) : (
                            recentLendings.map((l) => (
                                <div
                                    key={l.lendingId}
                                    className="flex items-center justify-between rounded-lg border p-3"
                                >
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">
                                            {l.reader?.name ?? l.readerId}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            Book: {l.book?.title ?? l.bookId}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <Badge variant="secondary" className="text-xs">
                                            {l.status}
                                        </Badge>
                                        <p className="text-xs text-slate-400 mt-1">
                                            {l.borrowedDate}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-3">
                        <CardTitle className="text-base font-semibold">
                            Books Overview
                        </CardTitle>
                        <Link href="/books">
                            <Button variant="ghost" size="sm" className="text-blue-600 gap-1">
                                Manage <ArrowRight className="h-3 w-3" />
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {loading ? (
                            Array.from({ length: 4 }).map((_, i) => (
                                <Skeleton key={i} className="h-12 w-full" />
                            ))
                        ) : books.length === 0 ? (
                            <p className="text-sm text-slate-400 text-center py-4">
                                No books yet
                            </p>
                        ) : (
                            books.slice(0, 5).map((b) => (
                                <div
                                    key={b.bookId}
                                    className="flex items-center justify-between rounded-lg border p-3"
                                >
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">
                                            {b.title}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            {b.author}
                                        </p>
                                    </div>
                                    <Badge className="bg-emerald-100 text-emerald-700">
                                        {b.available ? "Available" : "Borrowed"}
                                    </Badge>
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base font-semibold">
                        Quick Actions
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <Link href="/readers?action=new">
                            <Button variant="outline" className="w-full justify-start gap-2 h-12">
                                <Users className="h-4 w-4 text-blue-600" />
                                Add Reader
                            </Button>
                        </Link>
                        <Link href="/books?action=new">
                            <Button variant="outline" className="w-full justify-start gap-2 h-12">
                                <BookOpen className="h-4 w-4 text-emerald-600" />
                                Add Book
                            </Button>
                        </Link>
                        <Link href="/lendings?action=new">
                            <Button variant="outline" className="w-full justify-start gap-2 h-12">
                                <BookMarked className="h-4 w-4 text-purple-600" />
                                New Lending
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>

            {/* Logo Section with 2 images */}
            <div className="flex flex-col items-end gap-3 pt-4 pb-2 border-t border-slate-200">
                <Image
                    src="/library-logo.png" // public folder PNG
                    alt="Library Logo PNG"
                    width={80}
                    height={80}
                    className="rounded-lg object-contain"
                />
                <Image
                    src="/library-logo.jpg" // public folder JPG
                    alt="Library Logo JPG"
                    width={80}
                    height={80}
                    className="rounded-lg object-contain"
                />
                <div className="text-right space-y-1">
                    <p className="text-sm font-medium text-slate-600">
                        Library Management System
                    </p>
                    <p className="text-xs text-slate-400">
                        &copy; Greenwood Institute
                    </p>
                </div>
            </div>
        </div>
    );
}