import { Button } from 'antd'
import { signOut } from 'next-auth/react'

const LogoutBtn = () => {
	return <Button onMouseDown={() => signOut()}>Logout</Button>
}

export default LogoutBtn
