"use strict";
var Model = {
    LoggedIn: function () { if (sessionStorage.getItem("user")) return true; else return false; },
    getUser: function () { if (this.LoggedIn()) this.data = JSON.parse(sessionStorage.getItem("user")); },
    setUser: function (user) { sessionStorage.setItem("user", JSON.stringify(user)); },
    destroyUser: function () { sessionStorage.removeItem("user"); },

    getOrder: function () { return JSON.parse(sessionStorage.getItem("order")) || false; },
    setOrder: function (data) { sessionStorage.setItem("order", JSON.stringify(data)); },
    removeOrder: function () { sessionStorage.removeItem("order"); },

    getSession: function (name) { return JSON.parse(sessionStorage.getItem(name)); },
    setSession: function (name, data) { sessionStorage.setItem(name, JSON.stringify(data)); },
    updSession: function (name, data) {
        var old = this.getSession(name);

        if (old) sessionStorage.setItem(name, JSON.stringify(Object.assign(old, data)));
        else this.setSession(name, data);
    },
    removeSession: function (name) { sessionStorage.removeItem(name); },
};