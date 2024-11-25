'use client'

import { logout } from '@/actions/logout.action'

const LogoutButton: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const handleLogout = async () => {
    try {
      const { success, message } = await logout()

      if (!success) {
        console.log(message)
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    }
  }

  return (
    <button
      className="pl-0 p-3 text-sm  font-semibold text-light-grey hover:text-nine"
      onClick={handleLogout}
    >
      {children}
    </button>
  )
}

export default LogoutButton
