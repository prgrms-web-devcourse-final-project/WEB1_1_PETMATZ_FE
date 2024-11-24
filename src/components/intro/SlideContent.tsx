interface SlideContentProps {
    image: React.ReactNode;
    title: React.ReactNode;
    description: React.ReactNode;
}

export default function SlideContent({
    image,
    title,
    description,
}: SlideContentProps) {
    return (
        <div className="flex flex-col items-center justify-center text-center px-6 mt-6">
            <div className="w-full h-70 sm:h-80 mb-4 flex items-center justify-center">
                {image}
            </div>
            <h2 className="mb-3 text-black font-extrabold text-body-xl sm:text-title-l">
                {title}
            </h2>
            <p className="text-body-s font-semibold text-gray-400 mb-8 sm:text-body-l">
                {description}
            </p>
        </div>
    );
}
