'use client'

import Link from 'next/link'
import Logo from './logo'
import { FaSearch, FaHome, FaUser, FaAngleDown, FaClock } from 'react-icons/fa'
import { TbLogout2 } from 'react-icons/tb'
import { RxHamburgerMenu } from 'react-icons/rx'
import { CgClose } from 'react-icons/cg'
import { BsLightningFill } from 'react-icons/bs'
import { TbCategoryFilled } from 'react-icons/tb'
import { MdConnectedTv } from 'react-icons/md'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { logout } from '@/actions/logout.action'

// Breakpoint for header is 1200px

const Header: React.FC<{ user: { givenName: string; id: number } | null }> = ({
  user,
}) => {
  const [menuOpen, setMenuOpen] = useState(false)
  console.log(menuOpen)
  return (
    <header className="w-full p-4 absolute top-0 left-0 flex items-center justify-between xl:px-[64px] xl:py-[32px] xl:justify-start z-50">
      <div className="xl:hidden">
        <button
          onClick={() => setMenuOpen(isOpen => !isOpen)}
          className="text-almostWhite w-12 px-2 flex items-center hover:text-primaryLight transition-colors transition-duration-200 "
        >
          <RxHamburgerMenu className="w-full h-auto" />
        </button>
      </div>
      <div className="w-[110px] h-[48px]">
        <Logo />
      </div>
      <Navigation setMenuOpen={setMenuOpen} menuOpen={menuOpen} user={user} />
      <div className="">
        <Link
          href="/search"
          className="text-almostWhite block w-12 px-3 hover:text-primaryLight transition-colors transition-duration-200"
        >
          <FaSearch className="w-full h-auto" />
        </Link>
      </div>
    </header>
  )
}

const Navigation: React.FC<{
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
  menuOpen: boolean
  user: { givenName: string; id: number } | null
}> = ({ setMenuOpen, menuOpen, user }) => {
  const pathname = usePathname()

  return (
    <nav
      className={`absolute p-4 top-0 right-[100%] h-[100svh] bg-almostBlack w-[20rem] transition-duration-200 transition-transform xl:static xl:h-auto xl:bg-transparent xl:w-full xl:flex xl:flex-grow-2 xl:justify-between xl:py-0
      ${menuOpen ? 'translate-x-[100%]' : 'translate-x-0'}
    `}
    >
      <button
        onClick={() => setMenuOpen(isOpen => !isOpen)}
        className="text-almostWhite w-12 px-2 flex items-center hover:text-primaryLight transition-colors transition-duration-200 xl:hidden"
      >
        <CgClose className="w-full h-auto" />
      </button>
      <div className="mt-4 flex flex-col xl:flex-row xl:mt-0">
        <NavItem href="/" pathname={pathname}>
          <FaHome
            className={`w-[32px] h-[32px] p-1 ml-6 mr-4 rounded-full xl:mr-2 xl:ml-0 ${pathname === '/' ? 'bg-primaryLight text-almostBlack' : ''}`}
          />
          Home
        </NavItem>
        <NavItem href="/sorry-not-built" pathname={pathname}>
          <BsLightningFill
            className={`w-[32px] h-[32px] p-1 ml-6 mr-4 rounded-full xl:mr-2 xl:ml-0 ${pathname === '/sorry-not-built' ? 'bg-primaryLight text-almostBlack' : ''}`}
          />
          Live TV
        </NavItem>
        <NavItem href="/genres" pathname={pathname}>
          <TbCategoryFilled
            className={`w-[32px] h-[32px] p-1 ml-6 mr-4 rounded-full xl:mr-2 xl:ml-0 ${pathname === '/genres' ? 'bg-primaryLight text-almostBlack' : ''}`}
          />
          Categories
        </NavItem>
      </div>
      <div className="mt-8 flex flex-col xl:flex-row xl:mt-0">
        <NavItem href="/sorry-not-built" pathname={pathname}>
          <MdConnectedTv
            className={`w-[32px] h-[32px] p-1 ml-6 mr-4 rounded-full xl:hidden ${pathname === '/sorry-not-built' ? 'bg-primaryLight text-almostBlack' : ''}`}
          />
          Connect your TV
        </NavItem>
        {user ? (
          <LoggedInDropdown user={user} pathname={pathname} />
        ) : (
          <NavItem href="/login" pathname={pathname}>
            <FaUser
              className={`w-[32px] h-[32px] p-1 ml-6 mr-4 rounded-full xl:hidden ${pathname === '/login' ? 'bg-primaryLight text-almostBlack' : ''}`}
            />
            Log In
          </NavItem>
        )}
      </div>
    </nav>
  )
}

