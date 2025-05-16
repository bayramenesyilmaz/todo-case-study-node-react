import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
});

export const registerSchema = z
  .object({
    name: z.string().min(3, "Ad soyad en az 3 karakter olmalıdır"),
    email: z.string().email("Geçerli bir e-posta adresi giriniz"),
    password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Şifreler eşleşmiyor",
    path: ["passwordConfirm"],
  });

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
  shared_with: z
    .string()
    .optional()
    .default("")
    .transform((val) => {
      if (!val) return [];
      // Email'leri virgülle ayır ve boşlukları temizle
      const emails = val
        .split(",")
        .map((email) => email.trim())
        .filter((email) => email !== "");

      return emails;
    }),
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
