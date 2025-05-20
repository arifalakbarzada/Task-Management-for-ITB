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
        <ul>
          ${Object.entries(changes).map(([key, { old, new: newValue }]) => `
            <li><strong>${key}:</strong> ${old} -> ${newValue}</li>
          `).join('')}
        </ul>
        <p style="font-size: 12px; color: #888;">Bu mesaj sistem tarafından otomatik gönderildi.</p>
        </div>
        `
    }
}