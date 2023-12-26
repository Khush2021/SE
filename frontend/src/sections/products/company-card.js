import PropTypes from "prop-types";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ClockIcon from "@heroicons/react/24/solid/ClockIcon";
import * as Yup from "yup";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  SvgIcon,
  Typography,
  IconButton,
  Modal,
  TextField,
  Button,
} from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import Picture from "src/pages/Picture";
import { useFormik } from "formik";
import axios from "axios";
import { useRouter } from "next/router";

export const CompanyCard = (props) => {
  const router = useRouter();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  let { product } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      productId: product.id,
      productName: product.name,
      productCount: product.count,
      productDescription: product.description,
      productPrice: product.price,
      productMinCount: product.minCount,
      submit: null,
    },
    validationSchema: Yup.object({
      productId: Yup.string().max(255).required("id is required"),
      productName: Yup.string().max(255).required("name is required"),
      productCount: Yup.number().max(255).required("count is required"),
      productPrice: Yup.number().max(255).required("price is required"),
      productDescription: Yup.string().max(255),
      productMinCount: Yup.number().max(255),
    }),
    onSubmit: async (values, helpers) => {
      try {
        setIsModalOpen(false);

        let updatedProduct = {
          id: values.productId,
          count: values.productCount,
          name: values.productName,
          description: values.productDescription,
          price: values.productPrice,
          minCount: values.productMinCount,
        };
        // setProducts([product, ...products]);
        try {
          let res = await axios.post("http://localhost:4000/products/editProduct", {
            ...updatedProduct,
            image: product.image,
          });
          if (res.status === 200) {
            helpers.resetForm();
            handleCloseModal();
            fetchData();
          }
        } catch (error) {
          console.error("Error:", error);
        }

        router.push("/products");
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  const handleUpdateClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteClick = async () => {
    const deleteProduct = {
      id: product.id,
    };
    let response = await axios.post("http://localhost:4000/products/deleteProduct", {
      ...deleteProduct,
    });
    console.log(response.data);
    alert(`product deleted! id: ${product.id}`);
    router.push("/products");
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 3,
          }}
        >
          <Avatar src={product.image} variant="square" sx={{ width: 100, height: 100 }} />
        </Box>
        <Typography align="center" gutterBottom variant="h5">
          {product.name}
        </Typography>
        <Typography align="center" variant="body1">
          {product.description}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack direction="row" spacing={1}>
          <Typography color="text.secondary" display="inline" variant="body2">
            Qty {product.count}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <IconButton onClick={handleUpdateClick}>
            <UpdateIcon />
          </IconButton>
        </Stack>
        <Stack direction="row" spacing={1}>
          {isModalOpen && (
            <Modal
              open={isModalOpen}
              onClose={handleCloseModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <form noValidate onSubmit={formik.handleSubmit}>
                  <Stack spacing={3}>
                    <TextField
                      disabled
                      error={!!(formik.touched.name && formik.errors.name)}
                      fullWidth
                      helperText={formik.touched.name && formik.errors.name}
                      label="Product Id"
                      name="productId"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.productId}
                    />
                    <TextField
                      error={!!(formik.touched.name && formik.errors.name)}
                      fullWidth
                      helperText={formik.touched.name && formik.errors.name}
                      label="Product Name"
                      name="productName"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.productName}
                    />
                    <TextField
                      error={!!(formik.touched.name && formik.errors.name)}
                      fullWidth
                      helperText={formik.touched.name && formik.errors.name}
                      label="Product Description"
                      name="productDescription"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.productDescription}
                    />
                    <TextField
                      error={!!(formik.touched.name && formik.errors.name)}
                      fullWidth
                      helperText={formik.touched.name && formik.errors.name}
                      label="Product Price"
                      name="productPrice"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.productPrice}
                    />
                    <TextField
                      error={!!(formik.touched.name && formik.errors.name)}
                      fullWidth
                      helperText={formik.touched.name && formik.errors.name}
                      label="Product Count"
                      name="productCount"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.productCount}
                    />
                    <TextField
                      error={!!(formik.touched.name && formik.errors.name)}
                      fullWidth
                      helperText={formik.touched.name && formik.errors.name}
                      label="Product Mincount"
                      name="productMinCount"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.productMinCount}
                    />
                  </Stack>
                  {formik.errors.submit && (
                    <Typography color="error" sx={{ mt: 3 }} variant="body2">
                      {formik.errors.submit}
                    </Typography>
                  )}
                  <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained">
                    Add Product
                  </Button>
                </form>
              </Box>
            </Modal>
          )}
          <IconButton onClick={handleDeleteClick}>
            <DeleteIcon />
          </IconButton>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Typography color="text.secondary" display="inline" variant="body1">
            INR {product.price}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

CompanyCard.propTypes = {
  product: PropTypes.object.isRequired,
};
