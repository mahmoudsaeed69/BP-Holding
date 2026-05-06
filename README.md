# MS - Professional Web Solutions[cite: 1]

🚀 ملخص المشروع (Overview)
مشروع لـ  BP Holding. يجمع الموقع بين قوة الـ Backend المعتمد على tRPC وسرعة الـ Frontend باستخدام React. تم تحسين النظام ليعمل بكفاءة مع قواعد البيانات السحابية TiDB Cloud مع الالتزام الكامل بمعايير الويب العالمية.


🧩 الهيكلية البرمجية (Architecture)
يعتمد المشروع على Modular Architecture، حيث تم فصل المنطق البرمجي عن الواجهات:

db/: تحتوي على Schema الجداول والتعامل المباشر مع Drizzle.

api/: إدارة طلبات tRPC والاتصال المؤمن بقاعدة البيانات (بإعدادات SSL مخصصة لبيئات Windows/Cloud).

src/lib/: تحتوي على الإعدادات البيئية (Environment Config) والتحقق من صحة البيانات.

## 🛠️ التقنيات المستخدمة (Tech Stack)

Frontend: React (Vite) + TypeScript لضمان بيئة تطوير سريعة وخالية من الأخطاء النوعية.

Styling: Tailwind CSS + Shadcn UI مع استخدام SCSS للموديولات المعقدة.

Backend Communication: tRPC لضمان اتصال آمن و (Type-safe) بين الواجهة والسيرفر.

Database & ORM: Drizzle ORM مع الربط السحابي عبر TiDB Cloud.

Authentication: نظام Kimi OAuth المدمج لإدارة الصلاحيات.

Accessibility: الالتزام بمعايير WCAG 2.1 لضمان سهولة الوصول لكافة المستخدمين.


## 🛠️ التعليمات البرمجية (Setup & Installation)

1. تثبيت الحزم:
Bash
npm install
2. إعداد قاعدة البيانات (Migrations):
تأكد من ضبط رابط DATABASE_URL في ملف .env ثم قم بدفع الهيكلية:

Bash
npx drizzle-kit push
3. تغذية البيانات (Seeding):
لإضافة البيانات الأولية (المشاريع والخدمات):

Bash
npx tsx db/seed.ts
4. تشغيل وضع التطوير:
Bash
npm run dev

## 🧩 المعايير المتبعة
- الالتزام بمعايير **WCAG 2.1** لسهولة الوصول.
- هندسة برمجية تعتمد على **Modular Architecture**.


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
📝ملاحظات اضافية:
تم معالجة تعارضات Primary Keys في قاعدة البيانات لضمان استقرار الجداول.

تم تخصيص ملف الاتصال connection.ts ليتوافق مع بروتوكولات SSL الخاصة بـ TiDB Cloud لتجنب أخطاء الشهادات في البيئات المختلفة.

الموقع يدعم اللغتين العربية والإنجليزية (i18next) مع مراعاة اتجاهات الصفحة (RTL/LTR).


 
👨‍💻 (The Author)

        (Mahmoud Saeed)

Focus: Full-stack Development, Web Accessibility, & Strategic Digital Marketing.