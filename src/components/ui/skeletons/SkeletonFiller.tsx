const SkeletonLoading: React.FC<{ className: string }> = ({ className }) => {
  return (
    <div aria-live="polite" aria-busy="true" className={className}>
      <span className="inline-flex w-full h-full animate-pulse select-none rounded-md bg-darker-grey-transparent leading-none"></span>
    </div>
  )
}

export default SkeletonLoading
