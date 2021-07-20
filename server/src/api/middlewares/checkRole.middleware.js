import {STATUS_CODE} from "../../constant/statusCode";
import {jsonError} from "../../utils/result";
import {MESSAGE_ERROR} from "../../constant/errors";

export const checkRoleMiddleware = (roleName) => (req, res, next) => {
  const { user } = req

  if (user.role !== roleName) {
    return res.status(STATUS_CODE.FORBIDDEN).json(jsonError(MESSAGE_ERROR.INVALID_ROLE))
  }

  next()
}
