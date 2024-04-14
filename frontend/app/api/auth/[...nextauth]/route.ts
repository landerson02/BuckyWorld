import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import {login} from "@/lib/Service";

/**
 * Handles the authentication process using NextAuth.
 * @returns {Promise<void>} A promise that resolves when the authentication process is complete.
 */
const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials: any) => {
                // const user = await login(credentials.username, credentials.password);
                // console.log('auth usr: ', user);
                // if (user) {
                //     return user;
                // } else {
                //     return null;
                // }
                console.log('credentials', credentials);
                const res = await login(credentials.username, credentials.password);
                console.log('res', res);
                return res;
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
    ]
})

export { handler as GET, handler as POST }