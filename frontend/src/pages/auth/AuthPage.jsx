import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "../../components/auth/LoginForm";
import RegisterForm from "../../components/auth/RegisterForm";
import Logo from "../../components/common/Logo";
import ThemeToggle from "../../components/layout/Navbar/ThemeToggle";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="flex-1 flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Logo />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Hoş Geldiniz
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Todo uygulamasını kullanmak için giriş yapın
          </p>
        </div>

        <div className="w-full sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center space-x-4 mb-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsLogin(true)}
              className={`px-4 py-2 rounded-md ${
                isLogin
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              }`}
            >
              Giriş Yap
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsLogin(false)}
              className={`px-4 py-2 rounded-md ${
                !isLogin
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              }`}
            >
              Kayıt Ol
            </motion.button>
          </div>

          <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <LoginForm isLogin={isLogin} />
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <RegisterForm  isLogin={isLogin}/>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}