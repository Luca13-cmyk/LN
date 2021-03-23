import {db} from '@/firebase.js';
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

    static deleteSubject(id) {

        return new Promise((resolve, reject) => {
            
            console.log(store.state.userAuth.user.email);
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
}
