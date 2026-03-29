// "use client";
//
// import { useEffect, useState } from "react";
// import {
//     Users,
//     BookOpen,
//     BookMarked,
//     ArrowRight,
// } from "lucide-react";
// import Link from "next/link";
// import Image from "next/image";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// // import { readerApi, bookApi, lendingApi } from "@/lib/api";
// import type { User, Book } from "@/types/index";
// import {Lending} from "@/types/lending";
//
// interface Stats {
//     readers: number;
//     books: number;
//     lendings: number;
// }
//
// export default function DashboardPage() {
//     const [stats, setStats] = useState<Stats | null>(null);
//     const [recentLendings, setRecentLendings] = useState<Lending[]>([]);
//     const [books, setBooks] = useState<Book[]>([]);
//     const [loading, setLoading] = useState(true);
//
//     useEffect(() => {
//         async function load() {
//             try {
//                 const [readers, booksData, lendings] = await Promise.all([
//                     readerApi.getAll(),
//                     bookApi.getAll(),
//                     lendingApi.getAll(),
//                 ]);
//                 setStats({
//                     readers: readers.length,
//                     books: booksData.length,
//                     lendings: lendings.length,
//                 });
//                 setRecentLendings(lendings.slice(-5).reverse());
//                 setBooks(booksData);
//             } catch {
//             } finally {
//                 setLoading(false);
//             }
//         }
//         load();
//     }, []);
//
//     const statCards = [
//         {
//             label: "Total Readers",
//             value: stats?.readers ?? 0,
//             icon: Users,
//             color: "text-blue-600",
//             bg: "bg-blue-50",
//             href: "/readers",
//         },
//         {
//             label: "Total Books",
//             value: stats?.books ?? 0,
//             icon: BookOpen,
//             color: "text-emerald-600",
//             bg: "bg-emerald-50",
//             href: "/books",
//         },
//         {
//             label: "Total Lendings",
//             value: stats?.lendings ?? 0,
//             icon: BookMarked,
//             color: "text-purple-600",
//             bg: "bg-purple-50",
//             href: "/lendings",
//         }
//     ];
//
//     return (
//         <div className="space-y-6">
//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-3">
//                 {statCards.map(({ label, value, icon: Icon, color, bg, href }) => (
//                     <Link key={label} href={href}>
//                         <Card className="hover:shadow-md transition-shadow cursor-pointer">
//                             <CardContent className="p-6">
//                                 <div className="flex items-center justify-between">
//                                     <div>
//                                         <p className="text-sm font-medium text-slate-500">{label}</p>
//                                         {loading ? (
//                                             <Skeleton className="h-8 w-16 mt-1" />
//                                         ) : (
//                                             <p className="text-3xl font-bold text-slate-900 mt-1">
//                                                 {value}
//                                             </p>
//                                         )}
//                                     </div>
//                                     <div className={`${bg} rounded-full p-3`}>
//                                         <Icon className={`h-6 w-6 ${color}`} />
//                                     </div>
//                                 </div>
//                             </CardContent>
//                         </Card>
//                     </Link>
//                 ))}
//             </div>
//
//             {/* Recent Lendings & Books Overview */}
//             <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//                 <Card>
//                     <CardHeader className="flex flex-row items-center justify-between pb-3">
//                         <CardTitle className="text-base font-semibold">
//                             Recent Lendings
//                         </CardTitle>
//                         <Link href="/lendings">
//                             <Button variant="ghost" size="sm" className="text-blue-600 gap-1">
//                                 View all <ArrowRight className="h-3 w-3" />
//                             </Button>
//                         </Link>
//                     </CardHeader>
//                     <CardContent className="space-y-3">
//                         {loading ? (
//                             Array.from({ length: 4 }).map((_, i) => (
//                                 <Skeleton key={i} className="h-12 w-full" />
//                             ))
//                         ) : recentLendings.length === 0 ? (
//                             <p className="text-sm text-slate-400 text-center py-4">
//                                 No lendings yet
//                             </p>
//                         ) : (
//                             recentLendings.map((l) => (
//                                 <div
//                                     key={l.lendingId}
//                                     className="flex items-center justify-between rounded-lg border p-3"
//                                 >
//                                     <div>
//                                         <p className="text-sm font-medium text-slate-900">
//                                             {l.reader?.name ?? l.readerId}
//                                         </p>
//                                         <p className="text-xs text-slate-500">
//                                             Book: {l.book?.title ?? l.bookId}
//                                         </p>
//                                     </div>
//                                     <div className="text-right">
//                                         <Badge variant="secondary" className="text-xs">
//                                             {l.status}
//                                         </Badge>
//                                         <p className="text-xs text-slate-400 mt-1">
//                                             {l.borrowedDate}
//                                         </p>
//                                     </div>
//                                 </div>
//                             ))
//                         )}
//                     </CardContent>
//                 </Card>
//
//                 <Card>
//                     <CardHeader className="flex flex-row items-center justify-between pb-3">
//                         <CardTitle className="text-base font-semibold">
//                             Books Overview
//                         </CardTitle>
//                         <Link href="/books">
//                             <Button variant="ghost" size="sm" className="text-blue-600 gap-1">
//                                 Manage <ArrowRight className="h-3 w-3" />
//                             </Button>
//                         </Link>
//                     </CardHeader>
//                     <CardContent className="space-y-3">
//                         {loading ? (
//                             Array.from({ length: 4 }).map((_, i) => (
//                                 <Skeleton key={i} className="h-12 w-full" />
//                             ))
//                         ) : books.length === 0 ? (
//                             <p className="text-sm text-slate-400 text-center py-4">
//                                 No books yet
//                             </p>
//                         ) : (
//                             books.slice(0, 5).map((b) => (
//                                 <div
//                                     key={b.bookId}
//                                     className="flex items-center justify-between rounded-lg border p-3"
//                                 >
//                                     <div>
//                                         <p className="text-sm font-medium text-slate-900">
//                                             {b.title}
//                                         </p>
//                                         <p className="text-xs text-slate-500">
//                                             {b.author}
//                                         </p>
//                                     </div>
//                                     <Badge className="bg-emerald-100 text-emerald-700">
//                                         {b.available ? "Available" : "Borrowed"}
//                                     </Badge>
//                                 </div>
//                             ))
//                         )}
//                     </CardContent>
//                 </Card>
//             </div>
//
//             {/* Quick Actions */}
//             <Card>
//                 <CardHeader>
//                     <CardTitle className="text-base font-semibold">
//                         Quick Actions
//                     </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
//                         <Link href="/readers?action=new">
//                             <Button variant="outline" className="w-full justify-start gap-2 h-12">
//                                 <Users className="h-4 w-4 text-blue-600" />
//                                 Add Reader
//                             </Button>
//                         </Link>
//                         <Link href="/books?action=new">
//                             <Button variant="outline" className="w-full justify-start gap-2 h-12">
//                                 <BookOpen className="h-4 w-4 text-emerald-600" />
//                                 Add Book
//                             </Button>
//                         </Link>
//                         <Link href="/lendings?action=new">
//                             <Button variant="outline" className="w-full justify-start gap-2 h-12">
//                                 <BookMarked className="h-4 w-4 text-purple-600" />
//                                 New Lending
//                             </Button>
//                         </Link>
//                     </div>
//                 </CardContent>
//             </Card>
//
//             {/* Logo Section with 2 images */}
//             <div className="flex flex-col items-end gap-3 pt-4 pb-2 border-t border-slate-200">
//                 <Image
//                     src="/library-logo.png" // public folder PNG
//                     alt="Library Logo PNG"
//                     width={80}
//                     height={80}
//                     className="rounded-lg object-contain"
//                 />
//                 <Image
//                     src="/library-logo.jpg" // public folder JPG
//                     alt="Library Logo JPG"
//                     width={80}
//                     height={80}
//                     className="rounded-lg object-contain"
//                 />
//                 <div className="text-right space-y-1">
//                     <p className="text-sm font-medium text-slate-600">
//                         Library Management System
//                     </p>
//                     <p className="text-xs text-slate-400">
//                         &copy; Greenwood Institute
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// }

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { getUsers, getBooks, getLendings } from "@/lib/api";

