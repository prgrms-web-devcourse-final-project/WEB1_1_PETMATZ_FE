export interface RegisterFormData {
    ownerName: string;
    registrationNumber: string;
    dogName: string;
    breed: string;
    age: string;
    favoritePlace: string;
    gender: string;
    neutered: string;
    size: string;
    dmbti: string;
}

export interface RegisterStep1Props {
    onNext: () => void;
    register: UseFormRegister<RegisterFormData>;
    watch: UseFormWatch<RegisterFormData>;
    errors: FieldErrors<RegisterFormData>;
    getValue: UseFormGetValues<RegisterFormData>;
    setValue: UseFormSetValue<RegisterFormData>;
}
