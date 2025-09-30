// src/services/suppliers.service.ts
import prisma from "../config/db";

export async function getSuppliers(page: number = 1, limit: number = 10) {
  return prisma.supplier.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: "desc" },
  });
}

export async function getSupplierById(id: string) {
  return prisma.supplier.findUnique({
    where: { id },
  });
}

export async function createSupplier(data: { name: string; country: string }) {
  return prisma.supplier.create({ data });
}

export async function updateSupplier(
  id: string,
  data: { name?: string; country?: string }
) {
  return prisma.supplier.update({
    where: { id },
    data,
  });
}

export async function deleteSupplier(id: string) {
  return prisma.supplier.delete({
    where: { id },
  });
}
