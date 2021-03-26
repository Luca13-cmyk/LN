<template>

  <div>
    <v-switch
      v-model="reverse"
      label="Alternar"
    ></v-switch>
    <v-timeline
      :reverse="reverse"
      :dense="$vuetify.breakpoint.smAndDown"
    >
    <transition-group 
    enter-active-class="animate__animated animate__rubberBand"
    appear
    mode="out-in"
    >
      <v-timeline-item
        v-for="toDo in toDos" :key="toDo.id"
      >
        <span slot="opposite">{{dateToDo(toDo.timeStamp)}}</span>
        <v-card :id="toDo.id" class="elevation-2">
          <v-card-title id="title" contenteditable="true" class="headline">
            {{ toDo.title }}
          </v-card-title>
          <v-card-text  id="desc" style="white-space: pre; overflow-x: auto;" contenteditable="true" >
            {{ toDo.desc }}
          </v-card-text>
          <v-card-actions>
          <v-btn @click="update(toDo)" color="blue"  text>
              
              Atualizar
          </v-btn>
          <v-btn @click="deleteTodo(toDo.id)" color="red"  text>
              
              Excluir
          </v-btn>
          </v-card-actions>
        </v-card>
      </v-timeline-item>
      </transition-group>
    </v-timeline>

    <SnackBars />
  </div>

</template>

<script>
import { FirebaseActions } from '@/utils/FirebaseActions';
import SnackBars from '../components/SnackBars.vue';
import moment from 'moment';

  export default {
  components: { SnackBars },
    data: () => ({
      reverse: true,
    }),
    computed: {
        toDos() {
            return this.$store.state.toDo;
        },
        
    },
    
    methods: {
        update(toDo) {
            const desc = document.getElementById(toDo.id).querySelector("#desc");
            const title = document.getElementById(toDo.id).querySelector("#title"); 

            toDo.desc = desc.innerText;
            toDo.title = title.innerText;

            FirebaseActions.updateTodo(toDo).then(() => {
                this.$store.state.snack = true;
                this.$store.dispatch('initInfo', 'Lembrete Atualizado');
            }).catch(error => {
                console.log(error);
            })
            
        },
        deleteTodo(id) {
            FirebaseActions.deleteTodo(id);
        },
        dateToDo(date){
            return `${moment(date).format('DD [de] MMMM [de] YYYY [as] h:mm:ss')}`;
        }
    },
    mounted() {
        moment.locale('pt-BR');
        this.$store.dispatch("bindTodo");
    },
    beforeDestroy (){
    this.$store.dispatch('unbindTodo');
  },
  }
</script>

<style scoped>

</style>