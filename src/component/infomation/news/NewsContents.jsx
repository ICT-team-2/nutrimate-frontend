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
  const [category, setCategory] = useState(NEWS_CATEGORY.FOOD);
  const { data } = useFetchNews();// news 데이터 가져오기
  const [page, setPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useAtom(searchKeywordAtom);
  const [dataSearched, setDataSearched] = useState(null);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    if (data === undefined) return;
    setDataSearched(
      data.filter((d) => {
        if (category === NEWS_CATEGORY.ALL) return true;
        return d.keyword === category;
      }).filter((d) => {
        if (searchKeyword.trim() === '') return true;
        return (d.title.toLowerCase().includes(searchKeyword.toLowerCase()) || d.content?.toLowerCase().includes(searchKeyword.toLowerCase()));
      }));
  }, [data, category, searchKeyword]);


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
        {Object.values(NEWS_CATEGORY).map((value) => {
    // 원하는 값으로 수정
        const modifiedValue = value === NEWS_CATEGORY.FOOD ? '식단' : value === NEWS_CATEGORY.SPORT ? '운동' : '알레르기';

          return (
            <StyledButton
              variant={value === category ? 'contained' : 'outlined'}
              onClick={() => {
                setCategory(value);
              }}
              key={value}
            >
              {modifiedValue}
            </StyledButton>
          );
        })}
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
                      img={d.imglink ===null ? "/src/asset/image/NoImage.png" :d.imglink}
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
