import{Schema,model,models} from "mongoose";
import mongoose from "mongoose";


const PromptSchema = new mongoose.Schema({
    prompt: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        required: true,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Prompt = mongoose.models.Prompt || mongoose.model('Prompt', PromptSchema);
export default Prompt;