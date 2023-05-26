export const handleLogout = async () => {
  sessionStorage.clear();
  location.reload();
};

export const handlelogin = (result) => {
  localStorage.setItem("isFirstLogin", "1");
  sessionStorage.setItem("token", result?.token);
  const userInfo = {
    user_id: result.user_info.user_id,
    name: result.user_info.firstname + " " + result.user_info.lastname,
    id: result.user_info.company_id,
    email: result.user_info.email,
    phone: result.user_info.phone,
  };
  sessionStorage.setItem("userinfo", JSON.stringify(userInfo));
};
