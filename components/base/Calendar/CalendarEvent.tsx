import { FC } from 'react';
import Icon, { IconName } from '../Icon';
import IconButton from '../IconButton';
import styles from './Calendar.module.css';

export interface CalendarEventProps {
  description: string;
  disabled: boolean;
  isCompleted: boolean;
  isInProgress: boolean;
  isApproved: boolean;
  onClick: () => void;
}

const CalendarEvent: FC<CalendarEventProps> = ({
  description,
  disabled,
  onClick,
  isCompleted,
  isInProgress,
  isApproved,
}) => {
  return (
    <>
      <div
        className={`${styles.calendarEvent} ${
          disabled ? styles.disabledCalendarEvent : ''
        } ${isCompleted ? styles.completedCalendarEvent : ''}`}
        onClick={disabled ? undefined : onClick}
      >
        {description}
        {isInProgress ? (
          <Icon size={20} outlined name={IconName.IN_PROGRESS} />
        ) : null}
        {isApproved ? <Icon size={20} name={IconName.THUMBS_UP} /> : null}
      </div>
    </>
  );
};

export default CalendarEvent;
