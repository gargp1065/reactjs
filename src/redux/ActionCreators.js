import * as ActionTypes from './ActionTypes'
import {baseUrl} from '../shared/baseUrl'
import {fetch} from 'cross-fetch'

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {

    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
    newComment.date = new Date().toISOString();
    // console.log(newComment);
    return fetch(baseUrl + 'comments', {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if(response.ok) {
            return response;
        }
        else  {
            var error = new Error('Error' + response.status + ':' + response.statusText)
            error.response = response;
            throw error;
        }
    }, 
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error => {console.log('Post Comments', error.message);
        alert("Your Comment could not be posted");
    });
}

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
        .then(response => {
            if(response.ok) {
                return response;
            }
            else  {
                var error = new Error('Error' + response.status + ':' + response.statusText)
                error.response = response;
                throw error;
            }
        }, 
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});


export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
        .then(response => {
            if(response.ok) {
                return response
            }
            else  {
                var error = new Error('Errpr' + response.status + ':' + response.statusText)
                error.response = response;
                throw error;
            }
        }, 
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(comments => {
            // console.log(comments)
            return dispatch(addComments(comments))
        })
        .catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});


export const fetchPromos = () => (dispatch) => {

    dispatch(promosLoading(true));

    return fetch(baseUrl + 'promotions')
        .then(response => {
            if(response.ok) {
                return response
            }
            else  {
                var error = new Error('Error' + response.status + ':' + response.statusText)
                error.response = response;
                throw error;
            }
        }, 
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading(true));

    return fetch(baseUrl + 'leaders')
        .then(response => {
            if(response.ok) {
                return response;
            }
            else  {
                var error = new Error('Errpr' + response.status + ':' + response.statusText)
                error.response = response;
                throw error;
            }
        }, 
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(dishes => dispatch(addLeaders(dishes)))
        .catch(error => dispatch(leadersFailed(error.message)));
}

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});
export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const postFeedBack = (firstname , lastname, telnum, email, agree, contactType, message) => (dispatch) => {
    const Form = {
        firstname: firstname,
        lastname: lastname,
        telnum: telnum,
        email: email,
        agree: agree,
        contactType: contactType,
        message: message
    }

    return fetch(baseUrl + 'feedback', {
        method: "POST",
        body: JSON.stringify(Form),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if(response.ok) {
            return response;
        }
        else {
            var err = new Error("Error" + response.status + response.statusText);
            err.response = response;
            throw err;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => {
        // response.json();
        response.json();
        alert(response);
        // alert(response)
    })
    .catch(error => {console.log('Submit Feedback', error.message);
        alert("Your Form could not be submitted");
    });
}