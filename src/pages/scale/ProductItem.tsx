import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Radar } from 'react-chartjs-2';
import { Trash2 } from 'lucide-react';
import ScaleCss from '../css/scale.module.css';
import { Link } from 'react-router-dom';

const ProductItem = ({ product, index, productLength, products, setProducts, startIndex ,isLast}) => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const handleDeleteScale = (id: number) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, inScale: false} : product
    ))
  }

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        setContainerSize({ width, height: width });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [containerRef]);

  const ChartData = useMemo(() => ( {
    labels: ['质量', '评分', '销量', '功能', '价格'],
    datasets: [{
      label: product.name,
      data: [
          product.qualityRating,
          product.rating,
          product.salesRating,
          product.featuresRating,
          product.priceRating,
      ],
      backgroundColor: 'rgba(138, 43, 226, 0.2)',
      borderColor: 'rgba(138, 43, 226, 1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(138, 43, 226, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(138, 43, 226, 1)',
    }],
  }), [product]);

  const chartOptions = useMemo(() => ({
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
        },
        suggestedMin: 0,
        suggestedMax: 5,
        ticks: {
          stepSize: 1,
          display: false,
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        pointLabels: {
          font: {
            size: containerSize.width < 200 ? 8 : 10,
          },
          color: '#333',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: false,
    maintainAspectRatio: true,
  }), [containerSize]);

  return (
    <div key={product.id} className={`${productLength === 1 ? ScaleCss.productItemOne : (productLength === 2 ? ScaleCss.productItemTwo : ScaleCss.productItem)}`}
      style={{ transform: `translateX(-${100 * startIndex}%)` }}
      >
      <div className={ScaleCss.productContent}>
        <h2 className={ScaleCss.productName}>{product.name}</h2>
        <div 
          ref={containerRef}
          className={ScaleCss.imageContainer}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ width: '100%', height: '100%' }}
        >
          {isHovered ? (
            <div className={ScaleCss.radarContainer}>
              <Radar 
                data={ChartData} 
                options={chartOptions} 
                width={containerSize.width * 1}
                height={containerSize.height * 1}
                />
            </div>
          ) : (
            <img
              src={product.image}
              alt={`${product.name}`}
              className={ScaleCss.productImage}
            />
          )}
        </div>
        <Link to={`/product?id=${product.id}`} >
          <div className={ScaleCss.priceTag}>
              <span className={ScaleCss.price}>￥{product.price}</span>
              <span className={ScaleCss.vendor}>amazon</span>
          </div>
        </Link>
        <button onClick={()=>handleDeleteScale(product.id)} className={ScaleCss.scaleButton} aria-label="Add to scale">
          <div className={ScaleCss.deleteTag}>
            <Trash2 className={ScaleCss.trashIcon} />
            <div className={ScaleCss.scaleText}>
              取消比较
            </div>
          </div>
        </button>
      </div>
      {!isLast && <div className={ScaleCss.vsLabel}>vs</div>}
    </div>
  );
};

export default ProductItem;