este archivo de aca

<template>
  <div>
    <!-- Interfaz Principal -->
    <h1>Petro hijueputa</h1>
    <div v-if="!viewForm">
      <button @click="showRegisterForm">Registrarse</button>
      <button @click="showLoginForm">Login</button>
    </div>

    <!-- Formulario de Registro -->
    <div v-if="viewForm === 'register'">
      <h2>Registro de Usuarios</h2>
      <form @submit.prevent="registerUser">
        <input type="text" v-model="nombres" placeholder="Nombres" required />
        <input type="text" v-model="apellidos" placeholder="Apellidos" required />
        <input type="date" v-model="fecha_nacimiento" placeholder="Fecha de Nacimiento" required />
        <input type="password" v-model="password" placeholder="Contraseña" required />
        <button type="submit">Registrar</button>
      </form>
      <button @click="backToMain">Volver</button>
    </div>

    <!-- Formulario de Login -->
    <div v-if="viewForm === 'login'">
      <h2>Iniciar Sesión</h2>
      <form @submit.prevent="loginUser">
        <input type="text" v-model="loginNombre" placeholder="Nombres" required />
        <input type="password" v-model="loginPassword" placeholder="Contraseña" required />
        <button type="submit">Login</button>
      </form>
      <button @click="backToMain">Volver</button>
    </div>

    <!-- Listado de Usuarios tras Login -->
    <div v-if="viewForm === 'userList'">
      <h2>Usuarios Registrados</h2>
      <ul>
        <li v-for="(user, index) in users" :key="index">{{ user[0] }} {{ user[1] }}</li>
      </ul>
      <button @click="backToMain">Cerrar Sesión</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      // Datos de registro
      nombres: '',
      apellidos: '',
      fecha_nacimiento: '',
      password: '',
      // Datos de login
      loginNombre: '',
      loginPassword: '',
      // Usuarios registrados
      users: [],
      // Control de vista actual
      viewForm: null,
    };
  },
  methods: {
    // Mostrar formulario de registro
    showRegisterForm() {
      this.viewForm = 'register';
    },
    // Mostrar formulario de login
    showLoginForm() {
      this.viewForm = 'login';
    },
    // Volver a la pantalla principal
    backToMain() {
      this.viewForm = null;
      this.clearForm();
    },
    // Registro de usuario
    async registerUser() {
      try {
        const response = await axios.post('http://ec2-3-89-119-38.compute-1.amazonaws.com:5000/register', {
          nombres: this.nombres,
          apellidos: this.apellidos,
          fecha_nacimiento: this.fecha_nacimiento,
          password: this.password
        });
        alert(response.data.message);
        this.clearForm();
        this.backToMain();
      } catch (error) {
        console.error('Error al registrar el usuario:', error);
      }
    },
    // Autenticación de usuario
    async loginUser() {
      try {
        const response = await axios.post('http://ec2-3-89-119-38.compute-1.amazonaws.com:5000/login', {
          nombres: this.loginNombre,
          password: this.loginPassword
        });
    
        if (response.status === 200) {
          alert('Login exitoso');
          this.fetchUsers();  // Ir a la lista de usuarios si el login es correcto
        }
      } catch (error) {
        alert('Nombre o contraseña incorrectos');
      }
    }
    ,
    // Obtener usuarios registrados
    async fetchUsers() {
      try {
        const response = await axios.get('http://ec2-3-89-119-38.compute-1.amazonaws.com:5000/users');
        this.users = response.data;
        this.viewForm = 'userList';
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    },
    // Limpiar campos del formulario
    clearForm() {
      this.nombres = '';
      this.apellidos = '';
      this.fecha_nacimiento = '';
      this.password = '';
      this.loginNombre = '';
      this.loginPassword = '';
    }
  }
};
</script>

<style scoped>
/* Estilos simples para mejorar la apariencia */
button {
  margin: 10px;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
input {
  display: block;
  margin-bottom: 10px;
  padding: 10px;
  width: 100%;
  max-width: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
