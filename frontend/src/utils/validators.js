import * as z from "zod";

export const todoSchema = z.object({
  title: z
    .string()
    .min(3, "Başlık en az 3 karakter olmalıdır")
    .max(100, "Başlık en fazla 100 karakter olmalıdır"),
  description: z
    .string()
    .max(500, "Açıklama en fazla 500 karakter olmalıdır")
    .optional(),
  status: z.enum(
    ["pending", "in_progress", "completed", "cancelled"],
    "Geçersiz durum değeri"
  ),
  priority: z.enum(["low", "medium", "high"], "Geçersiz öncelik değeri"),
  due_date: z
    .string()
    .nonempty("Bitiş tarihi zorunludur")
    .refine((date) => new Date(date) > new Date(), {
      message: "Bitiş tarihi bugünden sonra olmalıdır",
    }),
  category_ids: z.array(z.string()).nonempty("En az bir kategori seçmelisiniz"),
});

export const categorySchema = z.object({
  name: z.string().min(3, "Kategori adı en az 3 karakter olmalıdır"),
  color: z
    .string()
    .regex(
      /^#([A-Fa-f0-9]{6})$/,
      "Geçerli bir HEX renk kodu giriniz (örn: #FF5733)"
    )
    .transform((val) => val.toUpperCase()),
});
