/**
 * @fileoverview Search page
 * @file src/pages/Search.tsx
 */

import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter } from '../utils/Filter.tsx';
import { Select } from '../utils/Select.tsx';
import { Search as SearchIcon, SlidersHorizontal, ChevronDown, Star, Heart } from 'lucide-react'
import SearchCss from './css/search.module.css';
import EruteShoppingIcon from '../img/erute-shopping-icon.png';
declare const require: any;


const sortOptions = [
  { value: 'default', label: '默认排序' },
  { value: 'price-asc', label: '价格从低到高' },
  { value: 'price-desc', label: '价格从高到低' },
  { value: 'sales', label: '销量优先' },
  { value: 'rating', label: '评分优先' },
]

const products = [
  { id: 1, name: "时尚连衣裙", price: 199, rating: 4.5, sales: 1000, image: require("../img/search/kun.jpg") },
  { id: 2, name: "男士休闲鞋", price: 299, rating: 4.2, sales: 800, image: require("../img/search/kun.jpg") },
  { id: 3, name: "智能手表", price: 599, rating: 4.7, sales: 1500, image: require("../img/search/kun.jpg") },
  { id: 4, name: "无线蓝牙耳机", price: 149, rating: 4.3, sales: 2000, image: require("../img/search/kun.jpg") },
  { id: 5, name: "高清数码相机", price: 2999, rating: 4.8, sales: 500, image: require("../img/search/kun.jpg") },
  { id: 6, name: "轻薄笔记本电脑", price: 4999, rating: 4.6, sales: 700, image: require("../img/search/kun.jpg") },
]

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [sortBy, setSortBy] = useState("default")

  const [filters, setFilters] = useState({
    priceRange: { min: '', max: '' },
    ratingRange: { min: '', max: '' },
    brand: '',
  });

  const handleProduct = (id: number) => () => {
    console.log("Product clicked:", id)
  }

  const handleSort = (value: string) => {
    setSortBy(value)
    console.log("Sorting by:", value)
  }


  return <div className={SearchCss.container}>
    <div className={SearchCss.eruteShopping}>
      <img src={EruteShoppingIcon} className={SearchCss.eruteShoppingIcon} alt="Erute Shopping Icon" />
      <div className={SearchCss.eruteShoppingFont}>
        Erute Shopping
      </div>
    </div>
    <div className={SearchCss.filterSelectBox}>
      <div className={SearchCss.filterBox}>
        <Filter filters={filters} onFilterChange={setFilters} />
      </div>
        
      <div className={SearchCss.sortSelect}>
        <Select
          options={sortOptions}
          value={sortBy}
          onChange={handleSort}
          placeholder="选择排序方式"
        />
      </div>
    </div>

    <div className={SearchCss.productGrid}>
      {products.map((product) => (
        <div key={product.id} className={SearchCss.productCard}>
            <Link to={`/product?id=${encodeURIComponent(product.id)}`} onClick={handleProduct(product.id)} className={SearchCss.productLink}>
              <img src={product.image} alt={product.name} className={SearchCss.productImage} />
            </Link>
            <div className={SearchCss.productInfo}>
              <Link to={`/product?id=${encodeURIComponent(product.id)}`} onClick={handleProduct(product.id)} className={SearchCss.productLink}>
                <h3 className={SearchCss.productName}>{product.name}</h3>
              </Link>
              <div className={SearchCss.productPriceSales}>
                <span className={SearchCss.productPrice}>¥{product.price}</span>
                <span className={SearchCss.productSales}>{product.sales} 人已购买</span>
              </div>
              <div className={SearchCss.productRatingFavorite}>
                <div className={SearchCss.productRating}>
                  <Star className={SearchCss.starIcon} />
                  <span className={SearchCss.ratingValue}>{product.rating}</span>
                </div>
                <button className={SearchCss.favoriteButton} aria-label="Add to favourite">
                  <Heart className={SearchCss.heartIcon} />
                </button>
              </div>
            </div>
        </div>
      ))}
    </div>
  </div>
};

export default Search;
