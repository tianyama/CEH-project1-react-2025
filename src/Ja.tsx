import React, { useEffect, useState } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Avatar, Typography, Box, List, ListItemButton, ListItemText } from "@mui/material";

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box display="flex" height="100vh" bgcolor="#f4f4f4">
      {/* Sidebar */}
      <Box width="20%" bgcolor="white" p={2} boxShadow={1}>
        <Typography variant="h6" fontWeight="bold">Appname</Typography>
        <Box mt={4} display="flex" alignItems="center">
          <Avatar src="https://via.placeholder.com/40" />
          <Box ml={2}>
            <Typography fontWeight="bold">Nguyen Van B</Typography>
            <Typography variant="body2" color="textSecondary">Admin</Typography>
          </Box>
        </Box>
        <List>
          <ListItemButton> <ListItemText primary="🏠 Trang chủ" /> </ListItemButton>
          <ListItemButton selected> <ListItemText primary="📦 Sản phẩm" /> </ListItemButton>
          <ListItemButton> <ListItemText primary="👥 Khách hàng" /> </ListItemButton>
          <ListItemButton> <ListItemText primary="📜 Đơn hàng" /> </ListItemButton>
        </List>
      </Box>

      {/* Main Content */}
      <Box flex={1} p={4} display="flex" flexDirection="column">
        <Typography variant="h5" fontWeight="bold" mb={2}>Sản phẩm</Typography>
        <Paper sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <TextField 
              variant="outlined"
              placeholder="Tìm kiếm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="small"
            />
            <Button variant="contained" color="primary">+ Thêm sản phẩm</Button>
          </Box>
          <TableContainer sx={{ flexGrow: 1, maxHeight: "500px", overflowY: "auto" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
                  <TableCell>Mã sản phẩm</TableCell>
                  <TableCell>Tên sản phẩm</TableCell>
                  <TableCell>Loại</TableCell>
                  <TableCell>Giá tiền</TableCell>
                  <TableCell>Số lượng</TableCell>
                  <TableCell>Đánh giá</TableCell>
                  <TableCell>Chi tiết</TableCell>
                  <TableCell>Cập nhật / Xóa</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.map((product: Product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.rating}</TableCell>
                    <TableCell sx={{ color: "blue", cursor: "pointer" }}>Xem chi tiết</TableCell>
                    <TableCell>
                      <Button color="warning">✏️</Button>
                      <Button color="error">🗑️</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  );
};

export default ProductList;
