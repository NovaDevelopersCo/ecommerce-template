import {signOut} from 'next-auth/react'
import {Button} from 'antd'

const LogoutBtn = () => {
  return (
	<Button onMouseDown={() => signOut()}>
		Logout
	</Button>
  )
}

export default LogoutBtn