const {Student} = require("../models/model")
const client = require("../cache/cache")

class DatabaseController {
    async mysql(req, res, next) {
        const students = await Student.findAll()
        res.render("index", {students, isCached: false})
    }

    async redis(req, res, next) {
        let students = await client.get("students")

        if(students === null) {
            students = await Student.findAll()
            await client.set("students", JSON.stringify(students))
        } else {
            students = JSON.parse(students)
        }

        res.render("index", {students, isCached: true})
    }
}

module.exports = new DatabaseController()