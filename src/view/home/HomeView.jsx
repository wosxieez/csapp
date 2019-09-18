import React, { useContext } from 'react'
import { Grid, NavBar, WhiteSpace, Carousel, Toast, Badge } from 'antd-mobile'
import home1icon from '../../assets/home1.svg'
import home2icon from '../../assets/home2.svg'
import home3icon from '../../assets/home3.svg'
import home4icon from '../../assets/home4.svg'
import home5icon from '../../assets/home5.svg'
import home6icon from '../../assets/home6.svg'
import home7icon from '../../assets/home7.svg'
import home8icon from '../../assets/home8.svg'
import home9icon from '../../assets/home9.svg'
import homead1 from '../../assets/homead1.png'
import homead2 from '../../assets/homead2.png'

import { AppDataContext } from '../../AppData'

const list = [{ text: '巡检平台', icon: home1icon },
{ text: '缺陷管理', icon: home2icon },
{ text: '车辆信息', icon: home8icon },
{ text: '消费记录', icon: home9icon },
{ text: '仓库管理', icon: home3icon },
{ text: '我的考勤', icon: home4icon },
{ text: '视频监控', icon: home7icon },
{ text: '工作票', icon: home5icon },
{ text: '安全管理', icon: home6icon }
]

export default props => {
    const { appState } = useContext(AppDataContext)
    const data = list.map(item => ({ text: item.text, icon: item.icon }))
    return <div>
        <NavBar mode="light">首页</NavBar>
        <WhiteSpace />
        <Carousel>
            <img src={homead1} alt="" style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                    window.dispatchEvent(new Event('resize'));
                }} />
            <img src={homead2} alt="" style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                    window.dispatchEvent(new Event('resize'));
                }} />
        </Carousel>
        <WhiteSpace />
        <Grid square data={data} columnNum={3}
            renderItem={dataItem => (dataItem.text === '缺陷管理' ?
                (
                    <Badge text={appState.bugcount} style={{ marginLeft: 24 }}>
                        <div style={{ padding: '5px' }}>
                            <img src={dataItem.icon} style={{ width: '40px', height: '40px' }} alt="" />
                            <div style={{ color: '#888', fontSize: '14px', marginTop: '5px' }}>
                                <span>{dataItem.text}</span>
                            </div>
                        </div>
                    </Badge>
                ) :
                (<div style={{ padding: '5px' }}>
                    <img src={dataItem.icon} style={{ width: '40px', height: '40px' }} alt="" />
                    <div style={{ color: '#888', fontSize: '14px', marginTop: '5px' }}>
                        <span>{dataItem.text}</span>
                    </div>
                </div>)
            )}
            onClick={(el, index) => { Toast.info('模块已屏蔽', 1) }} />
    </div>
}