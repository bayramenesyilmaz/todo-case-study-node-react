import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Input from "../common/Input";
import Button from "../common/Button";
import { toast } from "react-toastify";
import { useState } from "react";
import { categorySchema } from "../../utils/validators";

export default function CategoryForm({ onSubmit, initialData }) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: initialData?.name || "",
      color: initialData?.color || "#000000",
    },
  });

  const handleFormSubmit = async (data) => {
    setIsLoading(true);

    await onSubmit(data);

    setIsLoading(false);
  };

  const selectedColor = watch("color");

  const handleColorChange = (e) => {
    const newColor = e.target.value.toUpperCase();
    setValue("color", newColor); // Her iki input'u da güncelle
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <Input
        label="Kategori Adı"
        {...register("name")}
        error={errors.name?.message}
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Renk Seçimi
        </label>

        <div className="flex items-center gap-4">
          <Input
            type="color"
            value={selectedColor}
            onChange={handleColorChange}
            className="w-16 h-10 p-1 rounded border border-gray-300"
          />

          <Input
            type="text"
            placeholder="#FF5733"
            {...register("color")}
            className="flex-1"
            error={errors.color?.message}
          />
        </div>

        {/* Renk Önizleme */}
        <div className="flex items-center gap-2 mt-2">
          <div
            className="w-6 h-6 rounded border"
            style={{ backgroundColor: selectedColor }}
          />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Seçilen Renk: {selectedColor}
          </span>
        </div>
      </div>

      <Button type="submit" variant="primary" loading={isLoading}>
        {initialData ? "Güncelle" : "Oluştur"}
      </Button>
    </form>
  );
}
