import SignUpDto from "../classes/SignUpDto";
import client from "./api";

export const getMajorList = () => {
    return client.get("/auth/departments")
    .then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.log(error);
    });
}
export const signUp = ({userName, password, nickname, agreementIds, departmentId}: SignUpDto) => {
    return client.post("/auth/signup", {username: userName, password: password, nickname: nickname, agreementIds: agreementIds, departmentId: departmentId})
    .then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.log(error);
    });
}
