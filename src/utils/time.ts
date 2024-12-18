export function getCurrentDetailTime() {
  //获取当前时间并打印
  let yy = new Date().getFullYear();
  let mm = new Date().getMonth() + 1;
  let dd = new Date().getDate();
  let hh =
    new Date().getHours() < 10
      ? "0" + new Date().getHours()
      : new Date().getHours();
  let mf =
    new Date().getMinutes() < 10
      ? "0" + new Date().getMinutes()
      : new Date().getMinutes();
  let ss =
    new Date().getSeconds() < 10
      ? "0" + new Date().getSeconds()
      : new Date().getSeconds();
  const getTime = yy + "-" + mm + "-" + dd + " " + hh + ":" + mf + ":" + ss;

  return getTime;
}


  
export function formatDateTime(date_:any) {
	
	var date:any = new Date(date_);
	var yyyy = date.getFullYear().toString();  // 获取年份的最后两位
	var mm = ("0" + (date.getMonth() + 1)).slice(-2);  // 月份需要加1，且保证两位数
	var dd = ("0" + date.getDate()).slice(-2);         // 保证日期为两位数
	var hh = ("0" + date.getHours()).slice(-2);        // 保证小时为两位数
	var mf = ("0" + date.getMinutes()).slice(-2);      // 保证分钟为两位数
	var ss = ("0" + date.getSeconds()).slice(-2);      // 保证秒数为两位数
	
	var formattedDate = yyyy + "-" + mm + "-" + dd + " " + hh + ":" + mf + ":" + ss;
	return formattedDate
}

export function dateTime(date_:any) {
	
	var date:any = new Date(date_);
	
	var mm = ("0" + (date.getMonth() + 1)).slice(-2);  // 月份需要加1，且保证两位数
	var dd = ("0" + date.getDate()).slice(-2);         // 保证日期为两位数
	var hh = ("0" + date.getHours()).slice(-2);        // 保证小时为两位数
	var mf = ("0" + date.getMinutes()).slice(-2);      // 保证分钟为两位数
	var ss = ("0" + date.getSeconds()).slice(-2);      // 保证秒数为两位数
	
	var formattedDate = mm + "-" + dd + " " + hh + ":" + mf + ":" + ss;
	return formattedDate
}

export function getTime(date: any) {
  var d = new Date(date);
 
  var month = d.getMonth() + 1;
  var day = d.getDate();
  var val = d.getFullYear() + "-" + month + "-" + day;
  return val;
}
