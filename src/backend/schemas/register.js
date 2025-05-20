export const htmlTemplate = (username, password) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; max-width: 600px; margin: auto;">
    <h2 style="color: #4CAF50;">Task Manager</h2>
    <p>Merhaba <strong>${username}</strong>,</p>
    <p> Parola : ${password}</p>
    <hr />
    <p style="font-size: 12px; color: #888;">Bu mesaj sistem tarafından otomatik gönderildi.</p>
  </div>
`;
