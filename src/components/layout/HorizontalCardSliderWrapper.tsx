const HorizontalCardSliderWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="relative">
      <div className="flex flex-nowrap gap-3 overflow-x-scroll scroll-smooth no-scrollbar">
        {children}
      </div>
    </div>
  )
}

export default HorizontalCardSliderWrapper
