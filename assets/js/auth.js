function isUserLoggedIn() {
  return document.cookie
    .split("; ")
    .some((c) => c.startsWith("greentruth_auth=authenticated"));
}

document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("login-button");
  const logoutButton = document.getElementById("logout-button");
  const getStartedButton = document.getElementById("get-started-button");

  logoutButton?.addEventListener("click", () => {
    document.cookie = "greentruth_auth=; path=/; max-age=0;";
    nonAuthenticatedState();
  });

  function nonAuthenticatedState() {
    getStartedButton?.classList.remove("hidden");
    loginButton?.classList.remove("hidden");
    logoutButton?.classList.add("hidden");
  }

  function authenticatedState() {
    getStartedButton?.classList.add("hidden");
    loginButton?.classList.add("hidden");
    logoutButton?.classList.remove("hidden");
  }

  //check if user is logged in
  if (isUserLoggedIn()) {
    authenticatedState();
  } else {
    nonAuthenticatedState();
  }
});
