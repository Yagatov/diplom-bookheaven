import styles from '#styles/landing/base.module.scss';
import { Link } from 'react-router-dom';

export function Footer() {
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