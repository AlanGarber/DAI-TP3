import axios from "axios";
import { response } from "express";
import { authService } from "../services/authService.js";

    const axiosClient= axios.create({
        baseURL:'http://localhost:5000',
        headers:{
            Authorization: 'Bearer ' + authService.getToken()
        }
    })

export const getAllPersonajes = async () => {
    return axiosClient.get('/characters')
        .then(response=>{
            if(response.status<300){
                return response.data
            }else{
                console.log("Request sent, error 300")
            }
        }).catch(error=>{
            console.log(error)
        })
}