<template>
  <div class="text-center">
    <v-bottom-sheet
      v-model="sheet.sheet"
      persistent
    >
      <v-sheet
        class="text-center"
        height="500px"
      >
        <v-btn
          class="mt-6"
          text
          color="error"
          @click="closeSheet"
        >
          Fechar
        </v-btn>
        <div class="py-3" >
        <!-- {{sheet.config.subject.id}} -->
            
                <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          class="ma-6"
        >
        <!-- #########  CONFIG  -->

        <!-- ####### subject ######## -->
          <div v-if="sheet.config.subject">
            <v-text-field
            v-model="sheet.config.subject.topic.content"
            :rules="contentRules"
            label="Conteudo"
            required
          ></v-text-field>

          <v-text-field
            v-model="sheet.config.subject.topic.desc"
            :rules="descRules"
            label="Descrição"
            required
          ></v-text-field>
          <v-text-field
            v-model="sheet.config.subject.topic.photo"
            label="FotoURL"
          ></v-text-field>

          </div>

        <!-- ####### LinkInfo ######## -->
          <div v-if="sheet.config.linkInfo">
            <h1>link {{ sheet.config.linkInfo.id }} </h1>
            <v-text-field v-model="sheet.config.linkInfo.name" label="Nome" :rules="contentRules" required></v-text-field>
            <v-text-field v-model="sheet.config.linkInfo.desc" label="Descrição" :rules="contentRules" required>
            </v-text-field>
            <v-text-field  v-model="sheet.config.linkInfo.linkURL" label="Link URL" :rules="linkRules" required></v-text-field>


          </div>
          <!-- ############ ./CONFIG -->

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
          >
            Atualizar
          </v-btn>

          <v-btn
            color="error"
            class="mr-4"
            @click="reset"
          >
            Resetar
          </v-btn>

        </v-form>

        </div>
      </v-sheet>
    </v-bottom-sheet>
    <SnackBars />
  </div>
</template>

<script>
import {FirebaseActions} from '../utils/FirebaseActions';
import SnackBars from './SnackBars.vue';

  export default {
      props: ['sheet'],
      components: {SnackBars},
      methods: {
          closeSheet() {
              
              this.$emit('closeBottomSheets', false);
          },
          validate () {

            if(this.$refs.form.validate()) {
                if(this.sheet.config.subject) {
                  FirebaseActions.updateTopic(this.sheet.config.subject.id, this.sheet.config.subject.topic).then(() => {
                      this.$store.state.snack = true;
                      this.$store.dispatch('initInfo', 'Topico atualizado');

                  }).catch((error) => {
                      console.log(error);
                  });
                } else if (this.sheet.config.linkInfo) {
                  FirebaseActions.updateLink(this.sheet.config.linkInfo).then(() => {
                      this.$store.state.snack = true;
                      this.$store.dispatch('initInfo', 'Link atualizado');
                  }).catch((error) => {
                    console.log(error);
                  });
                }
            }
        },
        reset () {
            this.$refs.form.reset()
        },
      },
    data: () => ({
      snackBar: false,
      valid: true,
      contentRules: [
        v => !!v || 'Conteudo é necessário',
        v => (v && v.length <= 50) || 'Muito grande',
      ],
      descRules: [
        v => !!v || 'Descrição é necessário',
      ],
      linkRules: [
        v => !!v || 'Link URL é necessário',
      ],
    }),
  

      
  }
</script>