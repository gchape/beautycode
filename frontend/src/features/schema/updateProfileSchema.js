import z from "zod";

export const UpdateProfile = z.object({
  email: z.email({
    error: (iss) => {
      if (!iss.input) {
        return "ელფოსტა სავალდებულოა";
      }
      if (iss.code === "invalid_format") {
        return "გთხოვთ შეიყვანოთ სწორი ელფოსტა";
      }
      return "ელფოსტა არასწორია";
    },
  }),
  phone: z
    .string()
    .trim()
    .regex(/^(\+995\d{9}|\d{9})$/, {
      error:
        "ტელეფონის ნომერი უნდა იყოს 9 ციფრი ან დაიწყოს +995-ით და შეიცავდეს 9 ციფრს",
    })
    .transform((phone) => (phone.startsWith("+995") ? phone : "+995" + phone)),
});
