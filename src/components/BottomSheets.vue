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
        <div class="py-3">
        {{sheet.subject.id}}
            
          <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    class="ma-6"
  >
    <v-text-field
      v-model="sheet.subject.topic.content"
      :rules="contentRules"
      label="Conteudo"
      required
    ></v-text-field>

    <v-text-field
      v-model="sheet.subject.topic.desc"
      :rules="descRules"
      label="Descrição"
      required
    ></v-text-field>
    <v-text-field
      v-model="sheet.subject.topic.photo"
      label="FotoURL"
    ></v-text-field>

    

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

                // console.log(this.sheet.subject.topic);
                FirebaseActions.updateTopic(this.sheet.subject.id, this.sheet.subject.topic).then(() => {
                    console.log("atualizado");
                }).catch((error) => {
                    console.log(error);
                });
            }
        },
        reset () {
            // console.log(this.sheet.subject.topic.content);
            this.$refs.form.reset()
        },
      },
    data: () => ({
      valid: true,
      contentRules: [
        v => !!v || 'Conteudo é necessário',
        v => (v && v.length <= 50) || 'Muito grande',
      ],
      descRules: [
        v => !!v || 'Descrição é necessário',
      ],
    }),
  

      
  }
</script>