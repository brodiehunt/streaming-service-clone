const GridCardWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-4 md:py-8">
      {children}
    </div>
  )
}

export default GridCardWrapper
