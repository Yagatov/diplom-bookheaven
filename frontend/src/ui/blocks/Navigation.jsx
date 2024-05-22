import styles from '#styles/ui/navigation.module.scss';
import markup from '#styles/global/markup.module.scss';

import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

export function Navigation({ buttons: NavigationButtons }) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const [ isMenu, setIsMenu ] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        setIsMenu(false);
    }, [ pathname ]);

    function handleSearch(event) {
        if(event.key !== 'Enter') return;

        event.preventDefault();

        const message = event.target.value;

        if(message == "") return;

        navigate('/search/' + message);
        queryClient.invalidateQueries('pagesSearch');
    }
    
    return (
        <nav className={[ styles.navigation, markup.container, isMenu ? styles.active : "" ].join(' ')}>
            <div className={styles.logotype}>
                <img src="/images/logo-white.svg" width={40}/>
            </div>

            <div className={styles.box}>
                <div className={styles.links}>
                    <Link to="/" className={styles.item}>Главная</Link>
                    <Link to="/about" className={styles.item}>О нас</Link>
                    <Link to="/payment" className={styles.item}>Оплата и доставка</Link>
                </div>
    
                <div className={styles.search}>
                    <input type="text" placeholder="Ищи в любое время" onKeyDown={handleSearch}/>
                    <img src="/images/icons/search.svg" />
                </div>
    
                <div className={styles.buttons}>
                    {
                        NavigationButtons
                    }
                </div>
            </div>

            <div className={styles.burger} onClick={() => setIsMenu(!isMenu)}>
                <img src="/images/icons/burger.webp" width={60}/>
            </div>
        </nav>
    )
}

export function NavigationButton({onClick = null, name, icon, to}) {
    return (
        <Link onClick={onClick} to={to} className={styles.item}>
            <div>
                <img src={"/images/icons/" + icon + ".svg"}/>
            </div>
            <p>
                {name}
            </p>
        </Link>
    )
}