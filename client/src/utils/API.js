import axios from "axios";

export default {

    // -------------------------------------- //
    // AUTH ROUTES
    // -------------------------------------- //

    // GET to check if a user is currently logged in
    userLoginCheck: function () {
        return axios.get("/auth/user");
    },
    // POST to log User into the application
    userLogin: function (userData) {
        return axios.post("/auth/user/login", userData);
    },
    // GET to log User out of the application
    userLogout: function () {
        return axios.post("/auth/user/logout");
    },

    // -------------------------------------- //
    // USER ROUTES
    // -------------------------------------- //

    // GET one User with the given id
    getThisUser: function (id) {
        return axios.get("/api/users/" + id);
    },
    // POST to add a new User to the database
    addNewUser: function (userData) {
        return axios.post("/api/users/register", userData)
    },
    // UPDATE a User with the given id
    updateThisUser: function (id, UserData) {
        return axios.put("/api/users/" + id, UserData)
    },
    // DELETE (destroy) a User with the given id
    deleteThisUser: function (id) {
        return axios.delete("api/users/" + id);
    }
}
