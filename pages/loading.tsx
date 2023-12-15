import LoadingSpinner from "@/components/LoadingSpinner"

const Loading = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black">
        <div className="text-primary">
            <LoadingSpinner />
        </div>
    </div>
  )
}

export default Loading