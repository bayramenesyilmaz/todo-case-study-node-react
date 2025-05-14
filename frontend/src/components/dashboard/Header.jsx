import React from "react";
import Card from "../common/Card";

export default function Header() {
  return (
    <Card>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Hoş Geldiniz
      </h2>
      <p className="text-gray-600 dark:text-gray-300">
        Todo uygulamanıza hoş geldiniz. Buradan tüm görevlerinizi
        yönetebilirsiniz.
      </p>
    </Card>
  );
}
