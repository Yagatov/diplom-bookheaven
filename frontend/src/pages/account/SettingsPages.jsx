import pages from '#styles/account/pages.module.scss';
import styles from '#styles/account/pages/settings.module.scss';

import Request from '../../Request.js';

import { useMutation, useQuery } from '@tanstack/react-query';

import { useRef } from 'react';
import { useForm } from 'react-hook-form';

import { useAtom } from 'jotai'
import UserAtom from '../../atoms/UserAtom.js';

const loginPattern = /^[a-zA-Z0-9_]{4,20}$/;
const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,100}$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,100}$/;

export function SettingsPage() {
    const [user, setUser] = useAtom(UserAtom);

    const query = useQuery({
        queryKey: ['accountProfile'],
        queryFn: () => {
            return Request.get("/api/account/profile");
        }
    });

    const mutation = useMutation({
        mutationFn: (data) => {
            const dataForm = new FormData();

            dataForm.append('ava', data.ava[0]);
            dataForm.append('email', data.email);
            dataForm.append('login', data.login);

            return Request.post('http://localhost:3000/api/account/profile', dataForm)
        },
        onSuccess: (data) => {
            const userData = data?.data?.user;
            
            setUser(userData.login);
        },
    })

    const {
        register, 
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        shouldUnregister: true,
        defaultValues: query?.data?.data
    });

    const selectedImageRef = useRef(null)

    function handleImageSelect(event) {
        const file = event.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        selectedImageRef.current.src = imageUrl;
    }   

    return (
        <div className={pages.content}>
            <h2 className={pages.title}>Настройка профиля</h2>

            <div className={pages.box}>
                {
                    (mutation.isError || query.isError) && (
                        <div className={[styles.notification, styles.error].join(' ')}>Ошибка</div>
                    )
                }
                {
                    mutation.isSuccess && (
                        <div className={[styles.notification, styles.success].join(' ')}>Сохранено</div>
                    )
                }
                
                {
                    mutation.isPending && query.isPending ? (
                        <h3 className={styles.title}>Загрузка....</h3>
                    ) : (
                        <form onSubmit={handleSubmit(mutation.mutate)} className={styles.form}>
                            <input
                                type="file"
                                id="imageSelect"
                                {...register("ava")}
                                accept="image/*" 
                                onChange={handleImageSelect}
                                style={{opacity: 0, height: 0}}
                            />

                            <label htmlFor='imageSelect' className={styles.ava}>
                                <img src={query.data?.data?.avatar == null ? "/images/avatar.jpg" : Request.getUri() + "/public/images/avatars/" + query.data?.data?.avatar} ref={selectedImageRef} width={150} height={150} />
                                <p className={styles.text}>
                                    <span>Выбери<br/>аватарку</span>
                                </p>
                            </label>

                            <label className={styles.labelInput}>
                                Никнейм
                                <input
                                    placeholder="Введите логин"
                                    // value={query.data?.data?.login}
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
                                Почта
                                <input
                                    placeholder="Введите почту"
                                    // value={query.data?.data?.email}
                                    {...register("email", {
                                        required: "Обязательное поле",
                                        minLength: {
                                            value: 2,
                                            message: "Минимальная длина почты 2 символа"
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: "Максимальная длина почты 100 символов"
                                        },
                                        pattern: {
                                            value: emailPattern,
                                            message: "Но это ведь не почта"
                                        }
                                    })}
                                />
                                <p className={styles.error}>{errors.email?.message}</p>
                            </label>
                            

                            <input className={styles.submit} type="submit" value="Сохранить" />
                        </form>
                    )
                }
            </div>
        </div>
    )
}