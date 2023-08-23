import { Box, Button, MenuItem, TextField, Typography } from "@mui/material/";
import useHttp from "../../hooks/useHttp";
import { Controller, set, useForm } from "react-hook-form";
import { Product } from "../../models/Product";
import { useEffect, useState } from "react";
import { Category } from "../../models/Category";
import { RootState, store } from "../../service/Store";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  setProductToEdit,
  updateProduct,
} from "../../service/product-slice";

const ProductForm = () => {
  const [categories, setCategories] = useState([]);
  const { sendRequest } = useHttp();
  const [productValue, setProductValue] = useState<Product | null>(null);
  const productToEdit = useSelector(
    (state: RootState) => state.product.productToEdit
  );

  const [selectedImage, setSelectedImage] = useState(productValue?.imagePath);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<Product>();
  const imageUrl = productToEdit
    ? `http://localhost:4000/${productToEdit.imagePath}`
    : selectedImage;

  const displayImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          setSelectedImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (productToEdit) {
      setValue("productName", productToEdit?.productName);
      setValue("categoryId", productToEdit?.categoryId);
      setValue("price", productToEdit?.price);
    }
  }, [productToEdit, setValue]);

  const prepareFormData = (data: Product) => {
    const formData = new FormData();
    formData.append("productName", data.productName);
    formData.append("categoryId", data.categoryId);
    formData.append("price", data.price.toString());
    formData.append(
      "imagePath",
      typeof data.imagePath === "string" ? data.imagePath : data.imagePath[0]
    );
    return formData;
  };

  const getCategories = async () => {
    try {
      const response = await sendRequest("get", "/category/");
      setCategories(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreateProduct = async (data: Product) => {
    try {
      const formData = prepareFormData(data);
      const response = await sendRequest("post", "/product/", {
        body: formData,
      });
      if (response) return dispatch(addProduct(response));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateProduct = async (data: Product) => {
    try {
      const formData = prepareFormData(data);
      const response = await sendRequest(
        "put",
        `/product/${productToEdit?._id}`,
        {
          body: formData,
        }
      );
      if (response) {
        dispatch(updateProduct(response));
        dispatch(setProductToEdit(null));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    if (productToEdit) {
      await handleUpdateProduct(data);
      setSelectedImage(undefined);
      reset();
    } else {
      await handleCreateProduct(data);
      setSelectedImage(undefined);
      reset();
    }
  });

  const resetForm = () => {
    dispatch(setProductToEdit(null));
    setSelectedImage(undefined);
    reset();
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "30rem",
          margin: "auto",
          mt: "3.2rem",
          backgroundColor: "#f5f5f5",
          padding: "1rem",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
        }}
        onSubmit={onSubmit}>
        <Typography variant="h4" align="center">
          {productToEdit ? "Update Product" : "Add Product"}
        </Typography>
        <TextField
          {...register("productName")}
          id="ProductName"
          label="Product name"
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <Controller
          name="categoryId"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              fullWidth
              {...field}
              id="categoryId"
              label="Category"
              select>
              {categories.map((category: Category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.categoryName}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <TextField
          fullWidth
          {...register("price")}
          id="price"
          label="Price"
          type="number"
          inputProps={{ step: 0.1 }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          {...register("imagePath")}
          id="image"
          type="file"
          onChange={displayImg}
        />
        <img
          src={imageUrl}
          id="displayUploadingImg"
          alt=""
          style={{
            borderRadius: "10px",
            width: "50%",
            margin: "auto",
          }}
        />
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
          <Button fullWidth type="submit">
            {productToEdit ? "Update" : "Add"}
          </Button>
          <Button fullWidth type="reset" onClick={resetForm}>
            Cancel
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ProductForm;
