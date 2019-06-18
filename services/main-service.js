import {
  HTTP
} from "./http-common";

const contentful = require('contentful');

const contentfulConfig = {
  spaceID: "2u05j96cus0b",
  //master env
  accessToken: "BE-PgdzqvA4T_53plwtYWsiZ2kVXkGePhCsRrBiOBBI",
  accessPreviewToken: "4zQXrC-08kHWF_2-2pFVyRBECZ9yFObiNlgHK09KePo"
};

const client = contentful.createClient({
  space: contentfulConfig.spaceID,
  environment: 'master', // defaults to 'master' if not set
  accessToken: contentfulConfig.accessToken
});

export default {
  getData() {
    return HTTP.get("/users/regular");
  },
  async getPages() {
    // this.$axios.$get(API);
  },
  getEntries() {
    return client.getAssets();
  },
  getPostId_Data(slug) {
    return HTTP.get(`wp/v2/posts?slug=${slug}&_embed`);
  },
  getCategories_Data() {
    return HTTP.get('wp/v2/categories');
  },
  getPosts() {
    return HTTP.get("/wp/v2/posts");
  },
  getDataId(id) {
    return HTTP.get("/users/" + id);
  },
  deleteData(id) {
    return HTTP.delete("/users/" + id, {});
  },
  patchData(data) {
    return HTTP.patch("/users/" + data.id, {
      data
    });
  },
  getCSV() {
    return HTTP.get("/users/get_csv").then(data => {
      //console.log(data);
      return data.data;
    });
  },
  postData(data) {
    return HTTP.post("/admissions/accept_user",
      data
    ).then(data => {
      return data.data;
    });
  },
};
