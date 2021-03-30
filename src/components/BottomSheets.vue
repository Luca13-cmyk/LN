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
            
                <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          class="ma-6"
        >
        <!-- #########  CONFIG  -->

        <!-- ####### subject ######## -->
          <div v-if="sheet.config.subject">
          <v-textarea :rules="fieldRules" required v-model="sheet.config.subject.topic.content" label="Contéudo">
          </v-textarea>

          <v-text-field
            v-model="sheet.config.subject.topic.desc"
            :rules="fieldRules"
            label="Descrição"
            required
          ></v-text-field>
          <v-text-field
            v-model="sheet.config.subject.topic.photo"
            :rules="fieldRules"
            label="FotoURL"
          ></v-text-field>

          </div>

        <!-- ####### LinkInfo ######## -->
          <div v-if="sheet.config.linkInfo">
            <v-text-field v-model="sheet.config.linkInfo.name" label="Nome" :rules="fieldRules" required></v-text-field>
            <v-text-field v-model="sheet.config.linkInfo.desc" label="Descrição" :rules="fieldRules" required>
            </v-text-field>
            <v-text-field  v-model="sheet.config.linkInfo.linkURL" label="Link URL" :rules="fieldRules" required></v-text-field>


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
    
  </div>
</template>

<script>
import {FirebaseActions} from '../utils/FirebaseActions';

  export default {
      props: ['sheet'],
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
      fieldRules: [
        v => v ? !!v.trim() : null || 'Campo é necessário',
      ],
    }),
  

      
  }
</script>