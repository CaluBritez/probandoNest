import { Body, Controller, Get, Param, ParseIntPipe, Post, Patch, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {

    constructor (
        private readonly carsService: CarsService
    ){}
    
    @Get()
    getAllCars(){
        return this.carsService.findAll();
    }
    
    
    @Get(':id')
    getCarById( @Param('id', ParseUUIDPipe) id:string){
        console.log(this.carsService.findByOneId(id));
        return this.carsService.findByOneId(id);

    }

    @Post()
    createCar( @Body() body: any ) {
        return body;
    }

    @Patch(':id')
    updateCar( 
        @Param('id', ParseUUIDPipe) id: string, 
        @Body() body: any ) 
    {
        return body;
    }

    @Delete(':id')
    deleteCar( @Param('id', ParseUUIDPipe ) id: string ) {
        return {
            method: 'delete',
            id
        };
    }
    
}
