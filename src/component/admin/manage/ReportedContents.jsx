import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import { Container, TableFooter, TablePagination } from '@mui/material';
import Divider from '@mui/material/Divider';
import { CustomSearchInput } from '@src/component/common/GlobalComponents.jsx';
import ReportsTable from '@src/component/admin/manage/ReportsTable.jsx';


const StyledContainer = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;

`;

const TitleTypo = styled(Typography)`
    margin: 0 0 20px 20px;
`;

const StylePaper = styled(Paper)`
    padding: 20px;
`;
const SearchContainer = styled.div`
    margin: 20px 0;
`;

const ReportedContents = ({ data, title, property }) => {
  const [searchValue, setSearchValue] = useState('');


  return (
    <StyledContainer>
      <StylePaper>
        <TitleTypo variant="h6">{title}</TitleTypo>
        <Divider />
        <SearchContainer>
        <CustomSearchInput
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        />
        </SearchContainer>
        <ReportsTable data={data} property={property} searchValue={searchValue}/>
      </StylePaper>
    </StyledContainer>
  );
};

export default ReportedContents;
