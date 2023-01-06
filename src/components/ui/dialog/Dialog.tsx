import * as DialogRadix from '@radix-ui/react-dialog';
import { ReactNode } from 'react';
import { Button } from '../Button';
import styled, { keyframes } from 'styled-components';
import { borderRadius, color, space } from '../helpers';

type Props = {
  trigger: ReactNode;
  children?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
};

const overlayShow = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const contentShow = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const DialogOverlay = styled(DialogRadix.Overlay)`
  position: fixed;
  inset: 0;
  background-color: ${color('black', { alpha: 0.5 })};
  animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

const DialogContent = styled(DialogRadix.Content)`
  background-color: ${color('background')};
  border-radius: ${borderRadius('md')};
  box-shadow: hsl(206 22% 7% / 35%) 0 ${space(2)} 38px -${space(2)},
    hsl(206 22% 7% / 20%) 0px ${space(2)} 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  padding: 25px;
  animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);

  &:focus {
    outline: none;
  }
`;

const DialogTitle = styled(DialogRadix.Title)`
  margin: 0;
  font-weight: 500;
  color: ${color('black')};
  font-size: 1rem;
`;

const DialogDescription = styled(DialogRadix.Description)`
  margin: ${space(2)} 0 ${space(4)};
  color: ${color('light')};
  font-size: 15px;
  line-height: 1.5;
`;

const CloseButton = styled(Button)`
  position: absolute;
  top: ${space(4)};
  right: ${space(4)};
`;

const Dialog = (props: Props) => {
  const { trigger, title, description, children } = props;

  return (
    <DialogRadix.Root>
      <DialogRadix.Trigger asChild>{trigger}</DialogRadix.Trigger>
      <DialogRadix.Portal>
        <DialogOverlay />
        <DialogContent>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
          <DialogRadix.Close asChild>
            <CloseButton $size='sm'>X</CloseButton>
          </DialogRadix.Close>
          {children}
        </DialogContent>
      </DialogRadix.Portal>
    </DialogRadix.Root>
  );
};

export default Dialog;
