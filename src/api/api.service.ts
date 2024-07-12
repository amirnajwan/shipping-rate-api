import { Injectable, Logger, HttpException  } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class ApiService {
    private readonly logger = new Logger(ApiService.name);
    constructor(private readonly httpService: HttpService) {}

    async getCityLinkRate(data: any): Promise<any> {
        const url = 'https://www.citylinkexpress.com/wp-json/wp/v2/getShippingRate';
        this.logger.log(`Calling getCityLinkRate API with URL: ${url} and data: ${JSON.stringify(data)}`);
        try {
          const response = await firstValueFrom(
            this.httpService.post(url, data, {
              headers: {
                'Content-Type': 'application/json',
              },
            })
          );
          return response.data;
        } catch (error) {
          if (error instanceof AxiosError) {
            this.logger.error(`Error calling getCityLinkRate API: ${error.message}`);
            throw new HttpException(error.response?.data || 'Request failed', error.response?.status || 500);
          }
          throw error;
        }
      }
    
      async getSkynetRate(data: any): Promise<any> {
        const url = 'https://www.skynet.com.my/calculate-domestic-rates';
        this.logger.log(`Calling getSkynetRate API with URL: ${url} and data: ${JSON.stringify(data)}`);
        try {
          const response = await firstValueFrom(
            this.httpService.get(url, {
                data,
              headers: {
                'Content-Type': 'application/json',
              },
            })
          );
          return response.data;
        } catch (error) {
          if (error instanceof AxiosError) {
            this.logger.error(`Error calling getSkynetRate API: ${error.message}`);
            throw new HttpException(error.response?.data || 'Request failed', error.response?.status || 500);
          }
          throw error;
        }
      }
    
      async getBothApi(data: any): Promise<any> {
        // seperate data into dataCT and dataSky
        const dataCT = {
            origin_country: data.origin_country,
            origin_state: data.origin_state,
            origin_postcode: data.origin_postcode,
            destination_country: data.destination_country,
            destination_state: data.destination_state,
            destination_postcode: data.destination_postcode,
            length: data.length,
            width: data.width,
            height: data.height,
            selected_type: data.selected_type,
            parcel_weight: data.parcel_weight,
            document_weight: data.document_weight,
          };

          const dataSky = {
            FromPostcode: data.origin_postcode,
            ToPostcode: data.destination_postcode,
            Weight: data.selected_type == 1 ? data.parcel_weight : data.selected_type == 2 ? data.document_weight : null, //in CT : 1 - Parcel, 2 : Documents
            Length: data.length,
            Width: data.width,
            Height: data.height,
            ShipmentType: data.selected_type == 1 ? "Parcel" : data.selected_type == 2 ? "Documents" : null,
          };
         
        const [cityLinkApiResponse, skynetApiResponse] = await Promise.all([
          this.getCityLinkRate(dataCT),
          this.getSkynetRate(dataSky),
        ]);
        // Combine the data as needed
        const combinedData = [
            { courier: "ct", rate: cityLinkApiResponse.req.data.rate, message: cityLinkApiResponse.req.data.message},
            { courier: "sky", rate: skynetApiResponse.data.Cost,  message: skynetApiResponse.data.ErrorMessage },
          ];
        return { data: combinedData};
    }
}
