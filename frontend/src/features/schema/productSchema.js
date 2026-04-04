import z from "zod";

export const Product = z.object({
  id: z.number().int(),
  imgUrl: z.string(),
  badge: z.string(),
  category: z.string(),
  discount: z.string(),
  title: z.string(),
  oldPrice: z.number(),
  newPrice: z.number(),
  features: z.array(z.string()),
});
