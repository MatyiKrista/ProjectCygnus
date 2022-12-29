import { ReactNode } from 'react';
import * as Toast from '@radix-ui/react-toast';
import { useToasts } from '../../../hooks/store/useToastStore';
import styled, { keyframes } from 'styled-components';
import { borderRadius, boxShadow, color, space } from '../helpers';
import { UIType } from '../../../types/ui';
import { Button } from '../Button';

type Props = {
  children: ReactNode;
};

const hide = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(calc(100% + ${space(2)}));
  }
  to {
    transform: translateX(0);
  }
`;

const swipeOut = keyframes`
  from {
    transform: translateX(var(--radix-toast-swipe-end-x));
  }
  to {
    transform: translateX(calc(100% + ${space(2)}));
  }
`;

const ToastViewport = styled(Toast.Viewport)`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: ${space(4)};
  padding: ${space(2)};
`;

const ToastRoot = styled(Toast.Root)<{ $type: UIType }>`
  background-color: ${({ $type }) => color($type, { lightness: 90 })};
  border-radius: ${borderRadius('md')};
  box-shadow: ${boxShadow('md')};
  display: grid;
  grid-template-areas: 'title action' 'description action';
  grid-template-columns: auto max-content;
  column-gap: ${space(4)};
  padding: ${space(4)};
  align-items: center;
  min-width: ${space(10)};

  &[data-state='open'] {
    animation: ${slideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  &[data-state='closed'] {
    animation: ${hide} 100ms ease-in;
  }
  &[data-swipe='move'] {
    transform: translateX(var(--radix-toast-swipe-move-x));
  }
  &[data-swipe='cancel'] {
    transform: translateX(0);
    transition: transform 200ms ease-out;
  }
  &[data-swipe='end'] {
    animation: ${swipeOut} 100ms ease-out;
  }
`;

const ToastTitle = styled(Toast.Title)`
  grid-area: title;
  margin-bottom: ${space(1)};
  font-weight: 500;
  color: ${color('dark')};
  font-size: 1.2rem;
`;

const ToastDescription = styled(Toast.Description)`
  grid-area: description;
  margin: 0;
  color: ${color('dark')};
  font-size: 1rem;
  line-height: 1.2;
`;

const ToastAction = styled(Toast.Action)`
  grid-area: action;
`;

const ToastProvider = (props: Props) => {
  const toasts = useToasts();
  return (
    <Toast.Provider>
      {toasts.map((toast) => (
        <ToastRoot $type={toast.type} key={toast.id}>
          <ToastTitle>{toast.title}</ToastTitle>
          {toast.description && (
            <ToastDescription>{toast.description}</ToastDescription>
          )}
          {toast.action && (
            <ToastAction altText='Toast action'>{toast.action}</ToastAction>
          )}
          {toast.closable && (
            <Toast.Close asChild>
              <Button $size='sm'>X</Button>
            </Toast.Close>
          )}
        </ToastRoot>
      ))}
      <ToastViewport />
      {props.children}
    </Toast.Provider>
  );
};

export default ToastProvider;
