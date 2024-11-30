interface TagPropsType {
    text: string;
}

export default function Tag({ text }: TagPropsType) {
    return (
        <div className="flex">
            <div className="text-body-m text-point-500 font-semibold px-[18px] py-[6px] border border-point-600 rounded-full">
                {text}
            </div>
        </div>
    );
}
