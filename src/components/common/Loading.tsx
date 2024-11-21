import LoadingIcon from '@/assets/images/loading.svg?react';

export default function Loading() {
    return (
        <div className="h-full flex justify-center items-center">
            <LoadingIcon className="animate-bounce" />
        </div>
    );
}
