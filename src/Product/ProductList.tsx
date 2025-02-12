import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Typography, Box, Button, Rating, InputBase } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {lightBlue} from '@mui/material/colors';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search'
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: lightBlue[600],
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 6px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#0063cc',
  borderColor: '#0063cc',
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});

const Search = styled('div')(({ theme }) => ({
  borderWidth: '5px',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

interface Product{ 
  id: number,
  title: string,
  category: string,
  price: number,
  stock: number,
  rating: number,
}

interface ProductsResponse {
  products: Product[];
}


export default function CustomizedTables() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
    .then((response) => response.json())
    .then((data: ProductsResponse) => {
      setProducts(data.products);
      setLoading(false);
    })
    .catch((error) => {
      console.error('Có lỗi xảy ra:', error);
      setLoading(false);
    });
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
      <Box flex={1} p={4} display="flex" flexDirection="column">
        <Typography variant="h5" fontWeight="bold" mb={2}>Sản phẩm</Typography>
        <Paper sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Tìm kiếm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="small"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <BootstrapButton variant="contained" style={{borderRadius: 20}} >
              <AddCircleIcon />Thêm sản phẩm
            </BootstrapButton>
          </Box>
          <TableContainer sx={{ flexGrow: 2, maxHeight: "500px", overflowY: "auto" }}>
            <Table stickyHeader>
              <TableHead>
                <StyledTableRow sx={{ backgroundColor: "#e3f2fd" }}>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell>Tên sản phẩm</StyledTableCell>
                  <StyledTableCell>Loại</StyledTableCell>
                  <StyledTableCell>Giá tiền</StyledTableCell>
                  <StyledTableCell>Số lượng</StyledTableCell>
                  <StyledTableCell align="center">Đánh giá</StyledTableCell>
                  <StyledTableCell align="center">Chi tiết</StyledTableCell>
                  <StyledTableCell align="center">Cập nhật / Xóa</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.map((product: Product) => (
                  <StyledTableRow key={product.id}>
                    <StyledTableCell>{product.id}</StyledTableCell>
                    <StyledTableCell>{product.title}</StyledTableCell>
                    <StyledTableCell>{product.category}</StyledTableCell>
                    <StyledTableCell>{product.price}$</StyledTableCell>
                    <StyledTableCell>{product.stock}</StyledTableCell>
                    <StyledTableCell align="center"><Rating name={product.title} value={product.rating} precision={0.2} readOnly /></StyledTableCell>
                    <StyledTableCell align="center" sx={{ color: "blue", cursor: "pointer" }}>Xem chi tiết</StyledTableCell>
                    <StyledTableCell align="center">
                      <Button color="warning"><CreateIcon /></Button>
                      <Button color="error"><DeleteIcon /></Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
  );
}