export const handleLogout = () => {
  localStorage.clear();

  location.reload();
};

export const handlelogin = (result) => {
  localStorage.setItem("token", result.key);
  const userInfo = {
    name: result.user_info.firstname + " " + result.user_info.lastname,
    id: result.user_info.company_id,
    email: result.user_info.email,
    phone: result.user_info.phone,
  };
  localStorage.setItem("userinfo", JSON.stringify(userInfo));
};
