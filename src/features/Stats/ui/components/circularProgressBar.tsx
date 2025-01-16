import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

type Props = {
  value: number;
  subTitle: string;
  pathColor: string;
  textColor: string;
  trailColor: string;
};

const CircularProgressBar = ({
  value,
  subTitle,
  pathColor,
  textColor,
  trailColor,
}: Props) => {
  const stylesForBar = {
    pathTransition: 'stroke-dashoffset 0.5s ease 0s',
    pathColor,
    textColor,
    trailColor,
    textSize: '10px',
    fontWeight: 600,
    cursor: 'pointer',
  };

  let val = value.toLocaleString('ru-RU') as unknown as number;

  return (
    <div className='p-7 cursor-pointer'>
      <CircularProgressbar
        value={value}
        text={`${val}`}
        maxValue={value + 100}
        styles={buildStyles(stylesForBar)}
      />
      <p className='text-lg text-center font-medium p-2'>{subTitle}</p>
    </div>
  );
};

export default CircularProgressBar;
