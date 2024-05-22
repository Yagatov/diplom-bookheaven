import markup from '#styles/global/markup.module.scss';
import styles from '#styles/pages/landing/home.module.scss';

import Loader from '#/ui/Loader';
import Slider from '#/ui/Slider';
import SetList from '#/ui/shop/SetList';

import Request from '#/Request.js';

import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

export default () => {
    const { isPending, isError, data } = useQuery({
        queryKey: ['pagesHome'],
        queryFn: () => {
            return Request.get("/api/pages/home");
        }
    });

    if(isPending) return ( <Loader /> );

    if(isError) return (
        <div className={markup.container}>
            <h2>Ошибка сервера</h2>
        </div>
    )

    return (
        <div className={markup.container}>
            <div className={styles.category}>
                {
                    data.data.categories.navigation?.map(item => (
                        <Link key={"landing.home.navigation." + item.id} className={ styles.item } to={ "/category/" + item.id }>{ item.name }</Link>
                    ))
                }
            </div>

            <Slider />

            {
                data.data.sets?.map(item => (
                    <SetList key={"landing.home.set" + item.id} item={ item }/>
                ))
            }
        </div>
    )
}
