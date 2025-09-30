// src/services/rates.service.ts
import prisma from "../config/db";

export async function getRates(
  page: number,
  limit: number,
  filters: { supplierId?: string; currency?: string }
) {
  const skip = (page - 1) * limit;

  const where: any = {};
  if (filters.supplierId) where.supplierId = filters.supplierId;
  if (filters.currency) where.currency = filters.currency;

  const [items, total] = await Promise.all([
    prisma.tourismRate.findMany({
      skip,
      take: limit,
      where,
      include: { supplier: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.tourismRate.count({ where }),
  ]);

  return {
    items,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getRateById(id: string) {
  return prisma.tourismRate.findUnique({
    where: { id },
    include: { supplier: true },
  });
}

export async function createRate(data: {
  supplierId: string;
  description: string;
  price: number;
  currency: string;
}) {
  return prisma.tourismRate.create({ data, include: { supplier: true } });
}

export async function updateRate(
  id: string,
  data: { description?: string; price?: number; currency?: string }
) {
  return prisma.tourismRate.update({ where: { id }, data });
}

export async function deleteRate(id: string) {
  return prisma.tourismRate.delete({ where: { id } });
}
