const onResponse = (res) => (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));


class Api {
    constructor(token) {
        this.path = "https://api.react-learning.ru";
        this.group = "group-8";
        this.token = token;
    }

    signUp(body) {
        body.group = this.group;
        return fetch(`${this.path}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(onResponse);
    }

    signIn(body) {
        return fetch(`${this.path}/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(onResponse);
    }

    // resetPassword() {
    //     return fetch(`${this.path}/password-reset/`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "authorization": `Bearer ${this.token}`
    //         }
    //     }).then(onResponse);
    // }

    // changePassword(body, id) {
    //     return fetch(`${this.path}/password-reset/${id}/${this.token}`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "authorization": `Bearer ${this.token}`
    //         },
    //         body: JSON.stringify(body)
    //     }).then(onResponse);
    // }

    getAllUsers() {
        return fetch(`${this.path}/v2/group-8/users`, {
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        }).then(onResponse);
    }

    getUserById(userId) {
        return fetch(`${this.path}/v2/group-8/users/${userId}`, {
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        }).then(onResponse);
    }

    getUserByToken() {
        return fetch(`${this.path}/v2/group-8/users/me`, {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${this.token}`
            }
        }).then(onResponse);
    }

    updUserInfo(body, img = false) {
        return fetch(`${this.path}/v2/group-8/users/me${img ? "/avatar" : ""}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${this.token}`
            },
            body: JSON.stringify(body)
        }).then(onResponse);
    }

    getAllPosts() {
        return fetch(`${this.path}/v2/${this.group}/posts`, {
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        }).then(onResponse);
    }

    getPostById(postId) {
        return fetch(`${this.path}/v2/${this.group}/posts/${postId}`, {
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        }).then(onResponse);
    }

    addPost(body) {
        return fetch(`${this.path}/v2/${this.group}/posts`, {
            method: "POST",
            headers: {
                "authorization": `Bearer ${this.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(onResponse);
    }

    modifyPostById(postId, body) {
        return fetch(`${this.path}/v2/${this.group}/posts/${postId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${this.token}`
            },
            body: JSON.stringify(body)
        }).then(onResponse);
    }

    deletePost(postId) {
        return fetch(`${this.path}/v2/${this.group}/posts/${postId}`, {
            method: "DELETE",
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        }).then(onResponse);
    }

    addLike(postId) {
        return fetch(`${this.path}/v2/${this.group}/posts/likes/${postId}`, {
            method: "PUT",
            headers: {
                "authorization": `Bearer ${this.token}`            
            }
        }).then(onResponse);
    }

    deleteLike(postId) {
        return fetch(`${this.path}/v2/${this.group}/posts/likes/${postId}`, {
            method: "DELETE",
            headers: {
                "authorization": `Bearer ${this.token}`            
            }
        }).then(onResponse);
    }

    addComment(postId, body) {
        return fetch(`${this.path}/v2/${this.group}/posts/comments/${postId}`, {
            method: "POST",
            headers: {
                "authorization": `Bearer ${this.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(onResponse);
    }

    deleteComment(postId, commentId) {
        return fetch(`${this.path}/v2/${this.group}/posts/comments/${postId}/${commentId}`, {
            method: "DELETE",
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        }).then(onResponse);
    }

    getAllComments() {
        return fetch(`${this.path}/v2/${this.group}/posts/comments/`, {
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        }).then(onResponse);
    }

    getPostComment(postId) {
        return fetch(`${this.path}/v2/${this.group}/posts/comments/${postId}`, {
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        }).then(onResponse);
    }

    // getPaginate() {
    //     return fetch(`${this.path}/v2/${this.group}/posts/paginate?page=<номер страницы>&limit=<число ограничивающее вывод на страницу>&query=<строка фильтрации по title>`, {
    //         headers: {
    //             "authorization": `Bearer ${this.token}`
    //         }
    //     }).then(onResponse);
    // }

}

export {Api};


  