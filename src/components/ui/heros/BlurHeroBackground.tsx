import Image from 'next/image'

const BlurHeroBackground: React.FC<{ thumbnail: string }> = ({ thumbnail }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-[45vh] max-h-[500px]">
      <Image
        src={thumbnail}
        alt=""
        fill={true}
        priority={true}
        className="w-full h-full blur-xl"
        style={{ objectFit: 'cover' }}
      />
    </div>
  )
}

export default BlurHeroBackground
