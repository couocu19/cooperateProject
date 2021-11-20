export function window_addEvent() {
  window.addEventListener(
    "pageshow",
    (e) => {
      // 适配ios设备
      if (e.persisted) {
        window.location.reload();
      } else {
        // ios外的设备
        if (sessionStorage.getItem("refresh") === "true") {
          window.location.reload();
        }
      }
      // 清除session
      window.sessionStorage.removeItem("refresh");
    },
    false
  );
}

export function setSessionBack() {
  window.sessionStorage.setItem("refresh", "true");
  window.history.back();
}
