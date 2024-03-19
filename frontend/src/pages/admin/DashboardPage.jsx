import pages from '#styles/account/pages.module.scss';
import styles from '#styles/account/pages/profile.module.scss';

export function DashboardPage() {

    return (
        <div className={pages.content}>
            <h2 className={pages.title}>Главная страница</h2>

            <div className={pages.box}>
                <div className={styles.stats}>
                    <StatItem name="Заказы" value={2}/>
                    <StatItem name="Пользователей" value={3}/>
                    <StatItem name="Товаров" value={15}/>
                    <StatItem name="Категорий" value={7}/>
                </div>
            </div>
        </div>
    )
}

function StatItem({name, value}) {
    return (
        <div className={styles.item}>
            <div className={styles.name}>{name}</div>
            <div className={styles.value}>{value}</div>
        </div>
    );
}