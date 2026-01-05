function closeModal(hash) {
  const dialog = document.getElementById(hash);
  dialog.close();
  window.location.hash = "";
  history.replaceState(null, "", window.location.pathname);
}

function isUserLoggedIn() {
  return document.cookie
    .split("; ")
    .some((c) => c.startsWith("greentruth_auth=authenticated"));
}

function handleHashModal() {
  const hash = window.location.hash.replace("#", "");
  const dialog = document.getElementById(hash);

  if(isUserLoggedIn()) {
    Array.from(document.getElementsByClassName("non-auth-text")).forEach(element => {
      element.classList.add("hidden");
    });
    Array.from(document.getElementsByClassName("auth-text")).forEach(element => {
      element.classList.remove("hidden");
    });
    Array.from(document.getElementsByClassName("download-pdf")).forEach(element => {
      element.classList.remove("hidden");
    });
    Array.from(document.getElementsByClassName("create-account")).forEach(element => {
      element.classList.add("hidden");
    });
    Array.from(document.getElementsByClassName("login")).forEach(element => {
      element.classList.add("hidden");
    });
  } else {
    Array.from(document.getElementsByClassName("non-auth-text")).forEach(element => {
      element.classList.remove("hidden");
    });
    Array.from(document.getElementsByClassName("auth-text")).forEach(element => {
      element.classList.add("hidden");
    });
    Array.from(document.getElementsByClassName("download-pdf")).forEach(element => {
      element.classList.add("hidden");
    });
    Array.from(document.getElementsByClassName("create-account")).forEach(element => {
      element.classList.remove("hidden");
    });
    Array.from(document.getElementsByClassName("login")).forEach(element => {
      element.classList.remove("hidden");
    });
  }

  document.querySelectorAll("dialog[open]").forEach(d => {
    if (d !== dialog) d.close();
  });

  if (dialog?.tagName === "DIALOG") {
    dialog.showModal();
  }
}

// Open on load + hash change
window.addEventListener("load", handleHashModal);
window.addEventListener("hashchange", handleHashModal);

// Close logic
document.querySelectorAll("dialog").forEach(dialog => {
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
      dialog.close();
      history.replaceState(null, "", window.location.pathname);
    }
  });

  dialog.querySelector("[data-close]")?.addEventListener("click", () => {
    dialog.close();
    history.replaceState(null, "", window.location.pathname);
  });
});


//Return URL redirections
const baseUrl = window.location.origin;

document.querySelectorAll(".create-account").forEach(link => {
  const path = link.dataset.id || "";

  link.href = `https://app.greentruth.com/register?returnUrl=${encodeURIComponent(baseUrl + '/resources.html#' + path)}`;
});

document.querySelectorAll(".create-account").forEach(link => {
  const path = link.dataset.id || "";

  if(!link){
    return;
  }

  link.href = `https://app.greentruth.com/register?returnUrl=${encodeURIComponent(baseUrl + '/resources.html#' + path)}`;
});


document.querySelectorAll(".login").forEach(link => {
  const path = link.dataset.id || "";

  if(!link){
    return;
  }

  link.href = `https://app.greentruth.com/login?returnUrl=${encodeURIComponent(baseUrl + '/resources.html#' + path)}`;
});