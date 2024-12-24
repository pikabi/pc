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

interface Product {
  id: number;
  name: string;
  price: number;
  extraPrice: number;
  rating: number;
  sales: number;
  comment: number;
  brand: string;
  location: string;
  image: string;
  platform: string;
  isFavourite: boolean;
  inScale: boolean;
  priceChange: number;
}

const Favourite: React.FC = () => {
  const {isLogged, id} = useLoginContext();
  const [products, setProducts] = useState<Product[]>([]);

  React.useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(`http://47.115.211.226:5000/favourite?id=${id}`,{
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
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
              price: item.price,
              extraPrice: item.extraPrice,
              rating: item.ratingAll,
              sales: item.total_sales,
              comment: item.comment,
              brand: item.brand,
              location: item.location,
              image: item.image_url,
              platform: item.platform,
              isFavourite: true,
              inScale: item.inScale,
              priceChange: item.priceChange
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

  const handleProduct = (productId: number) => () => {
    // TODO: handle product click, get the more detaild information of the product
  }

  const handleAddToTrash = async (userId: number, productId: number) => {
    if (isLogged) {
      try {
        const response = await fetch('http://47.115.211.226:5000/favourite/delete', {
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
    }else {
      alert('请先登录');
    }
  } 

  const handleAddToScale = async (userId: number, productId: number, inScale: boolean) => {
    if (isLogged) {
      if (inScale === true) {
        try {
          const response = await fetch('http://47.115.211.226:5000/scale/delete', {
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
          const response = await fetch('http://47.115.211.226:5000/scale/insert', {
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

  return <div className={FavouriteCss.containerAll}>
  <div className={FavouriteCss.container}>
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
                {/* {product.priceChange != null && (
                  <span className={`${FavouriteCss.priceTag} ${FavouriteCss[product.priceChange === 2? "lowest" : (product.priceChange === 1? "lower": product.priceChange === 3?"higher": "unchanged")]}`}>
                  {product.priceChange === 2 ? <div className={FavouriteCss.lowBox}>
                    <div>🔥</div> <div>史低</div>
                  </div> : 
                  product.priceChange === 1? <TrendingDown /> : 
                  product.priceChange === 3 ? <TrendingUp />: 
                  <Minus />}
                </span>)} */}
            </Link>
            <div className={FavouriteCss.productInfo}>
              <Link to={`/product?id=${encodeURIComponent(product.id)}`} onClick={handleProduct(product.id)} className={FavouriteCss.productLink}>
                <h3 className={FavouriteCss.productName}>
                    {product.platform === 'jd'? 
                    <span className={FavouriteCss.platformIconJD}>京东</span>: (product.platform === 'tb'? 
                    <span className={FavouriteCss.platformIconTB}>淘宝</span>: (product.platform === 'tm'? 
                    <span className={FavouriteCss.platformIconTM}>天猫</span>: ''))}
                  {product.name}
                </h3>
              </Link>
              <div className={FavouriteCss.productPriceSales}>
                <div>
                  <span className={FavouriteCss.productIcon}>¥</span>
                  <span className={FavouriteCss.productPrice}>{Math.min(Number(product.price), Number(product.extraPrice)).toFixed(2)}</span>
                </div>
                <div className={FavouriteCss.productRating}>
                  <Star className={FavouriteCss.starIcon} />
                  <span className={FavouriteCss.ratingValue}>{product.rating}</span>
                  <button onClick={()=>handleAddToScale(id, product.id, product.inScale)} className={FavouriteCss.scaleButton} aria-label="Add to scale">
                    <Scale className={`${FavouriteCss.scaleIcon} ${product.inScale ? FavouriteCss.scaleIconFilled : ''}`} />
                    <div className={FavouriteCss.scaleIconToolTip}>
                      {product.inScale ? '取消比较': '加入比较'}
                    </div>
                  </button>
                  <button onClick={()=>handleAddToTrash(id, product.id)} className={FavouriteCss.trashButton} aria-label="Add to trash">
                    <Trash2 className={FavouriteCss.trashIcon} />
                    <div className={FavouriteCss.trashIconToolTip}>
                      取消关注
                    </div>
                  </button>
                </div>
              </div>
              <Link to={`/product?id=${encodeURIComponent(product.id)}`} onClick={handleProduct(product.id)}>

              <div className={FavouriteCss.productDetail}>
                  <button className={FavouriteCss.detailButton}>
                    查看详情
                  </button>
              </div>
              </Link>

            </div>
        </div>
      ))}
    </div>
  </div>
</div>
};

export default Favourite;
