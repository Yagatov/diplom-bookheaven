import markup from '#styles/landing/markup.module.scss';
import cart from '#styles/ui/carts.module.scss';

import { CartItem } from '#ui/carts/CartItem';

import { useParams } from "react-router-dom"
import { useMutation } from '@tanstack/react-query';

import Request from "../../Request.js";
import { useEffect } from 'react';

export function SearchPage() {
    const { message } = useParams();

    // const query = useQuery({
    //     queryKey: ['pagesSearch'],
    //     queryFn: () => {
    //         const data = {
    //             params: {
    //                 message
    //             }
    //         };
    //         return Request.get("/api/pages/search/", data);
    //     }
    // });

    const query = useMutation({
        mutationFn: (data) => {
            return Request.get("/api/pages/search/", data)
        }
    });

    useEffect(() => {
        query.mutate({
            params: {
                message
            }
        });
    }, [message]);


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
                        <h3 className={cart.title}>{ query.data?.data?.products?.length == 0 && "Нету"} </h3>

                        <div className={cart.cont}>
                            {query.data?.data?.products?.map(item => (
                                <CartItem key={"pages.search." + item.id} cart={item}/>
                            ))}
                        </div>
                    </>
                )
            }
        </div>
    )
}