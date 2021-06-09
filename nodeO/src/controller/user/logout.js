
module.exports = async (req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });

        await req.user.save();
        res.send('logged out');
    } catch (error) {
        res.status('400').send();
    }
}