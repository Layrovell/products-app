import {CardProps, Stack, Typography} from '@mui/material';
import {useTranslation} from 'react-i18next';
// components
import {AppButton} from './app-button';

export const EmptyContent = ({
  actionURL,
  actionLabel,
  ...props
}: {
  actionLabel?: React.ReactNode;
  actionURL: string;
} & CardProps) => {
  const {t} = useTranslation(['common']);

  return (
    <Stack p={3} alignItems="center" spacing={2}>
      <Typography variant="caption" fontSize="0.9rem">
        {t('common:noResults')}
      </Typography>

      {actionURL ? (
        <AppButton to={actionURL} variant="contained">
          {actionLabel || t('common:create')}
        </AppButton>
      ) : null}
    </Stack>
  );
};
