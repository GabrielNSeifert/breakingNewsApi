import userService from '../services/user.service.js';

const create = async (req, res) => {
    try {
        const { name, username, email, password, avatar, background } = req.body;

        if (!name || !username || !email || !password || !avatar || !background) {
            res.status(400).send({ message: "Submit all fields for registration." });
        };

        const user = await userService.createService(req.body);

        if (!user) {
            return res.status(400).send({ message: 'Error creating User' });
        };

        res.status(201).send({
            message: 'User created sucessfully',
            user: {
                id: user._id,
                name,
                username,
                email,
                avatar,
                background
            }
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    };
};

const findAll = async (req, res) => {
    try {
        const users = await userService.findAllService();

        if (users.lenght === 0) {
            return res.status(400).send({ message: 'No registered users.' });
        };

        res.send(users);

    } catch (error) {
        res.status(500).send({ message: error.message });
    };
};

const findById = async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (error) {
        res.status(500).send({ message: error.message });
    };

};

const update = async (req, res) => {
    try {
        const { name, username, email, password, avatar, background } = req.body;

        if (!name && !username && !email && !password && !avatar && !background) {
            res.status(400).send({ message: "Submit at least one field for update." });
        };

        const { id, user } = req;

        await userService.updateService(
            id,
            name,
            username,
            email,
            password,
            avatar,
            background
        );

        res.send({ message: 'User successfully updated.' });

    } catch (error) {
        res.status(500).send({ message: error.message });
    };

};

const deleteUser = async (req, res) => {

try {
    const id = req.id;
    
    await userService.deleteUserById(id);
    
    res.send({ message: 'User successfully deleted.' });
    
} catch (error) {
    res.status(500).send({message: error.message});
}

};

export default { create, findAll, findById, update, deleteUser };
