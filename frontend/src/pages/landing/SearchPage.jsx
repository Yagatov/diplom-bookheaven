import markup from '#styles/global/markup.module.scss';
import cart from '#styles/ui/carts.module.scss';

import { useEffect } from 'react';
import { useParams } from "react-router-dom"
import { useMutation } from '@tanstack/react-query';

import Request from "#/Request.js";
import { CartItem } from '#ui/carts/CartItem';
import Loader from '#/ui/Loader';

export default () => {
    const { message } = useParams();

    const query = useMutation({
        mutationFn: (data) => {
            return Request.get("/api/pages/search/", data)
        }
    });

    useEffect(() => {
        query.mutate({
            params: { message }
        });
    }, [ message ]);

    if(query.isPending) return ( <Loader /> )
    if(query.isError) return ( <h3 className={cart.title}>Ошибка.</h3> )

    return (
        <div className={markup.container}>
            <h3 className={cart.title}>{ query.data?.data?.products?.length == 0 && "Нету"} </h3>

            <div className={cart.cont}>
                {query.data?.data?.products?.map(item => (
                    <CartItem key={"pages.search." + item.id} cart={item}/>
                ))}
            </div>
        </div>
    )
}