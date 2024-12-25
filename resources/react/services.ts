import utils from "./utils";

export const getChannels = async () => {
    try{
        const response = await utils.get('/acquisition-channels');
        let channels: any[];
        channels = response.data.map(item => {
          return [item['name'], item['amount']];
        });
        return channels;
    }
    catch (e) {
        console.error(e.message);
        return [];
    }
};

export const deleteChannel = async(name: string)=>{
    try{
        const response = await utils.delete(`acquisition-channels/${name}`);
        if (response.status != 200) {
            throw new Error(response.data);
        } else {
            return response.data;
        }

    }
    catch (e) {
        console.error(e.message);
        return [];
    }
}

