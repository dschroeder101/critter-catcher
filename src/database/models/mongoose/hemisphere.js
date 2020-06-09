import mongoose from 'mongoose'

import HemisphereClass from '../../../domain/hemisphere'

const HemisphereSchema = mongoose.Schema(
    {
        direction: {
            type: String,
            required: true,
            enum: ["North", "South"]
        },
        months: [{
            type: Schema.Types.ObjectId,
            ref: "Month",
            required: true
        }]
    }
)

HemisphereSchema.loadClass(HemisphereClass)

export default mongoose.model('Hemisphere', HemisphereSchema)