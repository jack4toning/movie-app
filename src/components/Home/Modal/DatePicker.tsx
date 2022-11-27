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

export default function DatePicker({
  date,
  onChange,
  handleError,
}: {
  date: string;
  onChange: (releaseDate: string) => void;
  handleError: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [value, setValue] = useState<Dayjs | null>(dayjs(date));
  const [open, setOpen] = useState(false);
  const iconRef = useRef(null);

  useEffect(() => {
    setValue(dayjs(date));
  }, [date]);

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
        onClose={() => {
          if (date === '') handleError('Required');
        }}
        onChange={newValue => {
          setValue(newValue);
          onChange(dayjs(newValue).format('YYYY-MM-DD'));
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
                // {...(date === '' ? { ...inputProps, value: date } : inputProps)}
                {...inputProps}
                {...(date === '' ? { value: date } : {})}
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
  color: #fff;
  border: none;
  outline: none;

  ::placeholder {
    font-weight: 500;
  }
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
