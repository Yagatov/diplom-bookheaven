import Request from '../../Request.js';

import { useMutation } from '@tanstack/react-query';

import { Link, useNavigate } from 'react-router-dom';

import { useAtom } from 'jotai';
import UserAtom from '../../atoms/UserAtom.js';

export function ProfilePage() {
    const [ user, setUser ] = useAtom(UserAtom);
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: () => {
            return Request.post('/api/auth/logout')
        }
    })

    function logoutHandler() {
        mutation.mutate();
        setUser(null);
        navigate('/auth');
    }

    return (
        <>
            <p>This is Profile Page {user}</p>
            <br/>
            <button style={{
                color: 'white',
                cursor: 'pointer'
            }} onClick={logoutHandler}>Выйти из аккаунта</button>
        </>
    )
}