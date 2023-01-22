import Route from '@ioc:Adonis/Core/Route'


Route.get('/', 'UsersController.getUsers')
Route.post('/register', 'AuthController.register')
Route.post('/login', 'AuthController.login')

