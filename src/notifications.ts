import { BackgroundPanel2, ExtraRed, PrimaryBlue, TextLight } from './colors';
import { showNotification } from '@mantine/notifications';

export class Notifications {
  public static success = (title: string, message?: string) =>
    showNotification({
      title,
      message,
      styles: () => ({
        root: {
          backgroundColor: BackgroundPanel2,
          borderColor: BackgroundPanel2,
          '&::before': { backgroundColor: PrimaryBlue },
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
    });

  public static error = (title: string, message?: string) =>
    showNotification({
      title,
      message,
      styles: () => ({
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
    });
}
