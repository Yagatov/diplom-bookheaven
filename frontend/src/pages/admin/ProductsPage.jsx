import styles from '#styles/pages/admin/products.module.scss';
import settings from '#styles/pages/account/settings.module.scss';

import Loader from '#/ui/Loader';
import Request from '#/Request.js';
import { useForm } from 'react-hook-form';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export function ProductsPage() {

    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['adminProducts'],
        queryFn: () => {
            return Request.get("/api/admin/products");
        }
    });
    
    const queryCategories = useQuery({
        queryKey: ['adminCategory'],
        queryFn: () => {
            return Request.get("/api/admin/categories");
        }
    });

    const createMutation = useMutation({
        mutationFn: (data) => {
            return Request.post('/api/admin/product', data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries('adminProducts');
        },
    })

    const createForm = useForm({
        defaultValues: {
            bonus: 0
        }
    });

    if(query.isPending || queryCategories.isPending) return ( <Loader /> );
    if(query.isError || queryCategories.isError) return ( <h3>Ошибка сервера</h3> );

    return (
        <>
            {
                (createMutation.isError) && (
                    <div className={[settings.notification, settings.error].join(' ')}>Ошибка</div>
                )
            }
            {
                createMutation.isSuccess && (
                    <div className={[settings.notification, settings.success].join(' ')}>Создано</div>
                )
            }
            
            {
                createMutation.isPending ? (
                    <Loader />
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

                        <label className={settings.labelInput}>
                            Автор
                            <input
                                placeholder="Введите автора"
                                {...createForm.register("author", {
                                    required: "Обязательное поле"
                                })}
                            />
                            <p className={settings.error}>{createForm.formState.errors.author?.message}</p>
                        </label>

                        <label className={settings.labelInput}>
                            Картинка
                            <input
                                placeholder="Введите URL картинки"
                                {...createForm.register("image", {
                                    required: "Обязательное поле"
                                })}
                            />
                            <p className={settings.error}>{createForm.formState.errors.price?.message}</p>
                        </label>

                        <label className={settings.labelInput}>
                            Цена
                            <input
                                placeholder="Введите цену"
                                type="number"
                                {...createForm.register("price", {
                                    required: "Обязательное поле"
                                })}
                            />
                            <p className={settings.error}>{createForm.formState.errors.price?.message}</p>
                        </label>

                        <label className={settings.labelInput}>
                            Бонус (0-100)
                            <input
                                placeholder="Введите бонус"
                                type="number"
                                {...createForm.register("bonus", {
                                    required: "Обязательное поле"
                                })}
                            />
                            <p className={settings.error}>{createForm.formState.errors.bonus?.message}</p>
                        </label>

                        <label className={styles.checkbox}>
                            <input type="checkbox" {...createForm.register("status")} />
                            Статус
                        </label>
                        

                        <input className={settings.submit} type="submit" value="Создать" style={{marginTop: 20}} />
                    </form>
                )
            }

            <div className={styles.box}>
                {
                    query.data?.data?.products?.map(item => (
                        <ProductItem key={"products." + item.id} id={item.id} name={item.name} author={item.author} allCategories={queryCategories.data.data.categories} categories={item.categories} image={item.image} price={item.price} bonus={item.bonus} status={item.status} />
                    ))
                }
            </div>
        </>
    )
}

