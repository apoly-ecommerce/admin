const changeToSlug = (str) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  str = str.toLowerCase();
  str = str
    .replace(/[&]/g, "-and-")
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .replace(/[-]+/g, "-")
    .replace(/-$/, "");
  return str;
}

const getCurrentYear = () => {
  return new Date().getFullYear();
}

const formatModuleAccess = (moduleAccess) => {
  let arr = new Array();
  arr['Common']   = 'Đây là một mô-dun chung. Điều đó có nghĩa là cả người dùng nền tảng và người dùng thương mại đều có quyền truy cập';
  arr['Platform'] = 'Đây là một mô-dun nền tảng. Điều đó có nghĩa là chỉ có người dùng nền tảng mới có quyền truy cập.';
  arr['Merchant'] = 'Đây là một mô-dun thương mại. Điều đó có nghĩa là có người dùng thương mại mới có quyền truy cấp.';
  return arr[moduleAccess];
}

export {
  changeToSlug,
  getCurrentYear,
  formatModuleAccess
};