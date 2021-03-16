<template>
  
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Adicionar
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <!-- <span class="headline">Adicionar</span> -->
              <v-tabs class="mt-5">
                  <v-tab @click="type = 'Subject'">Assunto</v-tab>
                  <v-tab @click="type = 'Topic'">Topico</v-tab>
                  <v-tab @click="type = 'Contact'">Amigo</v-tab>
              </v-tabs>
        </v-card-title>
        <v-card-text>
          <v-container>
              <!-- ########## Subject ######### -->
            <v-row v-if="type == 'Subject'">
              <v-col 
              cols="12"
              md="4"
              >
              <v-text-field
              v-model="values.subject"
              label="Assunto..."
              required
              ></v-text-field>
             </v-col>
            </v-row>

            <!-- ############ Topic ################ -->

            <v-row v-if="type == 'Topic'">
              <v-col
                cols="12"
                md="4"
              >
          <v-text-field
            v-model="values.topic.content"
            label="Comando/Contéudo"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="values.topic.desc"
            label="Descrição"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="values.topic.type"
            label="Tipo de assunto"
            required
          ></v-text-field>
          </v-col>
          <v-col
          cols="12"
          >
          <v-text-field
            v-model="values.topic.photo"
            label="Foto URL"
            required
          ></v-text-field>
          </v-col>
        

            </v-row>
          </v-container>
          <small>*Campos orbrigatorios</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Fechar
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
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

import { db } from '@/firebase.js';

  export default {
   
    data: () => ({
      dialog: false,
      type: 'Subject',
      values: { topic: {} },
    }),
    methods: {
      saveData() {
        switch (this.type) {
          case 'Subject':
            db.collection('users').doc(this.$store.state.userAuth.user.email).collection('subjects').doc(this.values.subject)
            .set({
            timestamp: Date.now()
            });
            break;
          case 'Topic':
            
  
            db.collection('users').doc(this.$store.state.userAuth.user.email).collection('subjects')
            .doc(this.values.topic.type)
            .collection('topics')
            .add({
            timestamp: Date.now(),
            content: this.values.topic.content,
            desc: this.values.topic.desc,
            photo: this.values.topic.photo,
            type: this.values.topic.type
            });
            break;
          case 'Contact':
            console.log(this.values.contact);
            break;
          default:
            break;
        }
      }  
    }
  }
</script>

<style>

</style>