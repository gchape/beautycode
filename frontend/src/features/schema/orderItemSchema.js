import z from "zod";

export const OrderItem = z.object({
  id: z.number(),
  summary: z.string(),
  date: z.iso.datetime(),
});
