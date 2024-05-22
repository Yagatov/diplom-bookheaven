import markup from '#styles/global/markup.module.scss';
import carts from '#styles/ui/carts.module.scss';
import styles from '#styles/pages/landing/category.module.scss';

import { useParams } from "react-router-dom"
import { useQuery } from '@tanstack/react-query';

import Request from "#/Request.js";

import { CartItem } from '#ui/carts/CartItem';
import { useState } from 'react';

import Loader from '#/ui/Loader';
import ProductItem from '#/ui/shop/ProductItem';

export default () => {
    const { id } = useParams();

    const [ filter, setFilter ] = useState("date_up");

    const query = useQuery({
        queryKey: ['pagesCategory'],
        queryFn: () => {
            return Request.get("/api/pages/category/" + id);
        }
    });

    if(query.isPending) return ( <Loader /> );
    if(query.isError) return ( <h3 className={carts.title}>Ошибка сервера</h3> );

    const products = query.data?.data?.products;

    if(filter == "date_up") {
        products?.sort((a, b) => a.id - b.id);
    }

    if(filter == "date_down") {
        products?.sort((a, b) => b.id - a.id);
    }

    if(filter == "price_up") {
        products?.sort((a, b) => a.price - b.price);
    }

    if(filter == "price_down") {
        products?.sort((a, b) => b.price - a.price);
    }

    return (
        <div className={markup.container}>
            <div className={styles.header}>
                <h3 className={carts.title}>{ query.data?.data?.name }</h3>

                <div className={styles.select}>
                    <div className={styles.radio} onClick={() => setFilter("price_up")}>
                        <input className={styles.cRadio} id="filter_priceUp" name='filter' type='radio' value='price_up' defaultChecked={filter == "price_up"}/>
                        <label for="filter_priceUp">Подешевле</label>
                    </div>
                    <div className={styles.radio} onClick={() => setFilter("price_down")}>
                        <input className={styles.cRadio} id="filter_priceDown" name='filter' type='radio' value='price_down' defaultChecked={filter == "price_down"}/>
                        <label for="filter_priceDown">Подороже</label>
                    </div>
                    <div className={styles.radio} onClick={() => setFilter("date_up")}>
                        <input className={styles.cRadio} id="filter_dateUp" name='filter' type='radio' value='date_up' defaultChecked={filter == "date_up"}/>
                        <label for="filter_dateUp">Поновее</label>
                    </div>
                    <div className={styles.radio}  onClick={() => setFilter("date_down")}>
                        <input className={styles.cRadio} id="filter_dateDown" name='filter' type='radio' value='date_down' defaultChecked={filter == "date_down"}/>
                        <label for="filter_dateDown">Постарее</label>
                    </div>
                </div>
            </div>

            <div className={ carts.cont }>
                {
                    products.map(item => (
                        <ProductItem key={"pages.category." + item.id} product={item}/>
                    ))
                }
            </div>
        </div>
    )
}