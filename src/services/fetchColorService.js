import axiosWithAuth from '../helpers/axiosWithAuth';

const fetchColorService = () => {
    axiosWithAuth()
    .get(`/colors`)
    .then((res) => {
        console.log(res)
        
    })
    .catch((err) => {
        console.log({err})
    })
}

export default fetchColorService;