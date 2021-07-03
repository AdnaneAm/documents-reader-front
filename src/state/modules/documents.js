import axios from 'axios'
import authHeader from '../helpers/authHeader'
export const state = {
  documents:[
  ],
};

export const getters = {
  documents(state){
    return state.documents;
  },
  document:(state) => (id) =>{
    return state.documents.filter(document => document._id == id)[0];
  }
}
export const mutations = {
  setDocuments(state,payload){
    state.documents = payload;
  },
  pushDocument(state,payload){
    state.documents.push(payload);
  },
  setDocument(state,payload){
    const index = state.documents.findIndex(document => document._id == payload.id);
    state.documents[index] = payload
  },
  deleteDocument(state,id){
    state.documents = state.documents.filter(document => document._id != id)
  }
};

export const actions = {
  async getDocuments({commit}){
    console.log("getting docuemnts ...");
    return await axios.get(process.env.VUE_APP_API_BASE_URL+'documents/',{
      headers:authHeader()
    }).then(res => {
      commit('setDocuments',res.data);
    })
  },
  async deleteDocumentByID({commit},id){
    return await axios.delete(process.env.VUE_APP_API_BASE_URL+`documents/${id}`,{
      headers:authHeader()
    }).then(() => {
      commit('deleteDocument',id);
    })
  },
  async createDocument({commit},payload){
    const document = new FormData();
    document.append("document", payload.document);
    document.append("type", payload.type);
    return await axios.post(process.env.VUE_APP_API_BASE_URL+`documents/`,document,{
      headers:authHeader()
    }).then(() => {
      commit('pushDocument',document);
    })
  },
  async setDocument({commit},{type,_id}){
    const payload = {
      type:type
    }
    console.log("new type : ",payload.type);
    return await axios.patch(process.env.VUE_APP_API_BASE_URL+`documents/${_id}`,payload,{
      headers:authHeader()
    }).then(() => {
      commit('setDocument',document);
    })
  }
};
