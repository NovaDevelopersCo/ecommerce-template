import GoogleProvider from 'next-auth/providers/google'

export const AuthConfig = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_SECRET as string
		})
	]
}