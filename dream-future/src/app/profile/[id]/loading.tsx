export default function Loading() {
  return (
    <div className="p-6 flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center justify-center">
        <div className="h-6 w-48 bg-gray-300 rounded mb-2" />
        <div className="h-40 w-40 bg-gray-300 rounded-full" />
      </div>
    </div>
  );
}
