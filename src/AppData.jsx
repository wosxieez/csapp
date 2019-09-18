import React, { useReducer } from 'react'

const initialState = {
    version: '0.0.6',
    pushid: 'no-pushid', // 推送id
    user: { id: -1 }, // 登录的用户信息
    users: [], // 所有用户列表
    levels: [], // 所有部门列表
    majors: [], // 所有专业列表
    areas: [],  // 所有区域列表
    taskbadge: 0, // 未完成任务的徽标数
    tabindex: 0, // 首页的选中TabBar的索引
    tab2index: 0,
    device: {},  // 选中的设备
    bug: {},     // 选中的Bug
    bugcount: 0,
    level: {},   // 选中的部门
    bugimage: null,  // 预览的Bug图片
    taskindex: 0,   // 任务选项卡的索引,
    bugindex: 0,
    bug2index: 0,
    task: {},       // 选中的任务
    newtask: {} // 新建的任务数据
}
function reducer(state, action) {
    switch (action.type) {
        case 'pushid': return {...state, pushid: action.data}
        case 'login': return {
            ...state, user: action.data.user, users: action.data.users,
            levels: action.data.levels, marjors: action.data.majors, areas: action.data.areas,
            tabindex: 0
        }
        case 'tabindex': return { ...state, tabindex: action.data }
        case 'tab2index': return { ...state, tab2index: action.data }
        case 'device': return { ...state, device: action.data }
        case 'bug': return { ...state, bug: action.data }
        case 'level': return { ...state, level: action.data }
        case 'bugimage': return { ...state, bugimage: action.data }
        case 'taskindex': return { ...state, taskindex: action.data }
        case 'bugindex': return { ...state, bugindex: action.data }
        case 'bug2index': return { ...state, bug2index: action.data }
        case 'task': return { ...state, task: action.data }
        case 'newtask': return { ...state, newtask: action.data }
        case 'taskbadge': return { ...state, taskbadge: action.data }
        case 'bugcount': return { ...state, bugcount: action.data }
        default: return state
    }
}

export const AppDataContext = React.createContext(null)

export default function AppData({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)
    return <AppDataContext.Provider value={{ appState: state, appDispatch: dispatch }}>{children}</AppDataContext.Provider>
}