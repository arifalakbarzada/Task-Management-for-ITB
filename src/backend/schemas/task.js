export const taskSchema = (action , task , changes)=>{
    if (action === 'create') {
        return `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; max-width: 600px; margin: auto;">
            <h2 style="color: #4CAF50;">Task Manager</h2>
            <p>Merhaba,</p>
            <p>Yeni bir görev oluşturuldu:</p>
            <p><strong>${task.title}</strong></p>
            <p>${task.description}</p>
            <p>Son tarih: <strong>${task.deadline}</strong></p>
            <hr />
            <p style="font-size: 12px; color: #888;">Bu mesaj sistem tarafından otomatik gönderildi.</p>
        `
    }
    if (action === 'update') {
        return `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; max-width: 600px; margin: auto;">
            <h2 style="color: #4CAF50;">Task Manager</h2>
            <p>Merhaba,</p>
            <p>Görev güncellendi:</p>
            <p><strong>${task.title}</strong></p>
            <p>${task.description}</p>
            <p>Son tarih: <strong>${task.deadline}</strong></p>
            <hr />
            <p style="font-size: 12px; color: #888;">Bu mesaj sistem tarafından otomatik gönderildi.</p>
        `
    }
    if (action === 'delete') {
        return `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; max-width: 600px; margin: auto;">
            <h2 style="color: #4CAF50;">Task Manager</h2>
            <p>Merhaba,</p>
            <p>Görev silindi:</p>
            <p><strong>${task.title}</strong></p>
            <p>${task.description}</p>
            <hr />
            <p style="font-size: 12px; color: #888;">Bu mesaj sistem tarafından otomatik gönderildi.</p>
        `
    }
}