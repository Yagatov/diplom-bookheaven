import styles from '#styles/auth/base.module.scss';

import { Link, Outlet, useNavigate } from 'react-router-dom';

import { useAtomValue } from 'jotai';
import UserAtom from '../atoms/UserAtom.js';
import { useEffect } from 'react';

export function AuthLayout() {
    const user = useAtomValue(UserAtom);

    const navigate = useNavigate();

    useEffect(() => {
        if(user != null) {
            navigate('/account');
        }
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <Link to="/" className={styles.logotype}>
                    <img src="/images/logo-white.svg" width={50} />
                </Link>
                <div className={styles.box}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}