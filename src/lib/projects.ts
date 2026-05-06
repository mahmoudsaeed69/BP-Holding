

/**
 * يقوم بجلب المشاريع بناءً على اللغة المختارة.
 * @param {string} lang - رمز اللغة (ar/en).
 * @returns {Promise<Project[]>} قائمة بالمشاريع المترجمة.
 */
export const fetchProjects = async (lang: string) => {
  // هنا تضع منطق الـ tRPC أو الـ Fetch الخاص بك
  // مثال إذا كنت تستخدم tRPC:
  // return await api.project.getAll.query({ lang }); 
};