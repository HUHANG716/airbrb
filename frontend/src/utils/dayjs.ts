import _dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
_dayjs.extend(isBetween);

const format = 'DD/MM/YYYY';
const dayjs = (date?: string, format = 'DD/MM/YYYY') => {
  return _dayjs(date, format);
};
const defaultDayjs = _dayjs;
export default dayjs;
export { format, Dayjs, defaultDayjs };
