import React from 'react';
import {Stack} from '@mui/material';
import {useSnackbar, VariantType} from 'notistack';
import {useTranslation} from 'react-i18next';
// components
import {EmptyContent} from '~/global/components/empty-content';
import {CardSkeleton} from '~/global/components/card-skeleton';
import {CardItem} from './card-item';
// services
import {useMutationProductsDelete} from '~/services/products';
// api
import {ApiProduct} from '~/api-client/types';

export const Cards = ({data, isLoading}: {data?: ApiProduct[]; isLoading: boolean}) => {
  const deleteItem = useMutationProductsDelete();
  const {enqueueSnackbar} = useSnackbar();
  const {t} = useTranslation(['common']);

  const doDeleteItem = (item: ApiProduct) => {
    if (!window.confirm(t('common:deleteConfirm', {item: item.title.en || item.title.ar}))) return;

    deleteItem.mutate(
      {id: item.productId},
      {
        onSuccess: async result => {
          result?.meta?.message &&
            enqueueSnackbar(result?.meta?.message, {variant: 'success' as VariantType});
        },
        onError: err => {
          enqueueSnackbar(err?.message || 'unknown error', {variant: 'error' as VariantType});
        },
      },
    );
  };

  return (
    <React.Fragment>
      {isLoading ? (
        <CardSkeleton />
      ) : !data?.length ? (
        <EmptyContent actionURL="/products/create" />
      ) : (
        <Stack direction="column" spacing={2}>
          {data?.map(row => (
            <CardItem key={row.productId} item={row} doDeleteItem={doDeleteItem} />
          ))}
        </Stack>
      )}
    </React.Fragment>
  );
};
