import React from 'react';
import FilterCss from './css/filter.module.css';

interface FilterProps {
  filters: {
    priceRange: { min: string; max: string };
    ratingRange: { min: string; max: string };
    brand: string;
  };
  onFilterChange: (newFilters: {
    priceRange: { min: string; max: string };
    ratingRange: { min: string; max: string };
    brand: string;
  }) => void;
}

export function Filter({ filters, onFilterChange }: FilterProps) {
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string,
    type: 'min' | 'max' | 'single' = 'single'
  ) => {
    const { value } = event.target;

    const newFilters = {
      ...filters,
      [field]: field === "brand"
        ? value
        : {
            ...filters[field as "priceRange" | "ratingRange"],
            [type]: value,
          },
    };

    onFilterChange(newFilters);
  };

  return (
    <div className={FilterCss.filter}>
      <div className={FilterCss.filterContainer}>
        <div className={FilterCss.row}>
          <div className={FilterCss.filterBox}>
            <label>价格：</label>
            <input
              type="text"
              value={filters.priceRange.min}
              onChange={(e) => handleInputChange(e, 'priceRange', 'min')}
              placeholder="最低价"
            />
            <span> ~ </span>
            <input
              type="text"
              value={filters.priceRange.max}
              onChange={(e) => handleInputChange(e, 'priceRange', 'max')}
              placeholder="最高价"
            />
          </div>
          <div className={FilterCss.filterBox}>
            <label>评分：</label>
            <input
              type="text"
              value={filters.ratingRange.min}
              onChange={(e) => handleInputChange(e, 'ratingRange', 'min')}
              placeholder="最低分"
            />
            <span> ~ </span>
            <input
              type="text"
              value={filters.ratingRange.max}
              onChange={(e) => handleInputChange(e, 'ratingRange', 'max')}
              placeholder="最高分"
            />
          </div>
          <div className={FilterCss.filterBoxLong}>
            <label>品牌：</label>
            <input
              type="text"
              value={filters.brand}
              onChange={(e) => handleInputChange(e, 'brand')}
              placeholder="品牌名称包含"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
