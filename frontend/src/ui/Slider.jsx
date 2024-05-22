import 'swiper/css';
import 'swiper/css/scrollbar';
import styles from '#styles/ui/slider.module.scss'

import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default () => {
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
            <SlideItem color="rgba(255, 0, 0, 0.02)" image="slider1.png">
              Получай скидку 1000<br/>рублей на первую покупку<br/>от 4000 рублей.
            </SlideItem>
          </SwiperSlide>
          <SwiperSlide>
            <SlideItem color="rgba(219, 0, 255, 0.02)" image="slider2.png">
              Чтение с подпиской<br/>“Книжный Рай Плюс”<br/>становится веселее.
            </SlideItem>
          </SwiperSlide>
          <SwiperSlide>
            <SlideItem color="rgba(255, 123, 0, 0.02)" image="slider3.png">
              Соберите свою подборку<br/>книг и делитесь с своими<br/>друзьям!
            </SlideItem>
          </SwiperSlide>
        </Swiper>
      );
}

function SlideItem({ children, color, image }) {
  return (
    <div className={styles.swiper} style={{
        backgroundColor: color
    }}>
        <img src={ "/images/slider/" + image }/>
        <p className={styles.text}>{ children }</p>
    </div>
  )
}