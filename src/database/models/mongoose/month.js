import mongoose from 'mongoose'

import MonthClass from '../../../domain/month'

const MonthSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        available: {
            type: Boolean,
            required: true
        }
    }
)

MonthSchema.loadClass(MonthClass)

export default mongoose.model('Month', MonthSchema)