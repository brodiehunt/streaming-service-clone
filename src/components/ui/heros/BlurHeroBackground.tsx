import Image from 'next/image'

const BlurHeroBackground: React.FC<{ thumbnail: string }> = ({ thumbnail }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-[45vh] max-h-[500px]">
      <Image
        src={thumbnail}
        alt=""
        fill={true}
        priority={true}
        className="w-full h-full blur-lg"
        style={{ objectFit: 'cover' }}
      />
      <div className="absolute z-10 -bottom-10 left-0 w-full h-2/3 bg-black-bezier-to-top bg-bottom bg-no-repeat"></div>
    </div>
  )
}

export default BlurHeroBackground
