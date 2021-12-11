module.exports.resetCooldown = async (schema, cmdname, userid) => {
    return schema.findOneandDelete({
        userId: userid,
        cmd: cmdname
    })
}