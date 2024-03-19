import markup from '#styles/landing/markup.module.scss';

export function PaymentPage() {
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
Курьерская доставка по указанному адресу в удобное для вас время.<br/>
Почтовая доставка для удаленных регионов.<br/>
Самовывоз из пунктов выдачи для вашего удобства.
            </div>
        </div>
    )
}