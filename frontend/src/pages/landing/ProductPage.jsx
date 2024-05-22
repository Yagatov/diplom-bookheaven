import markup from '#styles/global/markup.module.scss';
import styles from '#styles/pages/landing/product.module.scss';

import { useState } from 'react';

import { Link, useParams } from "react-router-dom"
import { useQuery, useMutation } from '@tanstack/react-query';

import { useAtomValue } from 'jotai';
import UserAtom from '#atoms/UserAtom.js';

import Request from "#/Request.js";
import Loader from '#/ui/Loader';

export default () => {
    const [ text, setText ] = useState("Добавить в корзину");

    const user = useAtomValue(UserAtom);
    const { id } = useParams();

    const query = useQuery({
        queryKey: ['pagesProduct'],
        queryFn: () => {
            return Request.get("/api/pages/product/" + id);
        }
    });

    const mutation = useMutation({
        mutationFn: () => {
            return Request.post('/api/account/cart/product/' + data?.id + '/add')
        },
        onSuccess: (data) => {
            if(data.data?.quantity) {
                setText("В корзине " + data.data?.quantity + " шт.")
            }
        }
    })

    if(query.isPending) return ( <Loader /> );
    
    if(query.isError) return ( <div className={styles.title}>Ошибка сервера</div> );

    const data = query.data?.data;
    

    function handleClick(event) {
        if(user == null) {
            setText("Авторизуйтесь")
            return;
        }

        mutation.mutate();
    }
    
    return (
        <div className={markup.container}>
            <div className={styles.product}>
                <img src={Request.getUri() + "/public/images/products/" + data?.image} />
                <div className={styles.main}>
                    <div className={styles.category}>
                        Состоит в категориях:    { data?.categories.map(item => item.status == "ACTIVE" ? <Link key={"landing.product.category." + item.id} to={"/category/" + item.id}>{ item.name }</Link> : null) }
                    </div>  
                    <div className={styles.name}>{ data?.name }</div>
                    <div className={styles.author}>Автор: { data?.author }</div>
                    <div className={styles.price}>{ data?.price } ₽ { data?.bonus != 0 ? ( <span className={styles.bonus}>+ { Math.floor(data?.price / 100 * data?.bonus) } Б</span> ) : "" }</div>
                    <div className={styles.description}>{ data?.description }</div>

                    <button className={styles.button} onClick={handleClick}>{ text }</button>
                </div>
            </div>
        </div>
    );
}