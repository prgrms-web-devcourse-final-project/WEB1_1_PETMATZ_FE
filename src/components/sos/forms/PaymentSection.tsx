import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { FormData } from '@/types/Sos';
import PaymentTypeSelect from './PaymentTypeSelect';
import PaymentInput from './PaymentInput';

interface PaymentSectionProps {
    register: UseFormRegister<FormData>;
    watch: UseFormWatch<FormData>;
    getInputStyle: (fieldName: keyof FormData) => string;
}

export default function PaymentSection({
    register,
    watch,
    getInputStyle,
}: PaymentSectionProps) {
    const paymentType = watch('paymentType') as FormData['paymentType'];

    return (
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    지불 방식
                </label>
                <PaymentTypeSelect
                    register={register}
                    getInputStyle={getInputStyle}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    금액
                </label>
                <PaymentInput
                    register={register}
                    paymentType={paymentType}
                    getInputStyle={getInputStyle}
                />
            </div>
        </div>
    );
}
