import styles from '#styles/pages/account/profile.module.scss';

import Loader from '#/ui/Loader';
import Request from '#/Request.js';

import { useQuery } from '@tanstack/react-query';

export function DashboardPage() {

    const query = useQuery({
        queryKey: ['adminDashboard'],
        queryFn: () => {
            return Request.get("/api/admin/dashboard");
        }
    });

    if(query.isPending) return ( <Loader /> );
    if(query.isError) return ( <h3>Ошибка сервера</h3> );

    const data = query.data.data;

    return (
        <>
            <div className={styles.stats}>
                {/* <StatItem name="Категорий" value={7}/> */}
                {
                    data?.map(item => (
                        <StatItem key={"admin.dashboard." + item.name} name={item.name} value={item.count}/>
                    ))
                }
            </div>
        </>
    )
}

function StatItem({name, value}) {
    return (
        <div className={styles.item}>
            <div className={styles.name}>{ name }</div>
            <div className={styles.value}>{ value }</div>
        </div>
    );
}