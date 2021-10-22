const jwt = requiere('jsonwebtoken');

const validateUser = (request, response, next) => {
    const tokenFromHeader = request.header('grupo18-auth-user');
   if (!tokenFromHeader) {
       return response.status(401).send ({
           ok: false,
           error: 'Operación no autorizada',
       })
   }

    try {
        const isValid = jwt.verify(tokenFromHeader, process.env.JWT_SECRET);
       comsole.log(tokenInfo);

        if (!tokenInfo){
        return response.status(401).send ({
            ok: false,
            error: 'Operación no autorizada',
        });  
       }
       request.usweId = tokenInfo.id;
    }catch (e) {
        return response.status(500).send({
            ok: false,
            error: e.message,
        });
    }
    
    next ();
}



module.export = {
    validateUser,
}