import axios from 'axios';
import UrlHelper from '../../Helper/UrlHelper';

class autherService {

    getAuthorData = ({ id }) => {
        return new Promise((resolve, reject) => {
            const request = axios.get(UrlHelper.author
                , {
                    params: {
                        id: id,
                    }
                }
            )
            request.then((response) => {
                const { data, status } = response;
                if (status == 200) {
                    resolve({ data });
                } else {
                    reject({ message: 'Error in retrive Data' });
                }
            }).catch((error) => {
                reject({ message: 'Something went wrong!!' });
            })
        });
    };

    getAuthorDetailsData = ({ id, view, order }) => {
        return new Promise((resolve, reject) => {
            const request = axios.get(UrlHelper.posts
                , {
                    params: {
                        authorId: id,
                        _sort: view,
                        _order: order
                    }
                }
            )
            request.then((response) => {
                const { data, status } = response;
                if (status == 200) {
                    resolve({ data });
                } else {
                    reject({ message: 'Error in retrive Data' });
                }

            }).catch((error) => {
                reject({ message: 'Something went wrong!!' });
            })
        });
    };

    getPostDetailsData = ({ id }) => {
        return new Promise((resolve, reject) => {
            const request = axios.get(UrlHelper.posts
                , {
                    params: {
                        id: id,
                    }
                }
            )
            request.then((response) => {
                const { data, status } = response;
                if (status == 200) {
                    resolve({ data });
                } else {
                    reject({ message: 'Error in retrive Data' });
                }

            }).catch((error) => {
                reject({ message: 'Something went wrong!!' });
            })
        });
    };

    getComments = ({ id }) => {
        return new Promise((resolve, reject) => {
            const request = axios.get(UrlHelper.comments
                , {
                    params: {
                        postId: id,
                    }
                })
            request.then((response) => {
                const { data, status } = response;
                if (status == 200) {
                    resolve({ data });
                } else {
                    reject({ message: 'Error in retrive Data' });
                }

            }).catch((error) => {
                reject({ message: 'Something went wrong!!' });
            })
        });
    };

    getLikes = ({ id }) => {
        return new Promise((resolve, reject) => {
            const request = axios.get(UrlHelper.likes
                , {
                    params: {
                        postId: id,
                    }
                })
            request.then((response) => {
                const { data, status } = response;
                if (status == 200) {
                    resolve({ data });
                } else {
                    reject({ message: 'Error in retrive Data' });
                }

            }).catch((error) => {
                reject({ message: 'Something went wrong!!' });
            })
        });
    };
}

const service = new autherService();
export default service;
