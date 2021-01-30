<template>
  <q-page class="quiz page flex flex-center row">
    <h1 class="col-12 text-center">Quiz</h1>
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md col-12 col-sm-12 col-md-5 col-lg-4"
    >
      <p class="quiz__question">¿Qué te gustaría que agregaramos al informe?</p>
      <q-input
        class="quiz__answer"
        filled
        v-model="report"
        type="text"
        hint="Tu respuesta"
        :error="$v.report.$invalid"
        :error-message="errMsg('text')"
      />

      <p class="quiz__question">¿La información fue correcta?</p>
      <q-toggle
        class="quiz__answer"
        v-model="correct"
        color="blue"
        :label="correct ? 'Sí' : 'No'"
        left-label
      />

      <p class="quiz__question">Del 1 al 5 ¿Es rápido el sitio?</p>
      <q-rating
        class="quiz__answer"
        v-model="rating"
        size="2.5rem"
        color="primary"
        icon="star_border"
        icon-selected="star"
      />

      <div class="flex flex-center q-mt-xl">
        <q-btn
          :disable="$v.report.$invalid"
          label="Enviar"
          type="submit"
          color="primary"
        />
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
import { required } from "vuelidate/lib/validators";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      report: "",
      correct: false,
      rating: 3,
    };
  },

  validations: {
    report: { required },
  },

  methods: {
    ...mapActions("login", ["sendQuiz"]),

    async onSubmit() {
      let { report, correct, rating } = this;
      await this.sendQuiz({ report, correct, rating });
    },

    onReset() {
      this.report = "";
      this.correct = false;
      this.rating = 0;
    },

    errMsg(field) {
      if (field === "text") {
        if (!this.$v.report.required) return "Campo requerido";
      }
    },
  },

  computed: {
    ...mapState("login", ["currentUser"]),
  },
};
</script>

<style lang="scss" scoped></style>
