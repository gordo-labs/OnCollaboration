import mainService from "~/services/main-service";

export const state = () => ({
  pages: [],
  posts: [],
  post: null,
  intro: [],
  about: [],
  programa: [],
  isProgramaLoaded: false,
  selectedPrograma: null,
  evento: [],
  opencol: [],
  loading: null,
  error: null,
  title: null,
  isHeader: false,
  programTitle: ""
});

export const mutations = {
  setPages(state, payload) {
    console.log("PAGES_MUTATION => ", payload);
    state.pages = payload;
  },
  setStateDataByType(state, payload) {
    console.log("POSTS_MUTATION => " + payload.postType + " => ", payload.data);
    let data = payload.data;
    let compare = (a, b) => {
      if (a.fields.id < b.fields.id) return -1;
      if (a.fields.id > b.fields.id) return 1;
      return 0;
    };
    data.map((item) => {
      // console.log(item);
      if (item.fields.podcastsRef) {
        item.fields.podcastsRef.sort(compare);
      }
    });
    data.sort(compare);
    state[payload.postType] = data;
  },
  setPrograma(state, payload) {
    console.log("PROGRAMA_MUTATION => ", payload.data);
    let data = payload.data;
    let compare = (a, b) => {
      if (a.fields.id < b.fields.id) return -1;
      if (a.fields.id > b.fields.id) return 1;
      return 0;
    };
    data.map((item) => {
      // console.log(item);
      if (item.fields.podcastsRef) {
        item.fields.podcastsRef.sort(compare);
      }
    });
    data.sort(compare);
    state.programa = data;
  },
  setPost(state, payload) {
    console.log("POST_MUTATION => ", payload);
    state.post = payload;
  },
  setCategories(state, payload) {
    console.log("CATEGORIES.MUTATION => ", payload);
    state.categories = payload;
  },
  setLoading(state, payload) {
    state.loading = payload;
  },
  setError(state, payload) {
    state.loading = payload;
  },
  setTitle(state, payload) {
    state.title = payload;
  },
  setHeader(state, payload) {
    state.isHeader = payload;
  },
  setProgramTitle(state, payload) {
    if (payload) {
      state.programTitle = payload;
    } else {
      state.programTitle = state.programa[0].fields.title;
    }
  },
  findSelectedProgram(state, payload) {
    state.selectedPrograma = state.programa.find(el=>{

      // NETLIFY ONLY WORKS WITH LOWERCASE URLS
      if (el.sys.id.toLowerCase() === payload) {
        console.log("FOUND SELECTED_PROGRAMA => ", payload);
        return el;
      }
    })
  },
  setSelectedProgram(state, payload) {
    console.log("SELECTED_PROGRAMA => ", payload);
    state.selectedPrograma = payload;
  }
};

export const actions = {
  async getProgramasAction({ commit }, payload) {
    const posts = await mainService.getEntriesByType(payload);
    const data = {
      postType: payload,
      data: posts.items
    };
    commit("setStateDataByType", data);
  },
  async getProgramaByIdAction({ commit }, payload) {
    const posts = await mainService.getEntriesByType('programa');
    const data = {
      postType: payload,
      data: posts.items
    };
    commit("setPrograma", data);
    let programa;
    // NETLIFY ONLY WORKS WITH LOWERCASE URLS
    posts.items.find(el=> {
      if (el.sys.id.toLowerCase() === payload) {
        programa = el;
      }
    })
    commit("setSelectedProgram", programa);
  },
  async getProgramasInitialAction({ commit }, payload) {
    const posts = await mainService.getEntriesByType(payload);
    const data = {
      postType: payload,
      data: posts.items
    };
    commit("setStateDataByType", data);
    commit("setSelectedProgram", posts.items[0]);
    return posts.items[0];
  },
  async getEntriesAction({ commit }, payload) {
    const posts = await mainService.getEntriesByType(payload);
    const data = {
      postType: payload,
      data: posts.items
    };
    commit("setStateDataByType", data);
  },
  async getEntry({ commit }, payload) {
    const post = await mainService.getEntry(payload);
    console.log('GET_ENTRY',post);
    commit("setSelectedProgram", post);
  },
  async getPostId_A({ commit }, payload) {
    const post = await mainService.getPostId_Data(payload);
    post.data.map(post => {
      if (!!post._embedded["wp:featuredmedia"]) {
        post.featureImage = post._embedded["wp:featuredmedia"][0];
      }
    });
    commit("setPost", post.data[0]);
  },
  async getCategories_A({ commit }) {
    const categories = await mainService.getCategories_Data();
    // set childs array
    const CATS = categories.data;
    CATS.filter(cat => {});
    CATS.map(cat => {
      cat.childs = [];
      if (cat.parent != 0) {
        CATS.map(parentCat => {
          if (cat.parent === parentCat.id) {
            parentCat.childs.push(cat);
          }
        });
      }
    });
    const categoriesOrdered = CATS.filter(cat => {
      console.log(cat.name);
      if (cat.name !== "Uncategorized") {
        return true;
      }
    });
    commit("setCategories", categoriesOrdered);
  },
  async getCategory_A({ commit }) {
    const categories = await mainService.getCategories_Data();
    commit("setCategories", categories.data);
  }
};
