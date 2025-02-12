import { AxiosResponse } from "axios";

export interface ResponseType extends AxiosResponse{
    code?: number,
    data: any,
    msg?: string
}