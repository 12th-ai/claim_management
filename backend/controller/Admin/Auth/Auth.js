const Admin = require('../../../models/Admin/Admin');


const Register = async(req, res) => {


    const { username, email, password, phoneNumber } = req.body;
    const profileImage = req.file ? req.file.filename : null;

    try {

        const ExistingUser = await Admin.findOne({ where: { email } });

        if (ExistingUser) {
            return res.status(400).json({ message: 'User already exists' })
        }

        await Admin.create({ username, email, password, phoneNumber, profileImage })
        return res.status(200).json({ message: 'User created' })


    } catch (err) {
        console.error('Error during registration:', err);
        // Handle specific error responses based on your API or general error
        if (err.response && err.response.data) {
            // Log the error response from the API
            console.error('API error response:', err.response.data);
            return res.status(err.response.status).send(err.response.data.message || 'Error validating email.');
        }
        res.status(500).json({ message: "registration failed " });
    }

}



module.exports = {
    Register
}