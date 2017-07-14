function validateRequest(req, res, next) {
    tokenService.validateToken(req)
        .then(next)
        .catch(next);
}
