import markup from '#styles/global/markup.module.scss';

export default () => {
    return (
        <div className={markup.container} style={{
            maxWidth: 700
        }}>
            <p style={{
                fontSize: 18,
                textAlign: "center",
                marginBottom: 20
            }}>Оплата и доставка</p>

            <div style={{
                textAlign: "center",
                fontSize: 14,
                fontWeight: 400,
                lineHeight: "160%",
            }}>
                Оплата<br/><br/>
                При оформлении заказа на нашем сайте "Книжный рай" вы можете воспользоваться удобными способами оплаты:<br/>
                Оплата банковской картой онлайн.<br/>
                Оплата наличными при получении заказа курьеру.<br/>
                Электронные платежные системы для максимального комфорта.<br/><br/><br/>
                Доставка<br/><br/>
                Мы ценим ваше время и стремимся обеспечить быструю и надежную доставку:<br/>
                Доставка происходит онлайн.<br/>
                После оплаты, вам будет доступно скачивания книги.<br/>
                Скачать можно на любых устройствах.<br/>
            </div>
        </div>
    )
}