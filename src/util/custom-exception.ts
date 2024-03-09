import i18n from "i18n";
import { HttpException } from "@util/http-exception";
import constant from "@config/constant";
import logger from "@core/logger";

export class CustomException {
  public static general(error: string): HttpException {
    logger.error(error, "CustomException.general");
    return new HttpException(
      constant.HTTP_STATUS_INTERNAL_ERROR,
      i18n.__("ERR10001"),
      "ERR10001"
    );
  }
}
