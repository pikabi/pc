/**
 * @fileoverview Product page
 * @file src/pages/Product.tsx
 */

import React, {useState, useEffect} from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import ProductCss from './css/product.module.css';
import EruteShoppingIcon from '../img/erute-shopping-icon.png';
import { Heart, Scale, Star} from 'lucide-react';
import { useLoginContext } from '../AppContext.tsx';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
declare const require: any;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Product {
  id: number;
  name: string;
  price: number;
  sales: number;
  comment: number;
  shopRating: number;
  brand: string;
  location: string;
  image: string;
  url: string;
  platform: string;
  extraPrice: number;
  inScale: boolean;
  isFavourite: boolean;
  hasMode: boolean;
  hasSize: boolean;
  hasType: boolean;
}

const initialProduct: Product = {
  id: 0,
  name: '',
  price: 67656,
  sales: 0,
  comment: 0,
  brand: '',
  shopRating: 0,
  location: '',
  image: '',
  url: '/',
  platform: '',
  extraPrice: 0,
  inScale: false,
  isFavourite: false,
  hasMode: false,
  hasSize: false,
  hasType: false,
};

const Product: React.FC = () => {
  const [product, setProduct] = useState<Product>(initialProduct);
  const [imgList, setImgList] = useState<string[]>([]);
  const [attriName1, setAttriName1] = useState<string>('');
  const [attriName2, setAttriName2] = useState<string>('');
  const [attriName3, setAttriName3] = useState<string>('');
  const [attriName4, setAttriName4] = useState<string>('');
  const [attriListName, setAttriListName] = useState<string[]>([]);
  const [attriListImg, setAttriListImg] = useState<string[]>([]);
  const [attriListSize, setAttriListSize] = useState<string[]>([]);
  const [attriListMode, setAttriListMode] = useState<string[]>([]);
  const [attriListType, setAttriListType] = useState<string[]>([]);
  const [currentImage, setCurrentImage] = useState<string>('');
  const [searchParams] = useSearchParams();
  const [attributeClick1, setAttributeClick1] = useState<number>(-1);
  const [attributeClick2, setAttributeClick2] = useState<number>(-1);
  const [attributeClick3, setAttributeClick3] = useState<number>(-1);
  const [attributeClick4, setAttributeClick4] = useState<number>(-1);
  const [historyClick, setHistoryClick] = useState<boolean>(false);
  const [historyDate, setHistoryDate] = useState<string[]>([]);
  const [historyPrice, setHistoryPrice] = useState<number[]>([]);
  const product_id = searchParams.get('id');
  const {isLogged, id} = useLoginContext();
  const navigate = useNavigate();

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(`http://47.115.211.226:5000/product/detail?id=${id}&product_id=${product_id}`,{
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          let data = await response.json();
          const basic = data.product;
          setProduct({
            id: basic.id,
            name: basic.name,
            price: basic.price,
            sales: basic.total_sales,
            comment: basic.comment,
            brand: basic.shopName,
            shopRating: basic.shopRating,
            location: basic.procity,
            image: basic.image_url,
            url: basic.url,
            platform: basic.platform,
            extraPrice: basic.extraPrice,
            inScale: basic.inScale,
            isFavourite: basic.isFavourite,
            hasMode: basic.has_mode,
            hasSize: basic.has_size,
            hasType: basic.has_type,
          });
          setCurrentImage(basic.image_url)
          setImgList(data.imgList);
          setAttriName1(data.attriName1);
          setAttriListName(data.attriListName);
          setAttriListImg(data.attriListImg);
          if (basic.has_size) {
            setAttriName2(data.attriName2);
            setAttriListSize(data.attriListSize);
          }
          if (basic.has_mode) {
            setAttriName3(data.attriName3);
            setAttriListMode(data.attriListMode);
          }
          if (basic.has_type) {
            setAttriName4(data.attriName4);
            setAttriListType(data.attriListType);
          }
          console.log(basic);
          console.log(data.imgList);
          console.log(data.attriName1);
          console.log(data.attriName2);
          console.log(data.attriName3);
          console.log(data.attriName4);
          console.log(data.attriListName);
          console.log(data.attriListImg);
          console.log(data.attriListSize);
          console.log(data.attriListMode);
          console.log(data.attriListType);
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

    function handleImage(image: string) {
      fetch(image)
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

    function handleImages(imageUrls: string[]): Promise<string[]> {
      const imagePromises = imageUrls.map((url) =>
        fetch(url)
          .then(response => {
            if (response.ok) {
              return response.blob();
            }
            throw new Error('Network response was not ok.');
          })
          .then(blob => URL.createObjectURL(blob))
          .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            return '';
          })
      );
      return Promise.all(imagePromises);
    }

    fetchData();
    handleProductItem(product);
    const handleImgList = handleImages(imgList);
    const handleAttriListImg= handleImages(attriListImg);
    Promise.all([handleImgList, handleAttriListImg])
      .then(([imgListImage, attriListImgImage]) => {
        setImgList(imgListImage);
        setAttriListImg(attriListImgImage);
      })
      .catch(error => {
        console.error('Error loading images:', error);
      });
  }, []); 
  
  const handleAddToFavourite = async (userId: number, productId: number, isFavourite: boolean) => {
    if (isLogged) {
      if (isFavourite === true) {
        try {
          const response = await fetch('http://47.115.211.226:5000/favourite/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: userId, product_id: productId})
          });
          if (response.ok) {
            setProduct({...product, isFavourite: false});
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
          const response = await fetch('http://47.115.211.226:5000/favourite/insert', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: userId, product_id: productId})
          });
          if (response.ok) {
            setProduct({...product, isFavourite: true});
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
          const response = await fetch('http://47.115.211.226:5000/scale/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: userId, product_id: productId})
          });
          if (response.ok) {
            setProduct({...product, inScale: false});
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
            setProduct({...product, inScale: true});
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

  const handleImageClick = (image) => {
    setCurrentImage(image);
  };

  
  const Rating = ({ rating}) => {
    const maxRating = 5
    const clampedRating = Math.max(0, Math.min(rating, maxRating))
    const fullStars = Math.floor(clampedRating)
    const partialStar = clampedRating % 1
    const partialStarPercent = partialStar * 100
  
    return (
      <div className={ProductCss.starContainer}>
        <div className={ProductCss.starRating}>{rating} |</div>
        {[...Array(maxRating)].map((_, index) => (
          <div key={index} className={ProductCss.singleStarContainer}>
            <Star className={ProductCss.emptyStar} />
            <div className={ProductCss.filledStar} style={{ width: index < fullStars ? '100%' : `${partialStarPercent}%` }}>
              <Star className={ProductCss.filledStarfill} fill='currentColor' />
            </div>
          </div>
        ))}
      </div>
    )
  }

  const HistoricalPriceChart = () => {
    const data = {
        labels: historyDate,
        datasets: [
            {
                label: '价格（元）',
                data: historyPrice,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                // tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            title: {
                display: true,
                text: '历史价格走势图',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: '日期',
                },
            },
            y: {
                title: {
                    display: true,
                    text: '价格（元）',
                },
                beginAtZero: false,
            },
        },
    };

    return <Line data={data} options={options} />;
  };

  const handleHistory = async () => {
    setHistoryClick(!historyClick);
    if (historyClick === false) {
      try {
        const response = await fetch(`http://47.115.211.226:5000/product/history?id=${product.id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          let data = await response.json();
          setHistoryDate(data.date);
          setHistoryPrice(data.price);
        } else {
          console.error('请求失败');
          const data = await response.json();
          alert(data.message || '请求失败');
        }
      } catch (error) {
        console.error('发生错误:', error);
      }
    }
  };

  return (
    <div className={ProductCss.container}>
      <div className={ProductCss.shop}>
          <img src={EruteShoppingIcon} alt={product.brand} className={ProductCss.shopImage} />
          <h3 className={ProductCss.shopTitle}>{product.brand}</h3>
          <div className={ProductCss.ratingAll}>
            <Rating rating={product.shopRating} />
          </div>
          <span className={ProductCss.shopLocation}>{product.location}</span>
      </div>
      <div className={ProductCss.product}>
        <div className={ProductCss.imageContainer}>
          <div className={ProductCss.smallImageContainerAll}>
            {imgList.map((img, index) => (
              <div className={ProductCss.smallImageContainer}>
                <img 
                  key={index} 
                  src={img} 
                  alt={`img ${index}`} 
                  className={ProductCss.smallImage} 
                  onClick={() => handleImageClick(img)} 
                />
              </div>
            ))}
          </div>
          <div className={ProductCss.productImageContainer}> 
            <img 
              src={currentImage} 
              alt={product.name} 
              className={ProductCss.productImage} 
            />
          </div>
        </div>
        
        <div className={ProductCss.productInfoAllContainer}>
          <div className={ProductCss.productInfoAll}>
            <div className={ProductCss.productInfo}>
              <div className={ProductCss.productHeader}>
                <h3 className={ProductCss.productTitle}>
                    {product.platform === 'jd'? 
                    <span className={ProductCss.platformIconJD}>京东</span>: (product.platform === 'tb'? 
                    <span className={ProductCss.platformIconTB}>淘宝</span>: (product.platform === 'tm'? 
                    <span className={ProductCss.platformIconTM}>天猫</span>: ''))}
                    {product.name}
                </h3>
                <div className={ProductCss.productIconBox}>
                  <button onClick={()=>handleAddToFavourite(id, product.id, product.isFavourite)} className={ProductCss.favoriteButton} aria-label="Add to favourite">
                    <Heart className={`${ProductCss.heartIcon} ${product.isFavourite ? ProductCss.heartIconFilled : ''}`} />
                    <div className={ProductCss.heartIconToolTip}>
                      {product.isFavourite? '取消关注' : '加入关注'}
                    </div>
                  </button>
                  <button onClick={()=>handleAddToScale(id, product.id, product.inScale)} className={ProductCss.scaleButton} aria-label="Add to scale">
                    <Scale className={`${ProductCss.scaleIcon} ${product.inScale ? ProductCss.scaleIconFilled : ''}`} />
                    <div className={ProductCss.scaleIconToolTip}>
                      {product.inScale ? '取消比较': '加入比较'}
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div className={ProductCss.productDetails}>
              <span className={ProductCss.productIcon}>¥</span>
              <span className={ProductCss.productPrice}>{Math.min(Number(product.price), Number(product.extraPrice)).toFixed(2)}</span>
              {
                product.price != product.extraPrice && <span className={ProductCss.productExtraPrice}>原价¥{Number(product.price).toFixed(2)}</span>
              }
              {product.platform==='jd'? <span>
                <span className={ProductCss.productComments}>累计评价 </span>
                <span className={ProductCss.productCommentsNumber}>{product.comment >= 10000? (Math.round(product.comment / 10000)+'万'): product.comment}{product.comment >= 100? '+': ' 条'}</span>
              </span>
              :<span>
                <span className={ProductCss.productSalesNumber}>{product.sales >= 10000? Math.round(product.sales / 10000) : product.sales}{product.sales >= 10000? '万': (product.sales >= 100? '+': ' ')}</span>
                <span className={ProductCss.productSales}>人付款</span>
                <span className={ProductCss.productLocation}>{product.location}</span>
              </span>}
            </div>

            <div className={ProductCss.attributeBody}>
              <div className={ProductCss.attributeBodyContainer}>
                <div className={ProductCss.attributeBodyName}>
                  <div className={ProductCss.aaa}>
                    {attriName1.split('').map((char, index) => (
                      <span key={index} className={ProductCss.character}>{char}</span>
                    ))}
                  </div>
                  :
                </div>
                <div className={ProductCss.attributeContainer}>
                  {attriListName.map((name, index) => (
                    <div className={attributeClick1== index?  ProductCss.attributeImageContainer4: ProductCss.attributeImageContainer} onClick={() => {handleImageClick(attriListImg[index]); setAttributeClick1(index)}} >
                      <img 
                        key={index} 
                        src={attriListImg[index]} 
                        alt={`img ${index}`} 
                        className={ProductCss.attributeImage} 
                      />
                      <span className={attributeClick1== index? ProductCss.attributeNameClick:ProductCss.attributeName}>{name}</span>
                    </div>
                  ))}
                  </div>
                </div>

                {product.hasSize == true && 
                (
                  <div className={ProductCss.attributeBodyContainer}>
                    <div className={ProductCss.attributeBodyName}>
                      <div className={ProductCss.aaa}>
                        {attriName2.split('').map((char, index) => (
                          <span key={index} className={ProductCss.character}>{char}</span>
                        ))}
                      </div>
                      :
                    </div>
                    <div className={ProductCss.attributeContainer} >
                      {attriListSize.map((name, index) => (
                        <div className={attributeClick2 == index?  ProductCss.attributeImageContainer3: ProductCss.attributeImageContainer2} onClick={() => setAttributeClick2(index)} key={index}>
                          <span className={attributeClick2== index? ProductCss.attributeNameClick:ProductCss.attributeName}>{name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {product.hasMode == true && (
                  <div className={ProductCss.attributeBodyContainer}>
                    <div className={ProductCss.attributeBodyName}>
                      <div className={ProductCss.aaa}>
                        {attriName3.split('').map((char, index) => (
                          <span key={index} className={ProductCss.character}>{char}</span>
                        ))}
                      </div>
                      :
                    </div>
                    <div className={ProductCss.attributeContainer}>
                      {attriListMode.map((name, index) => (
                        <div className={attributeClick3 == index?  ProductCss.attributeImageContainer3: ProductCss.attributeImageContainer2} onClick={() => setAttributeClick3(index)} key={index}>
                          <span className={attributeClick3== index? ProductCss.attributeNameClick:ProductCss.attributeName}>{name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {product.hasType == true && (
                  <div className={ProductCss.attributeBodyContainer}>
                  <div className={ProductCss.attributeBodyName}>
                      <div className={ProductCss.aaa}>
                        {attriName4.split('').map((char, index) => (
                          <span key={index} className={ProductCss.character}>{char}</span>
                        ))}
                      </div>
                      :
                    </div>
                    <div className={ProductCss.attributeContainer}>
                      {attriListType.map((name, index) => (
                        <div className={attributeClick3 == index?  ProductCss.attributeImageContainer3: ProductCss.attributeImageContainer2} onClick={() => setAttributeClick4(index)} key={index}>
                          <span className={attributeClick4== index? ProductCss.attributeNameClick:ProductCss.attributeName}>{name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>
          <div className={ProductCss.click}>
              <button className={ProductCss.clickLinkButton}>
                <a href={product.url} target="_blank" className={ProductCss.link}>点击购买</a>
              </button>
              <button className={ProductCss.clickLinkButton2} onClick={()=>handleHistory()}>
                历史价格
              </button>
          </div>
        </div>
      </div>
      {historyClick == true &&
      <div className={ProductCss.historyContainer}>
          <HistoricalPriceChart />
      </div>
      }
    </div>
  );
};

export default Product;