export default function DashboardPage() {

    const [readers, setReaders] = useState(0);
    const [books, setBooks] = useState(0);
    const [lendings, setLendings] = useState(0);

    useEffect(() => {
        async function loadData() {
            try {
                const usersData = await getUsers();
                const booksData = await getBooks();
                const lendingsData = await getLendings();

                setReaders(usersData.length);
                setBooks(booksData.length);
                setLendings(lendingsData.length);

            } catch (err) {
                console.error(err);
            }
        }

        loadData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6">

            {/* HEADER */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-indigo-600">
                    📊 Dashboard
                </h1>
                <p className="text-gray-500">
                    Welcome to Greenwood Institute Library System
                </p>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

                <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                    <h2 className="text-sm text-gray-500">Total Readers</h2>
                    <p className="text-3xl font-bold text-blue-600">{readers}</p>
                    <Link href="/users" className="text-sm text-blue-500 underline">
                        View Readers →
                    </Link>
                </div>

                <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                    <h2 className="text-sm text-gray-500">Total Books</h2>
                    <p className="text-3xl font-bold text-green-600">{books}</p>
                    <Link href="/books" className="text-sm text-green-500 underline">
                        View Books →
                    </Link>
                </div>

                <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                    <h2 className="text-sm text-gray-500">Total Lendings</h2>
                    <p className="text-3xl font-bold text-purple-600">{lendings}</p>
                    <Link href="/lendings" className="text-sm text-purple-500 underline">
                        View Lendings →
                    </Link>
                </div>

            </div>

            {/* QUICK ACTIONS */}
            <div className="mb-10">
                <h2 className="text-xl font-semibold mb-4">⚡ Quick Actions</h2>

                <div className="flex gap-4 flex-wrap">
                    <Link href="/users">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow">
                            ➕ Add Reader
                        </button>
                    </Link>

                    <Link href="/books">
                        <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow">
                            ➕ Add Book
                        </button>
                    </Link>

                    <Link href="/lendings">
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg shadow">
                            ➕ New Lending
                        </button>
                    </Link>
                </div>
            </div>

            {/* EXTRA SECTION (fills page) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Info Card */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-lg font-semibold mb-3">📚 System Info</h2>
                    <p className="text-sm text-gray-600">
                        This Library Management System helps you manage readers,
                        books, and lending activities efficiently.
                    </p>

                    <ul className="mt-3 text-sm text-gray-500 space-y-1">
                        <li>✔ Manage Readers</li>
                        <li>✔ Manage Books</li>
                        <li>✔ Track Lending</li>
                    </ul>
                </div>

                {/* Activity Card */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-lg font-semibold mb-3">📈 Activity Summary</h2>

                    <div className="space-y-2 text-sm text-gray-600">
                        <p>👥 Readers Registered: {readers}</p>
                        <p>📖 Books Available: {books}</p>
                        <p>📦 Active Lendings: {lendings}</p>
                    </div>
                </div>

            </div>

            {/* FOOTER */}
            <div className="mt-12 text-center text-gray-400 text-sm">
                © Greenwood Institute Library System
            </div>

        </div>
    );
}