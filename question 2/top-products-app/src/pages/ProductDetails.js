import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <CircularProgress />;

  if (!product) return <Typography>No product found</Typography>;

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h4">{product.name}</Typography>
          <Typography color="textSecondary">{product.company}</Typography>
          <Typography>Category: {product.category}</Typography>
          <Typography>Price: ${product.price}</Typography>
          <Typography>Rating: {product.rating}</Typography>
          <Typography>Discount: {product.discount}%</Typography>
          <Typography>
            Availability: {product.availability ? "In Stock" : "Out of Stock"}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetails;
