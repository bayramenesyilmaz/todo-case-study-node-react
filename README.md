# Todo Uygulaması 📝

Modern ve kullanıcı dostu bir görev yönetim uygulaması. Kanban board tarzında sürükle-bırak özelliği, görev paylaşımı ve çok daha fazlası!

## 🚀 Özellikler

- ✨ Sürükle-bırak kanban board
- 🔒 JWT tabanlı kullanıcı kimlik doğrulama
- 👥 Görev paylaşımı
- 🌓 Açık/Koyu tema desteği
- 📱 Responsive tasarım
- 👮‍♂️ Rol tabanlı yetkilendirme

## 🛠️ Teknoloji Yığını

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- JWT Authentication
- Winston Logger
- MVC & Repository Pattern mimarisi

### Frontend
- React 18+
- Redux Toolkit (State yönetimi)
- React Router v6
- React Hook Form
- Tailwind CSS
- React DnD (Sürükle-bırak)
- React Toastify

## 🔧 Kurulum

### Gereksinimler
- Node.js (v14+)
- MongoDB
- npm veya yarn

### Backend Kurulumu
1. Backend dizinine gidin:
   ```bash
   cd backend
   ```

2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

3. `.env` dosyasını oluşturun:
   ```env
   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/todo-app
   JWT_SECRET=your_jwt_secret
   ```

4. Sunucuyu başlatın:
   ```bash
   npm run dev
   ```

### Frontend Kurulumu
1. Frontend dizinine gidin:
   ```bash
   cd frontend
   ```

2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

3. `.env` dosyasını oluşturun:
   ```env
   REACT_APP_API_URL=http://localhost:3001
   ```

4. Uygulamayı başlatın:
   ```bash
   npm start
   ```

## 🎯 Kullanım Örnekleri

### Görev Oluşturma
1. Sağ üst köşedeki "+" butonuna tıklayın
2. Görev başlığı ve açıklamasını girin
3. "Oluştur" butonuna tıklayın


### Kanban Board Kullanımı
- Görevleri sürükleyerek farklı durumlara taşıyabilirsiniz
- TODO → IN_PROGRESS → DONE

## ⭐ Bonus Özellikler

- 📊 Görev istatistikleri ve raporlama
- 📅 Görev hatırlatıcıları
- 🏷️ Etiketleme sistemi
- 📋 Görev şablonları
- 🔍 Gelişmiş arama ve filtreleme