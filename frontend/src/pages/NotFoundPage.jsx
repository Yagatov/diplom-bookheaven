import styles from '#styles/404.module.scss';

import { Link } from 'react-router-dom';

export default () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>404</div>
            <div className={styles.subtitle}>Страница не найдена :c</div>
            <Link to="/" className={styles.action}>Вернуться на главную страницу</Link>
        </div>
    );
}