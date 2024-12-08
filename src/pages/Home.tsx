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

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
}

export default function Homepage() {
  const [searchTerm, setSearchTerm] = useState('') ;
  const [products, setProducts] = React.useState<Product[]>([]);
  const navigate = useNavigate();

  const handleSearchClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search?query=${encodeURIComponent(searchTerm)}&page=1`);
  }

  const handleCategoryClick = (category: string) => {
    navigate(`/search?query=${encodeURIComponent(category)}&page=1`);
  }

  const handleProductClick = (id: number) => {
    navigate(`/product?id=${id}`);
  }

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/product/random`,{
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        console.log(response);
        if (response.ok) {
          let data = await response.json();
          console.log(data);
          if (data.length === 0) {
            setProducts([]);
          }
          else {
            setProducts(data.map(item => ({
              id: item.id,
              name: item.name,
              price: Math.min(Number(item.price), Number(item.extraPrice)).toFixed(2),
              rating: item.ratingAll,
              image: item.image_url,
            })));
          }
        } else {
          console.error('请求失败');
          const data = await response.json();
          alert(data.message || '请求失败');
        }
      } catch (error) {
        console.error('发生错误:', error);
      }
    };

    function handleProductItem(product: Product) {
      fetch(product.image)
        .then(response => {
          if (response.ok) {
            return response.blob();
          }
          throw new Error('Network response was not ok.');
        })
        .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
        });
    }

    fetchData();
    products.forEach(handleProductItem);
  }, []);

  return (
    <div className={HomeCss.container}>
      <div className={HomeCss.eruteShopping}>
        <img src={EruteShoppingIcon} className={HomeCss.eruteShoppingIcon} alt="Erute Shopping Icon" />
        <div className={HomeCss.eruteShoppingFont}>
          Erute Shopping
        </div>
      </div>

      <header className={HomeCss.header}>
        <form onSubmit={handleSearchClick} className={HomeCss.searchContainer}>
          <input
            type="text"
            placeholder="搜索心仪的宝贝~"
            className={HomeCss.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className={HomeCss.searchButton}>
            <Search className={HomeCss.searchIcon} />
          </button>
        </form>
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
          {products.map(({ id, name, rating, price, image }) => (
            <div key={name} className={HomeCss.featuredCard}>
              <div className={HomeCss.featuredImageContainer}>
                <img src={image} alt="Product" className={HomeCss.featuredImage} />
              </div>
              <div className={HomeCss.features}>
                <h3 className={HomeCss.featuredTitle}>{name}</h3>
                <div className={HomeCss.priceContainer}>
                  <span className={HomeCss.priceText}>价格仅需</span>
                  <span className={HomeCss.priceIcon}>￥</span>
                  <span className={HomeCss.priceValue}>{price}</span>
                </div>
                <div className={HomeCss.ratingContainer}>
                  <span className={HomeCss.ratingText}>推荐指数</span>
                  <div className={HomeCss.ratingStars}>
                    <Star className={HomeCss.starIcon} />
                    <span className={HomeCss.ratingValue}>{rating}</span>
                  </div>
                </div>
                <button onClick={()=>handleProductClick(id)} className={HomeCss.detailButton}>查看详细商品</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

