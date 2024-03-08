import React from 'react';
import { useAtom } from 'jotai/react';
import { Tabs, Tab } from '@mui/material';
import { atom } from 'jotai';

export const selectedPriceCategoryAtom = atom('5,000원 미만');

const PRICE_CATEGORY = {
    UNDER_5000: {name:'5,000원 미만', price:2500},
    FROM_5000_TO_10000: {name:'5,000~10,000원', price:7500},
    FROM_10000_TO_20000: {name:'10,000~20,000원', price:15000},
    FROM_20000_TO_30000: {name:'20,000~30,000원', price:25000},
    OVER_30000: {name:'30,000원 이상', price:35000},
};

const PriceCategory = ({ onSelectPrice }) => {
    const [priceCategory, setPriceCategory] = useAtom(selectedPriceCategoryAtom);
    const categories = Object.values(PRICE_CATEGORY);
    const currentTabIndex = categories.findIndex(category => category.name === priceCategory);

    const handleTabChange = (event, newValue) => {
      const newCategory = categories[newValue];
      setPriceCategory(newCategory.name);
      onSelectPrice(newCategory.price);
    };
  
    return (
        <Tabs style={{ marginLeft: '10px' }}
            value={currentTabIndex}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
        >
        {categories.map((value) => (
          <Tab label={value.name} key={value.name} sx={{ fontSize: '0.7rem' }} />
        ))}
      </Tabs>
    );
};

export default PriceCategory;