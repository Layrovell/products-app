import React from 'react';
import {SnackbarContent, closeSnackbar, VariantType} from 'notistack';

import {AlertProps} from '@mui/material';

import {Notification, NotificationProps} from './notification';

//
//

declare module 'notistack' {
  interface VariantOverrides {
    default: SnackNotificationProps;
    warning: SnackNotificationProps;
    success: SnackNotificationProps;
    info: SnackNotificationProps;
    error: SnackNotificationProps;
  }
}

interface CustomSnackNotificationProps extends NotificationProps {
  noClose?: boolean;
  alertProps?: AlertProps;
  notistackVariant: VariantType;
  message: string;
}

type SnackNotificationProps = {
  color?: AlertProps['color'];
  severity?: AlertProps['severity'];
  noClose?: boolean;
  alertProps?: AlertProps;
  messages?: React.ReactNode | React.ReactNode[];
  heading?: React.ReactNode;
};

export const SnackNotification = React.forwardRef<HTMLDivElement, CustomSnackNotificationProps>(
  (
    {heading, headingProps, message, messages, messagesProps, noClose, alertProps, ...props},
    ref,
  ) => {
    let color: AlertProps['color'];
    let severity: AlertProps['severity'];

    switch (props.notistackVariant) {
      case 'success':
        color = 'success';
        severity = 'success';
        break;
      case 'error':
        color = 'error';
        severity = 'error';
        break;
      case 'warning':
        color = 'warning';
        severity = 'warning';
        break;
      default:
        color = 'info';
        severity = 'info';
    }

    return (
      <SnackbarContent ref={ref} role="alert">
        <Notification
          heading={heading}
          headingProps={headingProps}
          messages={messages || message}
          messagesProps={messagesProps}
          color={color}
          severity={severity}
          onClose={noClose ? undefined : () => closeSnackbar(props.id)}
          {...alertProps}
        />
      </SnackbarContent>
    );
  },
);

SnackNotification.displayName = 'SnackNotification';
