import mainService from "~/services/main-service"

export const state = () => ({
  pages: [],
  posts: [],
  post:null,
  intro:[],
  programa: [],
});

export const mutations = {
  setPages(state, payload) {
    console.log("PAGES_MUTATION => ",payload);
    state.pages = payload;
  },
  setStateDataByType(state, payload){
    console.log("POSTS_MUTATION => " + payload.postType + " => ",payload.data);
    state[payload.postType]= payload.data;
  },
  setPost(state, payload){
    console.log("POST_MUTATION => ",payload);
    state.post = payload;
  },
  setCategories(state, payload){
    console.log("CATEGORIES.MUTATION => ",payload);
    state.categories = payload;
  },
};

export const actions = {
  async getEntriesAction ({ commit }, payload) {
    // const pages = await this.$axios.get('wp/v2/posts');
    const posts = await mainService.getEntriesByType(payload);
    const data = {
      postType: payload,
      data: posts.items
    };
    commit('setStateDataByType', data);
  },
  async getPostId_A ({ commit }, payload) {
    // const pages = await this.$axios.get('wp/v2/posts');
    const post = await mainService.getPostId_Data(payload);
    post.data.map(post=>{
      if(!!post._embedded['wp:featuredmedia']){
        post.featureImage = post._embedded['wp:featuredmedia'][0];
      }
    });
    commit('setPost', post.data[0]);
  },
  async getCategories_A ({ commit }) {
    // const pages = await this.$axios.get('wp/v2/posts');
    const categories = await mainService.getCategories_Data();
    // set childs array
    const CATS = categories.data;
    CATS.filter(cat=>{
    
    });
    CATS.map(cat=>{
      cat.childs = [];
      if (cat.parent != 0) {
        CATS.map(parentCat => {
          if (cat.parent === parentCat.id) {
            parentCat.childs.push(cat);
          }
        });
      }
    });
    const categoriesOrdered = CATS.filter(cat=>{
      console.log(cat.name);
      if (cat.name !== 'Uncategorized'){
        return true;
      }
    });
    commit('setCategories', categoriesOrdered);
  },
  async getCategory_A ({ commit }) {
    // const pages = await this.$axios.get('wp/v2/posts');
    const categories = await mainService.getCategories_Data();
    commit('setCategories', categories.data);
  },
};
