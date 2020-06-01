const { Router } = require('express');
const authService = require('../services/auth-service');
const VehicleController = require('../controllers/vehicle-controller');

const routes = Router();

/**
 * @swagger
 * /api/auth/vehicles:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Use to list vehicles.
 *      tags:
 *          - name: Vehicles
 *      responses:
 *          '200':
 *              description: A succesful response
 *              examples:
 *                    application/json:
 *                      [
 *                        {
 *                          _id: string,
 *                          brand: { _id: string, name: string },
 *                          model: string,
 *                          modelYear: string,
 *                          manufactureYear: string,
 *                          color: string,
 *                          mileage: string,
 *                          onlyOwner: boolean,
 *                          status: string,
 *                          price: number,
 *                        }
 *                      ]
 */
routes.get('/', authService.authorize, VehicleController.list);

/**
 * @swagger
 * /api/auth/vehicles/{id}/pictures:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Use to list vehicle's pictures.
 *      tags:
 *          - name: Vehicles
 *      responses:
 *          '200':
 *              description: A succesful response
 *              examples:
 *                    application/json:
 *                      [
 *                        { _id: string, base64: string }
 *                      ]
 */
routes.get(
  '/:id/pictures',
  authService.authorize,
  VehicleController.listPictures
);

routes.post('/', authService.isAdmin, VehicleController.create);

routes.post(
  '/:id/pictures',
  authService.isAdmin,
  VehicleController.savePicture
);

routes.delete(
  '/:id/pictures/:pictureId',
  authService.isAdmin,
  VehicleController.deletePicture
);

module.exports = app => app.use('/api/auth/vehicles', routes);