function ProductItem({id, name, author, allCategories, categories, image, price, bonus, status}) {
    const defaultEditCategories = categories?.map(item => item.id);
    const queryClient = useQueryClient();

    const [editable, setEditable] = useState(false);
    const [data, setData] = useState({
        name: name,
        author: author,
        image: image,
        price: price,
        bonus: bonus,
        status: status,
        categories: defaultEditCategories
    });
    const [error, setError] = useState(null);

    const deleteMutation = useMutation({
        mutationFn: () => {
            return Request.delete('/api/admin/product/' + id)
        },
        onSuccess: mutationSuccess
    });

    const updateMutation = useMutation({
        mutationFn: (data) => {
            return Request.post('/api/admin/product/' + id, data);
        },
        onSuccess: mutationSuccess
    });

    function mutationSuccess() {
        queryClient.invalidateQueries('adminProducts');
    }

    function changeSelect(event) {
        const selected = [];
        [...event.target.selectedOptions].map(item => {
            selected.push(Number(item.value));
        })
        setData({...data, categories: selected})
    }

    function submitUpdate() {
        if(data.name == '') {
            return setError('Ошибка в названии');
        }

        if(data.author == '') {
            return setError('Ошибка в авторе');
        }

        if(data.image == '') {
            return setError('Ошибка в картинке');
        }

        if(data.price == '') {
            return setError('Ошибка в цене');
        }
        
        setError(null);
        updateMutation.mutate(data);
    }

    return (
        <>
            {
                !editable ? (
                    <div className={styles.item}>
                        <div className={styles.id}>{id}</div>
                        <div className={styles.name}>{name}</div>
                        <div className={styles.author}>{author}</div>
                        <div className={styles.image}>{image}</div>
                        <div className={styles.price}>{price} рублей</div>
                        <div className={styles.price}>{bonus} бонус</div>
                        {
                            (categories.length > 0) && (
                                <div className={styles.category}>
                                    Категории
                                    {
                                        categories?.map(item => (
                                            <div key={"product." + id + ".category." + item.id} className={styles.categoryItem}>({item.id}) {item.name}</div>
                                        ))
                                    }
                                </div>
                            )
                        }
                        <div className={styles.status}>{status == "ACTIVE" ? "Включен" : "Отключен"}</div>
                        <div className={styles.buttons}>
                            <button className={[styles.button, styles.bEdit].join(' ')} onClick={() => setEditable((prev) => !prev)}>{editable ? "Закрыть" : "Изменить"}</button>
                            <button className={[styles.button, styles.bDelete].join(' ')} onClick={() => deleteMutation.mutate()}>Удалить</button>
                        </div>
                    </div>
                ) : (
                    <div className={styles.item}>
                        <div className={styles.id}>{id}...</div>
                        <div className={styles.name}>
                            <input defaultValue={name} type="text" className={styles.input} onChange={(event) => setData({...data, name: event.target.value})} />
                        </div>
                        <div className={styles.author}>
                            <input defaultValue={author} type="text" className={styles.input} onChange={(event) => setData({...data, author: event.target.value})} />
                        </div>
                        <div className={styles.image}>
                            <input defaultValue={image} type="text" className={styles.input} onChange={(event) => setData({...data, image: event.target.value})} />
                        </div>
                        <div className={styles.price}>
                            <input defaultValue={price} type="number" className={styles.input} onChange={(event) => setData({...data, price: event.target.value})} />
                        </div>
                        <div className={styles.price}>
                            <input defaultValue={bonus} type="number" className={styles.input} onChange={(event) => setData({...data, bonus: event.target.value})} />
                        </div>
                        <div className={styles.category}>
                            <select className={styles.select} name="choice" multiple onChange={changeSelect} defaultValue={defaultEditCategories}>
                                {
                                    allCategories?.map(item => {
                                        return (
                                            <option key={"product.categories." + item.id} value={item.id}>({item.id}) {item.name}</option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                        <div className={styles.status}>
                            <input defaultChecked={status == "ACTIVE"} type="checkbox" onChange={() => setData({...data, status: (data.status == "ACTIVE" ? "DISABLED" : "ACTIVE")})} />
                            {data.status == "ACTIVE" ? "Включен" : "Отключен"}
                        </div>
                        <div className={styles.buttons}>
                            <button className={[styles.button, styles.bDelete].join(' ')} onClick={() => setEditable((prev) => !prev)}>Закрыть</button>
                            <button className={[styles.button, styles.bSave].join(' ')} onClick={() => submitUpdate()}>Сохранить</button>
                        </div>
                    </div>
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