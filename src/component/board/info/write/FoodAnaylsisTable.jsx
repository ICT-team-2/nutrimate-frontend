import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import styled from 'styled-components';
import { useAtom } from 'jotai/react';
import { foodIdAtom } from '@src/component/board/info/atom.js';
import useFetchFoodListByFoodId from '@src/hooks/record/food/useFetchFoodListByFoodId.jsx';
import { nanoid } from 'nanoid';

const StyledPaper = styled(Paper)`
    height: auto;
    width: 100%;
`;
const StyledTableRow = styled(TableRow)`
    cursor: ${({ editmode }) => editmode === 'true' ? 'pointer' : 'default'};
`;

const StyledTableContainer = styled(TableContainer)`
    height: ${({ height }) => height || 'auto'};
    min-height: ${({ minheight }) => minheight || 'auto'};
    overflow-y: auto;
    padding: ${({ editmode }) => editmode === 'true' ? '0' : '0 5px 0 10px'};

`;

function createData(index, name, calories, fat, carbs, protein) {
  return {
    index,
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    index: 'name',
    numeric: false,
    label: '음식명',
  },
  {
    id: 'calories',
    numeric: true,
    label: '칼로리',
  },
  {
    id: 'fat',
    numeric: true,
    label: '지방',
  },
  {
    id: 'carbs',
    numeric: true,
    label: '탄수화물',
  },
  {
    id: 'protein',
    numeric: true,
    label: '단백질',
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    editMode,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        <TableCell padding={editMode ? 'checkbox' : 'none'}>
          {editMode && <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />}
        </TableCell>
        {headCells.map((headCell) => {
            const id = nanoid();
            return (
              <TableCell
                key={id}
                align={headCell.numeric ? 'right' : 'left'}
                padding="none"
                sx={{ paddingRight: '10px' }}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            );
          },
        )}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { datas, setDatas, selected, setSelected, numSelected, editMode } = props;
  const [foodId, setFoodId] = useAtom(foodIdAtom);

  const deleteSelected = () => {
    setFoodId(foodId.filter((f, index) => {
      return !selected.includes(index);
    }));
    setSelected([]);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity,
            ),
        }),
      }}
    >
      {editMode && numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" component="div">
          분석결과
        </Typography>
      )}

      {editMode && numSelected > 0 && (
        <IconButton onClick={deleteSelected}>
          <DeleteIcon />
        </IconButton>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function FoodAnaylsisTable({ height, editMode, minheight }) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [datas, setDatas] = useState([]);
  const [foodId, setFoodId] = useAtom(foodIdAtom);
  const { data: foodList } = useFetchFoodListByFoodId(foodId);


  useEffect(() => {
    if (!foodList) return;
    setDatas(foodList?.map((f, index) => {
      return createData(index, f.foodName,
        f.foodCal, f.foodProvi,
        f.foodCarbo, f.foodProtein);
    }) ?? []);
  }, [foodList]);


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event, datas) => {
    if (event.target.checked) {
      const newSelected = datas.map((n) => n.index);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const visibleRows = React.useMemo(
    () => stableSort(datas, getComparator(order, orderBy)),
    [order, orderBy, datas],
  );

  return (
    <StyledPaper>
      <EnhancedTableToolbar
        editMode={editMode}
        datas={datas}
        setDatas={setDatas}
        selected={selected}
        setSelected={setSelected}
        numSelected={selected.length} />
      <StyledTableContainer
        editmode={editMode + ''}
        height={height}>
        <Table size="small">
          <EnhancedTableHead
            editMode={editMode}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={(e) => handleSelectAllClick(e, datas)}
            onRequestSort={handleRequestSort}
            rowCount={datas.length}
          />
          <TableBody>
            {visibleRows.map((d, index) => {
              const isItemSelected = isSelected(d.index);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <StyledTableRow
                  hover={editMode}
                  onClick={(event) => {
                    if (!editMode) return;
                    handleClick(event, d.index);
                  }}
                  role={editMode ? 'checkbox' : 'none'}
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={d.index}
                  selected={isItemSelected}
                  editmode={editMode + ''}
                >
                  <TableCell padding={editMode ? 'checkbox' : 'none'}>
                    {editMode && <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      inputProps={{
                        'aria-labelledby': labelId,
                      }}
                    />}
                  </TableCell>
                  <TableCell
                    component="th"
                    id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {d.name}
                  </TableCell>
                  <TableCell align="right">{d.calories}</TableCell>
                  <TableCell align="right">{d.fat}</TableCell>
                  <TableCell align="right">{d.carbs}</TableCell>
                  <TableCell align="right">{d.protein}</TableCell>
                </StyledTableRow>
              );
            })}
            {7 - (datas?.length ?? 0) > 0 &&
              <TableRow
                style={{
                  height: 33,
                }}
              >
                <TableCell
                  height={33 * (6 - (datas?.length ?? 0))}
                  rowSpan={6 - (datas?.length ?? 0)}
                  colSpan={6} />
              </TableRow>}

          </TableBody>
        </Table>
      </StyledTableContainer>
    </StyledPaper>
  );
}

FoodAnaylsisTable.defaultProps = {
  foodId: Array.from({ length: 10 }).map((_, i) => i + 1),
  editMode: false,
};
