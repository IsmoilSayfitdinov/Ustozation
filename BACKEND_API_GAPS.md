# Ustoznation Backend — Yetishmayotgan API lar

> Sana: 2026-04-01 | Hozirgi endpoint soni: 75 ta | Yetishmayotgan: 53 ta

---

## Umumiy holat

| Kategoriya | Mavjud | Yetishmaydi | Jami kerak |
|-----------|--------|-------------|------------|
| Auth | 9 | 8 | 17 |
| Courses | 24 | 8 | 32 |
| Quizzes | 17 | 8 | 25 |
| Gamification | 3 | 6 | 9 |
| Analytics | 8 | 9 | 17 |
| Admin | 0 | 7 | 7 |
| Content | 0 | 7 | 7 |
| **Jami** | **75** | **53** | **128** |

---

## CRITICAL — Darhol kerak (2 ta)

### 1. Parol tiklash (Forgot Password)
```
POST /api/v1/auth/password-reset/
  Body: { "email": "user@mail.com" }
  Response: { "success": true, "detail": "Reset link yuborildi" }

POST /api/v1/auth/password-reset/confirm/
  Body: { "token": "abc123", "new_password": "...", "new_password_confirm": "..." }
  Response: { "success": true, "detail": "Parol o'zgartirildi" }
```
**Sabab:** Foydalanuvchi parol unutsa — hech qanday yo'l yo'q
**Frontend:** Login sahifasida "Parolni unutdingiz?" tugma + yangi sahifa
**Backend:** Email task + token yaratish + `PasswordResetToken` model

### 2. Dars kontenti (Lesson Content)
```
Mavjud Lesson modeliga qo'shish kerak:
  - content_text: TextField (dars matni)
  - video_url: URLField (video havola)
  - pdf_file: FileField (PDF material)

GET /api/v1/courses/lessons/{id}/
  Response: { id, title, description, order, content_text, video_url, pdf_file }
```
**Sabab:** LMS da dars kontenti yo'q — faqat test bor. Student nimani o'rganadi?
**Frontend:** Lesson detail sahifasi — video player + matn + PDF download
**Izoh:** README da "MVP scope: Tests only" deyilgan, lekin keyingi versiyada SHART

---

## HIGH — Tez kerak (18 ta)

### Auth (4 ta)

| # | API | Method | Tavsif |
|---|-----|--------|--------|
| 3 | `/auth/logout/` | POST | Token blacklist qilish — xavfsizlik |
| 4 | `/auth/verify-email/` | POST | Email tasdiqlash yuborish |
| 5 | `/auth/verify-email/confirm/` | POST | Email tasdiqlash token bilan |
| 6 | `/auth/admin/reset-password/{id}/` | POST | Admin student parolini tiklash |

### Courses (3 ta)

| # | API | Method | Tavsif |
|---|-----|--------|--------|
| 7 | `/courses/?level=X&search=Y` | GET | Kurs qidirish va filtrlash |
| 8 | `/courses/{id}/unenroll/` | POST | Student kursdan chiqishi |
| 9 | `/courses/{id}/my-progress/` | GET | Student kurs progressi |

### Quizzes (3 ta)

| # | API | Method | Tavsif |
|---|-----|--------|--------|
| 10 | Quiz modeliga `max_attempts` field | — | Qayta topshirish limiti |
| 11 | Quiz modeliga `available_from/until` | — | Quiz vaqt oralig'i |
| 12 | `/quizzes/attempts/` | GET | Barcha urinishlar (quiz filter bilan) |

### Gamification (1 ta)

| # | API | Method | Tavsif |
|---|-----|--------|--------|
| 13 | `/notifications/` | GET | Bildirishnomalar tizimi |
| | `/notifications/{id}/mark-read/` | PATCH | O'qilgan deb belgilash |

### Analytics (4 ta)

| # | API | Method | Tavsif |
|---|-----|--------|--------|
| 14 | `/analytics/progress-report/` | GET | Haftalik/oylik hisobot |
| 15 | `/analytics/my-stats/` | GET | Class average bilan solishtirish |
| 16 | `/analytics/export/attempts/` | GET | CSV eksport (urinishlar) |
| 17 | `/analytics/export/students/` | GET | CSV eksport (talabalar) |

### Admin (2 ta)

| # | API | Method | Tavsif |
|---|-----|--------|--------|
| 18 | `/admin/users/bulk-deactivate/` | POST | Ko'plab foydalanuvchilarni boshqarish |
| 19 | `/admin/import-students/` | POST | CSV dan talabalar import |

### Content (1 ta)

| # | API | Method | Tavsif |
|---|-----|--------|--------|
| 20 | Email service integration | — | SMTP/SendGrid sozlash |

---

## MEDIUM — Keyingi sprint (24 ta)

### Auth
| # | API | Tavsif |
|---|-----|--------|
| 21 | `/auth/logout-all-devices/` | Barcha qurilmalardan chiqish |
| 22 | `/auth/deactivate-account/` | Hisobni o'chirish/deaktivatsiya |

### Courses
| # | API | Tavsif |
|---|-----|--------|
| 23 | `/enrollments/history/` | O'tgan kurslar tarixi |
| 24 | `/courses/{id}/my-progress/` | Kurs bo'yicha progress |
| 25 | `StudentLessonCompletion` model | Dars tugatish tracking |
| 26 | `/courses/{id}/clone/` | Kurs nusxalash |

