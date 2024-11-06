/**
 * @fileoverview file for information about log data
 * @file src/data/LogButton.tsx
 */

import React, { useContext } from 'react';
import NavBarCss from './css/navbar.module.css';
import { Link } from 'react-router-dom';
import {useLoginContext} from '../AppContext.tsx';


export default function LogButton(){
  const {isLogged, setIsLogged, 
    id, setId, 
    loginTime, setLoginTime, 
    userName, setUserName,
    userEmail, setUserEmail
   } = useLoginContext();
  return <div className={NavBarCss.rightSectionItems}>
    <div>
      {isLogged ? (
        <div className={NavBarCss.welcome}>
          欢迎回来
        </div>
      ) : (
        <div className={NavBarCss.notLogged}>
          <div className={NavBarCss.login}>
          <Link to="/login"> 登录 </Link>
          </div>
          <div className={NavBarCss.register}>
            <Link to="/register"> 注册 </Link>
          </div>
        </div>
      )}
    </div>
    <div>
      {isLogged ? (
        <img src="https://img.icons8.com/ios/50/000000/user" className={NavBarCss.userIcon} alt="User Icon" />
      ) : (
        <img src="https://img.icons8.com/ios/50/000000/user" className={NavBarCss.userIcon} alt="User Icon" />
      )}
    </div>
  </div>;
};

// class LogButton extends React.Component<{}, LogDataProps> {
//     constructor(props: LogDataProps) {
//         super(props);
//         const savedLogData = localStorage.getItem('logData');
//         const currentTime = new Date().toLocaleTimeString();
//         if (savedLogData) {
//             this.state = JSON.parse(savedLogData);
//         } else {
//             this.state = {
//                 isLogged: false,
//                 id: 0,
//                 time: currentTime,
//                 message: 'User not logged in',
//                 userName:'',
//                 error: false,
//                 errorMessage: '',
//             };
//         };
        
//     }

//     componentDidMount() {
//       // 可用于加载时初始化操作
//       console.log('LogData component mounted.');
//     }

//     componentDidUpdate(prevState: LogDataProps) {
//       if (prevState !== this.state) {
//           localStorage.setItem('logData', JSON.stringify(this.state));
//       }
//     }    

//     handleLogin = () => {
//         this.setState({ isLogged: true});
//         alert('登录成功');
//     };

//     handleRegister = () => {
//       this.setState({ isLogged: true});
//       alert('登录成功');
//     };

//     handleLogout = () => {
//       this.setState({ isLogged: false});
//       alert('退出成功');
//     };

//     render() {
//       const { isLogged } = this.state;
//       return <div className={NavBarCss.rightSectionItems}>
//         <div>
//           {isLogged ? (
//             <div onClick={this.handleLogout} className={NavBarCss.welcome}>
//               欢迎回来
//             </div>
//           ) : (
//             <div className={NavBarCss.notLogged}>
//               <div onClick={this.handleLogin} className={NavBarCss.login}>
//               <Link to="/login"> 登录 </Link>
//               </div>
//               <div onClick={this.handleRegister} className={NavBarCss.register}>
//                 <Link to="/register"> 注册 </Link>
//               </div>
//             </div>
//           )}
//         </div>
//         <div>
//           {isLogged ? (
//             <img src="https://img.icons8.com/ios/50/000000/user" className={NavBarCss.userIcon} alt="User Icon" />
//           ) : (
//             <img src="https://img.icons8.com/ios/50/000000/user" className={NavBarCss.userIcon} alt="User Icon" />
//           )}
//         </div>
//       </div>;
//     }

// }