import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import styled from 'styled-components';
import calendarIcon from '../../../assets/images/calendarIcon.svg';

export default function DatePicker() {
  const [value, setValue] = useState<Dayjs | null>(dayjs(''));
  const [open, setOpen] = useState(false);
  const iconRef = useRef(null);

  const memoCloseCalendar = useCallback((e: any) => {
    // console.log(e.target);
    if (e.target !== iconRef.current) setOpen(false);
  }, []);

  const rootEle = useMemo(() => document.getElementById('root'), []);

  useEffect(() => {
    rootEle!.addEventListener('click', memoCloseCalendar);
    return () => {
      rootEle!.removeEventListener('click', memoCloseCalendar);
    };
  }, [memoCloseCalendar, rootEle]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiDatePicker
        value={value}
        onChange={newValue => {
          setValue(newValue);
        }}
        onAccept={() => {
          setOpen(prev => !prev);
        }}
        open={open}
        // OpenPickerButtonProps={{ style: { width: '100px' } }}
        renderInput={({ inputRef, inputProps, InputProps }) => {
          return (
            <CustomBox>
              <Input
                ref={inputRef}
                {...(value && inputProps)}
                placeholder={'Select Date'}
                disabled
              />
              <CalendarIcon
                ref={iconRef}
                onClick={() => {
                  setOpen(prev => !prev);
                }}
              />
              {/* {InputProps?.endAdornment} */}
            </CustomBox>
          );
        }}
      />
    </LocalizationProvider>
  );
}

const CustomBox = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 301px;
  height: 57px;
  line-height: 57px;
  background: rgba(50, 50, 50, 0.948044);
  opacity: 0.8;
  border-radius: 4px;
  font-size: 20px;
  text-indent: 18px;
  color: rgba(255, 255, 255, 0.2);
  border: none;
  outline: none;
`;

const CalendarIcon = styled.div`
  width: 24px;
  height: 22px;
  color: #f65261;
  position: absolute;
  top: 18px;
  right: 17px;
  background-image: url(${calendarIcon});
  cursor: pointer;
`;
