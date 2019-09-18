import React, { useContext, useEffect } from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom'
import LoginView from './view/LoginView'
import MainView from './view/MainView'
import { AppDataContext } from './AppData'
import './App.css';
import axios from 'axios'
import { Modal, Toast } from 'antd-mobile';

function App() {
  const { appState, appDispatch } = useContext(AppDataContext)
  useEffect(() => {
    document.addEventListener('plusready', function () {
      // eslint-disable-next-line no-undef
      var webview = plus.webview.currentWebview()
      // eslint-disable-next-line no-undef
      plus.key.addEventListener('backbutton', function () {
        webview.canBack(function (e) {
          if (e.canBack) {
            webview.back()
          } else {
            // eslint-disable-next-line no-undef
            plus.runtime.quit()
          }
        })
      })
    })

    let t1 = window.setInterval(() => {
      try {
        // eslint-disable-next-line no-undef
        var info = plus.push.getClientInfo()
        if (info.clientid && info.token) {
          window.clearInterval(t1)
          // eslint-disable-next-line no-undef
          appDispatch({ type: 'pushid', data: plus.push.getClientInfo().clientid })
          if (appState.user && appState.user.id >= 0) {
            axios.post('/insert_push', {
              user_id: appState.user.id,
              // eslint-disable-next-line no-undef
              user_name: appState.user.name, pushid: plus.push.getClientInfo().clientid
            })
          }
        }
      } catch (error) { }
    }, 1000)

    axios.get('http://hefeixiaomu.com:3009/version_update').then(response => {
      if (response && response.data && response.data.code === 0) {
        if (response.data.vn !== appState.version) {
          Modal.alert('更新', '发现新版本, 是否立即更新', [
            { text: '取消', onPress: () => { } },
            {
              text: '确定', onPress: () => {
                // eslint-disable-next-line no-undef
                plus.runtime.openURL('http://fir.im/zgjn', (error) => {
                  Toast.fail(error)
                })
              }
            }
          ])
        }
      }
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <HashRouter >
    <Route path="/" exact component={LoginView} />
    <Route path="/main" exact render={props => appState.user.id >= 0 ? <MainView {...props} /> : <Redirect to='/' />} />
  </HashRouter>
}

export default App;
