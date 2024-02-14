import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styled from 'styled-components';

const StyledFormControl = styled(FormControl)`
    min-width: ${({ minwidth }) => minwidth || '60px'};
`;
/**
 * SelectComponent - select 컴포넌트
 * @param props {object} - props
 * @param {string} props.label 라벨
 * @param {string} props.minWidth 최소 너비
 * @param {string} props.state 현재 선택된 값(상태)
 * @param {function} props.handleChange select 컴포넌트의 핸들러
 * @param {[{VALUE: string, LABEL: string}]} props.valueItems 값 목록
 * @returns {Element}
 * @constructor
 */
export default function SelectComponent(props) {

  const { label, minWidth, state, handleChange, valueItems } = props;

  return (
    <StyledFormControl minwidth={minWidth} size="small">
      <InputLabel>{label}</InputLabel>
      <Select
        value={state}
        label={label}
        onChange={handleChange}
      >
        {valueItems && valueItems.map((item, index) => (
          <MenuItem key={index} value={item.VALUE}>{item.LABEL}</MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
}