### Quizzes
| # | API | Tavsif |
|---|-----|--------|
| 27 | `/quizzes/{id}/toggle-active/` | Quiz aktiv/nofaol qilish |
| 28 | `/question-bank/` | Savol banki (qayta ishlatish) |
| 29 | `/quizzes/{id}/analytics/` | Savol bo'yicha qiyinlik |
| 30 | `Question.explanation` field | Javob izohi |
| 31 | `/quizzes/{id}/import-questions/` | CSV dan savollar import |

### Gamification
| # | API | Tavsif |
|---|-----|--------|
| 32 | `/gamification/badges/` | Yutuq nishonlari tizimi |
| 33 | `/gamification/ranking/?period=week` | Vaqt bo'yicha reyting |

### Analytics
| # | API | Tavsif |
|---|-----|--------|
| 34 | `/analytics/my-progress-timeline/` | Vaqt bo'yicha progress grafik |
| 35 | `/admin/audit-log/` | Audit trail (kim nima qildi) |
| 36 | Search & full-text search | Dars/quiz qidirish |
| 37 | Redis caching strategy | Tez-tez so'raladigan data kesh |

### Admin
| # | API | Tavsif |
|---|-----|--------|
| 38 | `/admin/courses/{id}/export-students/` | CSV eksport |
| 39 | `/admin/notifications/send/` | Ommaviy bildirishnoma |
| 40 | Endpoint-level rate limiting | Quiz submit cheklash |
| 41 | Request/response logging | Debug uchun |

### Content
| # | API | Tavsif |
|---|-----|--------|
| 42 | `/courses/{id}/materials/` | Dars materiallari (PDF, slides) |
| 43 | `/courses/{id}/announcements/` | E'lonlar tizimi |
| 44 | Telegram bot integration | Bildirishnoma Telegram orqali |

---

## LOW — Backlog (9 ta)

| # | API | Tavsif |
|---|-----|--------|
| 45 | `/auth/2fa/setup/` | Ikki bosqichli autentifikatsiya |
| 46 | `/auth/google/` | Google login |
| 47 | `/auth/telegram/` | Telegram login |
| 48 | `/gamification/daily-challenges/` | Kunlik vazifalar |
| 49 | `/gamification/use-streak-freeze/` | Streak saqlash |
| 50 | `/gamification/my-level/` | XP level tizimi |
| 51 | WebSocket `/ws/dashboard/` | Real-time yangilanish |
| 52 | `/courses/{id}/survey/` | Kurs baholash anketa |
| 53 | `/messages/` | Chat/xabar tizimi |

---

## Model o'zgarishlar kerak

### Mavjud modellar ga qo'shish kerak

| Model | Field | Type | Sabab |
|-------|-------|------|-------|
| `Lesson` | `content_text` | TextField | Dars matni |
| `Lesson` | `video_url` | URLField | Video havola |
| `Lesson` | `pdf_file` | FileField | PDF material |
| `Quiz` | `max_attempts` | IntegerField(null) | Qayta topshirish limiti |
| `Quiz` | `available_from` | DateTimeField(null) | Boshlanish vaqti |
| `Quiz` | `available_until` | DateTimeField(null) | Tugash vaqti |
| `Question` | `explanation` | TextField(blank) | Javob izohi |
| `User` | `email_verified` | BooleanField(False) | Email tasdiqlangan |

### Yangi modellar kerak

| Model | Fieldlar | Sabab |
|-------|----------|-------|
| `PasswordResetToken` | user, token, created_at, used | Parol tiklash |
| `Notification` | user, type, title, message, read_at, created_at | Bildirishnomalar |
| `NotificationPreference` | user, channel, enabled | Bildirishnoma sozlamalari |
| `BadgeType` | name, icon, description, condition | Yutuq turlari |
| `StudentBadge` | student, badge, earned_at | Olingan yutuqlar |
| `StudentLessonCompletion` | student, lesson, completed_at | Dars tugatish |
| `AuditLog` | user, action, resource, changes, ip, timestamp | Audit trail |
| `CourseMaterial` | course, lesson, file, type, upload_date | Dars materiallari |
| `Announcement` | course, author, title, content, created_at | E'lonlar |

---

## Amalga oshirish rejasi

### 1-2 hafta (Essential)
```
1. POST /auth/password-reset/ + /confirm/
2. POST /auth/logout/
3. POST /courses/{id}/unenroll/
4. Quiz.max_attempts field + validation
5. GET /quizzes/attempts/ (barcha urinishlar)
```

### 3-4 hafta (High Priority)
```
6. Email verification flow
7. Quiz scheduling (available_from/until)
8. POST /admin/import-students/ (CSV)
9. GET /courses/{id}/my-progress/
10. GET /analytics/progress-report/
```

### 5-6 hafta (Good to Have)
```
11. Notification model + API
12. Badge/Achievement system
13. GET /admin/audit-log/
14. GET /analytics/export/ (CSV)
15. GET /quizzes/{id}/analytics/ (question difficulty)
```

---

## Xulosa

**Hozirgi holat:** 75 ta endpoint — MVP uchun yetarli
**Production uchun:** Kamida 20 ta qo'shimcha endpoint kerak (Critical + High)
**To'liq LMS uchun:** 53 ta qo'shimcha endpoint kerak

**Eng muhim 5 ta:**
1. Parol tiklash (forgot password) — foydalanuvchi yo'qotish sababi
2. Logout endpoint — xavfsizlik
3. Kursdan chiqish — foydalanuvchi huquqi
4. Quiz limiti — pedagogik nazorat
5. Bildirishnomalar — engagement

Backend kodni o'zgartirish bu hujjat doirasida **qilinmadi** — faqat tahlil va tavsiyalar.
