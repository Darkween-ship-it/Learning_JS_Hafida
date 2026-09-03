export default function AvailabilityBadge() {
  return (
    <div className="absolute bottom-[30px] right-[-10px] bg-white rounded-[14px] px-[20px] py-[14px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] flex items-center gap-[10px]">
      <span className="w-[10px] h-[10px] rounded-full bg-green-500 inline-block"></span>
      <span className="text-[14px] font-medium text-[#1a1a1a]">Available for projects</span>
    </div>
  )
}
