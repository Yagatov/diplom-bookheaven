import styles from '#styles/pages/auth/dynamic.module.scss';

import Request from '#/Request.js';

import { useMutation } from '@tanstack/react-query';

import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { useAtom } from 'jotai'
import UserAtom from '#atoms/UserAtom.js';

export function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const [user, setUser] = useAtom(UserAtom);

    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (data) => {
            return Request.post('/api/auth/login', data)
        },
        onSuccess: (data) => {
            const userData = data?.data?.user;
            
            setUser(userData?.login);

            navigate('/account');
        },
        onError: (data) => {
            const errorFields = data.response.data?.error?.fields;
            
            if(errorFields != undefined) {
                setUser(errorFields?.user.login);
                navigate('/account');
            }
        }
    })

    const loginPattern = /^[a-zA-Z0-9_]{4,20}$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,100}$/;

    return (
        <form onSubmit={handleSubmit(mutation.mutate)} className={styles.form}>
            <h3 className={styles.title}>Авторизация</h3>

            {
                mutation.isPending && (
                    <h3 className={styles.title}>Загрузка....</h3>
                )
            }

            {
                mutation.isSuccess && (
                    <h3 className={styles.title}>{mutation.data?.data?.message}</h3>
                )
            }

            {
                mutation.isError && mutation.error?.response?.data && (
                    <h3 className={[styles.title, styles.error].join(' ')}>Ошибка:<br/>{mutation.error?.response?.data?.error?.message}</h3>
                )
            }

            <div className={styles.list}>
                <label className={styles.labelInput}>
                    Логин
                    <input
                        placeholder="Введите логин"
                        {...register("login", {
                            required: "Обязательное поле",
                            minLength: {
                                value: 4,
                                message: "Минимальная длина логина 4 символа"
                            },
                            maxLength: {
                                value: 20,
                                message: "Максимальная длина логина 20 символов"
                            },
                            pattern: {
                                value: loginPattern,
                                message: "Логин может содержать только англ. буквы и цифры"
                            }
                        })}
                    />
                    <p className={styles.error}>{errors.login?.message}</p>
                </label>
    
                <label className={styles.labelInput}>
                    Пароль
                    <input
                        placeholder="Введите пароль"
                        type="password"
                        {...register("password", {
                            required: "Обязательное поле",
                            minLength: {
                                value: 6,
                                message: "Минимальная длина пароля 6 символов"
                            },
                            maxLength: {
                                value: 100,
                                message: "Максимальная длина пароля 100 символов"
                            },
                            pattern: {
                                value: passwordPattern,
                                message: "Пароль должен содержать цифру, заглавную и строчную букву"
                            }
                        })}
                    />
                    <p className={styles.error}>{errors.password?.message}</p>
                </label>
            </div>

            <input type="submit" value="Войти" className={styles.submit}/>
            <Link className={styles.switch} to="/auth/register">Регистрация</Link>
        </form>
    )
}