const NavItem: React.FC<{
  children: React.ReactNode
  href: string
  pathname: string
}> = ({ children, href, pathname }) => {
  const isActive = pathname === href
  return (
    <Link
      href={href}
      className={`
      p-3  font-semibold flex items-center transition-colors transition-duration-200 hover:text-primaryLight xl:py-0
      ${isActive ? 'text-primaryLight' : 'text-almostWhite'}
      `}
    >
      {children}
    </Link>
  )
}

const LoggedInDropdown: React.FC<{
  user: { givenName: string; id: number }
  pathname: string
}> = ({ user, pathname }) => {
  const [isOpen, setIsOpen] = useState(false)

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
    <div className="xl:p-3 relative">
      <button
        onClick={() => setIsOpen(open => !open)}
        className={`
       hidden font-semibold xl:flex gap-2 items-center transition-colors transition-duration-200 text-almostWhite hover:text-primaryLight xl:py-0`}
      >
        {user.givenName}
        <FaAngleDown
          className={`transition-duration-200 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        className={`xl:absolute xl:top-[100%] right-0 xl:rounded xl:bg-darkGreyTransparent xl:overflow-hidden transition-duration-400 transition-opacity ${isOpen ? 'xl:block xl:opacity-100' : 'xl:hidden xl:opacity-0'}`}
      >
        <DropdownNavItem href="/profile" pathname={pathname}>
          <FaUser
            className={`w-[32px] h-[32px] p-1 ml-6 mr-4 rounded-full xl:hidden ${pathname === '/login' ? 'bg-primaryLight text-almostBlack' : ''}`}
          />
          {user.givenName}
        </DropdownNavItem>
        <DropdownNavItem href="/history" pathname={pathname}>
          <FaClock
            className={`w-[32px] h-[32px] p-1 ml-6 mr-4 rounded-full xl:hidden ${pathname === '/login' ? 'bg-primaryLight text-almostBlack' : ''}`}
          />
          Watch history
        </DropdownNavItem>
        <button
          className="p-3  text-almostWhite font-semibold flex items-center transition-colors transition-duration-200 hover:text-primaryLight xl:hover:text-almostBlack mxl:py-0 xl:h-12 xl:px-6 xl:w-full xl:hover:bg-primaryLight"
          onClick={handleLogout}
        >
          <TbLogout2
            className={`w-[32px] h-[32px] p-1 ml-6 mr-4 rounded-full xl:hidden ${pathname === '/login' ? 'bg-primaryLight text-almostBlack' : ''}`}
          />
          Logout
        </button>
      </div>
    </div>
  )
}

const DropdownNavItem: React.FC<{
  children: React.ReactNode
  href: string
  pathname: string
}> = ({ children, href, pathname }) => {
  const isActive = pathname === href
  return (
    <Link
      href={href}
      className={`
      p-3  font-semibold flex items-center text-nowrap transition-colors transition-duration-200 hover:text-primaryLight xl:py-0 xl:h-12 xl:px-6
      xl:hover:text-almostBlack xl:hover:bg-primaryLight
      ${isActive ? 'text-primaryLight' : 'text-almostWhite'}
      `}
    >
      {children}
    </Link>
  )
}

export const HeaderGradient = () => {
  return (
    <div className="fixed inset-0 h-60 bg-gradient-black-bezier bg-no-repeat bg-cover pointer-events-none z-40"></div>
  )
}

export default Header
