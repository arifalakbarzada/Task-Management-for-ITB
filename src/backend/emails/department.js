export const deleteDepartmentEmailTemplate = (userName, departmentName) => {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>Sayın ${userName},</h2>
      <p>
        Bağlı olduğunuz <strong>${departmentName}</strong> adlı departman sistemimizden silinmiştir.
      </p>
      <p>
        Bu departmana ait görev ve kullanıcı verileri de pasif hale getirilmiştir (silinmemiştir, sadece devre dışı bırakılmıştır).
      </p>
      <p>
        Eğer bu işlem size ait değilse veya bir hata olduğunu düşünüyorsanız, lütfen sistem yöneticinizle iletişime geçin.
      </p>
      <br/>
      <p>İyi çalışmalar dileriz,</p>
      <strong>Task Management Ekibi</strong>
    </div>
  `;
};
