# Todo Case Study - Node.js & React

Bu repo, bir iş başvurusu kapsamında geliştirilen full-stack todo uygulamasını içerir.

- Backend: Express.js & MongoDB (Mongoose)

Back-end Klasör Yapısı (Node.js/Express)
/src
    /controllers
        TodoController.js
        CategoryController.js
        StatsController.js
    /models
        Todo.js
        Category.js
    /services
        TodoService.js
        CategoryService.js
    /repositories
        TodoRepository.js
        CategoryRepository.js
    /middlewares
        authentication.js
        errorHandler.js
        validator.js
    /utils
        response.js
        pagination.js
    /config
        database.js
        app.js
    /routes
        todoRoutes.js
        categoryRoutes.js
        statsRoutes.js
    /validations
        todoValidation.j
        categoryValidation.js
    app.js
    server.js
/tests
    /unit
    /integration
/database
    /migrations
    /seeders

    API Uç Noktaları:
1. Todo İşlemleri
– GET /api/todos - Tüm todo’ları listele (sayfalama desteği ile)
• Query parametreleri:
– page: Sayfa numarası (varsayılan: 1)
– limit: Sayfa başına kayıt sayısı (varsayılan: 10, maksimum: 50)
– sort: Sıralama alanı (örn. ‘created_at’, ‘due_date’, ‘priority’)
– order: Sıralama yönü (‘asc’ veya ‘desc’)
– status: Filtre için durum
– priority: Filtre için öncelik
– GET /api/todos/{id} - Belirli bir todo’yu getir
– POST /api/todos - Yeni bir todo oluştur
– PUT /api/todos/{id} - Mevcut bir todo’yu güncelle
– PATCH /api/todos/{id}/status - Sadece todo durumunu güncelle
– DELETE /api/todos/{id} - Bir todo’yu sil (soft delete)
– GET /api/todos/search - Todo’ları başlık veya açıklamaya göre ara
• Query parametresi: q: Arama terimi
2. Kategori İşlemleri (Bonus)
– GET /api/categories - Tüm kategorileri listele
– GET /api/categories/{id} - Belirli bir kategoriyi getir
– POST /api/categories - Yeni bir kategori oluştur
– PUT /api/categories/{id} - Mevcut bir kategoriyi güncelle
– DELETE /api/categories/{id} - Bir kategoriyi sil
– GET /api/categories/{id}/todos - Belirli bir kategoriye ait todo’ları listele
3. İstatistik Uç Noktaları (Bonus)
– GET /api/stats/todos - Durum bazında todo sayılarını getir
– GET /api/stats/priorities - Öncelik bazında todo sayılarını getir
3. API Tasarım Prensipleri
• HTTP Durum Kodları: Uygun HTTP durum kodlarının kullanımı
– 200: Başarılı istekler
– 201: Başarılı oluşturma
– 204: İçerik yok (silme işlemlerinde)
– 400: Geçersiz istek
– 404: Kaynak bulunamadı
– 422: Doğrulama hataları
– 500: Sunucu hatası
• Yanıt Formatları: Tutarlı JSON yanıt yapısı
{
"status": "success|error",
"message": "İşlem açıklaması (opsiyonel)",
"data": { ... },
"meta": {
"pagination": {
"total": 100,
"per_page": 10,
"current_page": 1,
"last_page": 10,
"from": 1,
"to": 10
}
},
"errors": [ ... ] // Hata durumunda
}
• Doğrulama Kuralları:
– Todo başlığı: Zorunlu, 3-100 karakter
– Açıklama: Opsiyonel, maksimum 500 karakter
– Durum: Geçerli enum değerleri
– Öncelik: Geçerli enum değerleri
– Bitiş tarihi: Geçerli tarih formatı, bugünden sonraki bir tarih
• Güvenlik Önlemleri:
– CORS (Cross-Origin Resource Sharing) konfigürasyonu
– Input sanitization ve validation (joi kullanarak)
– Rate limiting (express-rate-limit kullanarak)
– Helmet paketi ile güvenlik başlıkları
– XSS ve CSRF koruması
4. Kod Organizasyonu ve Mimari
• MVC veya Layered Architecture: Modeller, servisler ve kontrolcüler
• Repository Pattern: Veritabanı işlemleri için repositoryler
• Service Layer: İş mantığı için servis sınıfları
• Middleware: İstek işlemeden önce çalışacak ara yazılımlar
• Exception Handling: Merkezi hata yakalama ve işleme
• Logging: Winston  kritik operasyonların loglanması
• Environment Config: dotenv ile ortam yapılandırması

Veritabanı İlişkileri:
MongoDB kullanıyorsanız: Tercih ettiğinize göre gömülü belge veya referans
yaklaşımı kullanabilirsiniz
–  User-Todo ilişkisini one-to-many olarak tasarlayın

