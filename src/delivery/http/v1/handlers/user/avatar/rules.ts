import { authRequired } from '@/delivery/http/v1/middlewares';
import { fileUploader } from '@/delivery/http/v1/middlewares/fileUploader';
import {
  AVATAR_FIELD_NAME,
  AVATAR_ALLOWED_MIME_TYPES,
  AVATAR_MAX_SIZE,
} from '@/delivery/http/v1/handlers/user/avatar/constant';

/**
 * @openapi
 * components:
 *   rules:
 *      uploadAvatar:
 *        required:
 *          - avatar
 *        properties:
 *          avatar:
 *            type: string
 *            format: binary
 *            description: User's avatar file
 */
export const uploadAvatarRules = [
  authRequired({}),
  fileUploader({
    fieldName: AVATAR_FIELD_NAME,
    allowedMimeTypes: AVATAR_ALLOWED_MIME_TYPES,
    maxSize: AVATAR_MAX_SIZE,
  }),
];

/**
 * @openapi
 * components:
 *   rules:
 *      getAvatar:
 *        description: Authorization is required to access this resource.
 */
export const getAvatarRules = [authRequired({})];

/**
 * @openapi
 * components:
 *   rules:
 *      deleteAvatar:
 *        description: Authorization is required to access this resource.
 */
export const deleteAvatarRules = [authRequired({})];
