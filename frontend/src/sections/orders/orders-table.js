import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Modal,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";
import { SeverityPill } from "src/components/severity-pill";
import { useState } from "react";
import axios from "axios";

const statusMap = {
  Pending: "warning",
  Delivered: "success",
  Paid: "success",
};

export const OrdersTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    fetchOrders,
  } = props;

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

  console.log(items);

  const [openModal, setOpenModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOpenModal = (orderId) => {
    setSelectedOrderId(orderId);
    setOpenModal(true);
    const order = items.find((order) => order.orderId === orderId);
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedOrderId(null);
  };
  const handlePay = async () => {
    let orderId = selectedOrderId;
    let res = await axios
      .post("http://localhost:4000/orders/updateOrder", { orderId })
      .then((response) => {
        alert("Payment processed successfully!", response.data);
        fetchOrders();
        handleCloseModal();
      })
      .catch((error) => {
        alert("Error processing payment:", error);
        handleCloseModal();
      });
  };

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                {/* <TableCell>Total Price</TableCell> */}
                <TableCell>Payment Status</TableCell>
                <TableCell>Order Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((order) => {
                return (
                  <TableRow
                    hover
                    key={order.orderId}
                    onClick={() => {
                      handleOpenModal(order.orderId);
                    }}
                  >
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        {order?.customer.name}
                      </Stack>
                    </TableCell>
                    <TableCell>{order?.customer.email}</TableCell>
                    {/* <TableCell>{order?.totalPrice}</TableCell> */}
                    <TableCell>
                      <SeverityPill color={statusMap[order?.paymentInfo?.status]}>
                        {order?.paymentInfo?.status}
                      </SeverityPill>
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={statusMap[order.orderStatus]}>
                        {order?.orderStatus}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="order-modal-title"
        aria-describedby="order-modal-description"
      >
        <Box
          sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        >
          <Card>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Product Quantity</TableCell>
                  <TableCell>Product Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Fetch and display order items based on selectedOrderId */}
                {items
                  .find((order) => order.orderId === selectedOrderId)
                  ?.orderItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.price}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <Typography
              variant="subtitle1"
              sx={{ textAlign: "center", paddingRight: 2, paddingTop: 2 }}
            >
              Total Amount: 100
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
              <Button
                variant="contained"
                size="large"
                onClick={handlePay}
                disabled={selectedOrder?.paymentInfo?.status === "Paid"}
              >
                Pay
              </Button>
            </Box>
          </Card>
        </Box>
      </Modal>
    </Card>
  );
};

OrdersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
