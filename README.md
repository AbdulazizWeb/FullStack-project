# Fullstack User & Role Management System

Ushbu loyiha foydalanuvchilar va rollarni boshqarish, JWT asosidagi autentifikatsiya va avtorizatsiyani qo‘llab-quvvatlaydigan **fullstack web-ilova** hisoblanadi.

Loyiha **Backend (ASP.NET Core + PostgreSQL)** va  
**Frontend (React + Ant Design)** qismlaridan iborat.

---

## Texnologiyalar

### Backend
- ASP.NET Core (.NET 8)
- Entity Framework Core
- PostgreSQL
- JWT Authentication
- MediatR (CQRS)
- Clean Architecture (mini)

### Frontend
- React + TypeScript
- Vite
- Ant Design
- Redux Toolkit + RTK Query
- React Hook Form
- Feature-Sliced Design (FSD) Architecture

---

## Loyiha ishga tushirish bo‘yicha talablar

### Backend

Backend qismi hozirda **Render.com** serverida joylashtirilgan va production holatda ishlamoqda.  
Qo‘shimcha sozlamalar talab qilinmaydi.

---

### Frontend

Frontend qismini ishga tushirish uchun quyidagi amallarni bajaring:

1. Loyihani istalgan IDE (masalan, VS Code) orqali oching  
2. Dependency’larni o‘rnating:
   ```bash
   npm install
3. Frontendni ishga tushuring
   ```bash
   npm run dev

Ishga tushurishingiz bilan frontend darxol render.com dagi serverga ulanadi va loginga kirasiz.

Admin Akkaunt:
  - Email: admin@gmail.com
  - Password: Admin_777
