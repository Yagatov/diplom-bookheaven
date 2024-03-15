import carts from '#styles/ui/carts.module.scss';
import { Link } from 'react-router-dom';

export function CartItem({cart}) {
    return (
        <div className={carts.cart}>
            <div className={carts.image}>
                <img src={cart.image}/>
            </div>
            <div className={carts.info}>
                <div className={carts.price}>{cart.price} ₽</div>
                <div className={carts.name}>{cart.name}</div>
                <div className={carts.author}>{cart.author}</div>
            </div>
            <div className={carts.action}>
                <Link className={carts.to} to={cart.to}>
                    Подробнее
                </Link>
            </div>
        </div>
    )
}