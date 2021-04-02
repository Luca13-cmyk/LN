<template>
  <div class="text-center">
    <v-bottom-sheet v-model="bottomSheet" persistent>
      <v-sheet class="text-center" height="500px">
        <v-btn class="mt-6" text color="error" @click="close">
          Fechar
        </v-btn>
        <div class="py-3">
          <v-form ref="form" v-model="valid" lazy-validation class="ma-6">
            <!-- <h1>{{ dataSheet }}</h1> -->
            <div v-if="dataSheet.type == 'link'">
              <v-text-field
                v-model="dataSheet.name"
                label="Nome"
                :rules="fieldRules"
                required
              ></v-text-field>
              <v-text-field
                v-model="dataSheet.desc"
                label="Descrição"
                :rules="fieldRules"
                required
              >
              </v-text-field>
              <v-text-field
                v-model="dataSheet.linkURL"
                label="Link URL"
                :rules="fieldRules"
                required
              ></v-text-field>
            </div>
            <div v-if="dataSheet.type == 'topic'">
              <v-textarea
                :rules="fieldRules"
                required
                v-model="dataSheet.topic.content"
                label="Contéudo"
              >
              </v-textarea>

              <v-text-field
                v-model="dataSheet.topic.desc"
                :rules="fieldRules"
                label="Descrição"
                required
              ></v-text-field>
              <v-text-field
                v-model="dataSheet.topic.photo"
                :rules="fieldRules"
                label="FotoURL"
              ></v-text-field>
            </div>
            <div v-if="dataSheet.type == 'subject'">
              <v-text-field
                v-model="dataSheet.id"
                disabled
                label="Nome"
              ></v-text-field>
              <v-text-field
                v-model="dataSheet.defaultPhotoURL"
                :rules="fieldRules"
                label="Foto URL Padrão"
                required
              ></v-text-field>
            </div>
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="validate"
            >
              Atualizar
            </v-btn>

            <v-btn color="error" class="mr-4" @click="reset">
              Resetar
            </v-btn>
          </v-form>
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import { FirebaseActions } from "@/utils/FirebaseActions";

export default {
  computed: {
    bottomSheet: {
      get: function() {
        return this.$store.getters.bottomSheet;
      },
      set: function() {
        this.$store.dispatch("setSheetFalse");
      },
    },
    dataSheet() {
      return this.$store.getters.dataSheet;
    },
  },
  methods: {
    close() {
      this.$store.dispatch("setSheetFalse");
    },
    validate() {
      if (this.$refs.form.validate()) {
        if (this.dataSheet.type == "link") {
          FirebaseActions.updateLink(this.dataSheet)
            .then(() => {
              this.$store.dispatch("initInfo", "Link atualizado");
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (this.dataSheet.type == "topic") {
          FirebaseActions.updateTopic(this.dataSheet.id, this.dataSheet.topic)
            .then(() => {
              this.$store.dispatch("initInfo", "Topico atualizado");
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (this.dataSheet.type == "subject") {
          FirebaseActions.updateSubject(this.dataSheet)
            .then(() => {
              this.$store.dispatch("initInfo", "Assunto atualizado");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    },
    reset() {
      if (this.dataSheet.type == "subject") return;
      this.$refs.form.reset();
    },
  },
  data: () => ({
    valid: true,
    fieldRules: [(v) => (v ? !!v.trim() : null || "Campo é necessário")],
  }),
};
</script>
