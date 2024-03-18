import React, { useEffect, useState } from 'react';
import { InfoContentContainer, PagingContainer } from '@src/component/infomation/CommonComponents.jsx';
import { Grid } from '@mui/material';
import PagnationComponent from '@src/component/common/PagnationComponent.jsx';
import RecipeCard from '@src/component/infomation/recipe/RecipeCard.jsx';
import { useAtom } from 'jotai/react';
import { searchKeywordAtom } from '@src/component/infomation/atom.js';
import LoadingComponent from '@src/component/common/LoadingComponent.jsx';
import useFetchFoodRecipe from '@src/hooks/information/useFetchFoodRecipe.jsx';
import Image from './recipe.png';

const pageItemNumber = 16;

const RecipeContents = () => {
  const [searchKeyword, setSearchKeyword] = useAtom(searchKeywordAtom);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const { data, isLoading } = useFetchFoodRecipe();
  const [dataSearched, setDataSearched] = useState(undefined);

  useEffect(() => {
    if (data === undefined) return;
    setDataSearched(data.filter((item) => {
      if (searchKeyword === '') return true;
      return item.title.toLowerCase().includes(searchKeyword.toLowerCase());
    }));
  }, [data, searchKeyword]);

  useEffect(() => {
    setTotalPage(Math.ceil((dataSearched?.length ?? pageItemNumber) / pageItemNumber));
  }, [dataSearched]);

  useEffect(() => {
    if (page > totalPage && totalPage > 0)
      setPage(totalPage);
  }, [totalPage]);


  if (isLoading) return <LoadingComponent />;

  return (
    <InfoContentContainer>
      <img src={Image} alt="recipe" style={{ width: '100%', height: '400px', marginBottom: '20px' }} />
      <Grid container spacing={3}>
        {
          dataSearched?.slice((page - 1) * pageItemNumber, page * pageItemNumber)
            .map((d, index) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={d + index}>
                  <RecipeCard {...d} />
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

export default RecipeContents;
