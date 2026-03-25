// "use client";
//
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";
// import { readerApi, bookApi } from "@/lib/api";
// import type { Lending, Reader, Book } from "@/types/index";
//
// const schema = z.object({
//     readerId: z.string().min(1, "Reader is required"),
//     bookId: z.string().min(1, "Book is required"),
//     borrowDate: z.string().min(1, "Borrow date is required"),
//     dueDate: z.string().min(1, "Due date is required"),
// });
//
// export type LendingFormValues = z.infer<typeof schema>;
//
// interface Props {
//     lending?: Lending;
//     onSubmit: (values: LendingFormValues) => Promise<void>;
//     onCancel: () => void;
//     loading?: boolean;
// }
//
// export function LendingForm({ lending, onSubmit, onCancel, loading }: Props) {
//     const [readers, setReaders] = useState<Reader[]>([]);
//     const [books, setBooks] = useState<Book[]>([]);
//     const [fetching, setFetching] = useState(true);
//
//     useEffect(() => {
//         Promise.all([readerApi.getAll(), bookApi.getAll()])
//             .then(([r, b]) => {
//                 setReaders(r);
//                 setBooks(b);
//             })
//             .finally(() => setFetching(false));
//     }, []);
//
//     const form = useForm<LendingFormValues>({
//         resolver: zodResolver(schema),
//         defaultValues: {
//             readerId: lending?.readerId ?? "",
//             bookId: lending?.bookId ?? "",
//             borrowDate: lending?.borrowDate ?? new Date().toISOString().split("T")[0],
//             dueDate: lending?.dueDate ?? new Date().toISOString().split("T")[0],
//         },
//     });
//
//     return (
//         <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//                 <FormField
//                     control={form.control}
//                     name="readerId"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Reader *</FormLabel>
//                             <FormControl>
//                                 <select {...field} disabled={fetching}>
//                                     <option value="">Select reader</option>
//                                     {readers.map((r) => (
//                                         <option key={r.readerId} value={r.readerId}>
//                                             {r.name} ({r.readerId})
//                                         </option>
//                                     ))}
//                                 </select>
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//
//                 <FormField
//                     control={form.control}
//                     name="bookId"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Book *</FormLabel>
//                             <FormControl>
//                                 <select {...field} disabled={fetching}>
//                                     <option value="">Select book</option>
//                                     {books.map((b) => (
//                                         <option key={b.bookId} value={b.bookId}>
//                                             {b.title} ({b.bookId})
//                                         </option>
//                                     ))}
//                                 </select>
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//
//                 {["borrowDate", "dueDate"].map((field) => (
//                     <FormField
//                         key={field}
//                         control={form.control}
//                         name={field as keyof LendingFormValues}
//                         render={({ field: f }) => (
//                             <FormItem>
//                                 <FormLabel>{field === "borrowDate" ? "Borrow Date" : "Due Date"} *</FormLabel>
//                                 <FormControl>
//                                     <Input type="date" {...f} />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />
//                 ))}
//
//                 <div className="flex justify-end gap-3 pt-2">
//                     <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
//                         Cancel
//                     </Button>
//                     <Button type="submit" disabled={loading || fetching}>
//                         {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//                         {lending ? "Update Lending" : "Create Lending"}
//                     </Button>
//                 </div>
//             </form>
//         </Form>
//     );
// }