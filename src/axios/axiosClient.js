import axios from "axios";

    const axiosClient= axios.create({
        baseURL:'http://localhost:5000'
    })

export const getAlPizzas = async () => {
    return axiosClient.get('/pizzas',{
        headers:{

        }
    })
}