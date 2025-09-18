import BungalowModel from "../models/BungalowModel.js"

export async function getAllBungalows(req,res){
    try{
        const getBungalows = await BungalowModel.find();
        res.json(getBungalows);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

export async function createBungalow(req,res){
    try{
        const putBungalow = new BungalowModel(req.body);
        await putBungalow.save()
        res.status(201).json(putBungalow)
    }catch(err){
        res.status(400).json({error: err.message})
    }
}

export async function getBungalowById(req,res){
    try{
        const getBungalowById = await BungalowModel.findById(req.params.id);
        if (!getBungalowById) return res.status(404).json({ error: "Not found" });
        res.json(getBungalowById);
    }catch{
        res.status(500).json({ error: err.message });
    }
}

export async function updateBungalow(req,res){
    try{
        const updateBungalow = await BungalowModel.findByIdAndUpdate(req.params.id, req.body,{new:true});
        if(!updateBungalow){
            return res.status(404).json({ error: "Not found" });
        }
        res.json(updateBungalow)
    }catch{
        res.status(400).json({ error: err.message });
    }
}

export async function deleteBungalow(req,res){
    try{
        const deleteBungalow = await BungalowModel.findByIdAndDelete(req.params.id);
        if(!deleteBungalow) return res.status(404).json({ error: "Not found" });
        res.json({ message: "Deleted successfully" });
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}
