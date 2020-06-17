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

/**
 * @swagger
 * /api/auth/vehicles:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      summary: Use to create a vehicle, only administrators can access.
 *      tags:
 *          - name: Vehicles
 *      parameters:
 *      - in: body
 *        name: user
 *        description: The vehicle to create.
 *        schema:
 *          type: object
 *          properties:
 *            model:
 *              type: string
 *            modelYear:
 *              type: string
 *            manufactureYear:
 *              type: string
 *            color:
 *              type: string
 *            mileage:
 *              type: string
 *            onlyOwner:
 *              type: boolean
 *            status:
 *              type: string
 *              enum:
 *                - AVAILABLE
 *                - SOLD
 *            price:
 *              type: number
 *      responses:
 *          '201':
 *              description: A succesful response
 */
routes.post('/', authService.isAdmin, VehicleController.create);

routes.put('/:id', authService.isAdmin, VehicleController.update);

routes.delete('/:id', authService.isAdmin, VehicleController.delete);

/**
 * @swagger
 * /api/auth/vehicles/{id}/pictures:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      summary: Use to save a vehicle's picture, only administrators can access.
 *      tags:
 *          - name: Vehicles
 *      parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *         type: string
 *        description: The vehicle ID
 *      - in: body
 *        name: user
 *        description: The picture to save.
 *        schema:
 *          type: object
 *          properties:
 *            base64:
 *              type: string
 *      responses:
 *          '201':
 *              description: A succesful response
 */
routes.post(
  '/:id/pictures',
  authService.isAdmin,
  VehicleController.savePicture
);

/**
 * @swagger
 * /api/auth/vehicles/{id}/pictures/{pictureId}:
 *  delete:
 *      security:
 *          - bearerAuth: []
 *      summary: Use to save a vehicle's picture, only administrators can access.
 *      tags:
 *          - name: Vehicles
 *      parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *         type: string
 *        description: The vehicle ID
 *      - in: path
 *        name: pictureId
 *        required: true
 *        schema:
 *         type: string
 *        description: The picture ID to delete.
 *      - in: body
 *        name: user
 *        description: The picture to save.
 *        schema:
 *          type: object
 *          properties:
 *            base64:
 *              type: string
 *      responses:
 *          '201':
 *              description: A succesful response
 */
routes.delete(
  '/:id/pictures/:pictureId',
  authService.isAdmin,
  VehicleController.deletePicture
);

module.exports = app => app.use('/api/auth/vehicles', routes);
