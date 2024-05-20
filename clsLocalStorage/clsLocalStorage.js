export default class LocalStorageFile{

    constructor(key){
        this.key = key
    }

    save(dataArray){
        localStorage.setItem(this.key, JSON.stringify(dataArray))
    }

    read(){
        const data = localStorage.getItem(this.key)
        return data ? JSON.parse(data) : []
    }

    find(attribute, value){
        const storedData = localStorage.getItem(this.key)
        if(storedData){
            const data = JSON.parse(storedData)
            return data.filter(item => item[attribute] === value)
        }else{
            return []
        }
    }

}



















