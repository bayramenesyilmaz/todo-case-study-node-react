// backend/database/seeders/seed.js

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Todo = require("../../src/models/Todo");

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB bağlantısı başarılı");

    await Todo.deleteMany({});
    // Kategorileri silmiyoruz çünkü var olan ID’leri kullanacağız

    const todos = [
      {
        title: "React giriş componentini oluştur",
        description: "Header, Footer ve Layout yapısını hazırla",
        status: "pending",
        priority: "high",
        due_date: new Date("2025-05-15"),
        category_ids: ["681f706548960485b42885f1"],
      },
      {
        title: "Veritabanı ilişkilerini tasarla",
        description: "Todo ve Category ilişkileri belirlenmeli",
        status: "in_progress",
        priority: "medium",
        due_date: new Date("2025-05-18"),
        category_ids: ["681f706548960485b42885f2"],
      },
      {
        title: "Express route yapısını kur",
        description: "Todo route’ları ayrı dosyada tanımlanmalı",
        status: "completed",
        priority: "low",
        due_date: new Date("2025-05-10"),
        category_ids: ["681f737eb6c963e208e42e33"],
      },
      {
        title: "Form validasyonu ekle",
        description: "Joi ile category ve todo validasyonu ekle",
        status: "pending",
        priority: "medium",
        due_date: new Date("2025-05-20"),
        category_ids: ["681f706548960485b42885f1", "681f706548960485b42885f2"],
      },
      {
        title: "API hata yönetimini test et",
        description: "Error handler middleware ile testler yapılacak",
        status: "in_progress",
        priority: "high",
        due_date: new Date("2025-05-12"),
        category_ids: ["681f706548960485b42885f2"],
      },
      {
        title: "Karanlık tema desteği ekle",
        description: "Tailwind ile dark mode entegre et",
        status: "completed",
        priority: "medium",
        due_date: new Date("2025-05-11"),
        category_ids: ["681f706548960485b42885f1"],
      },
      {
        title: "Kategori silme işlemi yaz",
        description: "Kategoriye bağlı todo varsa uyarı ver",
        status: "pending",
        priority: "low",
        due_date: new Date("2025-05-19"),
        category_ids: ["681f706548960485b42885f2"],
      },
      {
        title: "MongoDB Atlas bağlantısını test et",
        description: "Bağlantı, hata yönetimi ve erişim testi yapılacak",
        status: "cancelled",
        priority: "medium",
        due_date: new Date("2025-05-14"),
        category_ids: ["681f737eb6c963e208e42e33"],
      },
      {
        title: "Todo item hover efekti ekle",
        description: "Animasyonlu geçiş efekti",
        status: "pending",
        priority: "low",
        due_date: new Date("2025-05-17"),
        category_ids: ["681f706548960485b42885f1"],
      },
      {
        title: "Pagination desteğini aktif et",
        description: "Sayfalama query parametreleri test edilmeli",
        status: "in_progress",
        priority: "high",
        due_date: new Date("2025-05-16"),
        category_ids: ["681f706548960485b42885f2", "681f737eb6c963e208e42e33"],
      },
    ];

    await Todo.insertMany(todos);

    console.log("✅ 10 adet todo başarıyla eklendi");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seedleme hatası:", error);
    process.exit(1);
  }
};

seed();
