import React, { useEffect, useState } from 'react';
import NewsCard from '@src/component/infomation/news/NewsCard.jsx';
import { Button, Grid } from '@mui/material';
import styled from 'styled-components';
import PagnationComponent from '@src/component/common/PagnationComponent.jsx';
import {
  CategoryButtonContainer,
  InfoContentContainer,
  PagingContainer,
} from '@src/component/infomation/CommonComponents.jsx';
import { useAtom } from 'jotai/react';
import { searchKeywordAtom, selectedNewsCategoryAtom } from '@src/component/infomation/atom.js';
import { NEWS_CATEGORY } from '@src/component/infomation/const.js';
import useFetchNews from '@src/component/infomation/hooks/useFetchNews.jsx';


const StyledButton = styled(Button)`
    margin-right: 10px;
`;

const pageItemNumber = 16;

const NewsContents = () => {
  const [category, setCategory] = useAtom(selectedNewsCategoryAtom);
  const { data } = useFetchNews();// news 데이터 가져오기
  const [page, setPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useAtom(searchKeywordAtom);
  const [dataSearched, setDataSearched] = useState(null);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    if (data === undefined) return;
    if (searchKeyword.trim() === '') {
      setDataSearched(data.filter((item) => item.keyword === category));
    } else {
      setDataSearched(data
        .filter((item) => item.keyword === category)
        .filter((item) =>
          item.title?.toLowerCase().includes(searchKeyword.toLowerCase())
          || item.content?.toLowerCase().includes(searchKeyword.toLowerCase())));
    }
  }, [searchKeyword, data, category]);

  useEffect(() => {
    setTotalPage(Math.ceil((dataSearched?.length ?? pageItemNumber) / pageItemNumber));
  }, [dataSearched]);

  useEffect(() => {
    if (page > totalPage && totalPage > 0)
      setPage(totalPage);
  }, [totalPage]);


  return (
    <>
      <InfoContentContainer>
        <CategoryButtonContainer>
          <StyledButton
            variant={category === NEWS_CATEGORY.FOOD ? 'contained' : 'outlined'}
            onClick={() => {
              setCategory(NEWS_CATEGORY.FOOD);
            }}
          >식단</StyledButton>
          <StyledButton
            variant={category === NEWS_CATEGORY.SPORT ? 'contained' : 'outlined'}
            onClick={() => {
              setCategory(NEWS_CATEGORY.SPORT);
            }}
          >운동</StyledButton>
          <StyledButton
            variant={category === NEWS_CATEGORY.ALLERGY ? 'contained' : 'outlined'}
            onClick={() => {
              setCategory(NEWS_CATEGORY.ALLERGY);
            }}
          >알레르기</StyledButton>
        </CategoryButtonContainer>
        <Grid container spacing={3}>
          {
            dataSearched?.slice(pageItemNumber * (page - 1), pageItemNumber * (page))
              .map((d, index) => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={d + index}>
                    <NewsCard
                      title={d.title}
                      content={d.content}
                      img={d.imglink}
                      url={d.newslink}
                    />
                  </Grid>
                );
              })
          }
        </Grid>
      </InfoContentContainer>
      <PagingContainer>
        <PagnationComponent
          pageState={page}
          handlePageChange={(event, value) => {
            setPage(value);
            window.scrollTo(0, 0);
          }}
          totalPage={totalPage}
        />
      </PagingContainer>
    </>
  )
    ;
};

export default NewsContents;
