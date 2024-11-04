import {Skeleton, Stack} from '@mui/material';

export const CardSkeleton = () => {
  return (
    <Stack spacing={1}>
      <Skeleton
        variant="text"
        sx={{
          width: '100%',
          maxWidth: 160,
          display: 'block',
          mx: 'auto !important',
        }}
      />
      {/* The size of actual image */}
      <Skeleton sx={{height: 200}} animation="wave" variant="rectangular" />

      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="rounded" height={40} />
    </Stack>
  );
};
