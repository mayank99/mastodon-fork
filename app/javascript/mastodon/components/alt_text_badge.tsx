import { useState, useCallback, useRef, useId } from 'react';

import { defineMessages, FormattedMessage, useIntl } from 'react-intl';

import Overlay from 'react-overlays/Overlay';
import type {
  OffsetValue,
  UsePopperOptions,
} from 'react-overlays/esm/usePopper';

import CloseIcon from '@/material-icons/400-24px/close.svg?react';

import { IconButton } from "./icon_button.js";

const messages = defineMessages({
  dismiss: { id: 'alt_text_badge.dismiss', defaultMessage: 'Dismiss' },
});

const offset = [0, 4] as OffsetValue;
const popperConfig = { strategy: 'fixed' } as UsePopperOptions;

export const AltTextBadge: React.FC<{
  description: string;
}> = ({ description }) => {
  const intl = useIntl();
  const accessibilityId = useId();
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const handleClick = useCallback(() => {
    setOpen((v) => !v);
  }, [setOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <>
      <button
        type='button'
        ref={anchorRef}
        className='media-gallery__alt__label'
        onClick={handleClick}
        aria-expanded={open}
        aria-controls={accessibilityId}
      >
        ALT
      </button>

      <Overlay
        rootClose
        onHide={handleClose}
        show={open}
        target={anchorRef.current}
        placement='top-end'
        flip
        offset={offset}
        popperConfig={popperConfig}
      >
        {({ props }) => (
          <div {...props} className='hover-card-controller'>
            <div
              className='media-gallery__alt__popover dropdown-animation'
              role='region'
              id={accessibilityId}
            >
              <IconButton title={intl.formatMessage(messages.dismiss)} icon='times' iconComponent={CloseIcon} onClick={handleClose} />
              <h4>
                <FormattedMessage
                  id='alt_text_badge.title'
                  defaultMessage='Alt text'
                />
              </h4>
              <p>{description}</p>
            </div>
          </div>
        )}
      </Overlay>
    </>
  );
};
