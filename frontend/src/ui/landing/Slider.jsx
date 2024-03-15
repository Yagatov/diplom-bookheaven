import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import styles from '#styles/landing/ui/slider.module.scss'

export function Slider() {
    return (
        <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            loop={true}
            autoplay={{
                delay: 7500,
                disableOnInteraction: false,
            }}
            centeredSlides={true}
            scrollbar={{ draggable: true }}
            style={{
              marginBottom: 50
            }}
        >
          <SwiperSlide>
            <div className={styles.swiper} style={{
                backgroundColor: "rgba(255, 0, 0, 0.02)"
            }}>
                <img src="/images/slider/slider1.png"/>
                <p className={styles.text}>Получай скидку 1000<br/>рублей на первую покупку<br/>от 4000 рублей.</p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div  className={[styles.swiper, styles.reverse].join(" ")} style={{
                backgroundColor: "rgba(219, 0, 255, 0.02)"
            }}>
                <img src="/images/slider/slider2.png"/>
                <p className={styles.text}>Чтение с подпиской<br/>“Книжный Рай Плюс”<br/>становится веселее.</p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className={styles.swiper} style={{
                backgroundColor: "rgba(255, 123, 0, 0.02)"
            }}>
                <img src="/images/slider/slider3.png"/>
                <p className={styles.text}>Соберите свою подборку<br/>книг и делитесь с своими<br/>друзьям!</p>
            </div>
          </SwiperSlide>
        </Swiper>
      );
}