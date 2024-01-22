import * as React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useAtom } from 'jotai/react';
import { myPageTabAtom } from '@src/component/mypage/atom.js';

export default function CenteredTabs({ tab = null }) {
  const [value, setValue] = useAtom(myPageTabAtom);

  useEffect((() => {
      if (tab !== null) {
        setValue(tab);
      }
    }
  ), []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="게시물" />
        <Tab label="피드" />
        <Tab label="북마크" />
      </Tabs>
    </Box>
  );
}
