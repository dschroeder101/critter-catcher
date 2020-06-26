import mongoose from 'mongoose'
import ScheduleClass from "../../../domain/schedule.mjs";

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

export default ScheduleSchema;