export default function Button({
  type,
  onClick,
  children,
}: {
  type: string
  onClick: () => void
  label: string
  children: React.ReactNode
}) {
  if (type === 'primary') {
    return (
      <button
        className="text-almost-black bg-nine rounded flex flex-nowrap items-center justify-center gap-2 py-3 px-4 hover:bg-almost-white transition-duration-200 transition-colors w-fit font-semibold"
        onClick={onClick}
      >
        {children}
      </button>
    )
  }

  if (type === 'secondary') {
    return (
      <button
        className="text-almost-white bg-dark-grey rounded flex flex-nowrap items-center justify-center gap-2 py-3 px-4 hover:text-almost-black hover:bg-almost-white transition-duration-200 transition-colors w-fit font-semibold"
        onClick={onClick}
      >
        {children}
      </button>
    )
  }

  if (type === 'tertiary') {
    return (
      <button
        className="text-almost-white bg-dark-grey-transparent  flex-nowrap rounded flex items-center justify-center gap-2 py-3 px-4 hover:text-almost-white hover:bg-dark-grey-half-transparent transition-duration-200 transition-colors w-fit font-semibold"
        onClick={onClick}
      >
        {children}
      </button>
    )
  }
}
