import markup from '#styles/global/markup.module.scss';
import styles from '#styles/pages/landing/about.module.scss';

import { useState } from 'react';

export default () => {
    return (
        <div className={markup.container}>
            <div className={styles.header}>
                <div className={styles.content}>
                    <h2 className={styles.title}>Книжный рай</h2>
                    <h4 className={styles.subtitle}>Здесь продают книги по ценам, которым даже не мечтали</h4>
                    <a className={styles.button} href="/auth/login">Создать аккаунт</a>
                </div>
                <div className={styles.image}>
                    <img src="/images/about/2.png" />
                </div>
            </div>
            <div className={styles.stats}>
                <div className={styles.item}>
                    <div className={styles.title}>100+</div>
                    <div className={styles.subtitle}>Пользователей</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.title}>200+</div>
                    <div className={styles.subtitle}>Заказов</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.title}>100+</div>
                    <div className={styles.subtitle}>Товаров</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.title}>10+</div>
                    <div className={styles.subtitle}>лет опыта</div>
                </div>
            </div>
            <div className={styles.team}>
                <h3 className={styles.title}>Наша команда</h3>
                <p className={styles.subtitle}>Представляем нашу команду мудрецов</p>

                <div className={styles.box}>
                    <div className={styles.item}>
                        <div className={styles.img}>
                            <img src="/images/about/team/1.jpg" />
                        </div>
                        <div className={styles.info}>
                            <div className={styles.name}>Иван</div>
                            <div className={styles.description}>Разработчик, дизайнер, филантроп...</div>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.img}>
                            <img src="/images/about/team/2.jpg" />
                        </div>
                        <div className={styles.info}>
                            <div className={styles.name}>Иван</div>
                            <div className={styles.description}>Работяга</div>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.img}>
                            <img src="/images/about/team/3.jpg" />
                        </div>
                        <div className={styles.info}>
                            <div className={styles.name}>Иван</div>
                            <div className={styles.description}>Нечего сказать</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.faq}>
                <h3 className={styles.title}>Часто задаваемые вопросы</h3>

                <div className={styles.box}>
                    <FaqItem question="Как я могу найти книгу, которую ищу?" answer="Используйте строку поиска на главной странице, введя название книги, автора или ключевое слово. Можно также воспользоваться каталогом по жанрам для более узконаправленного поиска." />
                    <FaqItem question="Какие у вас есть категории книг?" answer="У нас широкий выбор категорий, включая художественную литературу, детективы, научную фантастику, биографии, саморазвитие, и многие другие. Посмотреть все категории вы можете в соответствующем разделе на сайте." />
                    <FaqItem question="Нужно ли мне регистрироваться на сайте, чтобы совершить покупку?" answer="Да, для покупки книги на нашем сайте необходимо создать аккаунт. Это позволит вам управлять вашими покупками, списками желаемых книг и следить за акциями." />
                    <FaqItem question="Какие методы оплаты вы принимаете?" answer="Вы можете оплатить свои покупки с помощью кредитных и дебетовых карт, или через электронные платежные системы." />
                    <FaqItem question="Как я могу отменить покупку или запросить возврат?" answer="Так как мы предоставляем товары в электронном виде, возврат средств возможен только в случае если не был совершен доступ к книге. Для отмены покупки, пожалуйста, свяжитесь с нашей службой поддержки." />
                    <FaqItem question="В каких форматах доступны ваши электронные книги?" answer="Наши электронные книги доступны в форматах PDF, ePub и MOBI для удобства чтения на различных устройствах." />
                    <FaqItem question="Могу ли я читать купленную электронную книгу на нескольких устройствах?" answer="Да, после покупки книга будет связана с вашим аккаунтом, и вы сможете читать её на любом устройстве через ваш аккаунт." />
                </div>
            </div>
        </div>
    )
}

function FaqItem({question, answer}) {
    const [ active, setActive ] = useState(false);

    return (
        <div className={styles.item}>
            <div className={styles.question} onClick={() => setActive((prev) => !prev)}>{ question }</div>
            <div className={[styles.answer, active ? styles.active : ""].join(' ')}>{ answer }</div>
        </div>
    )
}