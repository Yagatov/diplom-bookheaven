import styles from '#styles/landing/base.module.scss';

import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { useAtomValue } from 'jotai';
import UserAtom from '../atoms/UserAtom.js';

export function LandingLayout() {

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <Navigation />

                <Outlet />
            </div>

            <Footer />
        </div>
    )
}

function Navigation() {
    const user = useAtomValue(UserAtom);
    const [isMenu, setIsMenu] = useState(false);
    
    function toggleMenu() {
        setIsMenu(!isMenu);
    }
    
    return (
        <nav className={[styles.navigation, styles.container, isMenu ? styles.active : ""].join(' ')}>
            <div className={styles.logotype}>
                <img src="/images/logo-white.svg" width={40}/>
            </div>

            <div className={styles.box}>
                <div className={styles.links}>
                    <Link to="/" className={styles.item}>Главная</Link>
                    <Link to="/about" className={styles.item}>О нас</Link>
                    <Link to="" className={styles.item}>Оплата и доставка</Link>
                </div>
    
                <div className={styles.search}>
                    <input type="text" placeholder="Ищи в любое время"></input>
                    <img src="/images/icons/search.svg" />
                </div>
    
                <div className={styles.buttons}>
                    <NavigationButton name="Аккаунт" icon="user" to={user ? "/account/profile" : "/auth" }/>
                    <NavigationButton name="Избранное" icon="favorite" to={user ? "/account/favorite" : "/auth" }/>
                    <NavigationButton name="Корзина" icon="shopping-cart" to={user ? "/account/basket" : "/auth" }/>
                </div>
            </div>

            <div className={styles.burger} onClick={toggleMenu}>
                <img src="/images/icons/burger.webp" width={60}/>
            </div>
        </nav>
    )
}

function NavigationButton({name, icon, to}) {
    return (
        <Link to={to} className={styles.item}>
            <div>
                <img src={"/images/icons/" + icon + ".svg"}/>
            </div>
            <p>
                {name}
            </p>
        </Link>
    )
}

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.box}>
                <div className={styles.container}>
                    <div className={styles.logotype}>
                        <img src="/images/logo-black.svg" width={75} />
                        <h3>Книжный<br/>рай</h3>
                    </div>
                    <div className={styles.columns}>
                        <FooterColumn title="Помощь">
                            <Link to="">Вопросы и ответы</Link>
                            <Link to="">Оплата и доставка</Link>
                            <Link to="">Программа лояльности</Link>
                            <Link to="">Гарантия, обмен и возврат</Link>
                        </FooterColumn>
                        <FooterColumn title="Компания">
                            <Link to="">О компании</Link>
                            <Link to="">Карьера</Link>
                            <Link to="">Политика конфиденциальности</Link>
                            <Link to="">Публичная оферта</Link>
                        </FooterColumn>
                        <FooterColumn title="Сотрудничество">
                            <Link to="">Telegram</Link>
                            <Link to="">Вконтакте</Link>
                            <Link to="">Одноклассники</Link>
                            <Link to="">Скайп</Link>
                        </FooterColumn>
                    </div>
                    <div className={styles.copyright}>
                        <p>Книжный рай</p>
                        <p>Все права защищены. Перепечатка и цитирование материалов запрещены.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

function FooterColumn({children, title}) {
    return (
        <div className={styles.column}>
            <h6 className={styles.title}>{title}</h6>
            <div className={styles.list}>
                {children}
            </div>
        </div>
    )
}