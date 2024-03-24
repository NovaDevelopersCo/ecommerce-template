'use client'

import { Button } from 'antd'
import { useRouter } from 'next/navigation'

const SignInUpBtn = () => {
	const router = useRouter()
	return (
		<Button
			onMouseDown={() => {
				router.push('/api/auth/signin')
			}}
		>
			Sing in/Sign up
		</Button>
	)
}

export default SignInUpBtn
