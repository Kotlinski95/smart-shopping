export interface Alert {
  show: boolean;
  props?: AlertProps;
}

export interface AlertProps {
  type: AlertType;
  message: string;
  duration: number;
}

export enum AlertType {
  None,
  Success = 'success',
  Error = 'danger',
}
