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

    const todos = Array.from({ length: 50 }, (_, index) => ({
      title: `Görev ${index + 1}`,
      description: `Bu görev ${index + 1} için açıklama.`,
      status: ["pending", "in_progress", "completed", "cancelled"][index % 4], // Döngüsel olarak durum atama
      priority: ["low", "medium", "high"][index % 3], // Döngüsel olarak öncelik atama
      due_date: new Date(Date.now() + index * 24 * 60 * 60 * 1000), // Her görev için farklı bir tarih
      category_ids: [
        "681f706548960485b42885f1",
        "681f706548960485b42885f2",
        "681f737eb6c963e208e42e33",
      ].slice(0, (index % 3) + 1), // 1-3 kategori arasında rastgele atama
    }));

    await Todo.insertMany(todos);

    console.log("✅ 10 adet todo başarıyla eklendi");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seedleme hatası:", error);
    process.exit(1);
  }
};

seed();
