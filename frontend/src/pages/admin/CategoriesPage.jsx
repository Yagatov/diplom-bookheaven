import pages from '#styles/account/pages.module.scss';
import styles from '#styles/admin/pages/categories.module.scss';
import settings from '#styles/account/pages/settings.module.scss';

import Request from '../../Request.js';
import { useForm } from 'react-hook-form';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export function CategoriesPage() {

    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['adminCategory'],
        queryFn: () => {
            return Request.get("/api/admin/categories");
        }
    });

    const createMutation = useMutation({
        mutationFn: (data) => {
            return Request.post('/api/admin/category', data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries('adminCategory');
        },
    })

    const createForm = useForm();

    return (
        <div className={pages.content}>
            <h2 className={pages.title}>Категории</h2>

            <div className={pages.box}>
                {
                    (createMutation.isError || query.isError) && (
                        <div className={[settings.notification, settings.error].join(' ')}>Ошибка</div>
                    )
                }
                {
                    createMutation.isSuccess && (
                        <div className={[settings.notification, settings.success].join(' ')}>Создано</div>
                    )
                }
                
                {
                    createMutation.isPending && query.isPending ? (
                        <h3 className={settings.title}>Загрузка....</h3>
                    ) : (
                        <form onSubmit={createForm.handleSubmit(createMutation.mutate)} className={settings.form} style={{
                            border: "1px solid rgba(255, 255, 255, .3)",
                            padding: 30,
                            borderRadius: 10
                        }}>
                            <label className={settings.labelInput}>
                                Название
                                <input
                                    placeholder="Введите название"
                                    {...createForm.register("name", {
                                        required: "Обязательное поле"
                                    })}
                                />
                                <p className={settings.error}>{createForm.formState.errors.name?.message}</p>
                            </label>

                            <label className={styles.checkbox}>
                                <input type="checkbox" {...createForm.register("navigation")}/>
                                В навигации
                            </label>

                            <label className={styles.checkbox}>
                                <input type="checkbox" {...createForm.register("sets")} />
                                В сете
                            </label>

                            <label className={styles.checkbox}>
                                <input type="checkbox" {...createForm.register("status")} />
                                Статус
                            </label>
                            

                            <input className={settings.submit} type="submit" value="Создать" style={{marginTop: 20}} />
                        </form>
                    )
                }

                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th scope='col'>ID</th>
                            <th scope='col'>Название</th>
                            <th scope='col'>В навигации</th>
                            <th scope='col'>В сеты</th>
                            <th scope='col'>Статус</th>
                            <th scope='col'>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            query.data?.data?.categories?.map(item => (
                                <CategoryItem key={"category." + item.id} id={item.id} name={item.name} nav={item.navigation} set={item.sets} status={item.status} />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function CategoryItem({id, name, nav, set, status}) {
    const queryClient = useQueryClient();
    const [editable, setEditable] = useState(false);
    const [data, setData] = useState({
        name: name,
        navigation: nav,
        sets: set,
        status: status
    });
    const [error, setError] = useState(null);

    const deleteMutation = useMutation({
        mutationFn: () => {
            return Request.delete('/api/admin/category/' + id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries('adminCategory');
        }
    });

    const updateMutation = useMutation({
        mutationFn: (data) => {
            return Request.post('/api/admin/category/' + id, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('adminCategory');
        }
    });

    function sumbitUpdate() {
        if(data.name == '') {
            return setError('Ошибка в названии');
        }

        setError(null);
        updateMutation.mutate(data);
    }

    return (
        <>
            <tr>
                <th scope="row">{id}</th>
                <td>{name}</td>
                <td>{nav ? "Да" : "Нет"}</td>
                <td>{set ? "Да" : "Нет"}</td>
                <td>{status == "ACTIVE" ? "Включен" : "Отключен"}</td>
                <td>
                    <button className={[styles.button, styles.bEdit].join(' ')} onClick={() => setEditable((prev) => !prev)}>{editable ? "Закрыть" : "Изменить"}</button>
                    <button className={[styles.button, styles.bDelete].join(' ')} onClick={() => deleteMutation.mutate()}>Удалить</button>
                </td>
            </tr>
            {
                editable && (
                    <tr>
                        <th scope="row">edit {id}...</th>
                        <td>
                            <input defaultValue={name} type="text" className={styles.input} onChange={(event) => setData({...data, name: event.target.value})} />
                        </td>
                        <td>
                            <input defaultChecked={nav} type="checkbox" onChange={() => setData({...data, navigation: !data.navigation})} />
                        </td>
                        <td>
                            <input defaultChecked={set} type="checkbox" onChange={() => setData({...data, sets: !data.sets})} />
                        </td>
                        <td>
                            <input defaultChecked={status == "ACTIVE"} type="checkbox" onChange={() => setData({...data, status: (data.status == "ACTIVE" ? "DISABLED" : "ACTIVE")})} />
                        </td>
                        <td>
                            <button className={[styles.button, styles.bSave].join(' ')} onClick={() => sumbitUpdate()}>Сохранить</button>
                        </td>
                    </tr>
                )
            }
            {
                error && (
                    <tr>
                        <td style={{color: "#fc4f4f"}} colSpan={6}>
                            {error}
                        </td>
                    </tr>
                )
            }
        </>
    )
}