/**
 * @fileoverview scale page
 * @file src/pages/Scale.tsx
 */

import React from 'react';
import ProductItem from './scale/ProductItem.tsx';
import ScaleCss from './css/scale.module.css';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
declare const require: any;


ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const initialProducts = [
  { id: 1, name: "时尚连衣裙", price: 199, rating: 4.5, sales: 1000, quality: 4.2, features: 4.0, priceRating: 2.9, salesRating: 1.8, qualityRating: 4.7, featuresRating: 0.6, image: require("../img/search/kun.jpg"), inScale: true},
  { id: 2, name: "男士休闲鞋", price: 299, rating: 4.2, sales: 800, quality: 4.5, features: 2.3, priceRating: 4.8, salesRating: 3.7, qualityRating: 2.9, featuresRating: 4.5, image: require("../img/search/kun.jpg"), inScale: true},
  { id: 3, name: "智能手表", price: 599, rating: 4.7, sales: 1500, quality: 4.8, features: 1.6, priceRating: 1.9, salesRating: 4.6, qualityRating: 3.8, featuresRating: 1.4, image: require("../img/search/kun.jpg"), inScale: true},
  { id: 4, name: "运动耳机", price: 99, rating: 4.0, sales: 1200, quality: 3.9, features: 4.5, priceRating: 4.5, salesRating: 4.0, qualityRating: 3.2, featuresRating: 4.8, image: require("../img/search/kun.jpg"), inScale: true},
  { id: 5, name: "女士包包", price: 399, rating: 4.3, sales: 900, quality: 4.6, features: 3.2, priceRating: 3.8, salesRating: 2.9, qualityRating: 4.2, featuresRating: 3.5, image: require("../img/search/kun.jpg"), inScale: true},
  { id: 6, name: "男士夹克", price: 499, rating: 4.4, sales: 700, quality: 4.7, features: 2.9, priceRating: 3.2, salesRating: 1.9, qualityRating: 4.5, featuresRating: 2.8, image: require("../img/search/kun.jpg"), inScale: true},
  { id: 7, name: "女士运动鞋", price: 199, rating: 4.1, sales: 1100, quality: 4.3, features: 3.8, priceRating: 4.2, salesRating: 3.2, qualityRating: 3.9, featuresRating: 3.2, image: require("../img/search/kun.jpg"), inScale: true},
  { id: 8, name: "男士运动裤", price: 149, rating: 4.0, sales: 1300, quality: 4.1, features: 4.2, priceRating: 4.0, salesRating: 4.1, qualityRating: 3.5, featuresRating: 4.0, image: require("../img/search/kun.jpg"), inScale: true},
  { id: 9, name: "女士运动裤", price: 129, rating: 4.0, sales: 1400, quality: 4.0, features: 4.0, priceRating: 4.1, salesRating: 4.2, qualityRating: 3.7, featuresRating: 4.1, image: require("../img/search/kun.jpg"), inScale: true},
  { id: 10, name: "男士运动鞋", price: 179, rating: 4.2, sales: 1000, quality: 4.2, features: 3.9, priceRating: 4.3, salesRating: 3.8, qualityRating: 4.0, featuresRating: 3.9, image: require("../img/search/kun.jpg"), inScale: true},
];


// rgba[n].r、rgba[n].g、rgba[n].b 分别获取 rgba[n] 的 r、g、b 值
const rgbaList = [
  { r: 138, g: 43, b: 226 }, // 蓝紫色
  { r: 255, g: 99, b: 71 },  // 番茄红
  { r: 255, g: 215, b: 0 },  // 金色
  { r: 0, g: 128, b: 0 },    // 深绿色
  { r: 0, g: 191, b: 255 },  // 深天蓝色
  { r: 255, g: 165, b: 0 },  // 橙色
  { r: 0, g: 255, b: 127 },  // 春绿色
  { r: 255, g: 20, b: 147 }, // 深粉红色
  { r: 70, g: 130, b: 180 }  // 钢蓝色
];

const Scale: React.FC = () => {
  const [productsAll, setProductsAll] = React.useState(initialProducts);
  const [products, setProducts] = React.useState(initialProducts);
  const [startIndex, setStartIndex] = React.useState(0);
  const productsToShow = 3;
  // const currentProducts = products.slice(startIndex, startIndex + productsToShow);

  // product 是 productsAll 中 inscale 为 true 的每一个对象
  React.useEffect(() => {
    setProducts(productsAll.filter(product => product.inScale));
  }, [productsAll]); 

  const handleNext = () => {
    if (startIndex + productsToShow < products.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const getChartData = () => {
    return {
      labels: ['质量', '评分', '销量', '功能', '价格'],
      datasets: products.map((product, index) => ({
        label: product.name,
        data: [
          product.qualityRating,
          product.rating,
          product.salesRating,
          product.featuresRating,
          product.priceRating,
        ],
        backgroundColor: `rgba(${rgbaList[index % 9].r}, ${rgbaList[index % 9].g}, ${rgbaList[index % 9].b}, ${0.2 + index * 0.14})`,
        borderColor: `rgba(${rgbaList[index % 9].r}, ${rgbaList[index % 9].g}, ${rgbaList[index % 9].b}, 1)`,
        borderWidth: 2,
        pointBackgroundColor: `rgba(${rgbaList[index % 9].r}, ${rgbaList[index % 9].g}, ${rgbaList[index % 9].b}, 1)`,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: `rgba(${rgbaList[index % 9].r}, ${rgbaList[index % 9].g}, ${rgbaList[index % 9].b}, 1)`,
      })),
    };
  };

  const chartOptions = {
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
            size: 14,
          },
          color: '#333',
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#333',
        bodyColor: '#666',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        padding: 10,
      },
    },
    elements: {
      line: {
        tension: 0.1,
      },
    },
  };

  return (
    <div className={ScaleCss.container}>
      <div className={ScaleCss.productContainer}>
        {startIndex > 0 && (
          <button
            onClick={handlePrev}
            className={ScaleCss.navButton}
          >
            <ChevronLeft className={ScaleCss.navIcon} />
          </button>
        )}
        {products.length === 0 ?  <div>
          
          </div>
          : <div className={ScaleCss.productList}>
            {products.map((product, index) => (
              <ProductItem 
                key={product.id}
                product={product}
                index={index}
                productLength={products.length}
                products={productsAll}
                setProducts={setProductsAll}
                startIndex={startIndex}
                isLast={index === startIndex + productsToShow - 1 || index === products.length - 1}
            />

            ))}
          </div>
        }

        {startIndex + productsToShow < products.length && (
          <button
            onClick={handleNext}
            className={ScaleCss.navButton}
          >
            <ChevronRight className={ScaleCss.navIcon} />
          </button>
        )}
      </div>
      <div className={ScaleCss.radar}>
        <Radar data={getChartData()} options={chartOptions} />
      </div>
    </div>
  );
};

export default Scale;