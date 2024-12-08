/**
 * @fileoverview scale page
 * @file src/pages/Scale.tsx
 */

import React from 'react';
import ProductItem from './scale/ProductItem.tsx';
import ScaleCss from './css/scale.module.css';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Radar, Bar } from 'react-chartjs-2';
import { useLoginContext } from '../AppContext.tsx';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
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
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Filler,
  Tooltip,
  Legend,
);

interface Product {
  id: number;
  name: string;
  price: number;
  extraPrice: number;
  shopRating: number;
  sales: number;
  priceRating: number;
  hotRating: number;
  discountRating: number;
  varietyRating: number;
  brand: string;
  location: string;
  image: string;
  platform: string;
  inScale: boolean;
}

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
  const {id} = useLoginContext();
  const [productsAll, setProductsAll] = React.useState<Product[]>([]);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [startIndex, setStartIndex] = React.useState(0);
  const [stacked, setStacked] = React.useState(false);
  const productsToShow = 3;

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(id);
        const response = await fetch(`http://localhost:5000/scale?id=${id}`,{
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        console.log(response);
        if (response.ok) {
          let data = await response.json();
          console.log(data);
          if (data.length === 0) {
            setProductsAll([]);
          }
          else {
            setProductsAll(data.map(item => ({
              id: item.id,
              name: item.name,
              price: item.price,
              extraPrice: item.extraPrice,
              shopRating: item.shopRating,
              sales: item.total_sales,
              priceRating: item.priceRating,
              hotRating: item.hotRating,
              discountRating: item.discountRating,
              varietyRating: item.varietyRating,
              brand: item.shopName,
              location: item.procity,
              image: item.image_url,
              platform: item.platform,
              inScale: true
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
      labels: ['价格', '商家', '热度', '折扣', '多样'],
      datasets: products.map((product, index) => ({
        label: product.name.length > 18 ? product.name.slice(0, 15) + '...' : product.name,
        data: [
          product.priceRating,
          product.shopRating,
          product.hotRating,
          product.discountRating,
          product.varietyRating,
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

  const getBarData = () => {
    return {
      labels: products.map(product => product.name.length > Math.max(8, 60 / products.length) ? product.name.slice(0, Math.max(8, 60 / products.length) - 1) + '...' : product.name),
      datasets: [
        {
          label: '价格',
          data: products.map(product => product.priceRating),
          backgroundColor: 'rgba(136, 132, 216, 0.8)',
        },
        {
          label: '商家',
          data: products.map(product => product.shopRating),
          backgroundColor: 'rgba(130, 202, 157, 0.8)',
        },
        {
          label: '热度',
          data: products.map(product => product.hotRating),
          backgroundColor: 'rgba(255, 198, 88, 0.8)',
        },
        {
          label: '折扣',
          data: products.map(product => product.discountRating),
          backgroundColor: 'rgba(255, 99, 71, 0.8)',
        },
        {
          label: '多样',
          data: products.map(product => product.varietyRating),
          backgroundColor: 'rgba(0, 191, 255, 0.8)',
        }
      ],
    };
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        stacked: false,
      },
      y: {
        stacked: false,
      },
    },
  };

  const stackedBarOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (<div className={ScaleCss.containerAll}>
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
        {products.length === 0 ?  <div className={ScaleCss.noItemText}>
            暂无商品，请前往搜索页面添加！
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
                isLast={index === startIndex + productsToShow - 1 || index === products.length - 1 || index === startIndex - 1}
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
      <div className={ScaleCss.chartContainer}>
        <div className={ScaleCss.radar}>
          <Radar data={getChartData()} options={chartOptions} />
        </div>
        <div className={ScaleCss.bar}>
          {
            stacked ? <h2 className={ScaleCss.barTitle}>堆叠条形图</h2> : <h2 className={ScaleCss.barTitle}>条形图</h2>
          }
          {stacked ? <Bar data={getBarData()} options={stackedBarOptions} /> :
            <Bar data={getBarData()} options={barOptions}/>
          }
          <button onClick={() => setStacked(!stacked)} className={ScaleCss.stackedButton}>
            {stacked ? '取消堆叠' : '堆叠'}
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Scale;