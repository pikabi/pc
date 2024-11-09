import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import SelectCss from './css/select.module.css'; // 引入 CSS 模块

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function Select({ options, value, onChange, placeholder = "选择选项" }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (option: Option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className={SelectCss.container} ref={selectRef}>
      <div className={SelectCss.header} onClick={handleToggle}>
        <span className={SelectCss.text}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`${SelectCss.icon} ${isOpen ? SelectCss.rotate : ''}`} />
      </div>
      {isOpen && (
        <div className={SelectCss.options}>
          {options.map((option) => (
            <div
              key={option.value}
              className={SelectCss.option}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
