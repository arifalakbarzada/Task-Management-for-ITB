export const editUserSchema = (oldUser, newUser) => {
    function getChangedFields(oldData, newData) {
        const changes = {};

        for (const key in newData) {
            if (newData[key] !== oldData[key]) {
                changes[key] = {
                    old: oldData[key],
                    new: newData[key]
                };
            }
        }

        return changes;
    }
    const changes = getChangedFields(oldUser, newUser);
    if (Object.keys(changes).length === 0) {
        return null;

    }
    else if (Object.keys(changes).length === 1 && changes.isDeleted) {
        return `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; max-width: 600px; margin: auto;">
        <h2 style="color: #4CAF50;">Task Manager</h2>
        <p>Merhaba <strong>${newUser.name}</strong>,</p>
        <p>Ne yazık ki, hesabınız kapatılmıştır. Bir itirazınız varsa destek ekibimize ilete bilirsiniz. Çalışmalarınız için teşekkür ederiz.</p>
        <p style="font-size: 12px; color: #888;">Bu mesaj sistem tarafından otomatik gönderildi.</p>
        </div>
        `
    }

    else {
        return `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; max-width: 600px; margin: auto;">
        <h2 style="color: #4CAF50;">Task Manager</h2>
        <p>Merhaba <strong>${newUser.name}</strong>,</p>
        <p>Hesabınızda bazı değişiklikler yapıldı:</p>
        <ul style="list-style-type: none; padding: 0;margin-left: 0;">
          ${Object.entries(changes).map(([key, { old, new: newValue }]) => key !== '_id' ? `
            <li style = "margin:0;"><strong>${key === 'password' ? 'Your new password':key}:</strong> ${key === 'password' ? '':old} -> ${newValue}</li>
          `:'').join('')}
        </ul>
        <p style="font-size: 12px; color: #888;">Bu mesaj sistem tarafından otomatik gönderildi.</p>
        </div>
        `
    }
}
export const deleteUserSchema = (user)=>{
    return `
    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; max-width: 600px; margin: auto;">
        <h2 style="color: #4CAF50;">Task Manager</h2>
        <p>Merhaba <strong>${user.name}</strong>,</p>
        <p>Hesabınız başarıyla silinmiştir. Tüm verileriniz sistemimizden kaldırılmıştır.</p>
        <p>Çalışmalarınız için teşekkür ederiz. Herhangi bir sorunuz varsa destek ekibimizle iletişime geçebilirsiniz.</p>
        <p style="font-size: 12px; color: #888;">Bu mesaj sistem tarafından otomatik gönderildi.</p>
    </div>
    `

}