import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../utils/validators";
import Input from "../common/Input";
import Button from "../common/Button";
import { useAuth } from "../../hooks/auth/useAuth";

export default function RegisterForm() {
  const { register: onRegister, loading, error } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    await onRegister(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="bg-red-50 dark:bg-red-900 text-red-500 dark:text-red-200 p-3 rounded-md text-sm">
          {error}
        </div>
      )}
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
        loading={loading}
        className="w-full"
      >
        Kayıt Ol
      </Button>
    </form>
  );
}
