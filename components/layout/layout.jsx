import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import apis from '../../apis/apis'
import { useRecoilState } from 'recoil'
import { userState } from '../../atoms/profile/user'

const Layout = ({ children }) => {
    const [user, setUser] = useRecoilState(userState)


    const getUser = async () => {
        try {
            const result = apis.getUser();
            setUser(result.data.data);
        } catch (e) {
            console.error('User Not Present');
        }
    }




    useEffect(() => {
        getUser()
    }, [])
    return (
        <>{children}</>
    )
}

export default Layout