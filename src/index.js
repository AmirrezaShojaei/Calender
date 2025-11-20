import "./style.css";
import data from "./data.json";
import {toJalaali,toGregorian} from 'jalaali-js';


//document.addEventListener('DOMContentLoaded', () => {

  const body = document.body;
  const media = document.createElement('div');
  media.className = 'media';

  const datesInformation = document.createElement('div');
  datesInformation.className = 'dates_information';
  datesInformation.id = 'datesInfo';

  const datesInfoHeader = document.createElement('header');
  datesInfoHeader.id = 'dates_info_header';

  const datesInfoList = document.createElement('ul');
  datesInfoList.id = 'dates_info_list';

  datesInformation.append(datesInfoHeader, datesInfoList);

  const mainCalender = document.createElement('div');
  mainCalender.className = 'main_calender';
  mainCalender.id = 'main';

  const header = document.createElement('header');
  header.className = 'calender_header';
  header.id = 'header';

  const prevBtn = document.createElement('button');
  prevBtn.id = 'prev_button';
  prevBtn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';

  const nextBtn = document.createElement('button');
  nextBtn.id = 'next_button';
  nextBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
  const monthYearDiv = document.createElement('div');
  monthYearDiv.className = 'month_year';

  const monthSpan = document.createElement('span');
  monthSpan.id = 'monthName';

  const yearSpan = document.createElement('span');
  yearSpan.id = 'year';

  monthYearDiv.append(monthSpan, ' ', yearSpan);
  header.append(prevBtn, monthYearDiv, nextBtn);


  const calenderBody = document.createElement('div');
  calenderBody.className = 'calender_dates';
  calenderBody.id = 'body';

  mainCalender.append(header, calenderBody);
  media.append(datesInformation, mainCalender);

  
  body.appendChild(media);

  
// });

const CalenderdatesEL = document.getElementById("body");
const MonthNameEL = document.getElementById("monthName");
const YearEL = document.getElementById("year");
const PrevButtonEL = document.getElementById("prev_button");
const NextButtonEL = document.getElementById("next_button");
const MonthEnvent = document.getElementById("dates_info_list");
const Enventheader = document.getElementById("dates_info_header");
const MonthsInfo = {
    0: "فروردین",
    1: "اردیبهشت",
    2: "خرداد",
    3: "تیر",
    4: "مرداد",
    5: "شهریور",
    6: "مهر",
    7: "آبان",
    8: "آذر",
    9: "دی",
    10: "بهمن",
    11: "اسفند"
};
//Change number to persian
function toPersianNumber(num) {
    return num.toString().replace(/[0-9]/g, d =>
        "۰۱۲۳۴۵۶۷۸۹" [d]
    );
};
//Calculate Months days
function isLeapJalali(jy) {
    const kabisePattern = [1, 5, 9, 13, 17, 22, 26, 30];
    if (kabisePattern.includes(jy % 33)) {
        return true;
    }
    return false;
};
function getJalaliMonthDays(jy, jm) {
    if (jm <= 6) return 31;
    if (jm <= 11) return 30;
    return isLeapJalali(jy) ? 30 : 29; // اسفند
};
//Find jalali date
const formatter = new Intl.DateTimeFormat('fa-IR-u-nu-latn', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
});
const parts = formatter.formatToParts(new Date());
let jy = +parts.find(p => p.type === "year").value;
let jm = +parts.find(p => p.type === "month").value - 1;
let jd = +parts.find(p => p.type === "day").value;
//Calculate Start month weekday
function getStartOfJalaliMonthWeekday(jy, jm) {
    // تبدیل «روز اول ماه شمسی» به میلادی
    const g = toGregorian(jy, jm + 1, 1);
    console.log(g)
console.log(new Date(g.gy, g.gm-1 , g.gd));
    // گرفتن روز هفته میلادی
    const weekday = new Date(g.gy, g.gm-1 , g.gd).getDay();
console.log("w",weekday);
    // تبدیل استاندارد به شمسی (شنبه = 0)
    return (weekday + 1) % 7;
};





//loader function for load the page for first time
function loader() {
    CalenderdatesEL.innerHTML = ""
    const days = getJalaliMonthDays(jy, jm);
    let startMonthDay = getStartOfJalaliMonthWeekday(jy, jm);
    
    console.log(startMonthDay);
    let prevMonth = jm === 0 ? 11 : jm - 1;
    let prevYear = jm === 0 ? jy - 1 : jy;
    const prevMonthDays = getJalaliMonthDays(prevYear, prevMonth);

    //Make the datys of the last month
    for (let d = 1; d <= startMonthDay; d++) {
        //Weekday calculation for the last month days

        const div = document.createElement("div");
        div.className = "day prev";
        div.innerHTML = toPersianNumber(prevMonthDays - startMonthDay + d);
        CalenderdatesEL.appendChild(div);
    };
    //Make the days of default month
    for (let d = 1; d <= days; d++) {
        const div = document.createElement("div");
        div.className = "day current";
        div.innerText = toPersianNumber(d);
        //Change the color of holidays
        const weekday = (startMonthDay + (d - 1)) % 7;
        if (weekday === 6) {
            div.classList.add("holiday");
        }
        CalenderdatesEL.appendChild(div);
    };
    //Control Envents header
    Enventheader.innerHTML = `مناسب های ${MonthsInfo[jm]} ماه`

    //Control Calender Month and Year
    MonthNameEL.innerHTML = `${MonthsInfo[jm]}`;
    YearEL.innerHTML = `${toPersianNumber(jy)}`
    loadEvents(jm);

};
loader();
//Next Button 
NextButtonEL.addEventListener("click", () => {
    jm++;
    if (jm > 11) {
        jm = 0;
        jy++;
    }

    loader();
});
//Prev Button
PrevButtonEL.addEventListener("click", () => {
    jm--;
    if (jm < 0) {
        jm = 11;
        jy--;
    }
    loader();

});

//Load Envent Month
function loadEvents(monthIndex) {
    MonthEnvent.innerHTML = "";

    const events = data.events[monthIndex];

    if (!events || events.length === 0) {
        return;
    }

    events.sort((a, b) => a.day - b.day);

    events.forEach(event => {
        const li = document.createElement("li");
        li.className = "event-item";
        li.innerHTML = `
            <span class="event-day">${toPersianNumber(event.day)} ${MonthsInfo[monthIndex]}</span>
            <span class="event-title">${event.title}</span>
        `;
        MonthEnvent.appendChild(li);
    });
};

