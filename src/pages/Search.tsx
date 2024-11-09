/**
 * @fileoverview Search page
 * @file src/pages/Search.tsx
 */

import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter } from '../utils/Filter.tsx';
import { Select } from '../utils/Select.tsx';
import { Star, Heart, Scale } from 'lucide-react'
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

const initialProducts = [
  { id: 1, name: "时尚连衣裙", price: 199, rating: 4.5, sales: 1000, brand: "品如衣柜", locationL: "浙江", image: require("../img/search/kun.jpg"), isFavourite: true, inScale: false},
  { id: 2, name: "男士休闲鞋", price: 299, rating: 4.2, sales: 800, brand: "品如衣柜", locationL: "福建", image: require("../img/search/kun.jpg"), isFavourite: true, inScale: true},
  { id: 3, name: "智能手表", price: 599, rating: 4.7, sales: 1500, brand: "荣耀", locationL: "江苏", image: require("../img/search/kun.jpg"), isFavourite: false, inScale: false},
  { id: 4, name: "无线蓝牙耳机", price: 149, rating: 4.3, sales: 2000, brand: "小米", locationL: "上海", image: require("../img/search/kun.jpg"), isFavourite: false, inScale: false},
  { id: 5, name: "高清数码相机", price: 2999, rating: 4.8, sales: 500, brand: "索尼", locationL: "广东", image: require("../img/search/kun.jpg"), isFavourite: false, inScale: false},
  { id: 6, name: "轻薄笔记本电脑", price: 4999, rating: 4.6, sales: 700, brand: "苹果", locationL: "北京", image: require("../img/search/kun.jpg"), isFavourite: false, inScale: false},
]

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [sortBy, setSortBy] = useState("default");
  const [filters, setFilters] = useState({
    priceRange: { min: '', max: '' },
    ratingRange: { min: '', max: '' },
    brand: '',
  });
  const [products, setProducts] = useState(initialProducts);

  const handleProduct = (id: number) => () => {
    // TODO: handle product click, get the more detaild information of the product
  }

  const handleSort = (value: string) => {
    setSortBy(value);
  }

  const handleAddToFavourite = (id: number, isFavourite: boolean) => {
    // TODO: contact with backend and change isFavourite
    alert(`Favourite`);
    setProducts(products.map(product => 
        product.id === id ? { ...product, isFavourite: !isFavourite} : product
    ));
  }

  const handleAddToScale = (id: number, inScale: boolean) => {
    // TODO: contact with backend and change inScale
    alert(`Scale`);
    setProducts(products.map(product => 
        product.id === id ? { ...product, inScale: !inScale} : product
    ));
  }

  const filteredAndSortedProducts = useMemo(() => {
    let filteredProducts = [...products];
    if (filters.priceRange.min){
      filteredProducts = filteredProducts.filter(product => 
        product.price >= parseFloat(filters.priceRange.min)
      );
    } 
    if( filters.priceRange.max) {
      filteredProducts = filteredProducts.filter(product => 
        product.price <= parseFloat(filters.priceRange.max)
      );
    }
    if (filters.ratingRange.min) {
      filteredProducts = filteredProducts.filter(product => 
        product.rating >= parseFloat(filters.ratingRange.min)
      );
    }
    if (filters.ratingRange.max) {
      filteredProducts = filteredProducts.filter(product => 
        product.rating <= parseFloat(filters.ratingRange.max)
      );
    }
    if (filters.brand) {
      filteredProducts = filteredProducts.filter(product => 
        product.brand.toLowerCase().includes(filters.brand.toLowerCase())
      );
    }

    switch (sortBy) {
      case 'price-asc':
        return filteredProducts.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return filteredProducts.sort((a, b) => b.price - a.price);
      case 'sales':
        return filteredProducts.sort((a, b) => b.sales - a.sales);
      case 'rating':
        return filteredProducts.sort((a, b) => b.rating - a.rating);
      default:
        return filteredProducts;
    }
  }, [filters, sortBy, products]);

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
      {filteredAndSortedProducts.map((product) => (
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
              <div className={SearchCss.productBrandLocation}>
                <span className={SearchCss.productBrand}>{product.brand}</span>
                <span className={SearchCss.productLocation}>{product.locationL}</span>
              </div>
              <div className={SearchCss.productRatingFavorite}>
                <div className={SearchCss.productRating}>
                  <Star className={SearchCss.starIcon} />
                  <span className={SearchCss.ratingValue}>{product.rating}</span>
                </div>
                <div className={SearchCss.productIconBox}>
                  <button onClick={()=>handleAddToFavourite(product.id, product.isFavourite)} className={SearchCss.favoriteButton} aria-label="Add to favourite">
                    <Heart className={`${SearchCss.heartIcon} ${product.isFavourite ? SearchCss.heartIconFilled : ''}`} />
                    <div className={SearchCss.heartIconToolTip}>
                      {product.isFavourite? '取消关注' : '加入关注'}
                    </div>
                  </button>
                  <button onClick={()=>handleAddToScale(product.id, product.inScale)} className={SearchCss.scaleButton} aria-label="Add to scale">
                    <Scale className={`${SearchCss.scaleIcon} ${product.inScale ? SearchCss.scaleIconFilled : ''}`} />
                    <div className={SearchCss.scaleIconToolTip}>
                      {product.inScale ? '取消比较': '加入比较'}
                    </div>
                  </button>
                </div>
              </div>
            </div>
        </div>
      ))}
    </div>
  </div>
};

export default Search;
