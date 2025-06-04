export const addTaskSchema = (task) => {
    return `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; max-width: 600px; margin: auto;">
            <h2 style="color: #4CAF50;">Task Manager</h2>
            <p>Merhaba,</p>
            <p>Yeni bir görev oluşturuldu:</p>
            <p>Başlık :<strong>${task.title}</strong></p>
            <p>Açıklama :<i>${task.description}</i></p>
            <p>Son tarih: <strong>${task.deadline}</strong></p>
            <hr />
            <p style="font-size: 12px; color: #888;">Bu mesaj sistem tarafından otomatik gönderildi.</p>
        `
}
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
export const updateTaskSchema = (oldTask, newTask) => {

    const changes = getChangedFields(oldTask, newTask);
    delete changes._id
    delete changes.userId
    delete changes.__v
    delete changes.departmentId
    if (Object.keys(changes).length === 0) {
        return null;
    }

    else if (changes.owner) {
        return `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; max-width: 600px; margin: auto;">
            <h2 style="color: #4CAF50;">Task Manager</h2>
            <p>Merhaba, ${changes.owner.old}</p>
            <p>Görev sahibi değişti:</p>
            <p><strong>${oldTask.title}</strong></p>
            <hr />
            <p style="font-size: 12px; color: #888;">Bu mesaj sistem tarafından otomatik gönderildi.</p>
        </div>
        `

    }
    else if (Object.keys(changes).length === 1 && changes.status.new === "Completed") {
        return `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; max-width: 600px; margin: auto;">
            <h2 style="color: #4CAF50;">Task Manager</h2>
            <p>Merhaba,</p>
            <p>Görev tamamlandı:</p>
            <p><strong>${oldTask.title}</strong></p>
            <hr />
            <p style="font-size: 12px; color: #888;">Bu mesaj sistem tarafından otomatik gönderildi.</p>
        </div>
        `
    }
    else if (Object.keys(changes).length === 1 && changes.status.new === "Pending") {
        return `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; max-width: 600px; margin: auto;">
            <h2 style="color: #4CAF50;">Task Manager</h2>
            <p>Merhaba,</p>
            <p>Görev yeniden başlatıldı:</p>
            <p><strong>${oldTask.title}</strong></p>
            <hr />
            <p style="font-size: 12px; color: #888;">Bu mesaj sistem tarafından otomatik gönderildi.</p>
        </div>
        `
    }
    else if (Object.keys(changes).length === 1 && changes.status.new === "In Progress") {
        return `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; max-width: 600px; margin: auto;">
            <h2 style="color: #4CAF50;">Task Manager</h2>
            <p>Merhaba,</p>
            <p>Görev devam ediyor:</p>
            <p><strong>${oldTask.title}</strong></p>
            <hr />
            <p style="font-size: 12px; color: #888;">Bu mesaj sistem tarafından otomatik gönderildi.</p>
        </div>
        `

    }

    else {

        return `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; max-width: 600px; margin: auto;">
        <h2 style="color: #4CAF50;">Task Manager</h2>
        <p>Merhaba <strong>${newTask.owner}</strong>,</p>
        <p>Görevde bazı değişiklikler yapıldı:</p>
        <ul style="list-style-type: none; padding: 0;">
          ${Object.entries(changes).map(([key, { old, new: newValue }]) =>
            key !== '_id' ? `
            <li><strong>${key}:</strong> ${old} -> ${newValue}</li>
          `: '').join('')
            }
        </ul>
        <p style="font-size: 12px; color: #888;">Bu mesaj sistem tarafından otomatik gönderildi.</p>
        </div>
        `
    }
}

export const updateTaskUserSchema = (oldTask, newTask) => {
    const changes = getChangedFields(oldTask, newTask);

    delete changes._id
    delete changes.userId
    delete changes.__v
    delete changes.departmentId


    if (Object.keys(changes).length === 0) {
        return null;

    }
    else if (Object.keys(changes).length === 1 && changes.owner) {
        return `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; max-width: 600px; margin: auto;">
            <h2 style="color: #4CAF50;">Task Manager</h2>
            <p>Merhaba,</p>
            <p>Görevin yeni sahibi sensin:</p>
            <p><strong>${newTask.title}</strong></p>
            <p>Açıklama :<i>${newTask.description}</i></p>
            <p>Son tarih: <strong>${newTask.deadline}</strong></p>
            <hr />
            <p style="font-size: 12px; color: #888;">Bu mesaj sistem tarafından otomatik gönderildi.</p>
        </div>
        `

    }
    else {
        return `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; max-width: 600px; margin: auto;">
        <h2 style="color: #4CAF50;">Task Manager</h2>
        <p>Merhaba <strong>${newTask.owner}</strong>,</p>
        <p>Mevcut görev size atandı ve üzerinde bazı değişiklikler oldu</p>
        <ul style="list-style-type: none; padding: 0;">
          ${Object.entries(changes).map(([key, { old, new: newValue }]) =>
            key !== '_id' && key !== 'owner' ? `
            <li><strong>${key}:</strong> ${old} -> ${newValue}</li>
          `: '').join('')
            }
        `
    }

}
export const deleteTaskSchema = (task) => {
        return `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; max-width: 600px; margin: auto;">
            <h2 style="color: #4CAF50;">Task Manager</h2>
            <p>Merhaba,</p>
            <p style = "color : #FF2255">Görev silindi:</p>
            <p><strong>${task.title}</strong></p>
            <hr />
            <p style="font-size: 12px; color: #888;">Bu mesaj sistem tarafından otomatik gönderildi.</p>
        </div>
        `
}