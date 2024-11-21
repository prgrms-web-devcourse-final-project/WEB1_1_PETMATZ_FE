import { NavigateOptions, To, useNavigate } from 'react-router-dom';

export default function useFadeNavigate() {
    const navigate = useNavigate();

    return (to: string | number, option: NavigateOptions = {}) => {
        if (document.startViewTransition) {
            document.startViewTransition(() => {
                navigate(to as To, option);
            });
        } else {
            navigate(to as To, option);
        }
    };
}
