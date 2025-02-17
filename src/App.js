import { Box, Container } from "@mui/material";
import Product from "./Product/ProductList.tsx";
import NavigationBar from "./NavigationBar.tsx";
import ProductList from "./Ja.tsx";

export default function Example (){
  return(
    // <ProductList />
    <Box display="flex" height="100vh" bgcolor="#f4f4f4">
      <NavigationBar />
      <Product />
    </Box>
  )
}

