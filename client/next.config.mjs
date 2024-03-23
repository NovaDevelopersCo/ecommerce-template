/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		// domains: ['dummyimage.com'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com'
			}
		]
	}
}

export default nextConfig
