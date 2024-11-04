import {DeleteOutline} from '@mui/icons-material';
import {Button, Card, CardActions, CardContent, CardMedia, Stack, Typography} from '@mui/material';
import {formatRelative} from 'date-fns';
import {useTranslation} from 'react-i18next';
// components
import {AppButton} from '~/global/components/app-button';
// api
import {ApiProduct} from '~/api-client/types';

type CardItemProps = {
  item: ApiProduct;
  doDeleteItem: (item: ApiProduct) => void;
};

export const CardItem: React.FC<CardItemProps> = ({item, doDeleteItem}) => {
  const {t} = useTranslation(['common']);

  return (
    <Card>
      <CardContent sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
        <Stack direction={'row'} alignItems={'center'} spacing={1} justifyContent={'center'}>
          <Typography textAlign={'center'} variant="h5">
            {item.title.en || item.title.ar}
          </Typography>

          {item.isActive ? (
            <Typography variant="caption" color="success">
              {t('common:active')}
            </Typography>
          ) : null}
        </Stack>

        {/* The 'The 'no image' placeholder can be displayed if there no image */}
        <CardMedia
          component="img"
          height="200"
          image="https://images.unsplash.com/photo-1730470316489-0379f25dfabb?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Product image"
        />

        <Stack direction={'row'} spacing={1} alignItems={'center'} sx={{mt: 1}}>
          <Typography variant="body2">Price:</Typography>
          <Typography variant="body2" color="textDisabled">
            ${Number(item.price).toLocaleString() || '---'}
          </Typography>
        </Stack>
        <Stack direction={'row'} spacing={1} alignItems={'center'}>
          <Typography variant="body2">Sale Price:</Typography>
          <Typography variant="body2" color="textDisabled">
            {item?.priceSale ? '$' + Number(item.priceSale).toLocaleString() : '---'}
          </Typography>
        </Stack>

        <Stack direction={'row'} spacing={1} alignItems={'center'}>
          <Typography variant="body2">Created:</Typography>
          <Typography variant="body2" color="textDisabled">
            {formatRelative(new Date(item.createdAt), new Date())}
          </Typography>
        </Stack>

        <Stack direction={'row'} spacing={1} alignItems={'center'}>
          <Typography variant="body2">Updated:</Typography>
          <Typography variant="body2" color="textDisabled">
            {item.updatedAt && item.updatedAt !== item.createdAt
              ? formatRelative(new Date(item.updatedAt), new Date())
              : '---'}
          </Typography>
        </Stack>
      </CardContent>

      <CardActions sx={{justifyContent: 'space-between'}}>
        <Button variant="text" onClick={() => doDeleteItem(item)}>
          <DeleteOutline />
        </Button>
        <AppButton to={`/products/${item.productId}`} variant="contained">
          {t('common:edit')}
        </AppButton>
      </CardActions>
    </Card>
  );
};
