import markup from '#styles/landing/markup.module.scss';
import cart from '#styles/ui/carts.module.scss';

import { CartItem } from '#ui/carts/CartItem';

import { useParams } from "react-router-dom"
import { useQuery } from '@tanstack/react-query';

import Request from "../../Request.js";

export function CategoryPage() {
    const { id } = useParams();

    const query = useQuery({
        queryKey: ['pagesCategory'],
        queryFn: () => {
            return Request.get("/api/pages/category/" + id);
        }
    });

    return (
        <div className={markup.container}>
            {
                query.isPending && (
                    <h3 className={cart.title}>Загрузка...</h3>
                )
            }
            {
                query.isError && (
                    <h3 className={cart.title}>Ошибка.</h3>
                )
            }
            {
                query.isSuccess && (
                    <>
                        <h3 className={cart.title}>{ query.data?.data?.name }</h3>

                        <div className={cart.cont}>
                            {query.data?.data?.products?.map(item => (
                                <CartItem key={"pages.category." + item.id} cart={item}/>
                            ))}
                        </div>
                    </>
                )
            }
        </div>
    )
}