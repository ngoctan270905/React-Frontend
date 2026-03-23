import { useState } from "react";

interface RegisterForm {
    username: string;
    email: string;
    password: string;
    confirm: string;
}

type FormErrors = Partial<Record<keyof RegisterForm, string>>;

function validate(form: RegisterForm): FormErrors {

    const errors: FormErrors = {};
    const usernameValue = form.username.trim();
    const emailValue = form.email.trim();
    const emailPattern = /^[\w.-]+@[\w-]+\.\w+$/;
    const passwordValue = form.password;
    const confirmValue = form.confirm;

    if (usernameValue === "") {
        errors.username = "Tên đăng nhập không được để trống";
    } else if (usernameValue.length < 3) {
        errors.username = "Tối thiểu 3 ký tự";
    }

    if (!emailPattern.test(emailValue)) {
        errors.email = "Email không hợp lệ";
    }

    if (passwordValue.length < 8) {
        errors.password = "Mật khẩu tối thiểu 8 ký tự";
    }

    if (passwordValue !== confirmValue) {
        errors.confirm = "Mật khẩu không khớp";
    }

    return errors;
}

export default function RegisterFormComponent() {
    const [form, setForm] = useState<RegisterForm>({
        username: "",
        email: "",
        password: "",
        confirm: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Set<string>>(new Set());

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setTouched(prev => new Set(prev).add(name));
        setErrors(validate(form));
    };