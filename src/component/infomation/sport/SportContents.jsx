import React, { useEffect, useState } from 'react';
import {
  CategoryButtonContainer,
  InfoContentContainer,
  PagingContainer,
} from '@src/component/infomation/CommonComponents.jsx';
import { Button, Grid } from '@mui/material';
import SportCard from '@src/component/infomation/sport/SportCard.jsx';
import PagnationComponent from '@src/component/common/PagnationComponent.jsx';
import { useAtom } from 'jotai/react';
import { searchKeywordAtom } from '@src/component/infomation/atom.js';
import useFetchSportVideo from '@src/component/infomation/hooks/useFetchSportVideo.jsx';
import LoadingComponent from '@src/component/common/LoadingComponent.jsx';
import { SPORT_CATEGORY } from '@src/component/infomation/const.js';
import styled from 'styled-components';

const StyledButton = styled(Button)`
    margin-right: 10px;
`;

const pageItemNumber = 12;
const youtubeRegex = /https?:\/\/.+\/embed\/(.+)\?.+/;

const convertYoutubeUrl = (url) => {
  const result = url.match(youtubeRegex);
  return `https://youtube.com/watch?v=${result[1]}`;
};

const SportContents = () => {
  const [searchKeyword, setSearchKeyword] = useAtom(searchKeywordAtom);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const { data, isLoading } = useFetchSportVideo();
  const [dataSearched, setDataSearched] = useState(undefined);
  const [category, setCategory] = useState(SPORT_CATEGORY.ALL);

  useEffect(() => {

    if (data === undefined) return;
    setDataSearched(data
      .map((d) => {
        return { ...d, videolink: convertYoutubeUrl(d.videolink) };
      })
      .filter((d) => {
        if (category === SPORT_CATEGORY.ALL) return true;
        return d.category === category;
      }).filter((d) => {
        if (searchKeyword.trim() === '') return true;
        return d.title.toLowerCase().includes(searchKeyword.toLowerCase());
      }));
  }, [data, category, searchKeyword]);

  useEffect(() => {
    // console.log(dataSearched);
    setTotalPage(Math.ceil((dataSearched?.length ?? pageItemNumber) / pageItemNumber));
  }, [dataSearched]);

  useEffect(() => {
    if (page > totalPage && totalPage > 0)
      setPage(totalPage);
  }, [totalPage]);

  if (isLoading) return <LoadingComponent />;

  return (
    <InfoContentContainer>
      <CategoryButtonContainer>
        {Object.values(SPORT_CATEGORY).map((value) => (
          <StyledButton
            onClick={() => {
              setCategory(value);
            }}
            variant={value === category ? 'contained' : 'outlined'}
            key={value}>
            {value}
          </StyledButton>
        ))}
      </CategoryButtonContainer>
      <Grid container spacing={4}>
        {
          dataSearched?.slice((page - 1) * pageItemNumber, page * pageItemNumber).map((d, index) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={4} key={d + index}>
                <SportCard
                  img={d.imglink}
                  title={d.title}
                  category={d.category}
                  url={d.videolink}
                />
              </Grid>
            );
          })
        }
      </Grid>
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
    </InfoContentContainer>
  );
};

export default SportContents;
