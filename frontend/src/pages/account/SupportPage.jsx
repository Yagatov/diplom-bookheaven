import styles from '#styles/pages/account/support.module.scss';

import Loader from '#/ui/Loader';
import Request from '#/Request.js';

import { useMutation } from '@tanstack/react-query';

import { useForm } from 'react-hook-form';

export function SupportPage() {
    const mutation = useMutation({
        mutationFn: (data) => {
            return Request.post('/api/account/message', data)
        }
    });

    const {
        register, 
        handleSubmit,
        formState: { errors }
    } = useForm({
        shouldUnregister: true,
    });

    if(mutation.isPending) return ( <Loader/> );

    return (
        <>
            {
                mutation.isError && (
                    <div className={[styles.notification, styles.error].join(' ')}>Ошибка</div>
                )
            }
            {
                mutation.isSuccess && (
                    <div className={[styles.notification, styles.success].join(' ')}>Отправлено</div>
                )
            }
            
            <form onSubmit={handleSubmit(mutation.mutate)} className={styles.form}>
                <label className={styles.labelInput}>
                    Тема сообщения
                    <input
                        placeholder="Введите тему сообщения"

                        {...register("topic", {
                            required: "Обязательное поле",
                            minLength: {
                                value: 3,
                                message: "Минимальная длина темы 3 символа"
                            },
                            maxLength: {
                                value: 20,
                                message: "Максимальная длина темы 20 символов"
                            }
                        })}
                    />
                    <p className={styles.error}>{errors.topic?.message}</p>
                </label>

                <label className={styles.labelInput}>
                    Сообщение
                    <textarea
                        placeholder="Введите сообщение"
                        {...register("message", {
                            required: "Обязательное поле",
                            minLength: {
                                value: 2,
                                message: "Минимальная длина сообщения 2 символа"
                            },
                            maxLength: {
                                value: 500,
                                message: "Максимальная длина сообщения 500 символов"
                            }
                        })}
                    ></textarea>
                    <p className={styles.error}>{errors.message?.message}</p>
                </label>
                

                <input disabled={mutation.isPending} className={styles.submit} type="submit" value={mutation.isPending ? "Загрузка" : "Отправить"} />
            </form>
        </>
    )
}