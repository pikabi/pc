/**
 * @fileoverview Home page
 * @file src/pages/Home.tsx
 */

import React, {useState} from 'react'
import { Link, useNavigate, useLocation  } from 'react-router-dom';
import { Search, Star, TrendingUp, Award, Users, ThumbsUp } from 'lucide-react'
import HomeCss from './css/home.module.css'
import EruteShoppingIcon from '../img/erute-shopping-icon.png';
import imageSpecial from '../img/search/kun.jpg';

export default function Homepage() {
  const [searchTerm, setSearchTerm] = useState('') ;
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
  }

  const handleCategoryClick = (category: string) => {
    navigate(`/search?query=${encodeURIComponent(category)}`);
  }

  const handleProductClick = () => {
    navigate(`/product`);
  }

  return (
    <div className={HomeCss.container}>
      <div className={HomeCss.eruteShopping}>
        <img src={EruteShoppingIcon} className={HomeCss.eruteShoppingIcon} alt="Erute Shopping Icon" />
        <div className={HomeCss.eruteShoppingFont}>
          Erute Shopping
        </div>
      </div>

      <header className={HomeCss.header}>
        <div className={HomeCss.searchContainer}>
          <input
            type="text"
            placeholder="搜索心仪的宝贝~"
            className={HomeCss.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={()=>handleSearchClick()} className={HomeCss.searchButton}>
            <Search className={HomeCss.searchIcon} />
          </button>
        </div>
      </header>

      <section className={HomeCss.section}>
        <h2 className={HomeCss.sectionTitle}>热门搜索</h2>
        <div className={HomeCss.categoryGrid}>
          {['智能手机', '笔记本电脑', '电视', '耳机'].map((category) => (
            <div onClick={()=>handleCategoryClick(category)} key={category} className={HomeCss.categoryCard}>
              <p className={HomeCss.categoryText}>{category}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={HomeCss.section}>
        <h2 className={HomeCss.sectionTitle}>精选商品</h2>
        <div className={HomeCss.featuredGrid}>
          {[
            { title: 'B/S 期中补天大全', rating: '5.0', price: '8.9' },
            { title: 'B/S 期末必过宝典', rating: '5.0', price: '9.9' },
          ].map(({ title, rating, price }) => (
            <div key={title} className={HomeCss.featuredCard}>
              <div className={HomeCss.featuredImageContainer}>
                <img src={imageSpecial} alt="Product" className={HomeCss.featuredImage} />
              </div>
              <div className={HomeCss.features}>
                <h3 className={HomeCss.featuredTitle}>{title}</h3>
                <div className={HomeCss.priceContainer}>
                  <span className={HomeCss.priceText}>价格仅需</span>
                  <span className={HomeCss.priceIcon}>￥</span>
                  <span className={HomeCss.priceValue}>{price}</span>
                </div>
                <div className={HomeCss.ratingContainer}>
                  <span className={HomeCss.ratingText}>总体评分</span>
                  <div className={HomeCss.ratingStars}>
                    <Star className={HomeCss.starIcon} />
                    <span className={HomeCss.ratingValue}>{rating}</span>
                  </div>
                </div>
                <button onClick={()=>handleProductClick()} className={HomeCss.detailButton}>查看详细商品</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

