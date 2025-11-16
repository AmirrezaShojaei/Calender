import "./style.css";
import data from "./data.json";


const CalenderdatesEL = document.getElementById("body");
const MonthNameEL = document.getElementById("monthName");
const YearEL = document.getElementById("year");
const PrevButtonEL = document.getElementById("prev_button");
const NextButtonEL = document.getElementById("next_button");
const MonthEnvent = document.getElementById("dates_info_list");
const Enventheader = document.getElementById("dates_info_header");

const MonthsInfo = {
    0: {
        name: "فروردین",
        days: 31
    },
    1: {
        name: "اردیبهشت",
        days: 31
    },
    2: {
        name: "خرداد",
        days: 31
    },
    3: {
        name: "تیر",
        days: 31
    },
    4: {
        name: "مرداد",
        days: 31
    },
    5: {
        name: "شهریور",
        days: 31
    },
    6: {
        name: "مهر",
        days: 30
    },
    7: {
        name: "آبان",
        days: 30
    },
    8: {
        name: "آذر",
        days: 30
    },
    9: {
        name: "دی",
        days: 30
    },
    10: {
        name: "بهمن",
        days: 30
    },
    11: {
        name: "اسفند",
        days: 29
    }
};
const eventsData = {
    "aban": [{
            "day": 1,
            "title": "روز آمار و برنامه‌ریزی"
        },
        {
            "day": 1,
            "title": "روز بزرگداشت ابوالفضل بیهقی,تاریخ نگار و نویسنده ایرانی"
        },
        {
            "day": 5,
            "title": "ولادت حضرت زینب (س) و روز پرستار و بهروز"
        },
        {
            "day": 7,
            "title": "سالروز ورود کوروش بزرگ به بابل در سال 539 پیش از اسلام"
        },
        {
            "day": 8,
            "title": "روز ملی محیط‌بان"
        },
        {
            "day": 10,
            "title": "ابان روز,جشن ابانگان"
        },
        {
            "day": 14,
            "title": "روز ملی مازندران"
        },
        {
            "day": 15,
            "title": "جشن میانه پاییز"
        },
        {
            "day": 18,
            "title": "روز ملی کیفیت"
        },
        {
            "day": 23,
            "title": "روز جهانی دیابت"
        },
        {
            "day": 24,
            "title": "روز کتاب و کتابخوانی"
        },
        {
            "day": 26,
            "title": "روز جهانی دانش‌آموز"
        },
        {
            "day": 28,
            "title": "روز جهانی آقایان"
        },
        {
            "day": 29,
            "title": "روز جهانی کودک"
        }
    ]
}

//loader function for load the page for first time
function loader() {
    //Default Month when open
    const Default = {
        index: 7,
        name: "آبان",
        days: 30,
        year: 1404
    };
    const Numlastmonthday = 35 - MonthsInfo[7].days;
    //Make the datys of the last month
    for (let d = 1; d <= Numlastmonthday; d++) {
        const dayslastmonth = MonthsInfo[Default.index - 1].days;
        const div = document.createElement("div");
        div.className = "day prev";
        div.innerHTML = dayslastmonth - Numlastmonthday + d;
        CalenderdatesEL.appendChild(div);
    };
    //Make the days of default month
    for (let d = 1; d <= Default.days; d++) {
        const div = document.createElement("div");
        div.className = "day current";
        div.innerText = d;
        //Change the color of holidays
        const weekday = (Numlastmonthday + (d - 1)) % 7;
        if (weekday === 6) {
            div.classList.add("holiday");
        }
        CalenderdatesEL.appendChild(div);
    };
    //Control Envents header
    Enventheader.innerHTML = `مناسب های ${Default.name} ماه`
    loadEvents();
    //Control Calender Month and Year
    MonthNameEL.innerHTML = `${Default.name}`;
    YearEL.innerHTML = `${Default.year}`


};

function loadEvents(month = "aban") {
    MonthEnvent.innerHTML = "";

    const events = eventsData[month];

    if (!events || events.length === 0) {
        return;
    }

    events.sort((a, b) => a.day - b.day);
    events.forEach(event => {
        const li = document.createElement("li");
        li.className = "event-item";
        li.innerHTML = `
          <span class="event-day">${event.day} آبان</span>
            <span class="event-title">${event.title}</span>
        `;
        MonthEnvent.appendChild(li);
    });
}
loader();