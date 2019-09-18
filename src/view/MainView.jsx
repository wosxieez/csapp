import React, { useContext, useEffect } from 'react'
import { TabBar } from 'antd-mobile'
import HomeView from './home/HomeView'
import homeicon1 from '../assets/homepage1.svg'
import homeicon2 from '../assets/homepage2.svg'
import taskicon1 from '../assets/createtask1.svg'
import taskicon2 from '../assets/createtask2.svg'
import addressicon1 from '../assets/addressbook1.svg'
import addressicon2 from '../assets/addressbook2.svg'
import mineicon1 from '../assets/mine1.svg'
import mineicon2 from '../assets/mine2.svg'
import { AppDataContext } from '../AppData'
import axios from 'axios';

function ContactLevelView(props) {
    return <div>通讯录</div>
}
function MeView(props) {
    return <div>我的视图</div>
}
function TaskListView(props) {
    return <div>任务列表</div>
}

export default function MainView(props) {
    const { appState, appDispatch } = useContext(AppDataContext)

    useEffect(() => {
        async function loadMyBugCount() {
            const response = await axios.post('http://hefeixiaomu.com:3009/find_bug',
                {
                    remark: { $like: `%"to":${appState.user.id}%` },
                    effective: 1,
                    $or: [{ status: 0 }, { status: 1 }, { status: 2 }, { status: 3 }]
                })
            if (response && response.data.code === 0 && response.data.data) {
                appDispatch({ type: 'bugcount', data: response.data.data.length })
            }
        }
        loadMyBugCount()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <div style={{ height: '100%', width: '100%', top: 0 }}>
        <TabBar>
            <TabBar.Item title="首页" key="message" badge={appState.bugcount} icon={<img alt="" width="22" height="22" src={homeicon1} />}
                selectedIcon={<img alt="" width="22" height="22" src={homeicon2} />}
                selected={appState.tabindex === 0} onPress={() => { appDispatch({ type: 'tabindex', data: 0 }) }}
                children={<HomeView {...props} />} />
            <TabBar.Item title="任务" badge={appState.taskbadge} key="bug" icon={<img alt="" width="22" height="22" src={taskicon1} />}
                selectedIcon={<img alt="" width="22" height="22" src={taskicon2} />}
                selected={appState.tabindex === 1} onPress={() => { appDispatch({ type: 'tabindex', data: 1 }) }}
                children={<TaskListView {...props} />} />
            <TabBar.Item title="通讯录" key="task" icon={<img alt="" width="22" height="22" src={addressicon1} />}
                selectedIcon={<img alt="" width="22" height="22" src={addressicon2} />}
                selected={appState.tabindex === 2} onPress={() => { appDispatch({ type: 'tabindex', data: 2 }) }}
                children={<ContactLevelView {...props} />} />
            <TabBar.Item title="我的" key="my" icon={<img alt="" width="22" height="22" src={mineicon1} />}
                selectedIcon={<img alt="" width="22" height="22" src={mineicon2} />}
                selected={appState.tabindex === 3} onPress={() => { appDispatch({ type: 'tabindex', data: 3 }) }}
                children={<MeView {...props} />} />
        </TabBar>
    </div>
}