import moment from "moment";

const formatDate = (timeobj) => {
   let day = timeobj.getDay() === 0 ? "Chủ Nhật" : `Thứ ${+timeobj.getDay() + 1}`;
   let date = `${timeobj.getDate()}/${timeobj.getMonth() + 1}/${timeobj.getFullYear()}`;
   let time = `${timeobj.getHours()}:${timeobj.getMinutes()}`;
   return `${day}, ${time} ${date}`;
};

const generateDate = () => {
   let randomExpired = Math.floor(Math.random() * 29) + 1;
   let today = new Date();
   let dateExpired = moment(today).add(randomExpired, "d").toDate();
   return {
      today: formatDate(today),
      expired: formatDate(dateExpired),
   };
};

export default generateDate;
