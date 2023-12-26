import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';
import { useEffect, useState } from 'react';
import axios from 'axios';

const statusMap = {
  Pending: 'warning',
  Delivered: 'success',
  Paid: 'success'
};

export const OverviewLatestOrders = (props) => {
  const [orders, setOrders] = useState([])

  const fetchLatestOrders = async () => {
    try {
      const res = await axios.get("http://localhost:4000/orders/getLatest")
      console.log(res.data)
      setOrders(res.data)
    }
    catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
   fetchLatestOrders()
  }, [])

  return (
    <Card>
      <CardHeader title="Latest Orders" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Order
                </TableCell>
                <TableCell>
                  Customer
                </TableCell>
                <TableCell sortDirection="desc">
                  Date
                </TableCell>
                <TableCell>
                  Payment Status
                </TableCell>
                <TableCell>
                  Order Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => {
                const createdAt = format(new Date(order.createdAt), 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={order.id}
                  >
                    <TableCell>
                      {order?.orderId}
                    </TableCell>
                    <TableCell>
                      {order?.customer?.name}
                    </TableCell>
                    <TableCell>
                      {createdAt}
                    </TableCell>
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
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestOrders.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object
};
