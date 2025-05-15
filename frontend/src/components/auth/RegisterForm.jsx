import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../utils/validators";
import Input from "../common/Input";
import Button from "../common/Button";

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    console.log(data); // API entegrasyonu yapılacak
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Ad Soyad"
        {...register("name")}
        error={errors.name?.message}
      />

      <Input
        label="E-posta"
        type="email"
        {...register("email")}
        error={errors.email?.message}
      />

      <Input
        label="Şifre"
        type="password"
        {...register("password")}
        error={errors.password?.message}
      />

      <Input
        label="Şifre Tekrar"
        type="password"
        {...register("passwordConfirm")}
        error={errors.passwordConfirm?.message}
      />

      <Button
        type="submit"
        variant="primary"
        loading={isLoading}
        className="w-full"
      >
        Kayıt Ol
      </Button>
    </form>
  );
}
