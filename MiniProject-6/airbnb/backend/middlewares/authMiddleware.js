const requireHost = (req, res, next) => {
    if(!req.session.isLoggedIn || !req.session.user){
        return res.status(401).json({
            success: false,
            message: 'Not Aunthenticated'
        })
    }
    if(req.session.user.userType !== 'host'){
        return res.status(401).json({
            success: false,
            message: 'Access Denied, Only Host can Access'
        })
    }
    next()
}

const requireLogin = (req, res, next)=>{
    if(!req.session.isLoggedIn || !req.session.user){
        return res.status((401)).json({
            success: false,
            message: 'Not Aunthenticated'
        })
    }
    next()
}

const requireNotLoggedIn = (req, res, next)=>{
    if(req.session.isLoggedIn){
        return res.status(400).json({
            sucess: false,
            message: 'Already Logged In'
        })
    }       
    next()
}

const requireGuest = (req, res, next)=>{
    if(!req.session.isLoggedIn || !req.session.user){
        return res.status(401).json({
            success: false,
            message: 'Not Aunthenticated'
        })
    }
    if(req.session.user.userType !== 'guest'){
        return res.status(401).json({
            success: false,
            message: 'Access Denied, Only Guests can Access'
        })
    }
    next()
}

module.exports = {
    requireHost,
    requireLogin,
    requireNotLoggedIn,
    requireGuest
}