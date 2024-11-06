/**
 * @fileoverview Footer component
 * @file src/footer/Footer.tsx
 */
import React from 'react';
import FooterCSS from './css/footer.module.css';
import { Link } from 'react-router-dom';
import GithubIcon from '../img/github-white-icon.png';

const Footer: React.FC = () => {
  return (
    <footer className={FooterCSS.footer}>
      <div className={FooterCSS.container}>
        <div className={FooterCSS.grid}>
          <div className={FooterCSS.about}>
            <h3>关于我们</h3>
            <p>
              你说得对，但这是浙江大学 24-25 学年秋冬学期 B/S 体系软件设计课程的课程作业“商品价格比较的网站”，任课教师为胡晓军老师，网站命名为“Erute Shopping”（并无实际意义），作者是浙江大学混合 2205 程昕宇。
            </p>
          </div>
          <div className={FooterCSS.links}>
            <h3>产品</h3>
            <ul>
              <li><Link to="/#">B/S 课程指南</Link></li>
              <li><Link to="/#">B/S 期中补天大全</Link></li>
              <li><Link to="/#">B/S 期末必过宝典</Link></li>
            </ul>
          </div>
          <div className={FooterCSS.contact}>
            <h3>联系我们</h3>
            <ul>
              <li>地址：浙江大学玉泉校区</li>
              <li>电话：188-8888-8888</li>
              <li>邮箱：pikabi@zju.edu.cn</li>
            </ul>
          </div>
        </div>
        <div className={FooterCSS.bottom}>
          <p>&copy; 2024 Erute Shopping. 保留所有权利。</p>
          <div className={FooterCSS.social}>
            <Link to="#">
              <img src={GithubIcon} className={FooterCSS.githubIcon} alt="Github Icon" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;