document.getElementById("registroForm").addEventListener("submit", async function(event) {
    event.preventDefault(); 

   
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

   
    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
    }

    if (password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres");
        return;
    }

    
    try {
        const response = await fetch("http://localhost:8080/api/usuarios/registro", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Registro exitoso. Redirigiendo al login...");
            window.location.href = "login.html"; 
        } else {
            alert(data.error || "Error en el registro");
        }
    } catch (error) {
        alert("Error de conexión con el servidor");
    }
});