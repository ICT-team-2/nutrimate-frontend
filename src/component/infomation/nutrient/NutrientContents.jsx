import React, { useEffect, useState } from 'react';
import { InfoContentContainer, PagingContainer } from '@src/component/infomation/CommonComponents.jsx';
import {
  searchKeywordAtom,
  selectedNutrientsAgeCategoryAtom,
  selectedNutrientsGenderCategoryAtom,
} from '@src/component/infomation/atom.js';
import { useAtom } from 'jotai/react';
import NutrientCategory from '@src/component/infomation/nutrient/NutrientCategory.jsx';
import styled from 'styled-components';
import { Grid } from '@mui/material';
import NutrientCard from '@src/component/infomation/nutrient/NutrientCard.jsx';
import PagnationComponent from '@src/component/common/PagnationComponent.jsx';
import useFetchNutrients from '@src/hooks/information/useFetchNutrients.jsx';
import { NUTRIENTS_AGE_CATEGORY, NUTRIENTS_GENDER_CATEGORY } from '@src/component/infomation/const.js';
import LoadingComponent from '@src/component/common/LoadingComponent.jsx';

const CardContainer = styled.div`
    margin-top: 40px;
`;

const pageItemNumber = 16;

const NutrientContents = () => {

  const [gender, setGender] = useAtom(selectedNutrientsGenderCategoryAtom);
  const [age, setAge] = useAtom(selectedNutrientsAgeCategoryAtom);
  const { data, isLoading } = useFetchNutrients();
  const [dataSearched, setDataSearched] = useState(undefined);
  const [searchKeyword, setSearchKeyword] = useAtom(searchKeywordAtom);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    if (data === undefined) return;
    setDataSearched(data.filter((item, index, self) =>
      index === self.findIndex((t) => (
        t.title === item.title
      ))).filter((d) => {
      if (searchKeyword === '') return true;
      return d.title.toLowerCase().includes(searchKeyword.toLowerCase());
    }).filter((d) => {
      if (gender === NUTRIENTS_GENDER_CATEGORY.ALL) return true;
      return d.gender === gender || d.gender === NUTRIENTS_GENDER_CATEGORY.ALL;
    }).filter((d) => {
      if (age === NUTRIENTS_AGE_CATEGORY.ALL) return true;
      return d.age === age || d.age === NUTRIENTS_AGE_CATEGORY.ALL;
    }));
  }, [searchKeyword, data, age, gender]);

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
      <NutrientCategory />
      <CardContainer>
        <Grid container spacing={3}>
          {
            dataSearched?.slice(pageItemNumber * (page - 1), pageItemNumber * (page))
              .map((d, index) => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={d.title + index}>
                    <NutrientCard
                      efficacy={[d.effect1, d.effect2]}
                      img={d.imglink}
                      point={d.star}
                      nutrient={d.title}
                      company={d.company}
                      url={d.link}
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
      </CardContainer>
    </InfoContentContainer>
  );
};


export default NutrientContents;
