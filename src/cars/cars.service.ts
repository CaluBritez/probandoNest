import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import {v4 as uuid} from 'uuid';

import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {

    private cars:Car[] = [
        {
            id: uuid(),
            brand: 'Honda',
            model: 'Civic'
        },
        {
            id: uuid(),
            brand: 'Jeep',
            model: 'Cherokee'
        },
        {
            id: uuid(),
            brand: 'Toyota',
            model: 'Corolla'
        }
    ]

    findAll(){
        return this.cars
    }

    findByOneId(id:string){
        const car = this.cars.find( car => car.id === id);

        if (!car) {
            throw new NotFoundException(`Car with ID '${id}' is not found`);
        }

        return car;
    }

    create( createCarDto: CreateCarDto) {

        const car:Car = {
            id: uuid(),
            ...createCarDto
        }
        this.cars.push(car);
        return car
    }

    update( id: string, updateCarDto: UpdateCarDto ) {
        let carDB = this.findByOneId(id);

        this.cars = this.cars.map( car => {
            if (car.id === id) {
                carDB = {
                    ...carDB,
                    ...updateCarDto,
                    id
                }
                return carDB;
            }
            return carDB;
        });
        return carDB;
    }
    
    delete ( id: string ) {
        const car = this.findByOneId(id);
        this.cars = this.cars.filter( car => car.id !== id );
    }
}
