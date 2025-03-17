document.addEventListener("DOMContentLoaded", function () {
  // Código para el menú responsive
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
    });
  }

  // Código para el cambio de tema (día/noche)
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle.querySelector("i");

  // Verificar si hay una preferencia guardada
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  }

  // Manejar el clic en el botón de tema
  themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    // Cambiar el icono
    if (document.body.classList.contains("dark-mode")) {
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
      localStorage.setItem("theme", "dark");
    } else {
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
      localStorage.setItem("theme", "light");
    }
  });

  // Código para el formulario de reseñas (solo se ejecutará en la página de reviews)
  const stars = document.querySelectorAll(".star-rating");
  const ratingInput = document.getElementById("rating");
  const reviewForm = document.querySelector(".review-form-container");
  const reviewsGrid = document.querySelector(".reviews-grid");

  // Manejo de estrellas de calificación
  if (stars.length > 0 && ratingInput) {
    stars.forEach((star) => {
      star.addEventListener("click", function () {
        const rating = this.getAttribute("data-rating");
        ratingInput.value = rating;

        // Reset all stars
        stars.forEach((s) => {
          s.classList.remove("fas", "active");
          s.classList.add("far");
        });

        // Fill stars up to the selected rating
        for (let i = 0; i < stars.length; i++) {
          if (i < rating) {
            stars[i].classList.remove("far");
            stars[i].classList.add("fas", "active");
          }
        }
      });
    });
  }

  // Manejo del envío del formulario de reseñas
  if (reviewForm && reviewsGrid) {
    reviewForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Obtener valores del formulario
      const nombre = document.getElementById("nombre").value;
      const rating = parseInt(document.getElementById("rating").value);
      const comentario = document.getElementById("comentario").value;

      // Obtener avatar seleccionado
      const avatarSelected = document.querySelector(
        'input[name="avatar"]:checked'
      );
      if (!avatarSelected) {
        alert("Por favor selecciona una imagen de perfil");
        return;
      }
      const avatarSrc = "img/" + avatarSelected.value;

      // Crear fecha actual
      const fecha = new Date();
      const meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];
      const fechaFormateada =
        meses[fecha.getMonth()] + " " + fecha.getFullYear();

      // Crear HTML para la nueva reseña
      const newReview = document.createElement("div");
      newReview.className = "review-card";
      newReview.innerHTML = `
        <div class="review-header">
          <img src="${avatarSrc}" alt="${nombre}">
          <div class="review-info">
            <h4>${nombre}</h4>
            <div class="stars">
              ${generateStars(rating)}
            </div>
          </div>
        </div>
        <p class="review-text">"${comentario}"</p>
        <p class="review-date">${fechaFormateada}</p>
      `;

      // Añadir la nueva reseña al principio del grid
      reviewsGrid.insertBefore(newReview, reviewsGrid.firstChild);

      // Resetear el formulario
      reviewForm.reset();
      stars.forEach((s) => {
        s.classList.remove("fas", "active");
        s.classList.add("far");
      });
      ratingInput.value = 0;

      // Mostrar mensaje de confirmación
      alert("¡Gracias por tu reseña!");

      // Hacer scroll hasta la nueva reseña
      newReview.scrollIntoView({ behavior: "smooth" });
    });
  }

  // Función para generar HTML de estrellas
  function generateStars(rating) {
    let starsHTML = "";
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        starsHTML += '<i class="fas fa-star"></i>';
      } else if (i - 0.5 === rating) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
      } else {
        starsHTML += '<i class="far fa-star"></i>';
      }
    }
    return starsHTML;
  }
});
