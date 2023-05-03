export const handleLogout = async () => {
  localStorage.clear();
  location.reload();
};

export const handlelogin = (result) => {
  document.cookie = `token=${result?.token}`;
  const userInfo = {
    user_id: result.user_info.user_id,
    name: result.user_info.firstname + " " + result.user_info.lastname,
    id: result.user_info.company_id,
    email: result.user_info.email,
    phone: result.user_info.phone,
  };
  localStorage.setItem("userinfo", JSON.stringify(userInfo));
};
