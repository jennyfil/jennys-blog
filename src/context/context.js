import React from "react";

export default React.createContext({
    api: {},
    setApi: () => {},
    user: {},
    setUser: () => {},
    token: '',
    setToken: () => {},
    loggedIn: false,
    setLoggedIn: () => {},
    posts: [],
    setPosts: () => {},
    authors: [],
    setAuthors: () => {},
    searchQuery: '',
    setSearchQuery: () => {},
    postsByText: [],
    setPostsByText: () => {},
    tags: [],
    setTags: () => {},
})