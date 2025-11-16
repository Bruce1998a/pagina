// auth.js – manejo básico de Netlify Identity y protección de páginas

if (typeof netlifyIdentity !== "undefined") {
  netlifyIdentity.init();

  document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const requiresAuth = body.dataset.protected === "true";

    function updateUserUI(user) {
      const spanUser = document.querySelector("[data-username]");
      if (spanUser) {
        spanUser.textContent = user
          ? (user.email || user.user_metadata.full_name || "Usuario")
          : "Invitado";
      }
    }

    netlifyIdentity.on("init", function (user) {
      if (requiresAuth && !user) {
        netlifyIdentity.open();
      } else if (user) {
        updateUserUI(user);
      }
    });

    const btnLogout = document.querySelector("[data-logout]");
    if (btnLogout) {
      btnLogout.addEventListener("click", function () {
        netlifyIdentity.logout();
      });
    }

    netlifyIdentity.on("login", function (user) {
      updateUserUI(user);
    });

    netlifyIdentity.on("logout", function () {
      if (requiresAuth) {
        window.location.href = "/";
      }
    });
  });
}
