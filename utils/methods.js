 const routerDefend = () => {
	try {
	  const value = uni.getStorageSync("userData");
	  if (!value?.accessToken) {
	    uni.reLaunch({
	      url: "../../pages/login/login",
	    });
	    return
	  }
	  this.apiStatus = uni.getStorageSync("apiStatus");
	} catch (e) {
	  // error
	}
}

export default {
	routerDefend,
}
