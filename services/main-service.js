import {
  HTTP
} from "./http-common";

import {createClient} from '~/plugins/contentful.js';

const client = createClient();

export default {
  getData() {
    return HTTP.get("/users/regular");
  },
  getEntriesByType(payload) {
    return client.getEntries({
      // "sys.id": process.env.CTF_PERSON_ID,
      'content_type': payload,
      order: '-sys.createdAt'
    });
  },
  getEntry(payload) {
    console.log(payload)
    return client.getEntry(payload);
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
