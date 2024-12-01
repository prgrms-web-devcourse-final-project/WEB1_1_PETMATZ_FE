interface TagPropsType {
    text: string;
    index?: number;
}

export default function Tag({ text, index }: TagPropsType) {
    return (
        <div key={index} className="flex">
            <div className="text-body-m text-point-500 font-semibold px-[18px] py-[6px] border border-point-600 rounded-full">
                {text}
            </div>
        </div>
    );
}
