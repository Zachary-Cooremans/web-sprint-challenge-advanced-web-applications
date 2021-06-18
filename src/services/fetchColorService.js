import axiosWithAuth from '../helpers/axiosWithAuth';

const fetchColorService = (setColorFunction) => {
    axiosWithAuth()
    .get(`/colors`)
    .then((res) => {
        setColorFunction(res.data)
    })
    .catch((err) => {
        console.log({err})
    })
}

export default fetchColorService;