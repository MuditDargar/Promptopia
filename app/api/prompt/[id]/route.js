import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import mongoose from "mongoose";

// GET (read)


export const GET = async (request,{params}) =>{
    try{
        await connectToDB();
        const prompts=await Prompt.findById(params.id).populate('creator');
        if(!prompts){
            return new Response("Prompt not found",{status:404})
        }
        return new Response(JSON.stringify(prompts),{
            status:200,
        })
    }
    catch(error){
        return new Response("Failed to fetch all prompts",{status:500})
    }
}

//PATCH (update)
export const PATCH = async (request ,{params})=>{

    const {prompt,tag}=await request.json();

    try{
        await connectToDB();
        const existingPrompt=await Prompt.findById(params.id);

        if(!existingPrompt){
            return new Response("Prompt not found",{status:404})
        
        }
        existingPrompt.prompt=prompt;
        existingPrompt.tag=tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt),{
            status:200,
        })
    }
    catch(error){
        return new Response("Failed to update the prompt",{status:500})
    }
}

// DELETE(delete)

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Log the parameters to ensure they are correct
        console.log("Params ID:", params.id);

        // Attempt to find and delete the prompt by ID
        const prompt = await Prompt.findByIdAndDelete(params.id);

        if (!prompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        console.error("Error deleting prompt:", error);
        return new Response("Error deleting prompt", { status: 500 });
    }
};


export async function searchPromptsByPrompt(searchText) {
    try {
        // Use regex to make the search case-insensitive and partial matching
        const regex = new RegExp(searchText, 'i');

        // Perform the search using Mongoose
        const results = await Prompt.find({
            $or: [
                { prompt: regex }, // Search by prompt
                { tag: regex },   // Search by tag (assuming 'tags' is an array in your schema)
                { creator: regex } // Search by creator name
            ]
        });

        return results;
    } catch (error) {
        // Handle any errors that occur during the search
        console.error('Error searching prompts:', error.message);
        throw error;
    }
}

export const getUserPrompts = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the user by ID and populate their prompts
        const userPrompts = await Prompt.find({ creator: params.userId }).populate('creator');

        if (!userPrompts) {
            return new Response("User prompts not found", { status: 404 });
        }

        return new Response(JSON.stringify(userPrompts), { status: 200 });
    } catch (error) {
        console.error('Error fetching user prompts:', error);
        return new Response("Failed to fetch user prompts", { status: 500 });
    }
};