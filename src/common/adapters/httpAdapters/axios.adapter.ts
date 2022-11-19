import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { IHttpAdapter } from 'src/common/interfaces/httpAdapter.interface';

@Injectable()
export class AxiosAdapter implements IHttpAdapter {
  private axios: AxiosInstance;
  constructor(private readonly http: HttpService) {
    this.axios = this.http.axiosRef;
  }
  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await this.axios.get<T>(url);
      return data;
    } catch (error) {
      throw new InternalServerErrorException('Axios Http Provider Error');
    }
  }
}
