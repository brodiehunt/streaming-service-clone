import Link from 'next/link'

const RouteNotImplemented = () => {
  return (
    <div className="bg-white absolute w-[350px] h-[200px] rounded top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center justify-center">
      <h1 className="font-bold text-2xl mb-4 text-black">
        Route not Implemented
      </h1>
      <Link href="/" className="text-nine font-bold text-xl block">
        Go Home
      </Link>
    </div>
  )
}

export default RouteNotImplemented
