// import { api } from "./api";
// import { Lending, LendingFormData } from "@/types/lending";
//
// export const getLendings = async (): Promise<Lending[]> => {
//     const res = await api.get("/lendings");
//     return res.data;
// };
//
// export const createLending = async (data: LendingFormData): Promise<Lending> => {
//     const res = await api.post("/lendings", data);
//     return res.data;
// };
//
// export const updateLending = async (id: string, data: LendingFormData): Promise<Lending> => {
//     const res = await api.put(`/lendings/${id}`, data);
//     return res.data;
// };
//
// export const deleteLending = async (id: string): Promise<void> => {
//     await api.delete(`/lendings/${id}`);
// };