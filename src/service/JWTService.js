import db from '../models/index'

const getGroupWithRoles = async (user) => {
    // scope
    let roles = await db.Group.findOne({
        where: { id: user.groupId },
        attributes: ["id", "description"],
        include: { 
            model: db.Role, 
            attributes: ["id", "url", "description"],
            through: { attributes: [] }      // fix lay thua data (rela table group-role)
        }
    })
    return roles ? roles : {}
}

module.exports = {
    getGroupWithRoles
}