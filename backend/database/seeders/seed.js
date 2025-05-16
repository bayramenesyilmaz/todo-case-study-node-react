const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Todo = require("../../src/models/Todo");

dotenv.config();

// Sabit kullanıcı ID'leri - Gerçek MongoDB ObjectId'leri
const USERS = {
  ADMIN: new mongoose.Types.ObjectId("68267651ad4dfe737d95f92f"), // Admin kullanıcı ID'si
  USER1: new mongoose.Types.ObjectId("68267677ad4dfe737d95f932"), // Normal kullanıcı 1 ID'si
  USER2: new mongoose.Types.ObjectId("6826768cad4dfe737d95f935"), // Normal kullanıcı 2 ID'si
};

// Sabit kategori ID'leri - Gerçek MongoDB ObjectId'leri
const CATEGORIES = {
  WORK: new mongoose.Types.ObjectId("681f706548960485b42885f2"),
  PERSONAL: new mongoose.Types.ObjectId("681f706548960485b42885f1"),
  SHOPPING: new mongoose.Types.ObjectId("681f737eb6c963e208e42e33"),
};

const createTodoData = () => {
  const todos = [
    // Admin'in todoları
    {
      title: "Önemli Toplantı",
      description: "Yönetim kurulu toplantısı",
      status: "pending",
      priority: "high",
      due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      category_ids: [CATEGORIES.WORK],
      owner_id: USERS.ADMIN,
      shared_with: [USERS.USER1],
    },
    {
      title: "Proje Planlaması",
      description: "Q2 proje planlaması",
      status: "in_progress",
      priority: "medium",
      due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      category_ids: [CATEGORIES.WORK],
      owner_id: USERS.ADMIN,
      shared_with: [USERS.USER1, USERS.USER2],
    },

    // User1'in todoları
    {
      title: "Market Alışverişi",
      description: "Haftalık market alışverişi",
      status: "pending",
      priority: "low",
      due_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      category_ids: [CATEGORIES.SHOPPING],
      owner_id: USERS.USER1,
      shared_with: [USERS.USER2],
    },
    {
      title: "Spor Salonu",
      description: "Haftalık spor programı",
      status: "in_progress",
      priority: "medium",
      due_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      category_ids: [CATEGORIES.PERSONAL],
      owner_id: USERS.USER1,
    },

    // User2'nin todoları
    {
      title: "Kitap Okuma",
      description: "Yeni başlanan kitap",
      status: "in_progress",
      priority: "low",
      due_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      category_ids: [CATEGORIES.PERSONAL],
      owner_id: USERS.USER2,
    },
  ];

  return todos;
};

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB bağlantısı başarılı");

    // Mevcut todoları temizle
    await Todo.deleteMany({});
    console.log("🗑️ Tüm todolar silindi");

    // Yeni todoları ekle
    const todos = createTodoData();
    await Todo.insertMany(todos);

    console.log(`✅ ${todos.length} adet todo başarıyla eklendi`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed hatası:", error);
    process.exit(1);
  }
};

// Seed işlemini çalıştır
seed();






// // backend/database/seeders/seed.js

// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const Todo = require("../../src/models/Todo");

// dotenv.config();

// const seed = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("✅ MongoDB bağlantısı başarılı");

//     await Todo.deleteMany({});
//     // Kategorileri silmiyoruz çünkü var olan ID’leri kullanacağız

//     const todos = Array.from({ length: 50 }, (_, index) => ({
//       title: `Görev ${index + 1}`,
//       description: `Bu görev ${index + 1} için açıklama.`,
//       status: ["pending", "in_progress", "completed", "cancelled"][index % 4], // Döngüsel olarak durum atama
//       priority: ["low", "medium", "high"][index % 3], // Döngüsel olarak öncelik atama
//       due_date: new Date(Date.now() + index * 24 * 60 * 60 * 1000), // Her görev için farklı bir tarih
//       category_ids: [
//         "681f706548960485b42885f1",
//         "681f706548960485b42885f2",
//         "681f737eb6c963e208e42e33",
//       ].slice(0, (index % 3) + 1), // 1-3 kategori arasında rastgele atama
//     }));

//     await Todo.insertMany(todos);

//     console.log("✅ 10 adet todo başarıyla eklendi");
//     process.exit(0);
//   } catch (error) {
//     console.error("❌ Seedleme hatası:", error);
//     process.exit(1);
//   }
// };

// seed();
