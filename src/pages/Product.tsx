/**
 * @fileoverview Product page
 * @file src/pages/Product.tsx
 */

import React, {useState} from 'react';
import ProductCss from './css/product.module.css';
import SearchCss from './css/search.module.css'
import { Heart, Scale } from 'lucide-react';
declare const require: any;

const Product: React.FC = () => {
  const initialProduct = {
    id: 1,
    name: '时尚连衣裙时尚连衣裙时尚连衣裙时尚连衣裙时尚连衣裙',
    price: 199,
    rating: 4.5,
    sales: 1000,
    location: '浙江',
    image: require("../img/search/kun.jpg"),
    isFavourite: true, 
    inScale: false,
    TB : {
      exist: true,
      platformUrl: 'https://item.taobao.com/item.htm?id=827175226714&priceTId=2147bf9117311443295183915ee0ea&spm=a21n57.sem.item.102.4ba73903o96Mu6&utparam=%7B%22aplus_abtest%22%3A%2261b1b252f70db22ed6d371459c194bfe%22%7D&xxc=ad_ztc&sku_properties=21433%3A27780654538', 
      relevant: 'https://s.taobao.com/search?commend=all&ie=utf8&initiative_id=tbindexz_20170306&page=1&q=%E9%B8%A1%E4%BD%A0%E5%A4%AA%E7%BE%8E%E6%89%8B%E5%8A%9E%E8%94%A1%E5%BE%90%E5%9D%A4%E7%8E%A9%E5%85%B7%E6%91%86%E4%BB%B6cxk%E5%B0%8F%E9%BB%91%E5%AD%90%E7%88%B1%E5%9D%A4%E5%8F%AA%E5%9B%A0%E4%BD%A0%E5%A4%AA%E7%BE%8Eikun%E9%92%A5%E5%8C%99%E6%89%A3&search_type=item&sourceId=tb.index&spm=a21bo.jianhua%2Fa.201856.d13&ssid=s5-e&tab=all',
      price: 299,
      stocks: 1500
    },
    JD : {
      exist: true,
      platformUrl: 'https://item.taobao.com/item.htm?id=827175226714&priceTId=2147bf9117311443295183915ee0ea&spm=a21n57.sem.item.102.4ba73903o96Mu6&utparam=%7B%22aplus_abtest%22%3A%2261b1b252f70db22ed6d371459c194bfe%22%7D&xxc=ad_ztc&sku_properties=21433%3A27780654538', 
      relevant: 'https://s.taobao.com/search?commend=all&ie=utf8&initiative_id=tbindexz_20170306&page=1&q=%E9%B8%A1%E4%BD%A0%E5%A4%AA%E7%BE%8E%E6%89%8B%E5%8A%9E%E8%94%A1%E5%BE%90%E5%9D%A4%E7%8E%A9%E5%85%B7%E6%91%86%E4%BB%B6cxk%E5%B0%8F%E9%BB%91%E5%AD%90%E7%88%B1%E5%9D%A4%E5%8F%AA%E5%9B%A0%E4%BD%A0%E5%A4%AA%E7%BE%8Eikun%E9%92%A5%E5%8C%99%E6%89%A3&search_type=item&sourceId=tb.index&spm=a21bo.jianhua%2Fa.201856.d13&ssid=s5-e&tab=all',
      price: 199,
      stocks: 150
    },
    PDD : {
      exist: true,
      platformUrl: 'https://item.taobao.com/item.htm?id=827175226714&priceTId=2147bf9117311443295183915ee0ea&spm=a21n57.sem.item.102.4ba73903o96Mu6&utparam=%7B%22aplus_abtest%22%3A%2261b1b252f70db22ed6d371459c194bfe%22%7D&xxc=ad_ztc&sku_properties=21433%3A27780654538', 
      relevant: 'https://s.taobao.com/search?commend=all&ie=utf8&initiative_id=tbindexz_20170306&page=1&q=%E9%B8%A1%E4%BD%A0%E5%A4%AA%E7%BE%8E%E6%89%8B%E5%8A%9E%E8%94%A1%E5%BE%90%E5%9D%A4%E7%8E%A9%E5%85%B7%E6%91%86%E4%BB%B6cxk%E5%B0%8F%E9%BB%91%E5%AD%90%E7%88%B1%E5%9D%A4%E5%8F%AA%E5%9B%A0%E4%BD%A0%E5%A4%AA%E7%BE%8Eikun%E9%92%A5%E5%8C%99%E6%89%A3&search_type=item&sourceId=tb.index&spm=a21bo.jianhua%2Fa.201856.d13&ssid=s5-e&tab=all',
      price: 9.9,
      stocks: 10
    },
  };

  const platforms = [
    {
      id: 1,
      name: '淘宝',
      icon: require('../img/tb-icon.jpg'),
      price: initialProduct.TB.price,
      stock: initialProduct.TB.stocks,
      link: initialProduct.TB.platformUrl,
      relevant: initialProduct.TB.relevant,
    },
    {
      id: 2,
      name: '京东',
      icon: require('../img/jd-icon.jpg'),
      price: initialProduct.JD.price,
      stock: initialProduct.JD.stocks,
      link: initialProduct.JD.platformUrl,
      relevant: initialProduct.TB.relevant,
    },
    {
      id: 3,
      name: '拼多多',
      icon: require('../img/pdd-icon.jpg'),
      price: initialProduct.PDD.price,
      stock: initialProduct.PDD.stocks,
      link: initialProduct.PDD.platformUrl,
      relevant: initialProduct.TB.relevant,
    },
  ];

  const [product, setProduct] = useState(initialProduct);
  
  const handleAddToFavourite = (id: number, isFavourite: boolean) => {
    // TODO: contact with backend and change isFavourite
    alert(`Favourite`);
    setProduct({...product, isFavourite: !isFavourite});
  }

  const handleAddToScale = (id: number, inScale: boolean) => {
    // TODO: contact with backend and change inScale
    alert(`Scale`);
    setProduct({...product, inScale: !inScale});
  }

  return (
    <div className={ProductCss.container}>
      <div className={ProductCss.imageContainer}>
        <img src={product.image} alt={product.name} className={ProductCss.productImage} />
      </div>

      <div className={ProductCss.productInfo}>
        <div className={ProductCss.productHeader}>
          <h1 className={ProductCss.productTitle}>{product.name}</h1>
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

        <div className={ProductCss.productDetails}>
          <div className={ProductCss.rating}>
            <span className={ProductCss.ratingLabel}>评分: </span>
            <span className={ProductCss.ratingValue}>{product.rating}</span>
          </div>
          <div className={ProductCss.sales}>
            <span className={ProductCss.salesLabel}>销量: </span>
            <span className={ProductCss.salesValue}>{product.sales}</span>
          </div>
          <div className={ProductCss.location}>
            <span className={ProductCss.locationLabel}>发货地: </span>
            <span className={ProductCss.locationValue}>{product.location}</span>
          </div>
        </div>

        <div className={ProductCss.platformBox}>
          {platforms.map(platform => (
            <div key={platform.id} className={ProductCss.platformItem}>
              <img src={platform.icon} alt={platform.name} className={ProductCss.platformIcon} />
              <div className={ProductCss.platformInfo}>
                <span className={ProductCss.platformPrice}>￥{platform.price} </span>
                <span className={ProductCss.platformStock}>{platform.stock} 余量</span>
              </div>
              <div className={ProductCss.platformActions}>
                <a href={platform.link} target="_blank" rel="noopener noreferrer" className={ProductCss.viewButton}>查看商品</a>
                <a href={platform.relevant} target="_blank" rel="noopener noreferrer" className={ProductCss.searchButton}>相似商品</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
