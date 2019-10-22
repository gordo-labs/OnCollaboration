import mainService from "~/services/main-service";

export const state = () => ({
  pages: [],
  posts: [],
  post: null,
  intro: [],
  about: [],
  programa: [],
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
      console.log(item);
      if (item.fields.podcastsRef) {
        item.fields.podcastsRef.sort(compare);
      }
    });
    data.sort(compare);
    state[payload.postType] = data;
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
  }
};

export const actions = {
  async getEntriesAction({ commit }, payload) {
    const posts = await mainService.getEntriesByType(payload);
    const data = {
      postType: payload,
      data: posts.items
    };
    commit("setStateDataByType", data);
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
