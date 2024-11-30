interface LabelPropsType {
    text: string;
}

export default function Label({ text }: LabelPropsType) {
    return <div className="text-label-m text-gray-500">{text}</div>;
}
