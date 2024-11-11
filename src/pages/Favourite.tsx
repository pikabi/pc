/**
 * @fileoverview Favourite page
 * @file src/pages/Home.tsx
 */

import React, {useState} from 'react';
import FavouriteCss from './css/favourite.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { Scale, Star, Trash2, TrendingDown, TrendingUp, Minus } from 'lucide-react';
import { useLoginContext } from '../AppContext.tsx';
declare const require: any;

const initialProducts = [
  { id: 1, name: "时尚连衣裙", price: 199, rating: 4.5, sales: 1000, brand: "品如衣柜", locationL: "浙江", image: require("../img/search/kun.jpg"), isFavourite: true, inScale: false, priceChange: "lowest"},
  { id: 2, name: "男士休闲鞋", price: 299, rating: 4.2, sales: 800, brand: "品如衣柜", locationL: "福建", image: require("../img/search/kun.jpg"), isFavourite: true, inScale: true, priceChange: "lowest"},
  { id: 3, name: "智能手表", price: 599, rating: 4.7, sales: 1500, brand: "荣耀", locationL: "江苏", image: require("../img/search/kun.jpg"), isFavourite: true, inScale: false, priceChange: "lower"},
  { id: 4, name: "无线蓝牙耳机", price: 149, rating: 4.3, sales: 2000, brand: "小米", locationL: "上海", image: require("../img/search/kun.jpg"), isFavourite: true, inScale: false, priceChange: "higher"},
  { id: 5, name: "高清数码相机", price: 2999, rating: 4.8, sales: 500, brand: "索尼", locationL: "广东", image: require("../img/search/kun.jpg"), isFavourite: true, inScale: false, priceChange: "higher"},
  { id: 6, name: "轻薄笔记本电脑", price: 4999, rating: 4.6, sales: 700, brand: "苹果", locationL: "北京", image: require("../img/search/kun.jpg"), isFavourite: true, inScale: false, priceChange: "unchanged"},
]

const Favourite: React.FC = () => {
  const {isLogged} = useLoginContext();
  const [products, setProducts] = useState(initialProducts);

  const handleProduct = (id: number) => () => {
    // TODO: handle product click, get the more detaild information of the product
  }

  const handleAddToTrash = (id: number) => {
    // TODO: contact with backend and change isFavourite
    alert(`Delete`);
    setProducts(products.map(product => 
        product.id === id ? { ...product, isFavourite: false} : product
    ));
  }

  const handleAddToScale = (id: number, inScale: boolean) => {
    // TODO: contact with backend and change inScale
    alert(`Scale`);
    setProducts(products.map(product => 
        product.id === id ? { ...product, inScale: !inScale} : product
    ));
  }

  return <div className={FavouriteCss.container}>
    <div className={FavouriteCss.eruteShopping}>
      {/* <img src={EruteShoppingIcon} className={FavouriteCss.eruteShoppingIcon} alt="Erute Shopping Icon" /> */}
      <div className={FavouriteCss.eruteShoppingFont}>
        我的关注
      </div>
    </div>
    {(products.length === 0 || products.every((product) => !product.isFavourite)) && (
        <div className={FavouriteCss.noProduct}>暂无关注商品</div>
      )}
    <div className={FavouriteCss.productGrid}>
      {products.map((product) => (
        product.isFavourite &&
        <div key={product.id} className={FavouriteCss.productCard}>
            <Link to={`/product?id=${encodeURIComponent(product.id)}`} onClick={handleProduct(product.id)} className={FavouriteCss.productLink}>
              <img src={product.image} alt={product.name} className={FavouriteCss.productImage} />
              {product.priceChange && (
                <span className={`${FavouriteCss.priceTag} ${FavouriteCss[product.priceChange]}`}>
                  {product.priceChange === 'lowest' ? <div className={FavouriteCss.lowBox}>
                    <div>🔥</div> <div>史低</div>
                  </div> : 
                  product.priceChange === 'lower' ? <TrendingDown /> : 
                  product.priceChange === 'higher' ? <TrendingUp />: 
                  product.priceChange === 'unchanged' ? <Minus /> : ''}
                </span>
              )}
            </Link>
            <div className={FavouriteCss.productInfo}>
              <Link to={`/product?id=${encodeURIComponent(product.id)}`} onClick={handleProduct(product.id)} className={FavouriteCss.productLink}>
                <h3 className={FavouriteCss.productName}>{product.name}</h3>
              </Link>
              <div className={FavouriteCss.productPriceSales}>
                <span className={FavouriteCss.productPrice}>¥{product.price}</span>
                <div className={FavouriteCss.productRating}>
                  <Star className={FavouriteCss.starIcon} />
                  <span className={FavouriteCss.ratingValue}>{product.rating}</span>
                  <button onClick={()=>handleAddToScale(product.id, product.inScale)} className={FavouriteCss.scaleButton} aria-label="Add to scale">
                    <Scale className={`${FavouriteCss.scaleIcon} ${product.inScale ? FavouriteCss.scaleIconFilled : ''}`} />
                    <div className={FavouriteCss.scaleIconToolTip}>
                      {product.inScale ? '取消比较': '加入比较'}
                    </div>
                  </button>
                </div>
              </div>
              <div className={FavouriteCss.productDetailTrash}>
                <Link to={`/product?id=${encodeURIComponent(product.id)}`} onClick={handleProduct(product.id)}>
                  <button className={FavouriteCss.detailButton}>
                    查看详情
                  </button>
                </Link>
                <button onClick={()=>handleAddToTrash(product.id)} className={FavouriteCss.trashButton} aria-label="Add to trash">
                  <Trash2 className={FavouriteCss.trashIcon} />
                  <div className={FavouriteCss.trashIconToolTip}>
                    取消关注
                  </div>
                </button>
              </div>
            </div>
        </div>
      ))}
    </div>
  </div>
};

export default Favourite;
