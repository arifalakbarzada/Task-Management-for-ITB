import mongoose from 'mongoose';

const blacklistedTokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
});

// Otomatik olarak süre dolunca silinsin (TTL index)
blacklistedTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
const BlacklistedToken = mongoose.model('BlacklistedToken', blacklistedTokenSchema) || mongoose.models.BlacklistedToken;
export default BlacklistedToken;