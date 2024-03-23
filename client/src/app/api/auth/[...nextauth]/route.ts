import NextAuth from 'next-auth'

// eslint-disable-next-line import/no-internal-modules
import { AuthConfig } from '../../../../../configs/auth'

const handler = NextAuth(AuthConfig)

export { handler as GET, handler as POST }
