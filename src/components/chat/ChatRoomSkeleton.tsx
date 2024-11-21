export default function ChatRoomSkeleton() {
    return (
        <div className="flex items-center gap-2 p-4 hover:bg-gray-200 cursor-pointer">
            <div className="avatar">
                <div className="w-12 h-12 bg-gray-300 animate-pulse rounded-full" />
            </div>
            <div className="flex-1 flex flex-col justify-between py-2 h-12">
                <div className="w-1/5 h-[16px] bg-gray-300 animate-pulse rounded-full" />
                <div className="w-1/2 h-[12px] bg-gray-300 animate-pulse rounded-full" />
            </div>
            <div className="flex flex-col items-center justify-between h-14 py-2">
                <div className="w-11 h-[10px] bg-gray-300 animate-pulse rounded-full" />
                <div className="w-[15px] h-[15px] bg-gray-300 animate-pulse rounded-full" />
            </div>
        </div>
    );
}
