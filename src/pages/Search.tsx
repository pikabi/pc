/**
 * @fileoverview Search page
 * @file src/pages/Search.tsx
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Filter } from '../utils/Filter.tsx';
import { Select } from '../utils/Select.tsx';
import { Star, Heart, Scale, Search as SearchIcon } from 'lucide-react'
import SearchCss from './css/search.module.css';
import HomeCss from './css/home.module.css';
import EruteShoppingIcon from '../img/erute-shopping-icon.png';
import { useLoginContext } from '../AppContext.tsx';
import { Button } from '@mui/material';
declare const require: any;

const NumPerPage = 30;

const sortOptions = [
  { value: 'default', label: '默认排序' },
  { value: 'price-asc', label: '价格从低到高' },
  { value: 'price-desc', label: '价格从高到低' },
  { value: 'sales', label: '销量优先' },
  { value: 'rating', label: '评分优先' },
]

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  sales: number;
  comment: number;
  brand: string;
  location: string;
  image: string;
  platform: string;
  isFavourite: boolean;
  inScale: boolean;
}

const Search: React.FC = () => {
  const {isLogged, id} = useLoginContext();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const page = searchParams.get('page');
  const [num, setNum] = useState(67656);
  const [searchTerm, setSearchTerm] = useState(query || '');
  const [sortBy, setSortBy] = useState("default");
  const [filters, setFilters] = useState({
    priceRange: { min: '', max: '' },
    ratingRange: { min: '', max: '' },
    brand: '',
    location: '',
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [keyPressed, setKeyPressed] = useState(false);
  const navigate = useNavigate();

  const handleSearchClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setKeyPressed(!keyPressed);
    // TODO: handle search click, get the search results
    navigate(`/search?query=${encodeURIComponent(searchTerm)}&page=1`);
  }

  const handlePrevPage = () => {
    navigate(`/search?query=${encodeURIComponent(searchTerm)}&page=${Number(page)-1}`);
  }

  const handleNextPage = () => {
    navigate(`/search?query=${encodeURIComponent(searchTerm)}&page=${Number(page)+1}`);
  }

  useEffect(() => {
    console.log(query);
    console.log(page);
    if (isNaN(Number(page)) || page===null) {
      navigate(`/search?query=${query}&page=1`);
    }
    if(Number(page) < 1 || Number(page) > 10) {
      alert('页码超出范围');
      navigate(`/search?query=${query}&page=1`);
    }


    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/product/search?id=${id}&query=${query}&page=${page}`,{
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          let data = await response.json();
          setNum(data.num);
          data = data.result;
          console.log(data);
          setProducts(data.map(item => ({
            id: item.id,
            name: item.name,
            price: Math.min(Number(item.price), Number(item.extraPrice)).toFixed(2),
            rating: item.ratingAll,
            sales: item.total_sales,
            comment: item.comment,
            brand: item.shopName,
            location: item.procity,
            image: item.image_url,
            platform: item.platform,
            isFavourite: item.isFavourite,
            inScale: item.inScale
          })));
        } else {
          console.error('请求失败');
          const data = await response.json();
          alert(data.message || '请求失败');
          if (data.message === '超出页数！') {
            navigate(`/search?query=${query}&page=1`);
          }
          else navigate(`/search?query=&page=1`);
        }
      } catch (error) {
        console.error('发生错误:', error);
        navigate(`/search?query=&page=1`);
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
  }, [query, page, keyPressed]); 

  const handleProduct = (id: number) => () => {
    // TODO: handle product click, get the more detaild information of the product
  }

  const handleSort = (value: string) => {
    setSortBy(value);
  }

  const handleAddToFavourite = async (userId: number, productId: number, isFavourite: boolean) => {
    if (isLogged) {
      if (isFavourite === true) {
        try {
          const response = await fetch('http://localhost:5000/favourite/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: userId, product_id: productId})
          });
          if (response.ok) {
            setProducts(products.map(product =>
              product.id === productId ? { ...product, isFavourite: false} : product
            ));
            console.log('删除成功');
          } else {
            console.error('请求失败');
            const data = await response.json();
            alert(data.message || '请求失败');
          }
        } catch (error) {
          console.error('发生错误:', error);
        }
      }
      else {
        try {
          const response = await fetch('http://localhost:5000/favourite/insert', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: userId, product_id: productId})
          });
          if (response.ok) {
            setProducts(products.map(product =>
              product.id === productId ? { ...product, isFavourite: true} : product
            ));
            console.log('关注成功');
          } else {
            console.error('请求失败');
            const data = await response.json();
            alert(data.message || '请求失败');
          }
        } catch (error) {
          console.error('发生错误:', error);
        }
      }
    } else {
      alert('请先登录');
    }
  }

  const handleAddToScale = async (userId: number, productId: number, inScale: boolean) => {
    if (isLogged) {
      if (inScale === true) {
        try {
          const response = await fetch('http://localhost:5000/scale/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: userId, product_id: productId})
          });
          if (response.ok) {
            setProducts(products.map(product =>
              product.id === productId ? { ...product, inScale: false} : product
            ));
            console.log('删除成功');
          } else {
            console.error('请求失败');
            const data = await response.json();
            alert(data.message || '请求失败');
          }
        } catch (error) {
          console.error('发生错误:', error);
        }
      }
      else {
        try {
          const response = await fetch('http://localhost:5000/scale/insert', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: userId, product_id: productId})
          });
          if (response.ok) {
            setProducts(products.map(product =>
              product.id === productId ? { ...product, inScale: true} : product
            ));
            console.log('关注成功');
          } else {
            console.error('请求失败');
            const data = await response.json();
            alert(data.message || '请求失败');
          }
        } catch (error) {
          console.error('发生错误:', error);
        }
      }
    } else {
      alert('请先登录');
    }
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
    if (filters.location) {
      filteredProducts = filteredProducts.filter(product => 
        product.location.toLowerCase().includes(filters.location.toLowerCase())
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

  return <div className={SearchCss.containerAll}>
  <div className={SearchCss.container}>
    <div className={SearchCss.eruteShopping}>
      <img src={EruteShoppingIcon} className={SearchCss.eruteShoppingIcon} alt="Erute Shopping Icon" />
      <div className={SearchCss.eruteShoppingFont}>
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
            <SearchIcon className={HomeCss.searchIcon} />
          </button>
        </form>
      </header>

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
                <h3 className={SearchCss.productName}>
                    {product.platform === 'jd'? 
                    <span className={SearchCss.platformIconJD}>京东</span>: (product.platform === 'tb'? 
                    <span className={SearchCss.platformIconTB}>淘宝</span>: (product.platform === 'tm'? 
                    <span className={SearchCss.platformIconTM}>天猫</span>: ''))}
                  {product.name}
                </h3>
                <div className={SearchCss.productPriceSales}>
                  <span className={SearchCss.productIcon}>¥</span>
                  <span className={SearchCss.productPrice}>{product.price}</span>
                  {product.platform === 'jd'? 
                  <span>
                    <span className={SearchCss.productComments}>累计评价 </span>
                    <span className={SearchCss.productCommentsNumber}>{product.comment >= 10000? (Math.round(product.comment / 10000)+'万'): product.comment}{product.comment >= 100? '+': ' 条'}</span>
                  </span>
                  :<span>
                    <span className={SearchCss.productSalesNumber}>{product.sales >= 10000? Math.round(product.sales / 10000) : product.sales}{product.sales >= 10000? '万': (product.sales >= 100? '+': ' ')}</span>
                    <span className={SearchCss.productSales}>人付款</span>
                    <span className={SearchCss.productLocation}>{product.location}</span>
                  </span>}
                </div>
              </Link>
              <div className={SearchCss.productRatingFavorite}>
                <span className={SearchCss.productBrand}>{product.brand}</span>
                <div className={SearchCss.productRating}>
                  <Star className={SearchCss.starIcon} />
                  <span className={SearchCss.ratingValue}>{Number(product.rating).toFixed(2)}</span>
                </div>
                <div className={SearchCss.productIconBox}>
                  <button onClick={()=>handleAddToFavourite(id, product.id, product.isFavourite)} className={SearchCss.favoriteButton} aria-label="Add to favourite">
                    <Heart className={`${SearchCss.heartIcon} ${product.isFavourite ? SearchCss.heartIconFilled : ''}`} />
                    <div className={SearchCss.heartIconToolTip}>
                      {product.isFavourite? '取消关注' : '加入关注'}
                    </div>
                  </button>
                  <button onClick={()=>handleAddToScale(id, product.id, product.inScale)} className={SearchCss.scaleButton} aria-label="Add to scale">
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

    <div className={SearchCss.switchPageContainer}>
  {Number(page) >= 2 ? (
    <button className={SearchCss.prevPage} onClick={()=>handlePrevPage()}>
      <span className={SearchCss.arrowLeft}>‹</span> 上一页
    </button>
  ) : (
    <button className={SearchCss.prevPageGray} disabled>
      <span className={SearchCss.arrowLeft}>‹</span> 上一页
    </button>
  )}

  {Number(page) * NumPerPage < num && Number(page) <= 9 ? (
    <button className={SearchCss.nextPage} onClick={()=>handleNextPage()}>
      下一页 <span className={SearchCss.arrowRight}>›</span>
    </button>
  ) : (
    <button className={SearchCss.nextPageGray} disabled>
      下一页 <span className={SearchCss.arrowRight}>›</span>
    </button>
  )}
</div>

  </div>
  </div>
};

export default Search;
