import markup from '#styles/landing/markup.module.scss';
import styles from '#styles/landing/pages/home.module.scss';
import carts from '#styles/ui/carts.module.scss';

import { Link } from 'react-router-dom';
import { Slider } from '#ui/landing/Slider';
import { CartItem } from '#ui/carts/CartItem';

import Request from '../../Request.js';

import { useQuery } from '@tanstack/react-query'

export function HomePage() {
    const { isPending, isSuccess, isError, data, error } = useQuery({
        queryKey: ['pagesHome'],
        queryFn: () => {
            return Request.get("/api/pages/home");
        }
    });

    const styleTitle = {
        fontSize: 20,
        textAlign: "center",
        margin: 40
    }

    return (
        <div className={markup.container}>
            {
                isPending && (<h2 style={styleTitle}>Загрузка...</h2>)
            }
            {
                isError && (<h2 style={styleTitle}>Ошибка сервера</h2>)
            }
            {
                isSuccess && (
                    <>
                    <div className={styles.category}>
                        {
                            data.data?.categories?.navigation?.map && data.data?.categories?.navigation?.map(item => {
                                // item: id, name
                                return (
                                    <Link key={item.id} className={styles.item} to={"/category/" + item.id}>{item.name}</Link>
                                )
                            })
                        }
                    </div>

                    <Slider />

                    {
                        data.data?.sets?.map && data.data?.sets?.map(item => {
                            // item: id, name, products
                            return (
                                <CartList key={item.id + "." + item.name} item={item}/>
                            )
                        })
                    }

                    
                    {/* <CartList title="Осенние премьеры" cartList={cartsStore}/>
                    <CartList title="Книги: новинки 2024" cartList={cartsStore}/> */}
                    </>
                )
            }
            
        </div>
    )
}

function CartList({item}) {
    return (
        <div className={carts.set}>
            <Link to={"/category/" + item.id} className={carts.title}>{item.name}</Link>
            <div className={carts.list} style={{marginTop: 20}}>
                {item.products.map(item => (
                    <CartItem key={item.id + "." + item.name} cart={item}/>
                ))}
            </div>
        </div>
    )
}