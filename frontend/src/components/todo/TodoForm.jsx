import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { motion } from "framer-motion";
import {
  CalendarIcon,
  ClipboardDocumentListIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Input from "../common/Input";
import Button from "../common/Button";
import CategorySelector from "../category/CategorySelector";
import FormSelect from "../common/FormSelect";
import { formatDatePicker } from "../../utils/formatters";
import { todoSchema } from "../../utils/validators";

const priorityColors = {
  low: "text-green-600",
  medium: "text-yellow-600",
  high: "text-red-600",
};

const statusIcons = {
  pending: ExclamationTriangleIcon,
  in_progress: ClipboardDocumentListIcon,
  completed: CheckCircleIcon,
  cancelled: XMarkIcon,
};

export default function TodoForm({ todo, onSubmit, onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
  } = useForm({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: todo?.title || "",
      description: todo?.description || "",
      status: todo?.status || "pending",
      priority: todo?.priority || "medium",
      due_date: todo
        ? formatDatePicker(todo?.due_date)
        : new Date().toISOString().split("T")[0],
      category_ids: todo?.categories?.map((cat) => cat.id) || [],
      shared_with: todo?.shared_with?.map((sh) => sh.email) || "",
    },
  });
  const handleFormSubmit = async (data) => {
    try {
      setIsLoading(true);
      clearErrors(); // Önceki hataları temizle
      await onSubmit(data);

      onClose(); // Sadece başarılı olduğunda kapat
    } catch (error) {
      if (error.message.includes("Bu email adresleri sistemde bulunamadı")) {
        setError("shared_with", {
          type: "manual",
          message: error.message,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const selectedPriority = watch("priority");
  const selectedStatus = watch("status");

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Başlık */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
            Başlık
          </label>
          <Input
            {...register("title")}
            error={errors.title?.message}
            className="text-lg font-medium"
            placeholder="Not başlığını girin..."
          />
        </div>

        {/* Açıklama */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
            Açıklama
          </label>
          <textarea
            {...register("description")}
            className="w-full min-h-[100px] p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Not açıklamasını girin..."
          />
          {errors.description?.message && (
            <p className="mt-1 text-sm text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Durum ve Öncelik */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <FormSelect
              label="Durum"
              {...register("status")}
              options={[
                { value: "pending", label: "Bekleyen" },
                { value: "in_progress", label: "Devam Eden" },
                { value: "completed", label: "Tamamlandı" },
                { value: "cancelled", label: "İptal" },
              ]}
              error={errors.status?.message}
              icon={statusIcons[selectedStatus]}
            />
          </div>

          <div>
            <FormSelect
              label="Öncelik"
              {...register("priority")}
              options={[
                { value: "low", label: "Düşük" },
                { value: "medium", label: "Orta" },
                { value: "high", label: "Yüksek" },
              ]}
              error={errors.priority?.message}
              className={priorityColors[selectedPriority]}
            />
          </div>
        </div>

        {/* Bitiş Tarihi */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
            Bitiş Tarihi
            <span className="text-xs text-gray-500 ml-1">
              (Not ne zaman tamamlanmalı?)
            </span>
          </label>
          <div className="relative">
            <CalendarIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <Input
              type="date"
              {...register("due_date")}
              error={errors.due_date?.message}
              className="pl-10"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
        </div>

        {/* Kategoriler */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
            Kategoriler
            <span className="text-xs text-gray-500 ml-1">
              (En az bir kategori seçin)
            </span>
          </label>
          <CategorySelector
            value={watch("category_ids")}
            onChange={(value) => setValue("category_ids", value)}
            error={errors.category_ids?.message}
          />
        </div>

        {/* Paylaşım Alanı */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
            Paylaşılacak Kullanıcılar
            <span className="text-xs text-gray-500 ml-1">
              (Virgülle ayırarak email adresleri girin)
            </span>
          </label>
          <textarea
            {...register("shared_with")}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="ornek1@mail.com, ornek2@mail.com"
            defaultValue={todo?.shared_with
              ?.map((user) => user.email)
              .join(", ")}
          />
          {errors.shared_with && (
            <p className="mt-1 text-sm text-red-500">
              {errors.shared_with.message}
            </p>
          )}
        </div>
      </motion.div>

      {/* Butonlar */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button
          type="button"
          variant="secondary"
          onClick={onClose}
          disabled={isLoading}
        >
          İptal
        </Button>
        <Button type="submit" variant="primary" loading={isLoading}>
          {todo ? "Güncelle" : "Oluştur"}
        </Button>
      </div>
    </form>
  );
}
