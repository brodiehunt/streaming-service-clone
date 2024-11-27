import Link from 'next/link'
export default function LinkButton({
  type,
  url,
  children,
}: {
  type: string
  url: string
  title: string
  children: React.ReactNode
}) {
  if (type === 'primary') {
    return (
      <Link
        className="text-almost-black bg-nine rounded flex items-center justify-center gap-2 py-3 px-4 hover:bg-almost-white transition-duration-200 transition-colors w-fit font-semibold"
        href={url}
      >
        {children}
      </Link>
    )
  }

  if (type === 'secondary') {
    return (
      <Link
        className="text-almost-white bg-dark-grey rounded flex items-center justify-center gap-2 py-3 px-4 hover:text-almost-black hover:bg-almost-white transition-duration-200 transition-colors w-fit font-semibold"
        href={url}
      >
        {children}
      </Link>
    )
  }

  if (type === 'tertiary') {
    return (
      <Link
        className="text-almost-white bg-dark-grey-transparent rounded flex items-center justify-center gap-2 py-3 px-4 hover:text-almost-white hover:bg-dark-grey-half-transparent transition-duration-200 transition-colors w-fit font-semibold"
        href={url}
      >
        {children}
      </Link>
    )
  }
}
