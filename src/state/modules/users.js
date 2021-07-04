import axios from 'axios'
import authHeader from '../helpers/authHeader'
export const state = {
  users:[
  ],
};

export const getters = {
  users(state){
    return state.users;
  },
  user:(state) => (id) =>{
    return state.users.filter(user => user.id == id)[0];
  },
  userDocuments: (state) => (id) =>{
    return state.users.filter(user => user.id == id)[0].documents;
  }
}
export const mutations = {
  setUsers(state,payload){
    state.users = payload;
  },
  pushUser(state,payload){
    state.users.push(payload);
  },
  setUser(state,payload){
    const index = state.users.findIndex(user => user.id == payload.id);
    state.users[index] = payload
  },
  deleteUser(state,id){
    state.users = state.users.filter(user => user.id != id)
  },
  setUserDocuments(state,payload){
    state.users.forEach(user => {
      if(user.id == payload.id){
        user.documents = payload.documents
      }
    })
  },
  deleteUserDocument(state,payload){
    state.users.forEach(user => {
      if(user.id == payload.id){
        user.documents = user.documents.filter(doc => doc.id != payload.documentID)
      }
    })
  },
  updateUserDocument(state,payload){
    state.users = state.users.map(user => {
      if(user.id == payload.id){
        const index = user.documents.findIndex(doc => doc.id == payload.documentID);
        user.documents[index] = payload.newdoc;
      }
      return user;
    });
  }

};

export const actions = {
  async getUsers({commit}){
    return await axios.get(process.env.VUE_APP_API_BASE_URL+'users/',{
      headers:authHeader()
    }).then(res => {
      commit('setUsers',res.data.results);
    })
  },
  async deleteUserByID({commit},id){
    return await axios.delete(process.env.VUE_APP_API_BASE_URL+`users/${id}`,{
      headers:authHeader()
    }).then(() => {
      commit('deleteUser',id);
    })
  },
  async createUser({commit},user){
    return await axios.post(process.env.VUE_APP_API_BASE_URL+`users/`,user,{
      headers:authHeader()
    }).then(() => {
      commit('pushUser',user);
    })
  },
  async setUser({commit},user){
    console.log("new type : ",user);
    return await axios.patch(process.env.VUE_APP_API_BASE_URL+`users/${user.id}`,user,{
      headers:authHeader()
    }).then(() => {
      commit('setUser',user);
    })
  },
  async getUserDocuments({commit},userID){
    return await axios.get(process.env.VUE_APP_API_BASE_URL+`users/${userID}/documents`,{
      headers:authHeader()
    }).then(res => {
      commit('setUserDocuments',{
        id:userID,
        documents:res.data
      });
    })
  },
  async deleteUserDocument({commit}, payload){
    console.log("pyload",payload);
    return await axios.delete(process.env.VUE_APP_API_BASE_URL+`users/${payload.userID}/documents/${payload.documentID}`,{
      headers:authHeader()
    }).then(() => {
      commit('deleteUserDocument',{
        id:payload.userID,
        documentID:payload.documentID,
      });
    })
  },
  async updateUserDocument({commit}, payload){
    return await axios.patch(process.env.VUE_APP_API_BASE_URL+`users/${payload.userID}/documents/${payload.documentID}`,{status:payload.status},{
      headers:authHeader()
    }).then(res => {
      commit('updateUserDocument',{
        id:payload.userID,
        documentID:payload.documentID,
        newdoc:res.data
      });
    })
  },
  async readUserDocument(context, payload){
    return await axios.get(process.env.VUE_APP_API_BASE_URL+`users/${payload.userID}/documents/${payload.documentID}/read`,{
      headers:authHeader()
    }).then(res => {
        return Promise.resolve(res.data);
    })
  },
};
