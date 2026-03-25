// "use client";
//
// import { useEffect, useState, useCallback, Suspense } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { Plus, Search, Pencil, Trash2 } from "lucide-react";
//
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table";
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
// } from "@/components/ui/dialog";
// import {
//     AlertDialog,
//     AlertDialogAction,
//     AlertDialogCancel,
//     AlertDialogContent,
//     AlertDialogDescription,
//     AlertDialogFooter,
//     AlertDialogHeader,
//     AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
//
// import { lendingApi, readerApi, bookApi } from "@/lib/api";
// import type { Lending, Reader, Book } from "@/types/index";
// import { LendingForm, type LendingFormValues } from "@/components/lendings/lendings-form";
//
// function LendingContent() {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//
//     const [lendings, setLendings] = useState<Lending[]>([]);
//     const [readers, setReaders] = useState<Reader[]>([]);
//     const [books, setBooks] = useState<Book[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [search, setSearch] = useState("");
//     const [formOpen, setFormOpen] = useState(false);
//     const [editTarget, setEditTarget] = useState<Lending | undefined>();
//     const [deleteOpen, setDeleteOpen] = useState(false);
//     const [deleteTarget, setDeleteTarget] = useState<Lending | null>(null);
//     const [submitting, setSubmitting] = useState(false);
//
//     const fetchData = useCallback(async () => {
//         setLoading(true);
//         try {
//             const [lendData, readerData, bookData] = await Promise.all([
//                 lendingApi.getAll(),
//                 readerApi.getAll(),
//                 bookApi.getAll(),
//             ]);
//             setLendings(lendData);
//             setReaders(readerData);
//             setBooks(bookData);
//         } catch {
//             toast.error("Failed to load lending data");
//         } finally {
//             setLoading(false);
//         }
//     }, []);
//
//     useEffect(() => {
//         fetchData();
//     }, [fetchData]);
//
//     useEffect(() => {
//         if (searchParams.get("action") === "new") {
//             setEditTarget(undefined);
//             setFormOpen(true);
//         }
//     }, [searchParams]);
//
//     const getReaderName = (readerId: string) => readers.find(r => r.readerId === readerId)?.name ?? readerId;
//     const getBookTitle = (bookId: string) => books.find(b => b.bookId === bookId)?.title ?? bookId;
//
//     const filtered = lendings.filter(
//         l =>
//             getReaderName(l.readerId).toLowerCase().includes(search.toLowerCase()) ||
//             getBookTitle(l.bookId).toLowerCase().includes(search.toLowerCase())
//     );
//
//     const openNew = () => {
//         setEditTarget(undefined);
//         setFormOpen(true);
//     };
//
//     const openEdit = (lending: Lending) => {
//         setEditTarget(lending);
//         setFormOpen(true);
//     };
//
//     const handleFormClose = () => {
//         setFormOpen(false);
//         router.replace("/lendings");
//     };
//
//     const handleFormSubmit = async (values: LendingFormValues) => {
//         setSubmitting(true);
//         try {
//             if (editTarget) {
//                 await lendingApi.update(editTarget.id!, values);
//                 toast.success("Lending updated successfully");
//             } else {
//                 await lendingApi.create(values);
//                 toast.success("Lending created successfully");
//             }
//             handleFormClose();
//             fetchData();
//         } catch (err: unknown) {
//             const msg = err instanceof Error ? err.message : "Operation failed";
//             toast.error(msg);
//         } finally {
//             setSubmitting(false);
//         }
//     };
//
//     const handleDelete = async () => {
//         if (!deleteTarget) return;
//         try {
//             await lendingApi.delete(deleteTarget.id!);
//             toast.success("Lending deleted");
//             setDeleteOpen(false);
//             fetchData();
//         } catch {
//             toast.error("Failed to delete lending");
//         }
//     };
//
//     return (
//         <>
//             <div className="space-y-4">
//                 <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//                     <div className="relative w-full sm:w-72">
//                         <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
//                         <Input
//                             className="pl-9"
//                             placeholder="Search by reader or book…"
//                             value={search}
//                             onChange={(e) => setSearch(e.target.value)}
//                         />
//                     </div>
//                     <Button onClick={openNew} className="gap-2 shrink-0">
//                         <Plus className="h-4 w-4" />
//                         Add Lending
//                     </Button>
//                 </div>
//
//                 {!loading && filtered.length > 0 && (
//                     <div className="rounded-lg border bg-white shadow-sm mt-2">
//                         <Table>
//                             <TableHeader>
//                                 <TableRow className="bg-slate-50">
//                                     <TableHead>ID</TableHead>
//                                     <TableHead>Reader</TableHead>
//                                     <TableHead>Book</TableHead>
//                                     <TableHead>Date</TableHead>
//                                     <TableHead className="text-right">Actions</TableHead>
//                                 </TableRow>
//                             </TableHeader>
//                             <TableBody>
//                                 {filtered.map(l => (
//                                     <TableRow key={l.id}>
//                                         <TableCell><Badge variant="outline" className="font-mono">#{l.id}</Badge></TableCell>
//                                         <TableCell>{getReaderName(l.readerId)}</TableCell>
//                                         <TableCell>{getBookTitle(l.bookId)}</TableCell>
//                                         <TableCell>{l.barrowedDate}</TableCell>
//                                         <TableCell className="text-right">
//                                             <div className="flex items-center justify-end gap-1">
//                                                 <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(l)}>
//                                                     <Pencil className="h-4 w-4" />
//                                                 </Button>
//                                                 <Button
//                                                     variant="ghost"
//                                                     size="icon"
//                                                     className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
//                                                     onClick={() => { setDeleteTarget(l); setDeleteOpen(true); }}
//                                                 >
//                                                     <Trash2 className="h-4 w-4" />
//                                                 </Button>
//                                             </div>
//                                         </TableCell>
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </div>
//                 )}
//
//                 <p className="text-xs text-slate-400">{filtered.length} lending record{filtered.length !== 1 ? "s" : ""} shown</p>
//             </div>
//
//             <Dialog open={formOpen} onOpenChange={(open) => !open && handleFormClose()}>
//                 <DialogContent className="max-w-md">
//                     <DialogHeader>
//                         <DialogTitle>{editTarget ? "Edit Lending" : "Add New Lending"}</DialogTitle>
//                     </DialogHeader>
//                     <LendingForm
//                         lending={editTarget}
//                         readers={readers}
//                         books={books}
//                         onSubmit={handleFormSubmit}
//                         onCancel={handleFormClose}
//                         loading={submitting}
//                     />
//                 </DialogContent>
//             </Dialog>
//
//             <AlertDialog open={deleteOpen} onOpenChange={(open) => !open && setDeleteOpen(false)}>
//                 <AlertDialogContent>
//                     <AlertDialogHeader>
//                         <AlertDialogTitle>Delete Lending</AlertDialogTitle>
//                         <AlertDialogDescription>
//                             Are you sure you want to delete lending record <strong>#{deleteTarget?.id}</strong>? This action cannot be undone.
//                         </AlertDialogDescription>
//                     </AlertDialogHeader>
//                     <AlertDialogFooter>
//                         <AlertDialogCancel>Cancel</AlertDialogCancel>
//                         <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={handleDelete}>
//                             Delete
//                         </AlertDialogAction>
//                     </AlertDialogFooter>
//                 </AlertDialogContent>
//             </AlertDialog>
//         </>
//     );
// }
//
// export default function LendingPage() {
//     return (
//         <Suspense>
//             <LendingContent />
//         </Suspense>
//     );
// }