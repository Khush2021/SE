import Head from "next/head";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
  Modal,
  TextField,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CompanyCard } from "src/sections/products/company-card";
import { CompaniesSearch } from "src/sections/products/companies-search";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Picture from "./Picture";
import { useAuth } from "src/hooks/use-auth";

const cloud_secret = "co5ijzzt";
const cloud_name = "dhje36fkk";

const Page = () => {
  const router = useRouter();
  const { user } = useAuth();
  console.log(user.role);
  if (!(user.role === "Admin" || user.role === "StockManager")) {
    alert("access not allowed!");
    router.push("/");
  }
  const formik = useFormik({
    initialValues: {
      productId: "",
      productName: "",
      productCount: null,
      productDescription: "",
      productPrice: null,
      productMinCount: null,
      submit: null,
    },
    validationSchema: Yup.object({
      productId: Yup.string().max(255).required("id is required"),
      productName: Yup.string().max(255).required("name is required"),
      productCount: Yup.number().required("count is required"),
      productPrice: Yup.number().required("price is required"),
      productDescription: Yup.string().max(255),
      productMinCount: Yup.number().max(255),
    }),
    onSubmit: async (values, helpers) => {
      try {
        setIsModalOpen(false);

        let product = {
          id: values.productId,
          count: values.productCount,
          name: values.productName,
          description: values.productDescription,
          price: values.productPrice,
          minCount: values.productMinCount,
          logo: picture,
        };
        // setProducts([product, ...products]);
        try {
          let res;
          if (picture) {
            await uploadImage().then(async (response) => {
              console.log(response);
              res = await axios.post("http://localhost:4000/products/add", {
                ...product,
                image: response.secure_url,
              });
              console.log(res);
            });
          } else {
            res = await axios.post("http://localhost:4000/products/add", { ...product, image: "" });
          }
          console.log(response.secure_url);
          console.log(res);

          if (res.status === 200) {
            helpers.resetForm();
            handleCloseModal();
            fetchData();
          }
        } catch (error) {
          console.error("Error:", error);
        }

        // router.push("/products");
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });
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

  const [products, setProducts] = useState([]);

  const [picture, setPicture] = useState();
  const [readablePicture, setReadablePicture] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/products/getProducts");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    // if
    fetchData();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddProduct = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false); // Function to close the modal
  };

  const uploadImage = async () => {
    let formData = new FormData();
    formData.append("upload_preset", cloud_secret);
    formData.append("file", picture);
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      formData
    );
    return data;
  };

  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Products</Typography>
              </Stack>
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  onClick={() => {
                    handleAddProduct();
                  }}
                >
                  Add
                </Button>
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
                          {/* picture */}
                          <Picture
                            readablePicture={readablePicture}
                            setPicture={setPicture}
                            setReadablePicture={setReadablePicture}
                          />
                        </Stack>
                        {formik.errors.submit && (
                          <Typography color="error" sx={{ mt: 3 }} variant="body2">
                            {formik.errors.submit}
                          </Typography>
                        )}
                        <Button
                          fullWidth
                          size="large"
                          sx={{ mt: 3 }}
                          type="submit"
                          variant="contained"
                        >
                          Add Product
                        </Button>
                      </form>
                    </Box>
                  </Modal>
                )}
              </div>
            </Stack>
            <CompaniesSearch />
            <Grid container spacing={3}>
              {products &&
                products.map((product) => (
                  <Grid xs={12} md={6} lg={4} key={product.id}>
                    <CompanyCard product={product} />
                  </Grid>
                ))}
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination count={3} size="small" />
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
