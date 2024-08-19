import TrendingPopularContent from "../models/TrendingPopularModel.js";

// Create a new content 
export const createContent = async (req, res) => {
    try {
        // To get getails from req.body
        const { contentID, movieID, type, date} = req.body;

        // Create a content 
        const newContent = new TrendingPopularContent({ contentID, movieID, type, date});

        // Save the new content to the datebase
        await newContent.save();

        res.status(201).json(newContent);
} catch (err) {
    res.status(500).json({ message: err.message});
}
};

// Get all content 
export const getAllContent = async (req, res) => {
    try {
        // Get all contents from the database
        const content = await TrendingPopularContent.find();
        res.status(200).json(content);

    } catch (err) {
        res.status(500).json({ message: err.message});
    }
};

// Get a content by Id
export const getContentById = async (req, res) => {
    try {
        // Get a  content by ID
        const content = await TrendingPopularContent.findById(req.params.id);
    
        if(!content) {
            return res.status(404).json({ message: 'Content not found'});        
    }

    res.status(200).json(content);
    } catch (err) {
        res.status(500).json({ message: err.message});    
    }
};

// Update a content by ID
export const updateContentBYID = async (req, res) => {
    try {
        // Get update details from req.body;
        const { contentID, movieID, type, date } = req.body;

        // Update content by ID
        const updatedContent = await TrendingPopularContent.findByIdAndUpdate(
            req.params.id,
            { contentID, movieID, type, data },
            { new: true}
        );

        if (!updatedContent) {
            return res.status(404).json({ message: 'Content not fount'});        
    
    }

    res.status(200).json(updatedContent);
} catch(err) {
    res.status(500).json({ message: err.message });
}
};

// Delete a content by ID
export const deleteContentById = async (req, res) => {
    try {
        const deleteContent = await TrendingPopularContent.findByIdAndDelete(req.params.id);
    if (!deletedContent) {
        return res.status(404).json({ message: 'Content not found' })  
    }
    res.status(200).json(updatedContent);
} catch(err) {
    res.status(500).json({ message: err.message });
}
};



