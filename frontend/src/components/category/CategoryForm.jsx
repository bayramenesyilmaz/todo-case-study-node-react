import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Input from "../common/Input";
import Button from "../common/Button";

const schema = z.object({
  name: z.string().min(3, "Kategori adı en az 3 karakter olmalıdır"),
  color: z.string().regex(/^#/, "Geçerli bir renk kodu giriniz"),
});

export default function CategoryForm({ onSubmit, initialData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialData || {},
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Kategori Adı"
        {...register("name")}
        error={errors.name?.message}
      />
      <Input
        label="Renk"
        type="color"
        {...register("color")}
        error={errors.color?.message}
      />
      <Button type="submit" variant="primary">
        {initialData ? "Güncelle" : "Oluştur"}
      </Button>
    </form>
  );
}
