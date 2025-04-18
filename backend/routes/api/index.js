// backend/routes/api/index.js
// Pseudocode:
/*
1. Import express and create router
2. Import route modules:
   - sessionRouter
   - usersRouter
   - spotsRouter
3. Import restoreUser middleware
4. Apply restoreUser middleware to set req.user
5. Connect route modules:
   - router.use('/session', sessionRouter)
   - router.use('/users', usersRouter)
   - router.use('/spots', spotsRouter)
6. Export router
*/