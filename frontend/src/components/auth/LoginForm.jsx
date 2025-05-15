import { useForm } from "react-hook-form";
import { loginSchema } from "../../utils/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../common/Input";
import Button from "../common/Button";
import { useAuth } from "../../hooks/auth/useAuth";

export default function LoginForm() {
  const { login, loading, error } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    await login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="bg-red-50 dark:bg-red-900 text-red-500 dark:text-red-200 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

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

      <Button
        type="submit"
        variant="primary"
        loading={loading}
        className="w-full"
      >
        Giriş Yap
      </Button>
    </form>
  );
}
