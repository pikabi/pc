/**
 * @fileoverview file for information about log data
 * @file src/data/LogData.tsx
 */

import React from 'react';

export type LogDataProps = {
    isLogged: boolean;
    id: number;
    time: string;
    message: string;
    logName: string;
    error: boolean;
    errorMessage: string;
  };

class LogData extends React.Component<{}, LogDataProps> {
    constructor(props: LogDataProps) {
        super(props);
        const savedLogData = localStorage.getItem('logData');
        const currentTime = new Date().toLocaleTimeString();
        if (savedLogData) {
            this.state = JSON.parse(savedLogData);
        } else {
            this.state = {
                isLogged: false,
                id: 0,
                time: currentTime,
                message: '',
                logName:'',
                error: false,
                errorMessage: '',
            };
        };
        
    }

    componentDidMount() {
      // 可用于加载时初始化操作
      console.log('LogData component mounted.');
    }

    componentDidUpdate(prevState: LogDataProps) {
      if (prevState !== this.state) {
          localStorage.setItem('logData', JSON.stringify(this.state));
      }
    }    

    handleLogin = () => {
        this.setState({ isLogged: true});
        alert('登录成功');
    };

    handleLogout = () => {
      this.setState({ isLogged: false});
      alert('退出成功');
  };

    render() {
      const { isLogged } = this.state;
      return <div>
        <div>
          {isLogged ? (
            <button onClick={this.handleLogout} style={{ marginLeft: '20px' }}>
              欢迎回来
            </button>
          ) : (
            <div>
              <button onClick={this.handleLogin} style={{ marginLeft: '20px' }}>
                登录
              </button>
            </div>
          )}
        </div>
        <div>
          <h2>日志信息</h2>
          <div>
            <div>是否登录: {isLogged ? '是' : '否'}</div>
            <div>日志ID: {this.state.id}</div>
            <div>时间: {this.state.time}</div>
            <div>消息: {this.state.message}</div>
            <div>日志名称: {this.state.logName}</div>
            <div>是否错误: {this.state.error ? '是' : '否'}</div>
            <div>错误消息: {this.state.errorMessage}</div>
          </div>
        </div>
      </div>;
    }

}

export default LogData;