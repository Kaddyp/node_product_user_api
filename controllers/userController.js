exports.getUser = async (req, res) => {
    try {
        res.status(200).json({
                User: [
                    {id: 1, name: 'John', email: 'john@example.com'}
                ]
        });

    } catch (error) {
      res.status(404).send({ message: 'User not found' });
    }
};