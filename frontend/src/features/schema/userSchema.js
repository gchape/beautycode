import z from "zod";
import { OrderItem } from "./orderItemSchema";

z.config(z.locales.ka());

export const User = z.object({
  id: z.string(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phone: z.string().regex(/^(\+995\d{9}|\d{9})$/),
  email: z.email(),
  orders: z.array(OrderItem),
});
