import mongoose from 'mongoose'

const ScheduleSchema = mongoose.Schema(
    {
        startingTime: {
            type: Number
        }, 
        endingTime: {
            type: Number
        },
        allDay: {
            type: Boolean,
            required: false
        }
    }
)

ScheduleSchema.loadClass(ScheduleClass)

export default mongoose.model('Schedule', ScheduleSchema)