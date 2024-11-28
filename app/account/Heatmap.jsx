'use client';

import CalendarHeatmap from 'react-calendar-heatmap';
import './heatmap.css';

const today = new Date();
const threeMonthsAgo = new Date();
threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

// const createTestBitString = (daysWithActivity) => {
//   // Создаем строку из 365 символов, все 0
//   let bitString = '0'.repeat(365);

//   // Устанавливаем '1' для дней с активностью
//   daysWithActivity.forEach((day) => {
//     if (day >= 0 && day < 365) {
//       bitString =
//         bitString.substring(0, day) + '1' + bitString.substring(day + 1);
//     }
//   });

//   return bitString;
// };

// Пример: дни с активностью (например, 0, 1, 2, 100, 200)
// const daysWithActivity = [0, 1, 2, 100, 200];
// const testBitString = createTestBitString(daysWithActivity);

// const activityData = [];
// for (let i = 0; i < testBitString.length; i++) {
//   let date = new Date(new Date().getFullYear(), 0, i + 1);
//   date = formatDate(date);
//   if (testBitString[i] === '1') {
//     activityData.push({ date, count: 1 });
//   } else {
//     activityData.push({ date, count: 0 });
//   }
// }

// console.log(activityData);

function Heatmap({ counter }) {
  const activity = counter.activity;
  // console.log('counter', counter);
  // console.log('activity', activity.length);
  const activityData = [];

  for (let i = 0; i < activity.length; i++) {
    let date = new Date(new Date().getFullYear(), 0, i + 1);
    date = formatDate(date);
    activityData.push({ date, count: activity[i] });
  }

  const values = activityData;

  return (
    <>
      <CalendarHeatmap
        startDate={threeMonthsAgo}
        endDate={today}
        horizontal={false}
        className="max-w-full"
        // gutterSize={3.5}
        values={values}
        titleForValue={(value) => {
          if (!value) {
            return 'No data';
          }
          if (value.date && !value.count) {
            return value.date;
          }
          return `${value.date}: ${value.count} min`;
        }}
        classForValue={(value) => {
          if (!value) {
            return 'color-empty';
          }
          if (!value.count) {
            return 'color-empty';
          }
          return `color-filled`;
        }}
      />
    </>
  );
}

export default Heatmap;
