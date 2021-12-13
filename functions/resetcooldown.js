module.exports.resetCooldown = async (cmdname, userid) => {
    const schema = require('../schema/cooldown-schema')
    return schema.findOneandDelete({
        userId: userid,
        cmd: cmdname
    })
}