import z from "zod";

export const OrderItem = z.object({
  id: z.number(),
  orderSummary: z.string(),
  date: z.iso.datetime(),
});
