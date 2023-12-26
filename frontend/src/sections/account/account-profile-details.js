import { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import axios from "axios";

export const AccountProfileDetails = () => {
  const {user} = useAuth()
  console.log(useAuth())
  const [values, setValues] = useState({
    firstName: user?.name?.split(' ')[0] || 'Yogesh',
    lastName: user?.name?.split(' ')[1] || 'Rathee',
    email: user?.email || 'test@gmail.com',
    phone: user?.phoneNo || '9999999996',
  });

  const firstName = user?.name.split(' ')[0]
  const lastName = user?.name.split(' ')[1]

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
    },
    []
  );

  const updateDetails = async () => {
    try {
      const data = {
        name: values.firstName + " " + values.lastName,
        email: values.email,
        phone: values.phone,
        id: user._id
      }

      const res = await axios.post("http://localhost:4000/user/updateUserDetails", {
        ...data
      })
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  helperText="Please specify the first name"
                  label="First name"
                  name="firstName"
                  onChange={handleChange}
                  required
                  value={firstName}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  onChange={handleChange}
                  required
                  value={lastName}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  required
                  value={values.email}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  onChange={handleChange}
                  type="string"
                  value={values.phone}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" 
          onClick={async() => await updateDetails()}>
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
