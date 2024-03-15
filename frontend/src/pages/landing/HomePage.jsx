import markup from '#styles/landing/markup.module.scss';
import styles from '#styles/landing/pages/home.module.scss';
import carts from '#styles/ui/carts.module.scss';

import { Link } from 'react-router-dom';
import { Slider } from '#ui/landing/Slider';
import { CartItem } from '#ui/carts/CartItem';


export function HomePage() {
    const cartsStore = [
        {
            id: 1,
            image: "/images/products/product1.jpg",
            price: 1000,
            name: "Улица ручей. Отступление.",
            author: "Линде Юлия Владимировна",
            to: null
        },
        {
            id: 2,
            image: "/images/products/product2.jpg",
            price: 1001,
            name: "Город с видом на море",
            author: "Евдокимова Наталья Николаевна",
            to: null
        },
        {
            id: 3,
            image: "/images/products/product3.jpg",
            price: 1002,
            name: "Они тоже люди",
            author: "Отева Ксения Николаевна",
            to: null
        }
    ]

    return (
        <div className={markup.container}>
            <div className={styles.category}>
                <Link className={styles.item}>Обучение</Link>
                <Link className={styles.item}>Для детей</Link>
                <Link className={styles.item}>Нон-Фикшн</Link>
                <Link className={styles.item}>Канцтовары и подарки</Link>
                <Link className={styles.item}>Распродажа</Link>
            </div>

            <Slider />

            <CartList title="Книги дня" cartList={cartsStore}/>
            <CartList title="Осенние премьеры" cartList={cartsStore}/>
            <CartList title="Книги: новинки 2024" cartList={cartsStore}/>
        </div>
    )
}

function CartList({title, cartList}) {
    return (
        <div className={carts.set}>
            <h4 className={carts.title}>{title}</h4>
            <div className={carts.list}>
                {cartList.map(item => (
                    <CartItem key={item.id} cart={item}/>
                ))}
            </div>
        </div>
    )
}