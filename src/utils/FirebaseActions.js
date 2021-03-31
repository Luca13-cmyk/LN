import {db, firebase} from '@/firebase.js';
import store from '@/store/index';


export class FirebaseActions {


    static getUsers() {
        return db.collection('users');
    }
    static getUserAuth() {
        return this.getUsers().doc(store.state.userAuth.user.email);
    }
    static getCollectionUserAuth(collection) {
        return this.getUserAuth().collection(collection);
    }
    static getSubjectUserAuth(subjectId) {
        return this.getCollectionUserAuth("subjects").doc(subjectId);
    }
    static getAdmins() {
        return db.collection("admins");
    }
    static AuthUser() {
        return new Promise((resolve, reject) => {
            var provider = new firebase.auth.GoogleAuthProvider();
    
            firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
    
                store.state.userAuth = {
                    token: result.credential.token,
                    user: result.user
                }
    
                this.addUser(result.user);
    
                this.getUser();
                
                resolve();
  
            }).catch((error) => {

                reject(error);
            
            });
        })
      }
      static getUser  () {
        store.dispatch("bindUser");
        
      }
      static addUser(user) {

          FirebaseActions.getAdmins().doc(user.email).get().then(doc => {
              let inadmin;
              if(doc.exists) {
                  inadmin = true;
                  store.state.userAuth.inadmin = true;
              } else {
                  inadmin = false;
              }
              FirebaseActions.getUserAuth().set({
                email: user.email,
                name: user.displayName,
                photo: user.photoURL,
                inadmin,
                online: true,
              });

          })
        
      }

    static addSubject(subject, defaultPhotoURL) {
        return new Promise((resolve, reject) => {

            FirebaseActions.getSubjectUserAuth(subject)
                .set({
                timeStamp: Date.now(),
                defaultPhotoURL
            }).then(() => {
                resolve();
            }).catch((error) => {
                reject(error);
            });
        })
    }

    static deleteSubject(id) {

        return new Promise((resolve, reject) => {
            FirebaseActions.getSubjectUserAuth(id)
            .delete().then(() => {
                resolve();
                
            }).catch((error) => {
                reject(error);
            })
        })
        
    }
    static updateTopic(subjectId, data) {
        return new Promise((resolve, reject) => {
            FirebaseActions.getSubjectUserAuth(subjectId).collection("topics").doc(data.id).update({
                'content': data.content,
                'desc': data.desc,
                'photo': data.photo,
            }).then(() => {
                resolve();
            }).catch((error) => {
                reject(error);
            });
        })
    }
    static addTopic(data) {
        return new Promise((resolve, reject) => {
            FirebaseActions.getSubjectUserAuth(data.type).get().then((doc) =>  {
                if (doc.exists) {
                    FirebaseActions.getSubjectUserAuth(data.type)
                        .collection("topics")
                        .add({
                            timeStamp: Date.now(),
                            content: data.content,
                            desc: data.desc,
                            photo: doc.data().defaultPhotoURL,
                            type: data.type
                        }).then(() => {
                            resolve();
                        }).catch(error => {
                            reject(error);
                        })
                }
            });
        })
    }
    static deleteTopic(subjectId, id) {
        return new Promise((resolve, reject) => {
            FirebaseActions.getSubjectUserAuth(subjectId).collection("topics").doc(id).delete().then(() => {
                resolve();
            }).catch((error) => {
                reject(error);
            })
        })
    }
    static addLink(data) {
        return new Promise((resolve, reject) => {
            FirebaseActions.getCollectionUserAuth("links").add({
                desc: data.desc,
                linkURL: data.linkURL,
                name: data.name,
                timeStamp: Date.now(),
              }).then(() => {
                  resolve();
              }).catch((error) => {
                  reject(error);
              });
        })
    }
    static deleteLink(id) {
        return new Promise((resolve, reject) => {
            FirebaseActions.getCollectionUserAuth("links").doc(id).delete().then(() => {
                resolve();
            }).catch((error) => {
                reject(error);
            });
        })
    }
    static updateLink(data) {
        return new Promise((resolve, reject) => {
            FirebaseActions.getCollectionUserAuth("links").doc(data.id).update({
                desc: data.desc,
                linkURL: data.linkURL,
                name: data.name
            }).then(() => {
                resolve();
            }).catch((error) => {
                reject(error);
            })
        })
    }
    static addTodo(data) {
        return new Promise((resolve, reject) => {
            FirebaseActions.getCollectionUserAuth("ToDo").add({
                desc: data.desc,
                title: data.title,
                timeStamp: Date.now()
            }).then(() => {
                resolve();
            }).catch((error) =>{
                reject(error);
            })
        })
    }
    static updateTodo(data) {
        return new Promise((resolve, reject) => {
            FirebaseActions.getCollectionUserAuth("ToDo").doc(data.id).update({
                desc: data.desc,
                title: data.title,
            }).then(() => {
                resolve();
            }).catch((error) => {
                reject(error);
            })
        })
    }
    static deleteTodo(id) {
        FirebaseActions.getCollectionUserAuth("ToDo").doc(id).delete();
    }

    
}
