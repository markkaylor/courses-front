<template>
  <div class="container-form">
    <b-card :title="accountStatusTitle">
      <b-form>
        <b-form-group>
          <b-form-input
            v-if="!hasAccount"
            v-model="username"
            placeholder="Username"
            type="text"
          />
        </b-form-group>
        <b-form-group>
          <b-form-input v-model="email" placeholder="Email" type="email" />
        </b-form-group>
        <b-form-group>
          <b-form-input
            v-model="password"
            placeholder="Password"
            type="password"
          />
        </b-form-group>
        <div class="container-btn">
          <b-button variant="link" @click="toggleHasAccount">
            {{
              hasAccount
                ? "Don't have an account yet? Signup"
                : 'Already have an account? Login'
            }}
          </b-button>
          <b-button v-if="hasAccount" variant="primary" @click="loginUser">
            Login
          </b-button>
          <b-button v-else variant="primary" @click="signupUser">
            Signup
          </b-button>
        </div>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      hasAccount: false,
      username: '',
      email: '',
      password: '',
    }
  },
  computed: {
    accountStatusTitle() {
      return this.hasAccount ? 'Login' : 'Signup'
    },
  },
  methods: {
    async signupUser(e) {
      e.preventDefault()
      try {
        await axios.post('http://localhost:1337/auth/local/register', {
          username: this.username,
          email: this.email,
          password: this.password,
        })
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
      }
    },
    async loginUser(e) {
      e.preventDefault()
      try {
        const { data } = await axios.post('http://localhost:1337/auth/local', {
          identifier: this.email,
          password: this.password,
        })
        // eslint-disable-next-line
        console.log(data)
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
      }
    },
    toggleHasAccount() {
      this.hasAccount = !this.hasAccount
    },
  },
}
</script>

<style scoped>
.card {
  margin-top: 5rem;
  width: 400px;
}

.container-form {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container-btn {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.btn-link:focus,
.btn-link.focus {
  text-decoration: none;
  outline: 0;
  box-shadow: none;
}
</style>
