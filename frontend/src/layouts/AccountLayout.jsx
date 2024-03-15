import styles from '#styles/account/base.module.scss';
import markup from '#styles/landing/markup.module.scss';

import { Link, Outlet, useNavigate } from 'react-router-dom';

import { useAtomValue } from 'jotai';
import UserAtom from '../atoms/UserAtom.js';
import { useEffect } from 'react';

export function AccountLayout() {
    const user = useAtomValue(UserAtom);
    
    const navigate = useNavigate();

    useEffect(() => {
        if(user == null) {
            navigate('/auth');
        }
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={markup.container}>
                This is account layout
                <br/>
                <br/>
                <br/>
                <br/>
                <Outlet />
                <br/>
                <br/>
                <br/>
                <br/>
                <Link to="/">Go to home page</Link>
            </div>
        </div>
    )
}