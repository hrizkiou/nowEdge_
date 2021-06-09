import modules from './data/modules.json'
import module from './data/module.json'
import categories from './data/categories.json'
import configurationModule from './data/configurationModule.json'
import sessionsModule from './data/sessionsModule.json'
import quiz from './data/quiz.json'
import quizzes from './data/quizzes.json'

export function configureFakeBackend() {
    let users = [{ id: 3, username: 'test', password: 'test', firstName: 'Test', lastName: 'User', role: 'Admin' }];
    let realFetch = window.fetch;
    const token_ = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDb2RlcnRoZW1lIiwiaWF0IjoxNTU1NjgyNTc1LCJleHAiOjE1OTk2NDg1NzUsImF1ZCI6ImNvZGVydGhlbWVzLmNvbSIsInN1YiI6InRlc3QiLCJmaXJzdG5hbWUiOiJIeXBlciIsImxhc3RuYW1lIjoiVGVzdCIsIkVtYWlsIjoidGVzdEBoeXBlci5jb2RlcnRoZW1lcy5jb20iLCJSb2xlIjoiQWRtaW4ifQ.dlpmEiY4ut-Owo1qwvPsW_anof3sc5e2GAbfs-gi4XM'
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {

                // authenticate
                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                    // get parameters from post request
                    let params = JSON.parse(opts.body);

                    // find if any user matches login credentials
                    let filteredUsers = users.filter(user => {
                        return user.username === params.username && user.password === params.password;
                    });

                    if (filteredUsers.length) {
                        // if login details are valid return user details and fake jwt token
                        let user = filteredUsers[0];
                        let responseJson = {
                            id: user.id,
                            username: user.username,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email:"ahroum.reda@gmail.com",
                            avatarPath:"",
                            role:{
                                id: 1,
                                name: "Participant",
                                description: "Participant"
                            },
                            token: token_
                        };
                        resolve({ ok: true, json: () => responseJson });
                    } else {
                        // else return error
                        reject('Username or password is incorrect');
                    }
                    return;
                }

                // register
                if (url.endsWith('/users/register') && opts.method === 'POST') {
                    // get parameters from post request
                    let params = JSON.parse(opts.body);

                    // add new users
                    let newUser = { 
                        id: users.length + 1, 
                        username: params.username, 
                        password: params.password, 
                        firstName: params.firstName, 
                        email: params.email, 
                        lastName: params.lastName, 
                        avatarPath: params.avatarPath, 
                        role: {
                            id: 3,
                            name: "Participant" , 
                            description: "Participant",
                        } 
                    }
                    users.push({ newUser })

                    let responseJson = {
                        ...newUser,
                        token: null
                    };
                    resolve({ ok: true, json: () => responseJson });
                    return;
                }

                // forget password
                if (url.endsWith('/users/password-reset') && opts.method === 'POST') {
                    // get parameters from post request
                    let params = JSON.parse(opts.body);

                    // find if any user matches login credentials
                    let filteredUsers = users.filter(user => {
                        return user.username === params.username;
                    });

                    if (filteredUsers.length) {
                        let responseJson = {
                            message: "We've sent you a link to reset password to your registered email."
                        };
                        resolve({ ok: true, json: () => responseJson });
                    } else {
                        // else return error
                        reject('Sorry, we could not find any registered user with entered username');
                    }
                    return;
                }

                // get users
                if (url.endsWith('/users') && opts.method === 'GET') {
                    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === `Bearer ${token_}`) {
                        resolve({ ok: true, json: () => users });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                if (url.endsWith('/participant/getmodules?participantUserId=X') && opts.method === 'GET') {
                    // [
                    //     '{{repeat(6)}}',
                    //     {
                    //       _id: '{{objectId()}}',
                    //       title: 'Nom du module {{index(1)}}',
                    //       subtitle:'{{company().toUpperCase()}}',
                    //       color: '{{random("blue", "brown", "green")}}',
                    //       about: '{{lorem(1, "paragraphs")}}',    
                    //       student:'{{integer(20, 40)}}',
                    //       notions:'{{integer(20, 40)}}',
                    //       teams:'{{integer(20, 40)}}',
                    //       quiz:'{{integer(20, 40)}}',
                    //       progress:'{{integer(20, 100)}}'
                          
                    //     }
                    //   ]
                    
                    if (opts.headers && opts.headers.Authorization === `Bearer ${token_}`) {
                        resolve({ ok: true, json: () => modules });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }
 
                

                if (url.endsWith('/participant/getnotions?moduleInstanceId=X') && opts.method === 'GET') {
                                       
                    if (opts.headers && opts.headers.Authorization === `Bearer ${token_}`) {

                        resolve({ ok: true, json: () =>  module });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }
                

                if (url.endsWith('/admin/getconfigurations?moduleInstanceId=X') && opts.method === 'GET') {
                                       
                    if (opts.headers && opts.headers.Authorization === `Bearer ${token_}`) {

                        resolve({ ok: true, json: () =>  configurationModule });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }
                

                if (url.endsWith('/admin/getsessions?moduleInstanceId=X') && opts.method === 'GET') {
                                       
                    if (opts.headers && opts.headers.Authorization === `Bearer ${token_}`) {

                        resolve({ ok: true, json: () =>  sessionsModule });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }
                
                if (url.endsWith('/categories') && opts.method === 'GET') {
                     
                    if (opts.headers && opts.headers.Authorization === `Bearer ${token_}`) {
                        resolve({ ok: true, json: () => categories });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                } 
                
                if (url.endsWith('/participant/getquizzes?participantUserId=X&trainingSessionId=Y') && opts.method === 'GET') {
                     
                    if (opts.headers && opts.headers.Authorization === `Bearer ${token_}`) {
                        resolve({ ok: true, json: () => quizzes });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }
                
                if (url.endsWith('/participant/getquiz?quizCompetitionId=1&quizId=2') && opts.method === 'GET') {
                     
                    if (opts.headers && opts.headers.Authorization === `Bearer ${token_}`) {
                        resolve({ ok: true, json: () => quiz });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

            }, 500);
        });
    }
}