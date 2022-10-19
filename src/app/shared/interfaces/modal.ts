export interface Modal {
  isOpen: boolean;
  type: ModalType;
  params?: ModalParams;
}
export interface ModalParams {
  title: string;
  content: string;
  btnClose: boolean;
  btnCloseLabel: string;
  btnConfirm: boolean;
  btnConfirmLabel: string;
}
export enum ModalType {
  None,
  Confirmation,
  Error,
}
