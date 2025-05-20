import mongoose from 'mongoose';

const blacklistedTokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
});

blacklistedTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
const BlacklistedToken = mongoose.model('BlacklistedToken', blacklistedTokenSchema) || mongoose.models.BlacklistedToken;
export default BlacklistedToken;