import moment from "moment";

export function convertDateFormat(inputDate:any) {
  if (!inputDate) {
    return "";
  }
  const date = new Date(inputDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDay = day.toString().padStart(2, "0");
  const formattedMonth = month.toString().padStart(2, "0");

  const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
  return formattedDate;
}

export function momentdateFormat(date:any) {
  if (!date) {
    return "";
  }
  const Date = moment(date).format("DD-MMM-YYYY HH:mm");
  return Date;
}

export function dateFormat1(date:any) {
  if (!date) {
    return "";
  }

  const formattedDate = moment(date).format("YYYY-MM-DD");
  return formattedDate;
}
export function handleDate(value:any) {
  if (value !== "null") {
    const date = new Date(value);
    const formattedDate = `${date.getDate()}-${date.toLocaleString("en-US", {
      month: "short",
    })}-${date.getFullYear()} `;
    return formattedDate;
  }
}
export function handleDateLong(value:any) {

  if (value !== "null") {
    const date = new Date(value);
    const formattedHours = String(date.getHours()).padStart(2, '0');
    const formattedMinutes = String(date.getMinutes()).padStart(2, '0');
    const formattedSeconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${date.getDate()} ${date.toLocaleString("en-US", {
      month: "short",
    })}, ${date.getFullYear()} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
}

export function formateDate_D_M_Y(date: any) {
  if (!date) return "";

  let dateObj = new Date(date);
  let day = dateObj.getDate();
  let month = dateObj.getMonth() + 1;
  let year = dateObj.getFullYear();

  let formattedDay = day < 10 ? "0" + day : day;
  let formattedMonth = month < 10 ? "0" + month : month;

  return `${formattedDay}-${formattedMonth}-${year}`;
}
