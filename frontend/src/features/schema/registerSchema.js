import z from "zod";

export const RegisterForm = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, {
        error: (iss) => `სახელი უნდა შეიცავდეს მინიმუმ ${iss.minimum} სიმბოლოს`,
      }),

    lastName: z
      .string()
      .trim()
      .min(2, {
        error: (iss) => `გვარი უნდა შეიცავდეს მინიმუმ ${iss.minimum} სიმბოლოს`,
      }),

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

    phone: z
      .string()
      .trim()
      .regex(/^(\+995\d{9}|\d{9})$/, {
        error:
          "ტელეფონის ნომერი უნდა იყოს 9 ციფრი ან დაიწყოს +995-ით და შეიცავდეს 9 ციფრს",
      })
      .transform((phone) =>
        phone.startsWith("+995") ? phone : "+995" + phone,
      ),

    password: z
      .string()
      .trim()
      .min(6, {
        error: (iss) => `პაროლი უნდა შეიცავდეს მინიმუმ ${iss.minimum} სიმბოლოს`,
      }),

    confirmPassword: z.string().trim(),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "პაროლები არ ემთხვევა",
    path: ["confirmPassword"],
  });
