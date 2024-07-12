import { Controller, Post, Body } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiBody } from '@nestjs/swagger';

@Controller('rate')
export class ApiController {
    constructor(private readonly apiService: ApiService) {}

    @Post('/both')
    @ApiBody({ 
        description: 'Rate for both CityLink and SkyNet', 
        schema: {
          type: 'object',
          properties: {
            origin_country: { type: 'string', example: "MY" },
            origin_state: { type: 'string', example: "Selangor" },
            origin_postcode: { type: 'string', example: "43900" },
            destination_country: { type: 'string', example: "MY" },
            destination_state: { type: 'string', example: "Perak" },
            destination_postcode: { type: 'string', example: "31000" },
            length: { type: 'number', example: 2 },
            width: { type: 'number', example: 3 },
            height: { type: 'number', example: 1 },
            selected_type: { type: 'number', example: 1 },
            parcel_weight: { type: 'number', example: 5 },
            document_weight: { type: 'number', example: 3 },
          },
          required: [
            'origin_country', 
            'origin_state',
            'origin_postcode',
            'destination_country',
            'destination_state',
            'destination_postcode',
            'length',
            'width',
            'height',
            'selected_type',
            'parcel_weight',
            'document_weight',
        ],
        },
      })
    async getBothApi(
        @Body() queryParams: any
    ){
        return this.apiService.getBothApi(queryParams);
    }

    @Post('/citylink')
    @ApiBody({ 
        description: 'Rate for CityLink', 
        schema: {
          type: 'object',
          properties: {
            origin_country: { type: 'string' },
            origin_state: { type: 'string' },
            origin_postcode: { type: 'string' },
            destination_country: { type: 'string' },
            destination_state: { type: 'string' },
            destination_postcode: { type: 'string' },
            length: { type: 'number' },
            width: { type: 'number' },
            height: { type: 'number' },
            selected_type: { type: 'number' },
            parcel_weight: { type: 'number' },
            document_weight: { type: 'number' },
          },
          required: [
            'origin_country', 
            'origin_state',
            'origin_postcode',
            'destination_country',
            'destination_state',
            'destination_postcode',
            'length',
            'width',
            'height',
            'selected_type',
            'parcel_weight',
            'document_weight',
        ],
        },
      })
    async getCityLinkRate(
        @Body() queryParams: any
    ) {
        return this.apiService.getCityLinkRate(queryParams);
    }

    @Post('/skynet')
    @ApiBody({ 
        description: 'Rate for SkyNet', 
        schema: {
          type: 'object',
          properties: {
            FromPostcode: { type: 'string' },
            ToPostcode: { type: 'string' },
            Weight: { type: 'number' },
            Length: { type: 'number' },
            Width: { type: 'number' },
            Height: { type: 'number' },
            ShipmentType: { type: 'string' },
          },
          required: [
            'FromPostcode', 
            'ToPostcode',
            'Weight',
            'Length',
            'Width',
            'Height',
            'ShipmentType',
        ],
        },
      })
    async getSkynetRate(
        @Body() queryParams: any
    ) {
        
        return this.apiService.getSkynetRate(queryParams);
    }
}
