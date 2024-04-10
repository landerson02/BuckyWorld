import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

/**
 * Handles the authentication process using NextAuth.
 * @returns {Promise<void>} A promise that resolves when the authentication process is complete.
 */
const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
    ]
})

export { handler as GET, handler as POST }