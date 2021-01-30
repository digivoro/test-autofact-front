<template>
  <q-page class="index page flex flex-center row">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md col-12 col-sm-6 col-md-5 col-lg-4"
    >
      <q-input
        filled
        v-model="user"
        type="email"
        label="Usuario *"
        hint="Tu correo electrónico"
        :error="$v.user.$invalid"
        :error-message="errMsg('email')"
      />

      <q-input
        filled
        type="password"
        v-model="pass"
        label="Contraseña *"
        :error="$v.pass.$invalid"
        :error-message="errMsg('pass')"
      />

      <div>
        <q-btn label="Enviar" type="submit" color="primary" />
        <q-btn
          label="Limpiar"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import { mapActions, mapState } from "vuex";

const PASS_MIN_LENGTH = 4;

export default {
  data() {
    return {
      user: "user@gmail.com",
      pass: "123456",
    };
  },

  validations: {
    user: { required, email },
    pass: { required, minLength: minLength(PASS_MIN_LENGTH) },
  },

  methods: {
    ...mapActions("login", ["verifyLogin"]),

    async onSubmit() {
      await this.verifyLogin({ user: this.user, pass: this.pass });
    },

    onReset() {
      this.user = null;
      this.age = null;
    },

    errMsg(field) {
      if (field === "user") {
        if (!this.$v.email.email) return "Debe ser un email";
        if (!this.$v.email.required) return "Campo requerido";
      }

      if (field === "pass") {
        if (!this.$v.pass.minLength)
          return `Tamaño minimo ${PASS_MIN_LENGTH} caracteres`;
        if (!this.$v.pass.required) return "Campo requerido";
      }
    },
  },

  computed: {
    ...mapState("login", ["currentUser"]),
  },
};
</script>
