import Express from 'express';

import { DeliveryParams } from '@/delivery/types';

import { createRouteHandler } from '../../routeHandler';
import { IHandler } from '../types';

import { buildUpdate, Update } from './update';
import { buildGet as buildGetAvatar, Get as GetAvatar } from './avatar/get';
import { buildUpload as buildUploadAvatar, Upload as UploadAvatar } from './avatar/upload';
import { buildDelete as buildDeleteAvatar, Delete as DeleteAvatar } from './avatar/delete';
import { updateUserRules, uploadAvatarRules, getAvatarRules, deleteAvatarRules } from './rules';

type Params = Pick<DeliveryParams, 'user'>;

export type UserMethods = {
  update: Update;

  avatar: {
    upload: UploadAvatar;
    get: GetAvatar;
    delete: DeleteAvatar;
  };
};

const buildUserRoutes = (methods: UserMethods) => {
  return (root: Express.Router) => {
    const namespace = Express.Router();

    /**
     * @openapi
     * /users/{id}:
     *   patch:
     *     tags: [User]
     *     security:
     *       - bearerAuth: []
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: User ID
     *     requestBody:
     *       in: body
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/rules/updateUser'
     *     responses:
     *        200:
     *           description: The updated user.
     *           content:
     *              application/json:
     *                schema:
     *                  $ref: '#/components/entities/User'
     */
    namespace.patch('/:id', updateUserRules, createRouteHandler(methods.update));

    /**
     * @openapi
     * /users/avatar:
     *   post:
     *     tags: [User]
     *     summary: Upload avatar
     *     description: Upload an avatar for the authenticated user.
     *     security:
     *       - bearerAuth: []
     *     consumes:
     *       - multipart/form-data
     *     requestBody:
     *       description: File to upload
     *       required: true
     *       content:
     *         multipart/form-data:
     *           schema:
     *             type: object
     *             properties:
     *               file:
     *                 type: string
     *                 format: binary
     *                 description: The avatar file to be uploaded.
     *     responses:
     *       '201':
     *         description: Avatar uploaded successfully.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 avatarPath:
     *                   type: string
     *                   description: Path to the uploaded avatar.
     *       '400':
     *         description: File is missing from the request.
     *       '401':
     *         description: Unauthorized, authentication is required.
     */
    namespace.post('/avatar', uploadAvatarRules, createRouteHandler(methods.avatar.upload));

    /**
     * @openapi
     * /users/avatar:
     *   get:
     *     tags: [User]
     *     summary: Get user avatar
     *     description: Retrieve the avatar for the authenticated user.
     *     security:
     *       - bearerAuth: []
     *     produces:
     *       - image/png
     *     responses:
     *       '200':
     *         description: Avatar retrieved successfully.
     *         content:
     *           image/png:
     *             schema:
     *               type: string
     *               format: binary
     *       '401':
     *         description: Unauthorized, authentication is required.
     */
    namespace.get('/avatar', getAvatarRules, createRouteHandler(methods.avatar.get));

    /**
     * @openapi
     * /users/avatar:
     *   delete:
     *     tags: [User]
     *     summary: Delete user avatar
     *     description: Delete the avatar for the authenticated user.
     *     security:
     *       - bearerAuth: []
     *     produces:
     *       - image/png
     *     responses:
     *       '200':
     *         description: The user avatar successfully deleted.
     *       '401':
     *         description: Unauthorized, authentication is required.
     */
    namespace.delete('/avatar', deleteAvatarRules, createRouteHandler(methods.avatar.delete));

    root.use('/users', namespace);
  };
};

export const buildUserHandler = (params: Params): IHandler => {
  const update = buildUpdate(params);

  const uploadAvatar = buildUploadAvatar(params);
  const getAvatar = buildGetAvatar(params);
  const deleteAvatar = buildDeleteAvatar(params);

  return {
    registerRoutes: buildUserRoutes({
      update,

      avatar: {
        upload: uploadAvatar,
        get: getAvatar,
        delete: deleteAvatar,
      },
    }),
  };
};
