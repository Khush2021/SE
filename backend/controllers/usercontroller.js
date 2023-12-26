const User = require("../models/user");

const updateUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.body.id).exec()
        user.phoneNo = req.body.phoneNo || user.phoneNo
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        await user.save()
        return res.status(200).json({
            message: "User updated successfully!",
        });
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    updateUserDetails
}