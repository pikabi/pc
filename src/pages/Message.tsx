/**
 * @fileoverview Message page
 * @file src/pages/Home.tsx
 */

import React, {useEffect, useState} from 'react';
import MessageCss from './css/message.module.css';
import { useSearchParams, useNavigate, Link }  from 'react-router-dom';
import { Bell } from 'lucide-react';
import { useLoginContext } from '../AppContext.tsx'

// let MessagesProduct = [
//   { id: 1, title: "商品降价提醒", time: "09-05 09:21", favourite: "连衣裙", link: "/product?id=1" },
//   { id: 2, title: "商品降价提醒", time: "09-05 09:21", favourite: "连衣裙", link: "/product?id=1" },
//   { id: 3, title: "商品降价提醒", time: "09-05 09:21", favourite: "连衣裙", link: "/product?id=1" },
//   { id: 4, title: "商品降价提醒", time: "09-05 09:21", favourite: "连衣裙", link: "/product?id=1" },
//   { id: 5, title: "商品降价提醒", time: "09-05 09:21", favourite: "连衣裙", link: "/product?id=1" },
//   { id: 6, title: "商品降价提醒", time: "09-05 09:21", favourite: "连衣裙", link: "/product?id=1" },
// ]

// const MessagesSystem = [
//   { id: 1, title: "注册通知", time: "09-05 09:21", content: "欢迎注册 Erute Shopping ！" },
//   { id: 2, title: "注册通知", time: "09-05 09:21", content: "欢迎注册 Erute Shopping ！" },
// ]

const Message: React.FC = () => {
  const {id} = useLoginContext();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const page = searchParams.get('page');
  const navigate = useNavigate();
  const [MessagesProduct, setMessagesProduct] = useState([]);
  const [MessagesSystem, setMessagesSystem] = useState([]);

  useEffect(() => {

    // 如果 type 既不是 "type" 也不是 "system"，则重定向到 /message?type=product&page=1
    if (type !== 'product' && type !== 'system') {
      navigate('/message?type=product&page=1');
    }
    // 如果 page 不是数字，则重定向到 /message?type=product&page=1
    if (isNaN(Number(page))|| page===null) {
      navigate(`/message?type=${type}&page=1`);
    }

    if (type === 'product') {
      const fetchPriceDown = async () => {
        try {
          const response = await fetch(`http://localhost:5000/message/price?id=${id}&page=${page}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          if (response.ok){
            const data = await response.json();
            setMessagesProduct(data.map(item =>({
              id: item.id,
              title: '商品降价提醒',
              time: new Date(item.created_at).toLocaleString('zh-CN', { hour12: false }),
              favourite: item.product_name,
              link: item.product_url
            })));
            console.log(data);
            console.log(MessagesProduct);
          }
          else {
            console.error('请求失败');
          }
        } catch (error) {
          console.error('发生错误:', error);
        }
      };

      fetchPriceDown();
    }
    else if(type === 'system') {
      const fetchSystem = async () => {
        try {
          const response = await fetch(`http://localhost:5000/message/system?id=${id}&page=${page}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          if (response.ok){
            const data = await response.json();
            setMessagesSystem(data.map(item =>({
              id: item.id,
              title: item.title,
              time: new Date(item.created_at).toLocaleString('zh-CN', { hour12: false }),
              content: item.body
            })));
            console.log(data);
            console.log(MessagesSystem);
          }
          else {
            console.error('请求失败');
          }
        } catch (error) {
          console.error('发生错误:', error);
        }
      };

      fetchSystem();
    }

  }, [type, page]);

  const handleProduct = (page: number) => {
    // TODO: handle product message
  }

  const handleSystem = (page: number) => {
    // TODO: handle system message
  }

  return <div className={MessageCss.container}>
    <div className={MessageCss.sidebar}>
      <h2 className={MessageCss.sidebarHeader}>
        <Bell className={MessageCss.bellIcon}/>
        通知中心
      </h2>
      <ul className={MessageCss.menuList}>
        <li className={MessageCss.menuItem}> 
          <Link to="/message?type=product&page=1" onClick={()=>handleProduct(1)} className={MessageCss.menuLink}> 商品降价 </Link> 
        </li>
        <li className={MessageCss.menuItem}> 
          <Link to="/message?type=system&page=1" onClick={()=>handleSystem(1)} className={MessageCss.menuLink}> 系统通知 </Link>
        </li>
      </ul>
    </div>

    <div className={MessageCss.content}>
      <div className={MessageCss.messageHeader}>{type==="system"? "系统通知": (type === "product"?"商品降价": "未知通知")}</div>
      <div className={MessageCss.messageBody}>
        { type === "product" && MessagesProduct.map((message) => (
          <div className={MessageCss.messageCard}>
            <div className={MessageCss.cardRow}>
              <div className={MessageCss.title}>{message.title}</div>
              <time className={MessageCss.time}>{message.time}</time>
            </div>
            <div className={MessageCss.marked}>
              <p>您关注的商品 <a href="#">{message.favourite}</a> 降价了，快去看看吧！</p>
            </div>
          </div>
        ))}

        { type === "system" && MessagesSystem.map((message) => (
          <div className={MessageCss.messageCard}>
            <div className={MessageCss.cardRow}>
              <div className={MessageCss.title}>{message.title}</div>
              <time className={MessageCss.time}>{message.time}</time>
            </div>
            <div className={MessageCss.marked}>
              <p>{message.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
};

export default Message;
