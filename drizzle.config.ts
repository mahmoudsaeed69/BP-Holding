import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema.ts", 
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    // قمنا بإضافة ?ssl={"rejectUnauthorized":true} كـ Query String داخل الرابط
    // واستخدمنا علامات التنصيص العادية لضمان عدم حدوث خطأ في القراءة
    url: 'mysql://31HZv2retsCMQBB.root:bykToISWO8S3W8AS@gateway01.eu-central-1.prod.aws.tidbcloud.com:4000/ms_tech_db?ssl={"rejectUnauthorized":true}',
  },
});