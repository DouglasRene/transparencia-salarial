import api from '../utils/api'

export const search = () => {
    async function searchData(name, ano = null, mes = null) {

        if (name && (ano !== '' && ano !== null && ano.length > 0) && (mes !== '' && mes !== null && mes.length > 0)) {
            try {
                const data = await api.get(`${process.env.REACT_APP_API_URL}PESSTDOANO/0/P?parameters=NOME%3D${name}%25%3BANO%3D${ano}`, {
                    headers: { Authorization: `Basic ${process.env.REACT_APP_API_KEY}` }
                })
                    .then((response) => {
                        return response.data
                    })
                return data
            } catch (error) {
                console.log(error)
            }
        }
        if (name && (ano !== '' && ano !== null && ano.length > 0)) {
            try {
                const data = await api.get(`${process.env.REACT_APP_API_URL}PESSTDOANO/0/P?parameters=NOME%3D${name}%25%3BANO%3D${ano}`, {
                    headers: { Authorization: `Basic ${process.env.REACT_APP_API_KEY}` }
                })
                    .then((response) => {
                        return response.data
                    })
                return data
            } catch (error) {
                console.log(error)
            }
        }
        if (name) {
            try {
                const data = await api.get(`${process.env.REACT_APP_API_URL}PPESSOA/0/P?parameters=NOME%3D${name}%`, {
                    headers: { Authorization: `Basic ${process.env.REACT_APP_API_KEY}` }
                })
                    .then((response) => {
                        return response.data
                    })
                return data
            } catch (error) {
                console.log(error)
            }
        }

    }

    const validaCPF = (v) => {
        let rev
        const cpf = v.replace(/[^\d]+/g, '');
        if (cpf === '') return false;
        // Elimina CPFs invalidos conhecidos	
        if (cpf.length !== 11 ||
            cpf === "00000000000" ||
            cpf === "11111111111" ||
            cpf === "22222222222" ||
            cpf === "33333333333" ||
            cpf === "44444444444" || 
            cpf === "55555555555" ||
            cpf === "66666666666" ||
            cpf === "77777777777" ||
            cpf === "88888888888" ||
            cpf === "99999999999")
            return false
        // Valida 1o digito	
        let add = 0;
        for (let i = 0; i < 9; i++) {
            add += parseInt(cpf.charAt(i)) * (10 - i);
        }
        rev = 11 - (add % 11);
        if (rev === 10 || rev === 11) {
            rev = 0;
        }
        if (rev !== parseInt(cpf.charAt(9))) {
            return false
        }
        // Valida 2o digito	
        add = 0;
        for (let i = 0; i < 10; i++) {
            add += parseInt(cpf.charAt(i)) * (11 - i);
        }
        rev = 11 - (add % 11);
        if (rev === 10 || rev === 11) {
            rev = 0;
        }
        if (rev !== parseInt(cpf.charAt(10))) {
            return false
        }
        return true
    }

    const getBase64ImageFromURL = (url) => {
        return new Promise((resolve, reject) => {
            var imgFile = new Image();
            imgFile.setAttribute("crossOrigin", "anonymous");

            imgFile.onload = () => {
                var canvas = document.createElement("canvas");
                canvas.width = imgFile.width;
                canvas.height = imgFile.height;

                var ctx = canvas.getContext("2d");
                ctx.drawImage(imgFile, 0, 0);

                var dataURL = canvas.toDataURL("image/png");

                resolve(dataURL);
            };

            imgFile.onerror = error => {
                reject(error);
            };

            imgFile.src = url;
        });
    }

    const searchChapa = async (chapa, ano, mes) => {

        try {
            const data = await api.get(`${process.env.REACT_APP_API_URL}API_TRANSP_CHAPA/1/P?parameters=ANO%3D${ano}%3BMES%3D${mes}%3BCHAPA%3D${chapa}`, {
                headers: { Authorization: `Basic ${process.env.REACT_APP_API_KEY}` }
            })
                .then((response) => {
                    return response.data
                })
            return data
        } catch (error) {
            console.log(error)
        }
    }

    async function searchName(name, ano, mes) {

        if (name && (ano !== '' && ano !== null && ano.length > 0) && (mes !== '' && mes !== null && mes.length > 0)) {
            try {
                const data = await api.get(`${process.env.REACT_APP_API_URL}API_TRANSP_NOME/1/P?parameters=ANO%3D${ano}%3BMES%3D${mes}%3BNOME%3D${name}%25`, {
                    headers: { Authorization: `Basic ${process.env.REACT_APP_API_KEY}` }
                })
                    .then((response) => {
                        return response.data
                    })
                return data
            } catch (error) {
                console.log(error)
            } 
        }
    }

    return { searchData, searchChapa, searchName, validaCPF, getBase64ImageFromURL }
}