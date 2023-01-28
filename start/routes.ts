import Route from '@ioc:Adonis/Core/Route'


Route.get('/', 'UsersController.getUsers')
Route.post('/register', 'AuthController.register')
Route.post('/login', 'AuthController.login')

Route.post('/upload', 'UsersController.upload')

Route.post('/streem-upload', 'UsersController.uploadStream')

Route.get('/show/:fileId', 'UsersController.showFile')
Route.get('/user/:userId', 'UsersController.getUserById')



