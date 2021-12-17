import SignUpDto from '../classes/SignUpDto';
import client from './api';
import axios from 'axios';

export const signUp = ({
  userName,
  password,
  nickname,
  agreementIds,
  departmentId,
}: SignUpDto) => {
  return client
    .post('/auth/signup', {
      username: userName,
      password: password,
      nickname: nickname,
      agreementIds: agreementIds,
      departmentId: departmentId,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
