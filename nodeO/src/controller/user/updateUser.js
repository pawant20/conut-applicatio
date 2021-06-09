module.exports = async (req,res)=>{
    try {
        const updates = Object.keys(req.body);

        const user = req.user;
        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();

        if (!user) {
            return res.status(400).send({response : 'bad request'});
        }
        res.send({response : 'user updated'});
    } catch (error) {
        res.status(400).send();
    }
}