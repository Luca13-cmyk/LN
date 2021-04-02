<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="black" dark v-bind="attrs" v-on="on">
          Adicionar
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <v-tabs class="mt-5">
            <v-tab @click="type = 'Subject'">Assunto</v-tab>
            <v-tab @click="type = 'Topic'">Tópico</v-tab>
            <v-tab @click="type = 'Contact'">Amigo</v-tab>
            <v-tab @click="type = 'Link'">Link</v-tab>
            <v-tab @click="type = 'toDo'">Lembretes</v-tab>
          </v-tabs>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation class="ma-6">
              <!-- ########## Subject ######### -->
              <v-row v-if="type == 'Subject'">
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="values.subject"
                    :rules="fieldRules"
                    label="Assunto... (*)"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="values.defaultPhotoURL"
                    :rules="fieldRules"
                    label="Foto URL Padrão (*)"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <!-- ############ Topic ################ -->

              <v-row v-if="type == 'Topic'">
                <v-col cols="12">
                  <v-textarea
                    :rules="fieldRules"
                    required
                    v-model="values.topic.content"
                    label="Comando/Contéudo (*)"
                  >
                  </v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    :rules="fieldRules"
                    required
                    v-model="values.topic.desc"
                    label="Descrição (*)"
                  >
                  </v-textarea>
                </v-col>

                <v-col cols="12" md="6">
                  <v-select
                    v-model="values.topic.type"
                    :rules="fieldRules"
                    :items="subjects"
                    label="Assunto... (*)"
                  ></v-select>
                </v-col>
              </v-row>

              <!-- ######### CONTACT ############ -->

              <!-- ######### LINK ############ -->
              <v-row v-if="type == 'Link'">
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="values.link.name"
                    :rules="fieldRules"
                    label="Nome (*)"
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="values.link.desc"
                    :rules="fieldRules"
                    label="Descrição (*)"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="values.link.linkURL"
                    :rules="fieldRules"
                    label="Link URL (*)"
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="values.link.imageUrl"
                    :rules="fieldRules"
                    label="Imagem URL (*)"
                    required
                  >
                  </v-text-field>
                </v-col>
              </v-row>

              <!-- ###################### ToDo ###########-->
              <v-row v-if="type == 'toDo'">
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="values.toDo.title"
                    :rules="fieldRules"
                    label="Título (*)"
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    :rules="fieldRules"
                    required
                    v-model="values.toDo.desc"
                    label="Descrição (*)"
                  >
                  </v-textarea>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
          <small>*Campos orbrigatorios</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Fechar
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            :disabled="!valid"
            @click="saveData"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { FirebaseActions } from "../utils/FirebaseActions";

export default {
  data: () => ({
    dialog: false,
    type: "Subject",
    values: { topic: {}, link: {}, toDo: {} },
    valid: true,
    fieldRules: [(v) => (v ? !!v.trim() : null || "Campo é necessário")],
  }),
  computed: {
    subjects() {
      let subjects = [];
      this.$store.state.subjects.forEach((item) => {
        subjects.push(item.id);
      });
      return subjects;
    },
  },
  methods: {
    saveData() {
      if (!this.$refs.form.validate()) return;
      switch (this.type) {
        case "Subject":
          FirebaseActions.addSubject(
            this.values.subject,
            this.values.defaultPhotoURL
          )
            .then(() => {
              this.$store.dispatch("initInfo", "Assunto adicionado");
            })
            .catch((error) => {
              this.$store.dispatch("initInfo", error);
            });
          break;
        case "Topic":
          FirebaseActions.addTopic(this.values.topic)
            .then(() => {
              this.$store.dispatch("initInfo", "Tópico adicionado");
            })
            .catch((error) => {
              this.$store.dispatch("initInfo", error);
            });
          break;
        case "Contact":
          console.log(this.values.contact);
          break;
        case "Link":
          FirebaseActions.addLink(this.values.link)
            .then(() => {
              this.$store.dispatch("initInfo", "Link adicionado");
            })
            .catch((error) => {
              this.$store.dispatch("initInfo", error);
            });
          break;
        case "toDo":
          FirebaseActions.addTodo(this.values.toDo)
            .then(() => {
              this.$store.dispatch("initInfo", "Lembrete adicionado");
            })
            .catch((error) => {
              this.$store.dispatch("initInfo", error);
            });
          break;
        default:
          break;
      }
    },
  },
  mounted() {
    this.$store.dispatch("bindSubjects");
  },
};
</script>

<style></style>
