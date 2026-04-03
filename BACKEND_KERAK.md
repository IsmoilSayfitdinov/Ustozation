# Backend dan kerak bo'lgan o'zgarishlar

> Frontend to'liq tayyor — faqat shu API lar qo'shilsa loyiha 100% ishlaydi

---

## 1. Template quizlarni ro'yxatini olish (KRITIK)

**Muammo:** Admin/Teacher template test yaratadi (`course=null`) lekin uni ko'radigan endpoint yo'q. `GET /quizzes/course/{id}/` faqat kurs-spesifik quizlarni qaytaradi.

**Kerak:**
```
GET /api/v1/quizzes/templates/?level_id=1
Permission: IsTeacher
Response: QuizListSerializer (paginated)
```

**Filter:** `Quiz.objects.filter(course__isnull=True, is_active=True, lesson__module__level_id=level_id)`

**Frontend ishlatadi:** Admin Tests sahifasida "Test yaratish" tabida — level tanlanganda shu level dagi template testlar ko'rinadi, savol qo'shish mumkin bo'ladi.

---

## 2. CourseLessonSerializer ga quiz qo'shildi (ALLAQACHON QILINDI)

**Holat:** ✅ Qilindi — `apps/courses/serializers.py` da `CourseLessonSerializer` ga `quizzes` field qo'shildi.

**Tekshirish:** `GET /courses/{id}/lessons/` javobida `quizzes` array bo'lishi kerak:
```json
{
  "id": 1,
  "lesson": {"id": 10, "title": "Present Simple"},
  "module_title": "Tenses",
  "is_unlocked": true,
  "quizzes": [
    {"id": 42, "title": "Quiz", "quiz_type_name": "Grammar", "question_count": 10, ...}
  ]
}
```

---

## 3. TemplateQuizListView qo'shildi (ALLAQACHON QILINDI)

**Holat:** ✅ View yaratildi — `apps/quizzes/views.py` da `TemplateQuizListView` qo'shildi.

**Qolgan ish:** URL pattern qo'shish kerak `apps/quizzes/urls.py` ga:
```python
path("templates/", views.TemplateQuizListView.as_view(), name="template-quiz-list"),
```

---

## 4. QuizCreateSerializer — course=null qabul qilishi

**Hozirgi holat:** Serializer `course` field required bo'lishi mumkin.

**Kerak:** `course` field `allow_null=True, required=False` bo'lishi kerak:
```python
class QuizCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ("lesson", "course", "quiz_type", "title", "description", ...)
    
    # course=null bo'lsa template quiz yaratiladi
```

**Tekshirish:** `POST /quizzes/create/` ga `course: null` yuborilganda xato bermaslik kerak.

---

## Xulosa

| # | O'zgarish | Fayl | Holat |
|---|-----------|------|-------|
| 1 | Template quiz list endpoint | `quizzes/urls.py` + `views.py` | ⚠️ View tayyor, URL qo'shish kerak |
| 2 | CourseLessonSerializer + quizzes | `courses/serializers.py` | ✅ Qilindi |
| 3 | QuizCreateSerializer course=null | `quizzes/serializers.py` | ⚠️ Tekshirish kerak |

**Shu 1 ta URL qo'shilsa va course=null ishlasa — frontend to'liq ishlaydi.**
