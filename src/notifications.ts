import { BackgroundPanel2, ExtraRed, TextLight } from './colors';
import { NotificationProps } from '@mantine/notifications';

export class NotificationFactory {
  public static createError = (title: string, message: string) => {
    return <NotificationProps>{
      title,
      message,
      styles: (_) => ({
        root: {
          backgroundColor: BackgroundPanel2,
          borderColor: BackgroundPanel2,
          '&::before': { backgroundColor: ExtraRed },
        },
        title: { color: TextLight },
        description: { color: TextLight },
        closeButton: {
          color: TextLight,
          '&:hover': {
            backgroundColor: BackgroundPanel2,
          },
        },
      }),
    };
  };
}