import store from '@/store';
import moment from 'moment';

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

const checkActionExists = (actions, permissions) => {
  let countTrue = 0;
  actions.forEach(action => {
    if (permissions.indexOf(action) !== -1) {
      countTrue ++;
    }
  });
  return countTrue;
}

const recursiveSidebarMenu = (permissions, mapMenuSidebar) => {
  if (!permissions.length && store.getters['auth/getUserAuth'].role.name === 'Super Admin') {
    permissions = ['super_admin'];
  }
  mapMenuSidebar.forEach(item => {
    if (item.roles) {
      if (checkActionExists(item.roles, permissions) || (!item.roles.length)) {
        item.isShow = true;
      } else {
        item.isShow = false;
      }
    }
    if (item.children && item.children.length) {
      recursiveSidebarMenu(permissions, item.children);
    }
  });
  return mapMenuSidebar;
}

const formatModuleAccess = (moduleAccess) => {
  let arr = new Array();
  arr['Common']   = 'Đây là một mô-dun chung. Điều đó có nghĩa là cả người dùng nền tảng và người dùng thương mại đều có quyền truy cập';
  arr['Platform'] = 'Đây là một mô-dun nền tảng. Điều đó có nghĩa là chỉ có người dùng nền tảng mới có quyền truy cập.';
  arr['Merchant'] = 'Đây là một mô-dun thương mại. Điều đó có nghĩa là có người dùng thương mại mới có quyền truy cấp.';
  return arr[moduleAccess];
}

const checkAddressExists = (address) => {
  if (!address) return;
  if (
    (address.address_line_1 || address.address_line_2) &&
    address.city && address.state_id && address.zip_code && address.country_id
  ) {
    return true;
  } else return false;
}

const toGeocodeString = (address) => {
  let data = [];
  if (!address) return;
  if (address.address_line_1) {
    data.push(address.address_line_1);
  }
  if (address.address_line_2) {
    data.push(address.address_line_2);
  }
  if (address.city) {
    data.push(address.city);
  }
  if (address.state_id) {
    data.push(address.state.name);
  }
  if (address.zip_code) {
    data.push(address.zip_code);
  }
  if (address.country_id) {
    data.push(address.country.name);
  }
  let str = data.join(', ');
  let result = str.replaceAll(' ', '+');
  return result;
}

const formatCurrency = (number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
};

const strUcFirst = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const formatTime = (time) => {
  moment.locale('vi');
  return moment(time).format('DD-MM-YYYY HH:mm');
}

const pusherAuthorizer = (channel, options) => {
  // console.log();
  return {
    authorize: (socketId, callback) => {
      const data = {
        socket_id: socketId,
        channel_name: channel.name
      };
      store.dispatch('auth/pusherAuth', data)
      .then(res => {
        callback(null, res);
      })
      .catch(err => {
        console.error(err);
      });
    }
  }
};

export {
  changeToSlug,
  getCurrentYear,
  formatModuleAccess,
  checkAddressExists,
  toGeocodeString,
  formatCurrency,
  strUcFirst,
  recursiveSidebarMenu,
  formatTime,
  pusherAuthorizer
};