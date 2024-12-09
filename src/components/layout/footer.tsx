import Link from 'next/link'
import Logo, {
  GooglePlayLogo,
  AppleStoreLogo,
  NineLogoGrey,
} from '../ui/shared/logo'
import LogoutButton from '../auth/LogoutButton'
const Footer: React.FC<{
  user: { givenName: string; id: number } | null
}> = ({ user }) => {
  return (
    <footer className="mt-auto relative z-40">
      <TopFooter />
      <BottomFooter user={user} />
    </footer>
  )
}

const topFooterLinks = [
  {
    href: '/about',
    text: 'About',
    title: 'Go to the about page',
  },
  {
    href: '/help',
    text: 'Help',
    title: 'Go to the help page',
  },
  {
    href: '/ways-to-watch',
    text: 'Ways to Watch',
    title: 'Go to the ways to watch page',
  },
  {
    href: '/tv-guide',
    text: 'TV Guide',
    title: 'Go to the TV Guide page',
  },
]

const TopFooter = () => {
  return (
    <div className="px-layout-x-large py-3 ">
      <nav className="sm:flex sm:items-center sm:flex-wrap border-t-[1px] border-darkGreyTransparent pt-6">
        <div className="w-[84px] block sm:mr-10">
          <Logo />
        </div>
        <ul className="flex flex-start mb-2">
          {topFooterLinks.map((link, index) => {
            return (
              <li key={link.href}>
                <FooterLink
                  link={link}
                  isFirst={index === 0}
                  isLast={index === topFooterLinks.length - 1}
                ></FooterLink>
              </li>
            )
          })}
        </ul>
        <div className="py-2 mb-2 flex gap-2 sm:ml-auto">
          <AppleStoreLogo />
          <GooglePlayLogo />
        </div>
      </nav>
    </div>
  )
}

interface FooterLink {
  href: string
  title: string
  text: string
}
const FooterLink: React.FC<{
  link: FooterLink
  isFirst: boolean
  isLast: boolean
}> = ({ link, isFirst, isLast }) => {
  return (
    <Link
      className={`p-3 text-sm  font-semibold text-light-grey hover:text-nine 
        ${isFirst ? 'pl-0' : ''}
        ${isLast ? 'pr-0' : ''}
        `}
      href={link.href}
      title={link.title}
    >
      {link.text}
    </Link>
  )
}

const BottomFooter: React.FC<{
  user: { givenName: string; id: number } | null
}> = ({ user }) => {
  return (
    <div className="bg-footer-bottom px-layout-x-large py-6 sm:flex sm:items-center sm:flex-wrap">
      <div className="w-[84px] block sm:mr-10">
        <NineLogoGrey />
      </div>
      <div className="flex flex-start mb-2 pt-2">
        {user ? (
          <LogoutButton>Logout</LogoutButton>
        ) : (
          <FooterLink
            isFirst={true}
            isLast={false}
            link={{
              href: '/login',
              text: 'Login',
              title: 'Go to the Login page',
            }}
          />
        )}

        <FooterLink
          isFirst={false}
          isLast={false}
          link={{
            href: '/terms-of-use',
            text: 'Terms of Use',
            title: 'Go to the Terms of use page',
          }}
        />
        <FooterLink
          isFirst={false}
          isLast={true}
          link={{
            href: '/privacy-policy',
            text: 'Privacy Policy',
            title: 'Go to the privacy policy page',
          }}
        />
      </div>
      <div className="sm:ml-auto">
        <p className="text-sm  font-semibold text-light-grey ">
          © 2024 Nine Entertainment Co.
        </p>
      </div>
    </div>
  )
}

export default Footer
