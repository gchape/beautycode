import z from "zod";

export const LoginForm = z.object({
  email: z.email({
    error: (iss) => {
      if (!iss.input) {
        return "ელფოსტა სავალდებულოა";
      }
      if (iss.code === "invalid_format") {
        return "გთხოვთ შეიყვანოთ სწორი ელფოსტა (მაგ: user@example.com)";
      }
      return "არასწორი ელფოსტა";
    },
  }),
  password: z
    .string()
    .trim()
    .min(6, {
      error: (iss) => `პაროლი უნდა შეიცავდეს მინიმუმ ${iss.minimum} სიმბოლოს`,
    }),
});
