<template>
  <div class="container-form">
    <b-alert v-model="showAlert" variant="danger" dismissible>
      Please login or signup first
    </b-alert>
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
          <b-button v-else variant="primary" @click="registerUser">
            Signup
          </b-button>
        </div>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import registerMutation from '~/apollo/mutations/user/register'
import loginMutation from '~/apollo/mutations/user/login'

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
    showAlert() {
      return this.$store.state.route.forbidden
    },
  },
  async mounted() {
    await this.$apolloHelpers.onLogout()
  },
  methods: {
    async registerUser(e) {
      e.preventDefault()

      try {
        const credentials = {
          username: this.username,
          email: this.email,
          password: this.password,
        }
        await this.$apollo.mutate({
          mutation: registerMutation,
          variables: credentials,
        })
        this.loginUser(e)
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
      }
    },
    async loginUser(e) {
      e.preventDefault()
      try {
        const credentials = {
          identifier: this.email,
          password: this.password,
        }

        const {
          data: {
            login: { jwt },
          },
        } = await this.$apollo.mutate({
          mutation: loginMutation,
          variables: credentials,
        })

        await this.$apolloHelpers.onLogin(jwt)
        this.$router.push('/courses')
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
  flex-direction: column;
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
