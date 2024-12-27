import utils from "./utils";
import {toast} from "react-toastify";

export const getChannels = async () => {
    try{
        const response = await utils.get('/acquisition-channels');

        if (response.status != 200) {
            new Error(response.data['message']);
        } else {
            let channels: any[];
            channels = response.data.map((item: { [x: string]: any; }) => {
                return [item['name'], item['amount']];
            });

            return channels;
        }
    }
    catch (e:any) {
        console.error(e.message);
        toast['error'](e.message);
        return [];
    }
};

export const addChannel = async(name_:string, amount_: number)=>{
    try{
        const response = await utils.post(`/acquisition-channels`, {
            name: name_,
            amount: amount_
        });

        const message:string = response.data['message'];

        if (response.status != 200) {
            new Error(message);
        } else {
            toast['success'](message);
        }
    }
    catch (e:any) {
        console.error(e.message);
        toast['error'](e.message);
        return [];
    }
}


export const updateAmount = async(name_:string, amount_: number)=>{
    try{
        const response = await utils.put(`acquisition-channels/${name_}`, {
            amount: amount_
        });

        const message:string = response.data['message'];

        if (response.status != 201) {
            new Error(message);
        } else {
            console.log(message);
            toast['success'](message);
        }
    }
    catch (e:any) {
        console.error(e.message);
        toast['error'](e.message);
        return [];
    }
}

export const deleteChannel = async(name: string)=>{
    try{
        const response = await utils.delete(`acquisition-channels/${name}`);

        const message:string = response.data['message'];

        if (response.status != 200) {
            new Error(message);
        } else {
            toast['success'](message);
        }
    }
    catch (e:any) {
        console.error(e.message);
        toast['error'](e.message);
        return [];
    }
}

