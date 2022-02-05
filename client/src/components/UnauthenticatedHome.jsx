import { Button, Container, Alert, Grid, Stack } from "@mui/material";
import { Twitter } from "@mui/icons-material";

import { useAuth } from "./AuthProvider";
import { CustomH2 } from "./StyledComponents";

export default function UnauthenticatedHome({ authdata: { authenticated } }) {
  const { handleSignInClick } = useAuth();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={1}></Grid>
      <Grid item xs={12} md={6}>
        <Container>
          <Stack spacing={4}>
            <CustomH2 variant='h2'>
              Delete tweets from your Twitter feed in bulk to protect your privacy or make
              a fresh start.
            </CustomH2>
            <ul className='li-spacing white'>
              <li>
                Due to Twitter’s API limitations, you can only fetch and delete from the
                3.200 most recent tweets.
              </li>
              <li>
                To circumvent that limitation, you can upload the “tweet.js” file present
                in your Twitter data file.
              </li>
            </ul>
            <Alert severity='warning' variant='filled'>
              With Twitter API v2 now released, the new rate limits will render the
              "delete" feature of this app almost useless. So use it while you can !
            </Alert>

            {!authenticated ? (
              <Button
                variant='contained'
                startIcon={<Twitter />}
                onClick={handleSignInClick}
                sx={{
                  backgroundColor: "#1DA1F2",
                }}>
                Sign in with Twitter
              </Button>
            ) : null}
          </Stack>
        </Container>
      </Grid>
      <Grid item xs={12} md={5}></Grid>
    </Grid>
  );
}
