interface StepIndicatorProps {
    currentStep: number;
    totalSteps: number;
    stepTitles: string[];
}

export default function StepIndicator({
    currentStep,
    stepTitles,
}: StepIndicatorProps) {
    return (
        <div className="flex items-center justify-between w-full py-2 relative border-b-2">
            {stepTitles.map((title, index) => {
                const stepNumber = index + 1;
                const isActive = stepNumber === currentStep;
                const isCompleted = stepNumber <= currentStep;

                return (
                    <div
                        key={index}
                        className="flex flex-col items-center w-full relative mb-4"
                    >
                        {/* Line */}
                        {stepNumber > 1 && (
                            <div
                                className={`absolute top-3.5 left-0 transform -translate-x-1/2 w-[calc(100%-2rem)] h-[2px] ${
                                    isCompleted
                                        ? 'bg-point-500'
                                        : 'bg-point-200'
                                }`}
                            />
                        )}

                        {/* Step Circle */}
                        <div
                            className={`w-8 h-8 flex items-center justify-center rounded-full ${
                                isActive
                                    ? 'bg-point-500 text-white border-point-500'
                                    : isCompleted
                                      ? 'bg-point-500 text-white border-point-500'
                                      : 'bg-white text-point-300 border-point-300'
                            } border-2`}
                        >
                            {stepNumber}
                        </div>

                        {/* Step Title */}
                        <div
                            className={`mt-2 text-sm ${
                                isActive || isCompleted
                                    ? 'text-point-500 font-bold'
                                    : 'text-point-300'
                            }`}
                        >
                            {title}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
