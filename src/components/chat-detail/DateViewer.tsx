import CalendarIcon from '@/assets/images/calendar.svg?react';

interface DateViewerProps {
    date: string;
}

export default function DateViewer({ date }: DateViewerProps) {
    return (
        <div className="flex justify-center items-center gap-4 my-4">
            <div className="flex justify-center items-center gap-2 py-2 px-4 text-white bg-point-300 rounded-full text-xs">
                <CalendarIcon className="w-4 h-4 text-white" />
                {date}
            </div>
        </div>
    );
}
