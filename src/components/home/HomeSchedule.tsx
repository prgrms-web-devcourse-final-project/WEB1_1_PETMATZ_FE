import DogImg from '@/assets/images/dogs/dogMiddle.svg?react';

export default function HomeSchedule() {
    return (
        <div className="bg-white w-full h-auto p-6 pt-28">
            <div className="relative w-full h-auto shadow-md ">
                <DogImg className=" absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto" />
                <div className="relative z-10 bg-white flex p-3 min-h-44 h-auto border-4 border-gray-200 rounded-lg">
                    <p className="text-body-l font-extrabold">
                        11월29일 목요일{<br />} 일정이 없습니다.
                    </p>
                </div>
            </div>
        </div>
    );
}
