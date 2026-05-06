import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { authConfig } from "./auth.config"
import { supabase } from "./supabase"
import bcrypt from "bcrypt"

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const { data: user, error } = await supabase
            .from('AdminUser')
            .select('*')
            .eq('email', credentials.email)
            .single()

          if (error || !user) {
            console.error("User not found via Supabase:", error);
            return null
          }

          const passwordsMatch = await bcrypt.compare(
            credentials.password as string,
            user.password_hash
          )

          if (passwordsMatch) {
            return { id: user.id, email: user.email }
          }
        } catch (error) {
          console.error("Auth query failed", error);
        }

        return null
      }
    })
  ],
})
