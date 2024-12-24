/**
 * @fileoverview userMain form component
 * @file src/pages/user/userMain.tsx
 */
import React, { useState, useEffect }  from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, LogOut, Phone, Globe, MapPin, Check, Edit, Clock} from 'lucide-react'
import { Button, Snackbar, Alert } from '@mui/material';
import { useLoginContext } from '../../AppContext.tsx'
import Profile from '../css/user.module.css';
import UserImg from '../../img/user-img.jpg';

export default function UserMain() {
  const {isLogged, setIsLogged,
    id, setId,
    loginTime, setLoginTime,
    userName, setUserName,
    userEmail, setUserEmail,
    userPhone, setUserPhone,
    userCountry, setUserCountry,
    userAddress, setUserAddress,
  } = useLoginContext();
  
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const navigate = useNavigate();

  const handleSignOut = () => {
    setIsLogged(false);
    setId(0);
    setLoginTime('');
    setUserName('');
    setUserEmail('');
    setUserPhone('');
    setUserCountry('');
    setUserAddress('');
    setOpenSnackbar(true);
    setSnackbarMessage('已退出登录');
    localStorage.removeItem('loginData');
  }

  const [editMode, setEditMode] = useState({
    'phone': false,
    'country': false,
    'address': false,
  })

  const [editValue, setEditValue] = useState({
    'phone': userPhone,
    'country': userCountry,
    'address': userAddress,
  })

  useEffect(() => {
    const modifyData = async () => {
      try {
        const response = await fetch('http://47.115.211.226:5000/user/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, userName, userEmail, userPhone, userCountry, userAddress})
        });
        if (!response.ok){
          console.error('请求失败');
        }
      } catch (error) {
        console.error('发生错误:', error);
      }
    };

    modifyData();
  }, [userPhone, userCountry, userAddress]); 

  const handleEdit = (type: keyof typeof editMode) => {
    setEditMode(prev => ({ ...prev, [type]: true }));
  }

  const handleSave = (type: keyof typeof editMode, value: string, func: (value:string) => void) => {
    setEditMode(prev => ({ ...prev, [type]: false }));
    func(editValue[type]);
  }

  const handleChange = (type: keyof typeof editMode, value: string) => {
    setEditValue(prev => ({ ...prev, [type]: value }));
  }

  const EditableField = ({ type, value, func, icon }: { type: keyof typeof editMode, value: string, func: (value:string) => void, icon: React.ReactNode }) => (
    <div className={Profile.profileInfoEditItem}>
      <div className={Profile.profileEditIconText}>
        <div className={Profile.profileIcon}>
          {icon}
        </div>
        {
          editMode[type] ? (
            <div>
              <input
                value={editValue[type]}
                onChange={(e) => handleChange(type, e.target.value)}
                className={Profile.profileInfoEditText}
                autoFocus
              />
            </div>
          ) : (
            <span
              onClick={() => handleEdit(type)} 
              className={Profile.profileInfoEditText}         
            >
              {value}
            </span>
          )
        }
      </div>
      <Button 
        onClick={() => editMode[type] ? handleSave(type, value, func): handleEdit(type)}
        className={Profile.profileEditButton}
      >
        {editMode[type] ? <Check /> : <Edit/>}
      </Button>
    </div>
  )
  if (!isLogged) {
    return (
      <div className={Profile.error}>
        <h1 className={Profile.error}>请先登录！</h1>
        <Button
          onClick={() => navigate('/login')}
          className={Profile.errorButton}
        >
          <div className={Profile.errorText}>
            登录
          </div>
        </Button>
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
          <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
      </Snackbar>
      </div>
    );
  }
  return (
    <div className={Profile.profileContainer}>
    <div className={Profile.profileCard}>
      <div className={Profile.profileHeader}>
        <div className={Profile.profileHeaderContent}>
          <div className={Profile.profileAvatarContainer}>
            <div className={Profile.profileAvatar}>
              <img src={UserImg} alt="User" />
            </div>
            <div className={Profile.profileNameContainer}>
              <h2 className={Profile.profileName}>{userName}</h2>
              <p className={Profile.profileUsername}>{userName}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={Profile.profileBody}>
        <div className={Profile.profileInfoItem}>
          <User className={Profile.profileIcon} />
          <span className={Profile.profileInfoText}>{userName}</span>
        </div>
        <div className={Profile.profileInfoItem}>
          <Mail className={Profile.profileIcon} />
          <span className={Profile.profileInfoText}>{userEmail}</span>
        </div>
        <EditableField type='phone' value={userPhone} func={setUserPhone} icon={<Phone className={Profile.profileInfoItem}/>} />
        <EditableField type='country' value={userCountry} func={setUserCountry} icon={<Globe className={Profile.profileInfoItem}/>} />
        <EditableField type='address' value={userAddress} func={setUserAddress}  icon={<MapPin className={Profile.profileInfoItem}/>} />
        <div className={Profile.profileInfoItem}>
          <Clock className={Profile.profileIcon} />
          <span className={Profile.profileInfoText}>登录时间：{loginTime}</span>
        </div>
      </div>
      <div className={Profile.profileFooter}>
        <Button 
          className={Profile.signOutButton}
          onClick={handleSignOut}
        >
        <LogOut className={Profile.signOutIcon} />
          退出登录
        </Button>
      </div>
    </div>
  </div>
  );
}