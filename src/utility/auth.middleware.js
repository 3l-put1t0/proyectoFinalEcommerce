const policyAd = () => {
    return (req, res, next) => {
        if(!req.session.user) return res.status(401).send({status:"error",error:"No autenticado"});
        if(req.session.user.role.toUpperCase() !=="ADMINISTRATOR") return res.status(401).send({status:"error",error:"No autorizado"});
        next();
    }
}

const policySuper = () => {
    return (req, res, next) => {
        if(!req.session.user) return res.status(401).send({status:"error",error:"No autenticado"});
        if(req.session.user.role.toUpperCase() !== "ADMINISTRATOR" && req.session.user.role.toUpperCase() !=="PREMIUN") return res.status(401).send({status:"error",error:"No autorizado"});
        next();
    }
}

const policies = {
    policyAd,
    policySuper
}

export default policies;