import axios, { AxiosRequestConfig } from "axios";
import useSettingStore from "@/store/useSettingStore";
import useAccessStore from "@/store/useUserAccessStore";

// 自定义判断元素类型JS
function toType(obj: any): string {
  return {}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)![1]
    .toLowerCase();
}

// 参数过滤函数
function filterNull(o: any) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key];
    }
    if (toType(o[key]) === "string") {
      o[key] = o[key].trim();
    } else if (toType(o[key]) === "object") {
      o[key] = filterNull(o[key]);
    } else if (toType(o[key]) === "array") {
      o[key] = filterNull(o[key]);
    }
  }
  return o;
}

// 接口处理函数
function apiAxios(
  method: string,
  url: string,
  params: null | string | object,
  success: any,
  failure: any
) {
  let contentTypeIsJson = false;
  if (params && typeof params !== "string") {
    params = filterNull(params);
  } else {
    contentTypeIsJson = true;
  }

  // axios 对特殊字符处理
  if (params && (method === "GET" || method === "DELETE")) {
    const arr: Array<string> = [];
    Object.entries(params).forEach((item) => {
      arr.push(`${item[0]}=${encodeURIComponent(item[1])}`);
    });
    url = `${url}?${arr.join("&")}`;
  }

  axios({
    method: method,
    url: url,
    data: method === "POST" || method === "PUT" ? params : null,
    params: method === "GET" || method === "DELETE" ? "" : null,
    withCredentials: true,
    crossDomain: true,
    transformRequest: [
      function (data) {
        // Do whatever you want to transform the data
        if (contentTypeIsJson) return data;
        let ret = "";
        for (let it in data) {
          ret +=
            encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
        }
        return ret;
      },
    ],
    headers: {
      "Content-Type": contentTypeIsJson
        ? "application/json"
        : "application/x-www-form-urlencoded",
    },
  } as AxiosRequestConfig<any>)
    .then(function (res) {
      let response = res.data;

      if (response.code == 401) {
        window.location.href = "/login";
        return;
      } else if (response.code == 0) {
        if (success) {
          success(response);
        }
      } else {
        if (failure) {
        } else {
          console.log(response.message);
        }
      }
    })
    .catch((err) => {
      let res = err.response;
      console.error(res || err);

      if (res && res.status && res.status === 401) {
        location.href = `${useSettingStore.getState().defaultLocale}/login`;
      }
    });
}

let requestCount = 0;
let timeObj: NodeJS.Timeout;
// http request 拦截器
axios.interceptors.request.use((config) => {
  requestCount++;
  if (requestCount == 1) {
    timeObj = setTimeout(() => {
      console.log("加载中...");
    }, 800);
  }

  if (
    config.data &&
    Object.prototype.toString.call(config.data) == "[object FormData]"
  ) {
    config.headers["Content-Type"] = "multipart/form-data;charset=utf-8";
    config.transformRequest = [
      function (data) {
        return data;
      },
    ];
  }

  // 在请求头中添加 token
  const token = useAccessStore.getState().token;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

// http response 拦截器
axios.interceptors.response.use((response) => {
  requestCount--;
  if (requestCount === 0) {
    setTimeout(() => {
      console.log("加载完成");
    }, 1500);
    clearTimeout(timeObj);
  }
  return response;
});

// 返回在vue模板中的调用接口
export default {
  get: function (
    url: string,
    params: string | object | null,
    success: any,
    failure: any
  ) {
    return apiAxios("GET", url, params, success, failure);
  },
  post: function (
    url: string,
    params: string | object,
    success: any,
    failure: any
  ) {
    return apiAxios("POST", url, params, success, failure);
  },
  put: function (
    url: string,
    params: string | object,
    success: any,
    failure: any
  ) {
    return apiAxios("PUT", url, params, success, failure);
  },
  delete: function (
    url: string,
    params: string | object,
    success: any,
    failure: any
  ) {
    return apiAxios("DELETE", url, params, success, failure);
  },
};
