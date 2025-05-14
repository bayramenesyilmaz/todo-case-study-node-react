import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Input from "../common/Input";
import Button from "../common/Button";
import Select from "../common/Select";
import CategorySelector from "../category/CategorySelector";

const todoSchema = z.object({
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
  due_date: z.string().nonempty("Bitiş tarihi zorunludur"),
  category_ids: z.array(z.string()).nonempty("En az bir kategori seçmelisiniz"),
});

export default function TodoForm({ todo, categories, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: todo.title,
      description: todo.description,
      status: todo.status,
      priority: todo.priority,
      due_date: todo.due_date,
      category_ids: todo.category_ids,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Başlık */}
      <Input
        label="Başlık"
        {...register("title")}
        error={errors.title?.message}
      />

      {/* Açıklama */}
      <Input
        label="Açıklama"
        {...register("description")}
        error={errors.description?.message}
      />

      {/* Durum */}
      <Select
        label="Durum"
        {...register("status")}
        options={[
          { value: "pending", label: "Bekleyen" },
          { value: "in_progress", label: "Devam Eden" },
          { value: "completed", label: "Tamamlanan" },
          { value: "cancelled", label: "İptal" },
        ]}
        error={errors.status?.message}
      />

      {/* Öncelik */}
      <Select
        label="Öncelik"
        {...register("priority")}
        options={[
          { value: "low", label: "Düşük" },
          { value: "medium", label: "Orta" },
          { value: "high", label: "Yüksek" },
        ]}
        error={errors.priority?.message}
      />

      {/* Bitiş Tarihi */}
      <Input
        label="Bitiş Tarihi"
        type="date"
        {...register("due_date")}
        error={errors.due_date?.message}
      />

      {/* Kategoriler */}
      <CategorySelector
        label="Kategoriler"
        {...register("category_ids")}
        options={categories.map((category) => ({
          value: category.id,
          label: category.name,
        }))}
        multiple
        error={errors.category_ids?.message}
      />

      {/* Kaydet Butonu */}
      <Button type="submit" variant="primary">
        Kaydet
      </Button>
    </form>
  );
}
