<template>
  <div class="container" @mousemove="updateMousePosition">
    <div
      class="background"
      :style="{
        backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.2) 0%, transparent 20%)`,
      }">
    </div>

    <h1 class="main-title">Welcome to the Future</h1>

    <!-- Botones solo si no estamos en la lista de usuarios -->
    <div v-if="viewForm !== 'userList'" class="button-container">
      <button class="custom-button" @click="showLoginForm">Login</button>
      <button class="custom-button" @click="showRegisterForm">Register</button>
    </div>

    <!-- Formulario de login -->
    <div v-if="viewForm === 'login'" class="form-container">
      <h2>Iniciar Sesión</h2>
      <form @submit.prevent="loginUser">
        <input type="text" v-model="loginNombre" placeholder="Nombres" required />
        <input type="password" v-model="loginPassword" placeholder="Contraseña" required />
        <button type="submit" class="form-button">Login</button>
      </form>
      <button @click="backToMain" class="form-button">Volver</button>
    </div>

    <!-- Formulario de registro -->
    <div v-if="viewForm === 'register'" class="form-container">
      <h2>Registro de Usuarios</h2>
      <form @submit.prevent="registerUser">
        <input type="text" v-model="nombres" placeholder="Nombres" required />
        <input type="text" v-model="apellidos" placeholder="Apellidos" required />
        <input type="date" v-model="fecha_nacimiento" placeholder="Fecha de Nacimiento" required />
        <input type="password" v-model="password" placeholder="Contraseña" required />
        <button type="submit" class="form-button">Registrar</button>
      </form>
      <button @click="backToMain" class="form-button">Volver</button>
    </div>
    <!-- Lista de usuarios tras el login -->
    <div v-if="viewForm === 'userList'" class="user-list-container">
      <h2>Usuarios Registrados</h2>
      <ul>
        <li v-for="(user, index) in users" :key="index">{{ user[0] }} {{ user[1] }}</li>
      </ul>
      <button @click="backToMain" class="form-button">Cerrar Sesión</button>
    </div>

  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      // Datos originales
      nombres: '',
      apellidos: '',
      fecha_nacimiento: '',
      password: '',
      loginNombre: '',
      loginPassword: '',
      users: [],
      viewForm: null,
      // Estado de animación
      mousePosition: { x: 0, y: 0 }
    };
  },
  methods: {
    // Método para actualizar la posición del ratón
    updateMousePosition(event) {
      this.mousePosition = { x: event.clientX, y: event.clientY };
    },
    showRegisterForm() {
      this.viewForm = 'register';
    },
    showLoginForm() {
      this.viewForm = 'login';
    },
    backToMain() {
      this.viewForm = null;
    },
    async registerUser() {
      try {
        const response = await axios.post('http://ec2-3-80-31-23.compute-1.amazonaws.com:5000/register', {
          nombres: this.nombres,
          apellidos: this.apellidos,
          fecha_nacimiento: this.fecha_nacimiento,
          password: this.password
        });
        alert(response.data.message);
        this.backToMain();
      } catch (error) {
        console.error('Error al registrar el usuario:', error);
      }
    },
    async loginUser() {
      try {
        const response = await axios.post('http://ec2-3-80-31-23.compute-1.amazonaws.com:5000/login', {
          nombres: this.loginNombre,
          password: this.loginPassword
        });

        if (response.status === 200) {
          alert('Login exitoso');
          this.fetchUsers(); // Obtenemos la lista de usuarios
        }
      } catch (error) {
        alert('Nombre o contraseña incorrectos');
      }
    },

    // Obtener usuarios registrados tras el login
    async fetchUsers() {
      try {
        const response = await axios.get('http://ec2-3-80-31-23.compute-1.amazonaws.com:5000/users');
        this.users = response.data;
        this.viewForm = 'userList'; // Cambiamos la vista para mostrar la lista de usuarios
      } catch (error) {
    console.error('Error al obtener los usuarios:', error);
      }
    }

  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

.container {
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #6b00b6, #ff5a79);
  overflow: hidden;
}

/* Fondo dinámico */
.background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

/* Estilo de título */
.main-title {
  font-size: 3rem;
  font-weight: bold;
  color: white;
  margin-bottom: 20px;
  z-index: 1;
  text-align: center;
}

/* Botones principales */
.button-container {
  display: flex;
  gap: 20px;
  z-index: 1;
}

.custom-button {
  width: 150px;
  height: 50px;
  font-size: 18px;
  font-weight: bold;
  color: #6b00b6;
  background-color: white;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.custom-button:hover {
  background-color: #f0f0f0;
  transform: scale(1.05);
}

/* Formulario de registro y login */
.form-container {
  z-index: 1;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  margin-top: 30px;
}

.form-button {
  background-color: #6b00b6;
  color: white;
  border: none;
  padding: 10px;
  margin-top: 10px;
  width: 100%;
  border-radius: 5px;
  cursor: pointer;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-button:hover {
  background-color: #58008f;
}
.user-list-container {
  z-index: 1;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  margin-top: 30px;
}

.user-list-container ul {
  list-style-type: none;
  padding: 0;
}

.user-list-container li {
  margin-bottom: 10px;
  font-weight: bold;
}

</style>
