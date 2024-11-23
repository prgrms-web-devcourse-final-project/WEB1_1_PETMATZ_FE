import { UseFormRegister } from 'react-hook-form';
import { FormData } from '@/types/Sos';

interface PaymentTypeSelectProps {
    register: UseFormRegister<FormData>;
    getInputStyle: (fieldName: keyof FormData) => string;
}

export default function PaymentTypeSelect({
    register,
    getInputStyle,
}: PaymentTypeSelectProps) {
    return (
        <select
            {...register('paymentType', { required: true })}
            className={getInputStyle('paymentType')}
        >
            <option value="">선택해주세요</option>
            <option value="시급">시급</option>
            <option value="일급">일급</option>
            <option value="협의">협의</option>
        </select>
    );
}