Backend İpuçları:
– Express.js kullanırken:
• Middleware kullanımını etkin bir şekilde uygulayın
• Router modüllerini ayrı dosyalarda organize edin
• Validation middleware’leri oluşturun
• Global error handling middleware kullanın
• Yapılandırma değerlerini çevre değişkenleri ile yönetin
– MongoDB kullanıyorsanız:
• Şema validasyonu için Mongoose kullanın
• İndekslemeyi doğru yapın
• Sorgu optimizasyonlarını uygulayın


Örnek API İstek ve Yanıtları
1. Tüm Todo’ları Listeleme
İstek:
GET /api/todos?page=1&limit=10&sort=due_date&order=asc&status=pending
Yanıt:
{
"status": "success",
"data": [
{
"id": "1",
"title": "API Dokümantasyonunu Hazırla",
"description": "Swagger veya Postman ile API dokümantasyonu oluştur",
"status": "pending",
"priority": "high",
"due_date": "2025-05-10T18:00:00.000Z",
"created_at": "2025-05-01T10:00:00.000Z",
"updated_at": "2025-05-01T10:00:00.000Z",
"categories": [
{
"id": "1",
"name": "Backend",
"color": "#4A90E2"
}
]
},
{
"id": "2",
"title": "React Komponentlerini Oluştur",
"description": "Todo ve form komponentlerini geliştir",
"status": "pending",
"priority": "medium",
"due_date": "2025-05-11T18:00:00.000Z",
"created_at": "2025-05-01T11:30:00.000Z",
"updated_at": "2025-05-01T11:30:00.000Z",
"categories": [
{
"id": "2",
"name": "Frontend",
"color": "#50E3C2"
}
]
}
],
"meta": {
"pagination": {
"total": 25,
"per_page": 10,
"current_page": 1,
"last_page": 3,
"from": 1,
"to": 10
}
}
}
2. Yeni Todo Oluşturma
İstek:
POST /api/todos
Content-Type: application/json
{
"title": "Veritabanı Şemasını Tasarla",
"description": "Todo uygulaması için gerekli tabloları ve ilişkileri
tasarla",
"status": "pending",
"priority": "high",
"due_date": "2025-05-05T18:00:00.000Z",
"category_ids": ["1", "3"]
}
Yanıt:
{
"status": "success",
"message": "Todo başarıyla oluşturuldu",
"data": {
"id": "3",
"title": "Veritabanı Şemasını Tasarla",
"description": "Todo uygulaması için gerekli tabloları ve ilişkileri
tasarla",
"status": "pending",
"priority": "high",
"due_date": "2025-05-05T18:00:00.000Z",
"created_at": "2025-05-02T09:15:00.000Z",
"updated_at": "2025-05-02T09:15:00.000Z",
"categories": [
{
"id": "1",
"name": "Backend",
"color": "#4A90E2"
},
{
"id": "3",
"name": "Database",
"color": "#F5A623"
}
]
}
}
3. Todo’yu Güncelleme
İstek:
PUT /api/todos/3
Content-Type: application/json
{
"title": "Veritabanı Şemasını Tasarla ve Migrasyonları Oluştur",
"description": "Todo uygulaması için gerekli tabloları, ilişkileri ve
migrasyon dosyalarını hazırla",
"status": "in_progress",
"priority": "high",
"due_date": "2025-05-06T18:00:00.000Z",
"category_ids": ["1", "3"]
}
Yanıt:
{
"status": "success",
"message": "Todo başarıyla güncellendi",
"data": {
"id": "3",
"title": "Veritabanı Şemasını Tasarla ve Migrasyonları Oluştur",
"description": "Todo uygulaması için gerekli tabloları, ilişkileri ve
migrasyon dosyalarını hazırla",
"status": "in_progress",
"priority": "high",
"due_date": "2025-05-06T18:00:00.000Z",
"created_at": "2025-05-02T09:15:00.000Z",
"updated_at": "2025-05-02T10:30:00.000Z",
"categories": [
{
"id": "1",
"name": "Backend",
"color": "#4A90E2"
},
{
"id": "3",
"name": "Database",
"color": "#F5A623"
}
]
}
}
4. Todo Durumunu Güncelleme
İstek:
PATCH /api/todos/3/status
Content-Type: application/json
{
"status": "completed"
}
Yanıt:
{
"status": "success",
"message": "Todo durumu başarıyla güncellendi",
"data": {
"id": "3",
"status": "completed",
"updated_at": "2025-05-02T14:45:00.000Z"
}
}
5. Todo’yu Silme
İstek:
DELETE /api/todos/3
Yanıt:
{
"status": "success",
"message": "Todo başarıyla silindi"
}
6. Todo İstatistiklerini Alma (Bonus)
İstek:
GET /api/stats/todos
Yanıt:
{
"status": "success",
"data": {
"pending": 10,
"in_progress": 5,
"completed": 15,
"cancelled": 2,
"total": 32,
"overdue": 3
}
}

- Frontend: React.js
