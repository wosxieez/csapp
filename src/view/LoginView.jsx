import React, { useState, useContext } from 'react'
import { InputItem, Button, List, Toast } from 'antd-mobile';
import axios from 'axios'
import { AppDataContext } from '../AppData'
import homead1 from '../assets/homead1.png'

export default function LoginView(props) {
    const [username, setUsername] = useState(localStorage.getItem('username'))
    const [password, setPassword] = useState(localStorage.getItem('password'))
    const appDataContext = useContext(AppDataContext)

    return <div style={{ background: '#FFF', width: '100%', height: '100%' }}>
        <img src={homead1} alt="" style={{ width: '100%', verticalAlign: 'top', marginTop: 50 }}
            onLoad={() => {
                window.dispatchEvent(new Event('resize'));
            }} />
        <List style={{ marginTop: 50 }}>
            <InputItem onChange={val => { setUsername(val) }} defaultValue={username}>用户名</InputItem>
            <InputItem type="password" onChange={val => { setPassword(val) }} defaultValue={password}>密码</InputItem>
        </List>
        <Button type='primary' size={'large'} style={{ margin: 16 }} onClick={async () => {
            Toast.loading('登录中', 0)
            const response1 = await axios.post('http://hefeixiaomu.com:3009/find_user', { username, password, effective: 1 }) // 用户登录
            if (response1 && response1.data.code === 0 && response1.data.data.length > 0) {
                const response2 = await axios.post('http://hefeixiaomu.com:3009/find_level', { effective: 1 })
                if (response2 && response2.data.code === 0 && response2.data.data) {
                    const response3 = await axios.post('http://hefeixiaomu.com:3009/find_user', { effective: 1 })
                    if (response3 && response3.data.code === 0 && response3.data.data) {
                        const response4 = await axios.post('http://hefeixiaomu.com:3009/find_major', { effective: 1 })
                        if (response4 && response4.data.code === 0 && response4.data.data) {
                            const response5 = await axios.post('http://hefeixiaomu.com:3009/find_area', { effective: 1 })
                            if (response5 && response5.data.code === 0 && response5.data.data) {
                                Toast.hide()
                                // 保存用户名密码 用于下次登录 // 保存全局数据
                                localStorage.setItem('username', username)
                                localStorage.setItem('password', password)
                                appDataContext.appDispatch({
                                    type: 'login', data: {
                                        user: response1.data.data[0],
                                        levels: response2.data.data,
                                        users: response3.data.data,
                                        majors: response4.data.data,
                                        areas: response5.data.data
                                    }
                                })
                                props.history.push('/main') // 跳转到首页
                            } else Toast.fail('登录失败')
                        } else Toast.fail('登录失败')
                    } else Toast.fail('登录失败')
                } else Toast.fail('登录失败')
            } else Toast.fail('登录失败')
        }}>登录</Button>
    </div>
}