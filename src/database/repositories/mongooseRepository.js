class MongooseRepository {
    constructor({ Model }) {
        this.collection = Model
    }

    async count() {

    }

    async find(query = {}, { multiple = true, count } = {}) {
        const results = multiple
            ? this.collection.find(query)
            : this.collection.findOne(query)


        if (count) {
            return results.countDocuments().exec()
        } else {
            return results.exec()
        }
    }
}