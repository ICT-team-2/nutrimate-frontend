import { styled as muiStyled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import { FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';

const FIELD_WIDTH = 'calc(100% + 60px)';

export const UserInfoContainerDiv = styled.div`
    display: flex;
    width: 100%;
    margin: 30px 0;
`;


const StyledTypography = muiStyled(Typography)`
    margin-left: 30px;
`;

const MoreInfoTypo = muiStyled(StyledTypography)`
    margin-top: auto;
    margin-bottom: auto;
    min-width: ${({ minWidth }) => minWidth || '48px'};
    text-align: ${({ textAlign }) => textAlign || 'left'};
`;
const InfoContainer = styled.div`
    display: flex;
`;
const InfoDiv = styled.div`
    font-size: 1.25rem;
    height: 60px;
    background-color: ${({ theme }) => theme['dark-background']};
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto 30px;
    width: 100%;
`;
const LastInfoDiv = styled(InfoDiv)`
    margin-right: 30px;
`;

const SecondInfoTypo = muiStyled(MoreInfoTypo)`
    margin-left: 0px;
    min-width: ${({ minWidth }) => minWidth || '48px'};
    text-align: ${({ textAlign }) => textAlign || 'left'};
  `;

/**
 * 제공된 속성을 기반으로 추가 정보를 생성합니다.
 *
 * @param {{isDouble: boolean, title: string[], info: string[]}} props - isDouble, title 및 info를 포함하는 props 객체
 * @param {boolean} props.isDouble - 추가 정보가 두 개인지 여부
 * @param {string[]} props.title - 추가 정보의 제목
 * @param {string[]} props.info - 추가 정보의 내용
 * @param {string[]} props.minWidth - 제목의 길이
 * @param {string[]} props.textAlign - 제목의 정렬 방식
 * @return {JSX} 추가 정보 컴포넌트
 */
const AdditionalInfos = (props) => {
  const { isDouble, title, info, minWidth, textAlign } = props;
  return (
    <UserInfoContainerDiv>
      <InfoContainer>
        <MoreInfoTypo
          variant="subtitle1"
          minWidth={minWidth[0]}
          textAlign={textAlign[0]}
        >{title[0]}</MoreInfoTypo>
      </InfoContainer>
      <InfoDiv>
        <div style={{ marginBottom: '3px' }}>{info[0]}</div>
      </InfoDiv>
      {isDouble && (<>
        <FlexGrowDiv />
        <InfoContainer>
          <SecondInfoTypo
            minWidth={minWidth[1]}
            variant="subtitle1"
            textAlign={textAlign[1]}
          >{title[1]}
          </SecondInfoTypo>
        </InfoContainer>
        <LastInfoDiv>
          <div style={{ marginBottom: '3px' }}>{info[1]}</div>
        </LastInfoDiv>
      </>)}
    </UserInfoContainerDiv>
  );
};
AdditionalInfos.defaultProps = {
  isDouble: false,
  title: ['몸무게', '키'],
  info: ['-', '-'],
  minWidth: ['48px', '48px'],
  textAlign: ['left', 'left'],
};

export default AdditionalInfos;
