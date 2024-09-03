import Cast from '../models/castModel.js';

// Create a new cast member
export const createCast = async (req, res) => {
    try {
        const newCast = new Cast(req.body);
        const savedCast = await newCast.save();
        res.status(201).json(savedCast);
    } catch (error) {
        res.status(500).json({ message: "Error fetching cast member", error });
        
    }
};

// Get all cast members

export const getAllCast = async (req,res) => {
    try {
        const cast = await Cast.find();
        res.status(200).json(cast);
    } catch (error) {
        res.status(500).json({ message: "Error fetching cast members", error });
        
    }
};


// Get cast member by ID
export const getCastById = async (req, res) => {
    try {
        const castMember = await Cast.findById(req.params.id);
        if(!castMember) {
            return res.status(404).json({ message: "Cast member not found" });
        }
        res.status(200).json(castMember);
    } catch (error) {
        res.status(500).json({ message: "Error fetching cast member", error });        
    }
};

// Update a cast member by ID
export const updateCast = async (req, res) => {
    try {
        const updatedCast = await Cast.findByIdAndUpdate(req.params.id, req.body, { new: true});
        if (!updatedCast) {
            return res.status(404).json({ message: "cast memeber not found" });
        }
        res.status(200).json(updatedCast);
    } catch (error) {
        res.status(500).json({ message: "error fetching cast member", error });
        
    }
};

// Delete a cast member
export const deleteCast = async (req, res) => {
try {
    const deletedCast = await Cast.findByIdAndDelete(req.params.id);
    if(!deletedCast) {
        return res.status(404).json({ message: "Cast memeber not found" });
    }
    res.status(200).json({ message: "Cast memebr deleted successfully !!!" });
} catch (error) {
    res.status(500).json({ message: "Error deleteing cast member", error });
    
}

};