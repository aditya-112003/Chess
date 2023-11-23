import { connnectToMongoDB } from '@/libs/mongodb';
import User from '@/models/user';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { AuthOptions } from 'next-auth';

type SessionStrategy = 'jwt';

export const authOptions : AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid credentials');
                }
                const { email } = credentials;
                try {

                    await connnectToMongoDB();
                    const user = await User.findOne({ email });
                    if (!user) {
                        throw new Error("Invalid Credentials");
                    }
                    const isCorrectPassword = await bcrypt.compare(credentials.password, user.password);

                    if (!isCorrectPassword) {
                        throw new Error("Invalid Credentials");
                    }

                    return user;
                } catch (error) {
                    console.log(error);
                }
            }
        })
    ],
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: "jwt" as SessionStrategy,
    },
    secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }