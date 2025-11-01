import crypto from "crypto";
import bcrypt from "bcryptjs";
import { User, IUser } from "../models/User";

export class UserService {

	private readonly saltRounds = 10;

	public async createUser(email: string, password: string): Promise<IUser> {
		const passwordHash = await bcrypt.hash(password, this.saltRounds);
		const user = new User({ email, passwordHash });
		await user.save();
		return user;
	}

	public findByEmail(email: string): Promise<IUser | null> {
		return User.findOne({ email });
	}

	public async setVerifyToken(user: IUser, token: string): Promise<void> {
		user.verifyTokenHash = crypto
			.createHash("sha256")
			.update(token)
			.digest("hex");
		user.verifyTokenExpires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hours
		await user.save();
	}

	public async verifyUserEmail(
		email: string,
		token: string
	): Promise<IUser | null> {
		const tokenHash = crypto
			.createHash("sha256")
			.update(token)
			.digest("hex");
		const user = await User.findOne({
			email,
			verifyTokenHash: tokenHash,
			verifyTokenExpires: { $gt: new Date() },
		});
		if (!user) return null;

		user.isVerified = true;
		user.verifyTokenHash = undefined;
		user.verifyTokenExpires = undefined;
		await user.save();
		return user;
	}

	public async validatePassword(
		user: IUser,
		password: string
	): Promise<boolean> {
		return bcrypt.compare(password, user.passwordHash);
	}

	public async setResetToken(user: IUser, token: string): Promise<void> {
		user.resetTokenHash = crypto
			.createHash("sha256")
			.update(token)
			.digest("hex");
		user.resetTokenExpires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour
		await user.save();
	}

	public async resetPassword(
		email: string,
		token: string,
		newPassword: string
	): Promise<IUser | null> {
		const tokenHash = crypto
			.createHash("sha256")
			.update(token)
			.digest("hex");
		const user = await User.findOne({
			email,
			resetTokenHash: tokenHash,
			resetTokenExpires: { $gt: new Date() },
		});
		if (!user) return null;

		user.passwordHash = await bcrypt.hash(newPassword, this.saltRounds);
		user.resetTokenHash = undefined;
		user.resetTokenExpires = undefined;
		await user.save();
		return user;
	}
}
