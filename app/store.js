import Vuex from 'vuex'
import Vue from 'nativescript-vue'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    images: [],
    collections: []
  },
  mutations: {
    addImage(state, image){
      state.images.push(image);
    },
    setImages(state, images){
      state.images = images;
    },
    addImageCollection(state, payload){
      let imageIndex = state.images.findIndex(obj => obj.name === payload.image.name);
      state.images[imageIndex].collection_name = payload.collection.name;
      // let collectionIndex = state.collections.findIndex(obj => obj.name === payload.collection.name);
      // state.collections[collectionIndex].images.push(payload.image);
      // console.log(state.collections[collectionIndex]);
    },
    removeImageByName(state, image){
      let i = state.images.map(item => item.name).indexOf(image.name); // find index of your object
      return state.images.splice(i, 1);
    },
    addCollection(state, collection){
      state.collections.push(collection);
    }
  },
  actions: {},
  getters: {
    images: (state) => {
      return state.images;
    },
    collections: (state) => {
      return state.collections;
    },
    collectionImages: (state) => (collection) => {
      console.log(collection);
      let data = state.images.filter(obj => obj.collection_name === collection.name);
      console.log(data);
      return data;
      // let collectionIndex = state.collections.findIndex(obj => obj.name === collection.name);
      // return state.collections[collectionIndex];
    }
  }
})